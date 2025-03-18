import { useLocation, useNavigate, useParams } from "react-router-dom";
import useProducts from "../../Hook/useProducts";
import { GrCheckboxSelected } from "react-icons/gr";
import { FaEye } from "react-icons/fa";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../Components/LoadingSpinner";
import DetailsModal from "../../Components/modal/DetailsModal";
import useAuth from "../../Hook/useAuth";
import Swal from "sweetalert2";
import useOrder from "../../Hook/useOrder";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hook/useAxiosPublic";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import useRole from "../../Hook/useRole";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
const CategoriesShow = () => {
    const [selectedItem, setSelectedItem] = useState(null);
    const { category } = useParams();
    const [products] = useProducts();
    // const [needProducts, setNeedProducts] = useState([]);
    const product = products.filter(item => item.category === category);
    const count = product.length;
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const [role] = useRole();
    const location = useLocation();
    const { user } = useAuth();
    const [, refetch] = useOrder();
    const [currentPage, setCurrentPage] = useState(0);
    const itemPerPage = 10;
    const numberOfPages = Math.ceil(count / itemPerPage);
    const pages = [...Array(numberOfPages).keys()];

    const { data: needProducts = [], isLoading } = useQuery({
        queryKey: ['categories', category, currentPage, itemPerPage],
        queryFn: async () => {
            const res = await axiosPublic.get(`/products/categories?category=${category}&&page=${currentPage}&size=${itemPerPage}`)
            return res.data;
        }
    })
    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top of the page
    }, []);

    const hanlgePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    }

    const handleNextPage = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1);
        }
    }
    const closeModal = () => {
        setSelectedItem(null)
    }

    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }
    // order send to database 
    const handleAddToCart = (medicine) => {
        if (role === 'Admin') {
            return toast.error(`Admin Can not Order any Products`)
        }
        if (role === 'Seller') {
            return toast.error(`Seller Can not Order any Products`)
        }
        const customer = {
            name: user?.displayName,
            photo: user?.photoURL,
            email: user?.email
        }
        if (user && user?.email) {
            // send cart item to the database
            const cartItem = {
                medicineId: medicine?._id,
                name: medicine?.name,
                image: medicine?.image,
                price: parseInt(medicine?.price),
                quantity: 1,
                seller: medicine?.seller?.email,
                customer
            }
            axiosSecure.post('/orders', cartItem)
                .then(res => {
                    if (res.data.insertedId) {
                        Swal.fire({
                            title: "Order Successfully!",
                            icon: "success",
                            draggable: true
                        });
                        refetch();
                    }
                })
        }
        else {
            Swal.fire({
                title: "Please login to add to the cart?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, login!"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } });
                }
            });
        }
    }

    return (
        <div className="max-w-5xl mx-auto my-12">
            <Helmet>
                <title>MediHub | Shop</title>
            </Helmet>
            <h1 className="text-4xl font-bold mt-28">{category.charAt(0).toUpperCase() + category.slice(1)} Products</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th className="text-base font-bold" >Serial</th>
                            <th className="text-base font-bold" >Photo</th>
                            <th className="text-base font-bold" >Name</th>
                            <th className="text-base font-bold" >Price</th>
                            <th className="text-base font-bold" >Add To Cart</th>
                            <th className="text-base font-bold" >Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {needProducts.map((item, idx) => <tr key={idx}>
                            <td className="text-base font-bold">{idx + 1}</td>
                            <td>
                                <img
                                    className="w-14 h-14 rounded-xl object-fill"
                                    src={item?.image}
                                    alt="Avatar Tailwind CSS Component" />
                            </td>
                            <td className="text-base font-bold"> {item?.name} </td>
                            <td className="text-base font-bold">${item?.price}</td>
                            <td>
                                <button onClick={() => handleAddToCart(item)} className="btn btn-lg btn-ghost">
                                    <GrCheckboxSelected className='text-blue-400 text-2xl' />
                                </button>
                            </td>
                            <td>
                                <button onClick={() => setSelectedItem(item)} className="btn btn-lg btn-ghost">
                                    <FaEye className='text-blue-400 text-2xl' />
                                </button>
                            </td>
                        </tr>)}

                    </tbody>
                </table>
                {selectedItem && <DetailsModal item={selectedItem} closeModal={closeModal} />}
            </div>
            {/* ---------------Pagination-------------- */}
            <div className="pagination text-center flex items-center justify-center mt-5 px-2 flex-wrap gap-3">
                <button onClick={hanlgePrevPage} className="btn hover:bg-yellow-400">Prev</button>
                {
                    pages.map(page => <button key={page} onClick={() => setCurrentPage(page)} className={currentPage === page ? 'btn font-bold bg-yellow-400 text-black' : 'btn text-bold'}>{page}</button>)
                }
                <button onClick={handleNextPage} className="btn hover:bg-yellow-400">Next</button>
            </div>
        </div>
    );
};

export default CategoriesShow;

