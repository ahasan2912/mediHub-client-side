import useProducts from "../../Hook/useProducts";
import ShopCard from "./ShopCard";

const Shop = () => {
    const [produts] = useProducts();
    return (
        <div className="md:w-[90%] px-5 mx-auto my-24">
            <h1 className="text-4xl font-bold text-center">All Products Here</h1>
            <div className="grid grid-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mt-10">
                {
                    produts.map((produt, idx) => <ShopCard key={idx} produt={produt}></ShopCard>)
                }
            </div>
        </div>
    );
};

export default Shop;