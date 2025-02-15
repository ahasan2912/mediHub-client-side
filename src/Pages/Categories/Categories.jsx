import useProducts from "../../Hook/useProducts";
import MarqueeCart from "./MarqueeCart";
import ProdutsCatetory from "./ProdutsCatetory";
import image1 from "../../../src/assets/categories/Diabetics-Care.webp"
import image2 from "../../../src/assets/categories/Personal-Care.webp"
import image3 from "../../../src/assets/categories/baby-boy.webp"
import image4 from "../../../src/assets/categories/contraceptive.webp"
import image5 from "../../../src/assets/categories/diaper.webp"
import DiscountCategoris from "./DiscountCategoris";

const Categories = () => {
    const [products] = useProducts();
    const dessert = products.filter(item => item.category === 'dessert');
    const offered = products.filter(item => item.category === 'offered');
    const pizza = products.filter(item => item.category === 'pizza');
    const salad = products.filter(item => item.category === 'salad');
    const soup = products.filter(item => item.category === 'soup');
    const drinks = products.filter(item => item.category === 'drinks');
    return (
        <div className="">
            <h1 className="text-4xl font-bold text-center">Product Categories</h1>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5 my-10">
                <ProdutsCatetory title={'offered'} image={image1} product={offered}></ProdutsCatetory>
                <ProdutsCatetory title={'dessert'} image={image2} product={dessert}></ProdutsCatetory>
                <ProdutsCatetory title={'pizza'} image={image3} product={pizza}></ProdutsCatetory>
                <ProdutsCatetory title={'salad'} image={image4} product={salad}></ProdutsCatetory>
                <ProdutsCatetory title={'soup'} image={image5} product={soup}></ProdutsCatetory>
                <ProdutsCatetory title={'drinks'} image={image5} product={drinks}></ProdutsCatetory>
            </div>
            <MarqueeCart></MarqueeCart>
            <DiscountCategoris></DiscountCategoris>
        </div>
    )
};


export default Categories;

