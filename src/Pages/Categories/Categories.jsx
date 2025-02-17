import { useEffect, useState } from "react";
import image4 from "../../../src/assets/categories/baby care.webp";
import image3 from "../../../src/assets/categories/injetion.webp";
import image1 from "../../../src/assets/categories/otc.avif";
import image2 from "../../../src/assets/categories/syrup.webp";
import image5 from "../../../src/assets/categories/wonen's choices.webp";
import useProducts from "../../Hook/useProducts";
import DiscountCart from "./DiscountCart";
import DiscountCategoris from "./DiscountCategoris";
import MarqueeCart from "./MarqueeCart";
import ProdutsCatetory from "./ProdutsCatetory";

const Categories = () => {
    const [products] = useProducts();
    const dessert = products.filter(item => item.category === 'dessert');
    const offered = products.filter(item => item.category === 'offered');
    const pizza = products.filter(item => item.category === 'pizza');
    const salad = products.filter(item => item.category === 'salad');
    const soup = products.filter(item => item.category === 'soup');
    const drinks = products.filter(item => item.category === 'drinks');

    // digital clock
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString([]));
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString([]));
        }, 1000);

        return () => clearInterval(intervalId)
    }, [])

    return (
        <div className="mt-10 lg:mt-20">
            <h1 className="text-2xl md:text-4xl font-bold uppercase">All Product Category</h1>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 my-7 sm:my-8">
                <ProdutsCatetory title={'dessert'} image={image1} product={dessert}></ProdutsCatetory>
                <ProdutsCatetory title={'pizza'} image={image2} product={pizza}></ProdutsCatetory>
                <ProdutsCatetory title={'salad'} image={image3} product={salad}></ProdutsCatetory>
                <ProdutsCatetory title={'soup'} image={image4} product={soup}></ProdutsCatetory>
                <ProdutsCatetory title={'drinks'} image={image5} product={drinks}></ProdutsCatetory>
                <ProdutsCatetory title={'offered'} image={image5} product={offered}></ProdutsCatetory>
            </div>
            <div className="bg-[#25A8D6] px-8 py-16 sm:px-16 rounded">
                <div className="text-center w-full md:w-[70%] lg:w-3/5 mx-auto px-5 sm:px-12 py-12 bg-white rounded-md">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">{currentTime}</h1>
                </div>
            </div>
            <MarqueeCart></MarqueeCart>
            <div className="hidden lg:block">
                <DiscountCategoris></DiscountCategoris>
            </div>
            <div className="block lg:hidden">
                <DiscountCart></DiscountCart>
            </div>
        </div>
    )
};


export default Categories;

