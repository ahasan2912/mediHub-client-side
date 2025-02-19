import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { GrCheckboxSelected } from "react-icons/gr";

const Shop = () => {
    const [produts, setProducts] = useState([]);
    const [count, setCount] = useState(0)
    // const [itemPerPage, setItemPertPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const itemPerPage = 10;
    const numberOfPages = Math.ceil(count / itemPerPage);
    const pages = [...Array(numberOfPages).keys()];

    useEffect(() => {
        fetch('http://localhost:5000/productsCount')
            .then(res => res.json())
            .then(data => setCount(data.count))
    }, [])

    // pagination data send server
    useEffect(() => {
        fetch(`http://localhost:5000/products?page=${currentPage}&size=${itemPerPage}`)
        .then(res => res.json())
        .then(data => setProducts(data))
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
    return (
        <div className="max-w-5xl mx-auto px-5 my-24">
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
                                <button className="btn btn-lg btn-ghost">
                                    <GrCheckboxSelected className='text-blue-400 text-2xl' />
                                </button>
                            </td>
                            <td>
                                <button className="btn btn-lg btn-ghost">
                                    <FaEye className='text-blue-400 text-2xl' />
                                </button>
                            </td>
                        </tr>)}

                    </tbody>
                </table>
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

