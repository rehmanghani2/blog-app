import { Navigate } from "react-router-dom";
// import { useAuth } from "../hooks/useAuth.js";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";


const  ProtectRoute = ({children}) => {
    const { user } = useContext(AuthContext);
    if(!user) {
         return <Navigate to="/login" replace />
    }
   return children;
}

export default ProtectRoute;