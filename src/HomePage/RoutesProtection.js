import React from "react";
import { Outlet, Navigate } from "react-router-dom";

export function RoutesProtection({ isLoggedIn }) {
    if(!isLoggedIn) {
        return <Navigate to='/HomePage/LoginPage' />
    }
    return (
        <Outlet/>
    )
}