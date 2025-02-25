import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { GrCheckboxSelected } from "react-icons/gr";
import DetailsModal from "../../Components/modal/DetailsModal";
import useAuth from "../../Hook/useAuth";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import useOrder from "../../Hook/useOrder";
import { Helmet } from "react-helmet-async";

const Shop = () => {
    const [produts, setProducts] = useState([]);
    const [count, setCount] = useState(0);
    const [selectedItem, setSelectedItem] = useState(null);
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const location = useLocation();
    // const [itemPerPage, setItemPertPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const itemPerPage = 10;
    const numberOfPages = Math.ceil(count / itemPerPage);
    const pages = [...Array(numberOfPages).keys()];
    const [, refetch] = useOrder();

    useEffect(() => {
        fetch('http://localhost:5000/productsCount')
            .then(res => res.json())
            .then(data => setCount(data.count))
    }, []);

    // all show middle windows
    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top of the page
    }, []);

    // pagination data send server
    useEffect(() => {
        fetch(`http://localhost:5000/products?page=${currentPage}&size=${itemPerPage}`)
            .then(res => res.json())
            .then(data => setProducts(data));
    }, [currentPage, itemPerPage])

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
    // close modal
    const closeModal = () => {
        setSelectedItem(null)
    }

    // handleAddToCart
    const handleAddToCart = (medicine) => {
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
                price: medicine?.price,
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
        <div className="max-w-5xl mx-auto px-5 my-24">
            <Helmet>
                <title>MediHub | Shop</title>
            </Helmet>
            <h1 className="text-4xl font-bold text-center">All Products Here</h1>
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
                        {/* {produts.map((item, idx) => <ShowProducts key={idx} item={item} idx={idx}></ShowProducts>)} */}
                        {produts.map((item, idx) => <tr key={idx}>
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

export default Shop;

