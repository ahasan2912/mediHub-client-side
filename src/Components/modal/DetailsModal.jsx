import PropTypes from "prop-types";

const DetailsModal = ({ item, closeModal }) => {
    const { name, image, category, company, description, price, quantity } = item || {};
    return (
        <dialog open id="my_modal_4" className="modal">
            <div className="modal-box w-11/12 max-w-5xl border">
                <div className="flex justify-center p-2">
                    <img className="rounded-xl h-60" src={image} alt="" />
                </div>
                <div>
                    <div className="">
                        <h1 className="font-semibold text-lg">Name: {name}</h1>
                        <h1 className="text-lg font-semibold ">Price: ${price}</h1>
                        <p className="text-lg font-semibold">Category: {category}</p>
                        <p className="text-lg font-semibold">Company: {company}</p>
                        <p className="text-lg font-semibold">Quantity: {quantity}</p>
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