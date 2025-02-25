import { Navigate } from "react-router-dom";
import LoadingSpinner from "../Components/LoadingSpinner";
import useRole from "../Hook/useRole";
import PropTypes from "prop-types";

const SellerRoute = ({ children }) => {
    const [role, isLoading] = useRole();
    if(isLoading){
        return <LoadingSpinner></LoadingSpinner>
    }
    if(role === 'Seller'){
        return children;
    }
    return <Navigate to='/dashboard' replace='true'></Navigate>
};
SellerRoute.propTypes = {
    children: PropTypes.element.isRequired
  }
export default SellerRoute;