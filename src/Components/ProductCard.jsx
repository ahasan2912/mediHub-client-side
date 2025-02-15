import PropTypes from "prop-types";

const ProductCard = ({ product }) => {
    const { discountPercentage, name, category, company, price, image } = product || {};
    return (
        <div>
            <div className="relative shadow-lg rounded-lg p-4 transition-transform duration-300 hover:scale-105 border hover:border-blue-500">
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-lg">
                    {discountPercentage}<span className="font-bold">%</span>
                </span>
                {/* Product Image */}
                <img
                    className="w-full h-32 object-fill rounded-lg"
                    src={image}
                    alt="GlucoLeader Enhance Red Meter"
                />

                {/* Product Info */}
                <h2 className="mt-3 text-lg font-semibold">
                    {name}
                    <span className="text-xs text-gray-500">FDA 510 k</span>
                </h2>

                <p className="text-blue-500 text-sm font-semibold">
                    {category}
                </p>

                <p className="text-gray-600 text-sm">{company}</p>

                {/* Pricing */}
                <div className="mt-2 flex items-center space-x-2">
                    <span className="text-xl font-bold t">${price}</span>
                    <span className="text-gray-500 line-through text-sm">$1156.00</span>
                </div>
            </div>
        </div>
    );
};
ProductCard.propTypes = {
    product: PropTypes.object.isRequired,
}
export default ProductCard;