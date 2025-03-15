import PropTypes from "prop-types";

const DetailsModal = ({ item, closeModal }) => {
    const { name, image, category, company, description, price, quantity, seller } = item || {};
    return (
        <dialog open id="my_modal_4" className="modal">
            <div className="modal-box w-11/12 max-w-5xl border">
                <div className="flex justify-center p-2">
                    <img className="rounded-xl h-60" src={image} alt="" />
                </div>
                <div>
                    <div className="space-y-1">
                        <h1 className="font-semibold text-lg ">Name: {name}</h1>
                        <p className="text-lg font-semibold">Category: <span className="bg-gray-300 px-2 py-[3px] rounded-md">{category}</span></p>
                        <p className="text-lg font-semibold">Company: {company}</p>
                        <div className="flex items-center gap-4 mt-2">
                            <p className="text-lg font-semibold">Seller: {seller?.name}</p>
                            <img className="w-12 h-12 rounded-full" src={seller?.image} alt="" />
                        </div>
                        <p className="text-lg font-semibold">Quantity: {quantity}</p>
                        <h1 className="text-lg font-semibold ">Price: ${price}</h1>
                        <p><span className="font-bold text-base">Description:</span> {description}</p>
                    </div>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button onClick={closeModal}></button>
            </form>
        </dialog>
    );
};
DetailsModal.propTypes = {
    item: PropTypes.object.isRequired,
    closeModal: PropTypes.func.isRequired,
}
export default DetailsModal;