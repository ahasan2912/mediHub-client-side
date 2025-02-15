import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProdutsCatetory = ({ title, image }) => {
    return (
        <div>
            <Link to={`/show/${title}`}>
                <div className="bg-[#38ADA9] px-3 py-5 rounded-lg transition-transform duration-300 hover:scale-105 flex items-center hover:border hover:border-red-500">
                    <div className="flex justify-center items-center px-10 gap-2">
                        <img className="w-14" src={image} alt="" />
                        <h1 className="text-2xl font-semibold uppercase">{title}</h1>
                    </div>
                </div>
            </Link>
        </div>
    );
};
ProdutsCatetory.propTypes = {
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
}
export default ProdutsCatetory;