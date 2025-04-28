import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import MedicineCard from "../../Components/MedicineCard";

const Shop = () => {
    const [produts, setProducts] = useState([]);
    const [count, setCount] = useState(0);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('')
    const [currentPage, setCurrentPage] = useState(0);
    const itemPerPage = 12;
    const numberOfPages = Math.ceil(count / itemPerPage);
    const pages = [...Array(numberOfPages).keys()];
    useEffect(() => {
        fetch('https://madi-hub-server-side.vercel.app/productsCount')
            .then(res => res.json())
            .then(data => setCount(data.count))
    }, []);

    // all show middle windows
    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top of the page
    }, []);

    // pagination data send server

    useEffect(() => {
        fetch(`https://madi-hub-server-side.vercel.app/products?page=${currentPage}&size=${itemPerPage}&search=${search}&sort=${sort}`)
            .then(res => res.json())
            .then(data => setProducts(data));
    }, [currentPage, itemPerPage, search, sort])

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

    // handleAddToCart
   /*  const handleAddToCart = (medicine) => {
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
            axiosSecure.post('/ordersList', cartItem)
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
    } */

    const handleSearch = e => {
        e.preventDefault();
        //if you want use onBlur
    }

    return (
        <div className="max-w-7xl mx-auto px-5 my-24">
            <Helmet>
                <title>MediHub | Shop</title>
            </Helmet>
            <div className=' flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
                <form onSubmit={handleSearch} className="md:w-[50%]">
                    <div className='flex p-1 overflow-hidden border rounded-lg    focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300'>
                        <button className='px-2 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-l-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none'>
                            Search
                        </button>
                        <input
                            className='w-full px-6 py-2 text-gray-700 placeholder-gray-500 bg-gray-300 outline-none focus:placeholder-transparent rounded-r-md'
                            type='text'
                            name='search'
                            // value={search}
                            placeholder='Search by medicine or company name'
                            onChange={e => setSearch(e.target.value)}
                        // onBlur={e => setSearch(e.target.value)}
                        />
                    </div>
                </form>
                <div className="p-1 flex border border-gray-300 rounded-md">
                    <div className='px-2 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-l-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none'>Sort By</div>
                    <select onChange={e => setSort(e.target.value)}
                        value={sort}
                        className="rounded-r-md outline-none flex justify-end ml-auto bg-gray-300 text-gray-700">
                        <option value='asc' className="text-base">{`Price (Low > High)`}</option>
                        <option value='dsc' className="text-base">{`Price (High > Low)`}</option>
                    </select>
                </div>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold w-full my-6">All Products Here</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {
                    produts.map((item, idx) => <MedicineCard 
                    key={idx}
                    item={item}
                    ></MedicineCard>)
                }
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

