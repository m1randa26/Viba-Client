import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {

    const token = localStorage.getItem("token");
    const role = +localStorage.getItem("role");

    if (token && role) {
        return <Navigate to="/dashboard" />
    }

    return <Outlet />
}

export default PublicRoute