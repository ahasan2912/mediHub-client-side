import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProdutsCatetory = ({ title, image, product}) => {
    return (
        <div className="">
            <Link to={`/show/${title}`}>
                <div className="rounded-lg transition-transform duration-300 hover:scale-105 border hover:border-blue-500">
                    <img className="h-48 w-full object-fill rounded-t-lg" src={image} alt="" />
                    <div className="px-3 py-5">
                        <h1 className="text-2xl font-semibold">{title.charAt(0).toUpperCase() + title.slice(1)}</h1>
                        <h3 className="text-xl font-semibold">Total Product: {product.length}</h3>
                    </div>
                </div>
            </Link>
        </div>
    );
};
ProdutsCatetory.propTypes = {
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    product: PropTypes.array.isRequired,
}
export default ProdutsCatetory;