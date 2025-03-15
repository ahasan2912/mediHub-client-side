import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import banner1 from '../assets/Content-1.webp';
import banner2 from '../assets/Content-3.webp';
import banner3 from '../assets/content-18.webp';
import banner4 from '../assets/content-19.webp';
import banner5 from '../assets/content-21.webp';
import banner6 from '../assets/content-22.webp';
const Banner = () => {
    // const axiosPublic = useAxiosPublic();
    // const { data: banners = [], isLoading: loading } = useQuery({
    //     queryKey: ['banners'],
    //     queryFn: async () => {
    //         const res = await axiosPublic.get('/banners');
    //         return res.data;
    //     }
    // })
    // console.log(banners)
    // if (loading) {
    //     return <LoadingSpinner></LoadingSpinner>
    // }
    return (
        <div className='mt-16'>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                loop={true}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className='mySwiper'>
                {/* {
                    banners.map(banner => <SwiperSlide key={banner._id}>
                        <div className='sm:mt-10'>
                            <img className='w-full h-40 sm:h-auto object-fill rounded-lg' src={banner?.image} alt="" />
                        </div>
                    </SwiperSlide>
                    )
                } */}
                <SwiperSlide>
                    <div className='sm:mt-10'>
                        <img className='w-full h-40 sm:h-auto object-fill rounded-lg' src={banner1} alt="" />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='sm:mt-10'>
                        <img className='w-full h-40 sm:h-auto object-fill rounded-lg' src={banner2} alt="" />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='sm:mt-10'>
                        <img className='w-full h-40 sm:h-auto object-fill rounded-lg' src={banner3} alt="" />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='sm:mt-10'>
                        <img className='w-full h-40 sm:h-auto object-fill rounded-lg' src={banner4} alt="" />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='sm:mt-10'>
                        <img className='w-full h-40 sm:h-auto object-fill rounded-lg' src={banner5} alt="" />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='sm:mt-10'>
                        <img className='w-full h-40 sm:h-auto object-fill rounded-lg' src={banner6} alt="" />
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Banner;
