import { useContext } from "react";
import { AuthContext } from "./Provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

import PropTypes from "prop-types";
import LoadingSpinner from "../Components/LoadingSpinner";

const PrivetRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    if (loading) {
        return <LoadingSpinner></LoadingSpinner>
    }
    if(user){
        return children;
    }
    return <Navigate to="/login" state={{from:location}} replace></Navigate>
};
PrivetRoute.propTypes = {
    children: PropTypes.array.isRequired,
}

export default PrivetRoute;