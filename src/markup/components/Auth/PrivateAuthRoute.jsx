// Import React, the useState and useEffect hooks 
import React, { useState, useEffect } from "react";
// Import the Navigate component  
import { Navigate } from "react-router-dom";
// Import the useAuth hook from AuthContext
import { useAuth } from '../../../Context/AuthContext';

const PrivateAuthRoute = ({ roles, children }) => {
    const [isChecked, setIsChecked] = useState(false);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const { auth, isLogged } = useAuth();

    useEffect(() => {
        // Determine whether the current user has the required role
        const userRole = auth?.role_id;
        const hasRequiredRole = roles ? roles.includes(userRole) : true;

        setIsAuthorized(isLogged && Boolean(userRole) && hasRequiredRole);
        setIsChecked(true);
    }, [auth, isLogged, roles]);

    if (!isChecked) {
        return <div>Loading...</div>; // Or a proper loading component
    }

    if (!isLogged || !isAuthorized) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default PrivateAuthRoute;