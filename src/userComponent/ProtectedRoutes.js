import React, {useState, useEffect} from "react";
import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoutes() {
    const [token, setToken] = useState(undefined);
    useEffect(() => {
        setTimeout(() => {
            if(localStorage.getItem('token')) {
                fetch(`http://localhost:3000/api/user/${localStorage.getItem('token')}`)
                    .then(res => {
                        if(res.status === 200) {
                            setToken(localStorage.getItem('token'));
                        } else {
                            setToken(false)
                        }
                    })
            } 
            }, 1000)
    }, []);

    if(token === undefined) {
        return null;
    }
    if(!token) {
        return <Navigate to="/LoginPage" />
    }
    if(token) {
        return <Outlet/>
    }
}