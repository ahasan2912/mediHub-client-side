import { useEffect, useState } from "react";
import otc from "../../../src/assets/categories/otc.avif";
import syrupImg from "../../../src/assets/categories/syrup.webp";
import injectionImg from "../../../src/assets/categories/injetion.webp";
import baby from "../../../src/assets/categories/baby care.webp";
import women from "../../../src/assets/categories/wonen's choices.webp";
import harbal from "../../../src/assets/categories/Harbal Medicine.webp";
import skin from "../../../src/assets/categories/Skin care.webp";
import dental from "../../../src/assets/categories/dantalcare.webp";
import diaper from "../../../src/assets/categories/diaper.avif";
import daibetic from "../../../src/assets/categories/duabetic.avif";
import useProducts from "../../Hook/useProducts";
import DiscountCart from "./DiscountCart";
import DiscountCategoris from "./DiscountCategoris";
import MarqueeCart from "./MarqueeCart";
import ProdutsCatetory from "./ProdutsCatetory";
import LoadingSpinner from "../../Components/LoadingSpinner";

const Categories = () => {
    const [products, loading] = useProducts();
    const baby_Care = products.filter(item => item.category === 'Baby Care');
    const dental_Care = products.filter(item => item.category === 'Dental Care');
    const diabetic_Care = products.filter(item => item.category === 'Diabetic Care');
    const diapers = products.filter(item => item.category === 'Diapers');
    const harbal_Medicine = products.filter(item => item.category === 'Harbal Medicine');
    const injection = products.filter(item => item.category === 'Injection');
    const oTC = products.filter(item => item.category === 'OTC');
    const skin_Care = products.filter(item => item.category === 'Skin Care');
    const syrup = products.filter(item => item.category === 'Syrup');
    const women_Choice = products.filter(item => item.category === "Women's Choice");

    // digital clock
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString([]));
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString([]));
        }, 1000);

        return () => clearInterval(intervalId)
    }, []);
    if (loading) {
        return <LoadingSpinner></LoadingSpinner>
    }
    return (
        <div className="mt-10 lg:mt-20">
            <h1 className="text-2xl md:text-4xl font-bold uppercase">All Product Category</h1>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 my-7 sm:my-8">
                <ProdutsCatetory title={'OTC'} image={otc} product={oTC}></ProdutsCatetory>
                <ProdutsCatetory title={'Baby Care'} image={baby} product={baby_Care}></ProdutsCatetory>
                <ProdutsCatetory title={'Dental Care'} image={dental} product={dental_Care}></ProdutsCatetory>
                <ProdutsCatetory title={"Women's Choice"} image={women} product={women_Choice}></ProdutsCatetory>
                <ProdutsCatetory title={'Diabetic Care'} image={daibetic} product={diabetic_Care}></ProdutsCatetory>
                <ProdutsCatetory title={'Diapers'} image={diaper} product={diapers}></ProdutsCatetory>
                <ProdutsCatetory title={'Harbal Medicine'} image={harbal} product={harbal_Medicine}></ProdutsCatetory>
                <ProdutsCatetory title={'Injection'} image={injectionImg} product={injection}></ProdutsCatetory>
                <ProdutsCatetory title={'Skin Care'} image={skin} product={skin_Care}></ProdutsCatetory>
                <ProdutsCatetory title={'Syrup'} image={syrupImg} product={syrup}></ProdutsCatetory>
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

