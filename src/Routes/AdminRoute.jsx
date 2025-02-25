import { Navigate } from "react-router-dom";
import LoadingSpinner from "../Components/LoadingSpinner";
import useRole from "../Hook/useRole";
import PropTypes from "prop-types";

const AdminRoute = ({ children }) => {
    const [role, isLoading] = useRole();
    if(isLoading){
        return <LoadingSpinner></LoadingSpinner>
    }
    if(role === 'Admin'){
        return children;
    }
    return <Navigate to='/dashboard' replace='true'></Navigate>
};
AdminRoute.propTypes = {
    children: PropTypes.element.isRequired
  }
export default AdminRoute;