import React, {useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { backgroundUrlStyle } from '../Style/backgroundUrlStyle';
import { userIdentifier } from "../Functions/apiCallFunctions";
const imgUrl = require('../Images/img.avif');
const BodyBackground = backgroundUrlStyle(imgUrl)

export function ProtectedRoutes() {
    const [token, setToken] = useState(undefined);
    
    const spinnerStyle = {
        position: 'absolute',
        top: '10rem',
        right: '43rem',
        height: '3rem',
        width: '3rem'
    }

    useEffect(() => {
        userIdentifier(setToken);
    }, []);
    
    if(token === undefined) {
        return (
            <div className="position-relative">
                <BodyBackground />
                <Spinner style={spinnerStyle} animation="border" variant="light" />
            </div>
        )
    }
    if(!token) {
        return (
            <>
                <BodyBackground />
                <Navigate to="/LoginPage" />
            </>
        )
    }
    if(token) {
        return <Outlet/>
    }
}