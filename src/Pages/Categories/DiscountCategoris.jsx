import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useEffect, useState } from "react";
import ProductCard from '../../Components/ProductCard';

const DiscountCategoris = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch('discounts.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])
    return (
        <div>
            <h1 className="text-2xl md:text-4xl font-bold uppercase">Discount Products</h1>
            <div className="flex justify-center items-center my-10 lg:my-5">
                <div className="w-full  px-6 relative">
                    <Swiper
                        modules={[Navigation]}
                        spaceBetween={20}
                        slidesPerView={4}
                        navigation={{
                            nextEl: ".custom-next",
                            prevEl: ".custom-prev",
                        }}

                    >
                        {products.map((product, index) => (
                            <SwiperSlide key={index} className='py-2 px-3'>
                                <ProductCard product={product}></ProductCard>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Custom Navigation Buttons */}
                    <div className="custom-prev absolute top-1/2 -left-6 transform -translate-y-1/2 bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer shadow hover:bg-blue-200 transition border">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-7 h-7 text-blue-500"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                    </div>
                    <div className="custom-next absolute top-1/2 -right-6 transform -translate-y-1/2 bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer shadow hover:bg-blue-200 transition">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-7 h-7 text-blue-500"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DiscountCategoris;

