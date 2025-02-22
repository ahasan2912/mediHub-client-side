import PropTypes from "prop-types";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";

const BannerCard = ({ banner, refetch }) => {
    const { _id, image, admin } = banner || {};
    const axiosSecure = useAxiosSecure();
    const handleDeleteBtn = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/banner/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Banner has been deleted.",
                                icon: "success"
                            });
                            refetch();
                        }
                    })
            }
        });
    }
    return (
        <div className="border p-2 rounded-md">
            <div>
                <img className="w-full h-32 rounded-md" src={image} alt="" />
            </div>
            <div className="flex items-center justify-between mt-3 p-1">
                <div className="flex items-center gap-5">
                    <h1 className="text-xl font-semibold">Owner: {admin?.name}</h1>
                </div>
                <button onClick={() => handleDeleteBtn(_id)} className="btn btn-sm bg-[#52d2f5] hover:bg-[#c8e5ed]"><MdDelete className='text-2xl text-[#3b3b3b]' size={22} /></button>
            </div>
        </div>
    );
};
BannerCard.propTypes = {
    banner: PropTypes.object.isRequired,
    refetch: PropTypes.func.isRequired,
}
export default BannerCard;