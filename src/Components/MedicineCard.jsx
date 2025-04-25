import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const MedicineCard = ({ item }) => {
    const { _id, name, company, image, price, quantity } = item || {};
    return (
        <Link to={`/medicineDetails/${_id}`} className="flex flex-col bg-white rounded-lg shadow-md p-4 h-full border group">
            <img
                src={image}
                alt="Thermometer"
                className="rounded-lg w-full h-40 object-cover group-hover:scale-110 transition"
            />
            <div className="flex-grow py-2">
                <h2 className="text-base font-bold">{name}</h2>
                <p className="text-gray-500 text-base">{company}</p>
                <p className="text-xl font-bold text-[#00588B]">${price}.00</p>
                <p className="text-base font-semibold text-[#00828b]">In Stock {quantity}</p>
            </div>
            <button
                className="btn bg-[#25A8D6] hover:bg-[#5dc0e4] text-white text-base w-full">
                Add to cart
            </button>
        </Link>
    );
};
MedicineCard.propTypes = {
    item: PropTypes.object.isRequired,
}
export default MedicineCard;
