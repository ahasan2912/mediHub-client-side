import PropTypes from "prop-types";

const MedicineCard = ({item}) => {
    const {_id, name, category, company, description, image, price, quantity, seller } = item || {};
    return (
        <div>
            <div className="card bg-white shadow-lg rounded-lg border relative p-4">
                {/* Product Image */}
                <figure className="p-4">
                    <img
                        src={image}
                        alt="Thermometer"
                        className="rounded-lg w-full h-40 object-cover"
                    />
                </figure>

                <div className="card-body p-4">
                    <h2 className="card-title text-lg font-bold">
                      {name}
                    </h2>
                    <p className="text-gray-500 text-base">{company}</p>

                    {/* Price Section */}
                    <div className="flex items-center space-x-2 mt-2">
                        <span className="text-xl font-bold text-[#00588B]">${price}.00</span>
                    </div>

                    {/* Add to Cart Button */}
                    <div className="card-actions mt-4">
                        <button className="btn bg-[#25A8D6] hover:bg-[#5dc0e4] text-white w-full text-base">Add to cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
MedicineCard.propTypes = {
    item: PropTypes.object.isRequired,
}
export default MedicineCard;