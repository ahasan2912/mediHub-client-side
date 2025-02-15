import { useEffect, useState } from "react";
import ProductCard from "../../Components/ProductCard";

const DiscountCart = () => {
    const [products, setProducts] = useState([]);
    useEffect(()=> {
        fetch('discounts.json')
        .then(res => res.json())
        .then(data => setProducts(data))
    }, [])
    return (
        <div className="mb-10">
            <h1 className="text-2xl md:text-4xl font-bold uppercase">Discount Products</h1>
            <div className="grid sm:grid-cols-2 gap-10 mt-5">
                {
                    products.map((product, idx) => <ProductCard key={idx} product={product}></ProductCard>)
                }
            </div>
        </div>
    );
};

export default DiscountCart;