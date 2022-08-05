import { Navigate } from "react-router-dom";
import { useAuth } from "../Contexts/authContext";
import { Spinner } from "react-bootstrap";

export function ProtectedRoute({children}) {
    const {user, loading} = useAuth();

    if(loading) return <h1><Spinner animation="border" variant="info" /></h1>;

    if(!user) return <Navigate to="/login"/>;

    return <>{children}</>;
}