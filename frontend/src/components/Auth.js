import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function Auth({ children }) {
    const isLoggedIn = useSelector((state) => state.user || {});
        if(isLoggedIn) {
        return children;
        } else {
        return <Navigate to="/view-cart"/>;
        }
}
