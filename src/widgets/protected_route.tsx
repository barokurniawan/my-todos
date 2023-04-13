import React from "react";
import { Navigate } from "react-router-dom";
import { isLogedIn } from "../persisntace/session";

const ProtectedRoute = (props: { children: any }) => {
    if (!isLogedIn()) {
        return <Navigate to="/login" replace />;
    }

    return props.children;
};

export default ProtectedRoute;