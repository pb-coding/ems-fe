import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "./AuthContext";

const ProtectedRoute = ({ children, access }: any) => {
    const { user } = useContext(AuthContext);

    if (access === "isAnonymous" && !user) {
        return children
    }
    else if (access === "isAuthenticated" && user) {
        return children
    }

    return <Navigate to="/login" />
}
export default ProtectedRoute;