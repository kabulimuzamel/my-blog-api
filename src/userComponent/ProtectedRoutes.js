import React, {useState, useEffect, useTransition} from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Spinner } from "react-bootstrap";

export function ProtectedRoutes() {
    const [token, setToken] = useState(undefined);
    const [pending, startTransition] = useTransition();
    
    const spinnerStyle = {
        position: 'absolute',
        top: '10rem',
        right: '43rem',
        height: '3rem',
        width: '3rem'
    }

    useEffect(() => {
        setTimeout(() => {        
            startTransition(() => {
                if(localStorage.getItem('token')) {
                    fetch(`http://localhost:3000/api/user/${localStorage.getItem('token')}`)
                        .then(res => {
                            if(res.status === 200) {
                                setToken(localStorage.getItem('token'));
                            } else {
                                setToken(false);
                            }
                        })
                } else {
                    setToken(false)
                } 
            })
        }, 1000);
    }, []);
    
    if(token === undefined) {
        return (
            <div className="position-relative">
                <Spinner style={spinnerStyle} animation="border" variant="light" />
            </div>
        )
    }
    if(!token) {
        return <Navigate to="/LoginPage" />
    }
    if(token) {
        return <Outlet/>
    }
}