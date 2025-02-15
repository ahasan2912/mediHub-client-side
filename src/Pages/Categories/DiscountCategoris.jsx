import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

const DiscountCategoris = () => {
    const categories = [
        {
            title: "Customer Help",
            jobs: "185 Jobs Available",
            icon: "🎧", // Replace with appropriate icons/images
        },
        {
            title: "Finance",
            jobs: "168 Jobs Available",
            icon: "🏦",
        },
        {
            title: "Software",
            jobs: "1856 Jobs Available",
            icon: "💡",
        },
        {
            title: "Human Resource",
            jobs: "165 Jobs Available",
            icon: "👔",
        },
        {
            title: "Management",
            jobs: "965 Jobs Available",
            icon: "📊",
        },
    ];
    return (
        <div>
            <h1 className='text-center font-bold text-4xl'>Discount Products</h1>
            <div className="flex justify-center items-center my-10">
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
                        {categories.map((category, index) => (
                            <SwiperSlide key={index}>
                                <div className="bg-gray-300 flex flex-col items-center justify-center shadow-md rounded-lg p-4 min-w-[200px] transition-transform hover:scale-105">
                                    <div className="text-4xl">{category.icon}</div>
                                    <h3 className="text-lg font-semibold mt-2">{category.title}</h3>
                                    <p className="text-sm text-gray-500">{category.jobs}</p>
                                </div>
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