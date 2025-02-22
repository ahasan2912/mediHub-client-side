import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import customer1 from '../../assets/customer/customer1.jpg';
import customer2 from '../../assets/customer/customer2.jpg';
import customer3 from '../../assets/customer/customer3.jpg';
import customer4 from '../../assets/customer/customer4.jpg';
import customer5 from '../../assets/customer/customer5.jpg';
import customer6 from '../../assets/customer/customer6.jpg';
import customer7 from '../../assets/customer/customer7.jpg';
const CustomerReview = () => {
    const [sliderRef] = useKeenSlider({
        loop: true,
        rtl: true,
        slides: {
            perView: 5,
            spacing: 10,
        },
    })
    return (
        <div className="my-10">
            <h1 className="text-2xl md:text-4xl font-bold uppercase">Testimonial</h1>
            <div ref={sliderRef} className="keen-slider mt-8 ">
                <div className="keen-slider__slide number-slide1 ">
                    <div className='border flex flex-col items-center justify-center p-2 rounded-xl bg-[#1c7b93] text-white'>
                        <img className='w-28 h-28 rounded-full object-cover border hover:border-2 z-10' src={customer1} alt="" />
                        <div className='flex flex-col items-center justify-center mt-4 px-4 text-center '>
                            <div className="rating rating-sm">
                                <input type="radio" name="rating-3" className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                <input
                                    type="radio"
                                    name="rating-3"
                                    className="mask mask-star-2 bg-orange-400"
                                    defaultChecked />
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                <input
                                    type="radio"
                                    name="rating-3"
                                    className="mask mask-star-2 bg-orange-400"
                                    defaultChecked />
                            </div>
                            <h3 className='text-xl font-bold'>Sarah Johnson</h3>
                            <p className='font-semibold text-base'>10 February, 2024</p>
                            <p className="text-justify">Great service and fast delivery! I received my medicines on time, and the packaging was perfect. Highly recommended!</p>
                        </div>
                    </div>
                </div>
                <div className="keen-slider__slide number-slide2">
                    <div className='border flex flex-col items-center justify-center p-2 rounded-xl bg-[#1c7b93] text-white'>
                        <img className='w-28 h-28 rounded-full object-cover border hover:border-2 z-10' src={customer2} alt="" />
                        <div className='flex flex-col items-center justify-center mt-4 px-4 text-center flex-grow'>
                            <div className="rating rating-sm">
                                <input type="radio" name="rating-3" className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                <input
                                    type="radio"
                                    name="rating-3"
                                    className="mask mask-star-2 bg-orange-400"
                                    defaultChecked />
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                <input
                                    type="radio"
                                    name="rating-3"
                                    className="mask mask-star-2 bg-orange-400"
                                    defaultChecked />
                            </div>
                            <h3 className='text-xl font-bold'>David Smith
                            </h3>
                            <p className='font-semibold text-base'>13 March, 2015</p>
                            <p className="text-justify">Great service and fast delivery! I received my medicines on time, and the packaging was perfect. Highly recommended!</p>
                        </div>
                    </div>
                </div>
                <div className="keen-slider__slide number-slide3">
                    <div className='border flex flex-col items-center justify-center p-2 rounded-xl bg-[#1c7b93] text-white'>
                        <img className='w-28 h-28 rounded-full object-cover border hover:border-2 z-10' src={customer3} alt="" />
                        <div className='flex flex-col items-center justify-center mt-4 px-4 text-center'>
                            <div className="rating rating-sm">
                                <input type="radio" name="rating-3" className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                <input
                                    type="radio"
                                    name="rating-3"
                                    className="mask mask-star-2 bg-orange-400"
                                    defaultChecked />
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                <input
                                    type="radio"
                                    name="rating-3"
                                    className="mask mask-star-2 bg-orange-400"
                                    defaultChecked />
                            </div>
                            <h3 className='text-xl font-bold'>Emily Carter</h3>
                            <p className='font-semibold text-base'>05 March, 2015</p>
                            <p className="text-justify">Great service and fast delivery! I received my medicines on time, and the packaging was perfect. Highly recommended!</p>
                        </div>
                    </div>
                </div>
                <div className="keen-slider__slide number-slide4">
                    <div className='border flex flex-col items-center justify-center p-2 rounded-xl bg-[#1c7b93] text-white'>
                        <img className='w-28 h-28 rounded-full object-cover border hover:border-2 z-10' src={customer4} alt="" />
                        <div className='flex flex-col items-center justify-center mt-4 px-4 text-center'>
                            <div className="rating rating-sm">
                                <input type="radio" name="rating-3" className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                <input
                                    type="radio"
                                    name="rating-3"
                                    className="mask mask-star-2 bg-orange-400"
                                    defaultChecked />
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                <input
                                    type="radio"
                                    name="rating-3"
                                    className="mask mask-star-2 bg-orange-400"
                                    defaultChecked />
                            </div>
                            <h3 className='text-xl font-bold'>Mark Wilson</h3>
                            <p className='font-semibold text-base'>18 February, 2024</p>
                            <p className="text-justify">Great service and fast delivery! I received my medicines on time, and the packaging was perfect. Highly recommended!</p>
                        </div>
                    </div>
                </div>
                <div className="keen-slider__slide number-slide5">
                    <div className='border flex flex-col items-center justify-center p-2 rounded-xl bg-[#1c7b93] text-white'>
                        <img className='w-28 h-28 rounded-full object-cover border hover:border-2 z-10' src={customer5} alt="" />
                        <div className='flex flex-col items-center justify-center mt-4 px-4 text-center'>
                            <div className="rating rating-sm">
                                <input type="radio" name="rating-3" className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                <input
                                    type="radio"
                                    name="rating-3"
                                    className="mask mask-star-2 bg-orange-400"
                                    defaultChecked />
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                <input
                                    type="radio"
                                    name="rating-3"
                                    className="mask mask-star-2 bg-orange-400"
                                    defaultChecked />
                            </div>
                            <h3 className='text-xl font-bold'>Olivia Brown</h3>
                            <p className='font-semibold text-base'>2 February, 2024</p>
                            <p className="text-justify">Great service and fast delivery! I received my medicines on time, and the packaging was perfect. Highly recommended!</p>
                        </div>
                    </div>
                </div>
                <div className="keen-slider__slide number-slide6">
                    <div className='border flex flex-col items-center justify-center p-2 rounded-xl bg-[#1c7b93] text-white'>
                        <img className='w-28 h-28 rounded-full object-cover border hover:border-2 z-10' src={customer6} alt="" />
                        <div className='flex flex-col items-center justify-center mt-4 px-4 text-center'>
                            <div className="rating rating-sm">
                                <input type="radio" name="rating-3" className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                <input
                                    type="radio"
                                    name="rating-3"
                                    className="mask mask-star-2 bg-orange-400"
                                    defaultChecked />
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                <input
                                    type="radio"
                                    name="rating-3"
                                    className="mask mask-star-2 bg-orange-400"
                                    defaultChecked />
                            </div>
                            <h3 className='text-xl font-bold'>James Anderson</h3>
                            <p className='font-semibold text-base'>12 January, 2024</p>
                            <p className="text-justify">Great service and fast delivery! I received my medicines on time, and the packaging was perfect. Highly recommended!</p>
                        </div>
                    </div>
                </div>
                <div className="keen-slider__slide number-slide6">
                    <div className='border flex flex-col items-center justify-center p-2 rounded-xl bg-[#1c7b93] text-white'>
                        <img className='w-28 h-28 rounded-full object-cover border hover:border-2 z-10' src={customer7} alt="" />
                        <div className='flex flex-col items-center justify-center mt-4 px-4 text-center'>
                            <div className="rating rating-sm">
                                <input type="radio" name="rating-3" className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                <input
                                    type="radio"
                                    name="rating-3"
                                    className="mask mask-star-2 bg-orange-400"
                                    defaultChecked />
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                <input
                                    type="radio"
                                    name="rating-3"
                                    className="mask mask-star-2 bg-orange-400"
                                    defaultChecked />
                            </div>
                            <h3 className='text-xl font-bold'>Sophia Martinez</h3>
                            <p className='font-semibold text-base'>27 February, 2024</p>
                            <p className="text-justify">Great service and fast delivery! I received my medicines on time, and the packaging was perfect. Highly recommended!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default CustomerReview;