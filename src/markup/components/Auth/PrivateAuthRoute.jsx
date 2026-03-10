// Import React, the useState and useEffect hooks 
import React, { useState, useEffect } from "react";
// Import the Route and Navigate components  
import { Navigate } from "react-router";
// Import the useAuth hook from AuthContext
import { useAuth } from '../../../Context/AuthContext';

const PrivateAuthRoute = ({ roles, children }) => {
    const [isChecked, setIsChecked] = useState(false);
    const { isLogged, isAdmin, isManager } = useAuth();

    useEffect(() => {
        // Check if user is logged in and has the required role
        const auth = JSON.parse(localStorage.getItem("auth"));
        if (auth && auth.admin_token) {
            const userRole = auth.role_id;
            const hasRole = roles ? roles.includes(userRole) : true; // If no roles specified, allow any logged-in user
            setIsAuthorized(hasRole);
        } else {
            setIsAuthorized(false);
        }
        setIsChecked(true);
    }, [isLogged, roles]);

    if (!isChecked) {
        return <div>Loading...</div>; // Or a proper loading component
    }

    if (!isLogged || !isAuthorized) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default PrivateAuthRoute;