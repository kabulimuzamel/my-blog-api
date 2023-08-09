import React, { useState } from "react";
import { Container, Alert, Form, FormGroup, CloseButton, Button, Image } from "react-bootstrap";
import { Header } from "./Header";
import { Navigate } from "react-router-dom";
import { backgroundUrlStyle } from "../Style/backgroundUrlStyle";
const imgUrl = require('../Images/img3.avif')
const BodyBackground = backgroundUrlStyle(imgUrl)

export function LoginPage() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [alertMessage, setAlertMessage] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [toShowPassword, setToShowPassword] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const toShowIconUrl = 'https://img.icons8.com/?size=512&id=38869&format=png'
    const toHideIconUrl = 'https://img.icons8.com/?size=512&id=r9g0CfaDv5fz&format=png';

    const passwordIcon = {
        height: '2rem',
        width: '2rem',
        position: 'absolute',
        top: '34px',
        right: '10px',
        transition: 'transform 0.4s',
        transform: isHovered ? 'scale(1.1)' : 'scale(1)',
        cursor: isHovered ? 'pointer' : 'auto'
    }

    const showPassIconHandler = (e) => {
        e.preventDefault()
        toShowPassword ? setToShowPassword(false) : setToShowPassword(true);
    }
    
    const loginHandler = (e) => {
        e.preventDefault()
        fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userName, password })
        }).then(res => {   
            if(res.status === 200) {
                setIsLoggedIn(true);
                res.json().then((res) => {
                    localStorage.setItem('token', res.token)
                })
            } else {
                res.json().then((err) => setAlertMessage(err.error))
            }
        }).catch(err => console.log(err.message));        
    }


    if(isLoggedIn) {
        return <Navigate to='/UserPage'/>
    } else {
        return (
            <>
                <Header />
                <BodyBackground />
                <Container className='mt-5 d-flex flex-column justify-content-center align-items-center'>
                    <Alert
                        className={alertMessage ? '' : 'd-none'}
                        style={{ width: '600px' }}
                        variant='danger'>
                        <CloseButton
                            onClick={() => setAlertMessage(null)}
                            className='position-absolute end-0 me-2'
                        />
                        {alertMessage}
                    </Alert>
                    <h1 className='text-light my-3'>
                        Login if you already have an account
                    </h1>
                    <Form className='position-relative mt-5' style={{ width: '300px' }}>
                        <FormGroup>
                            <Form.Label className='text-light'>User Name</Form.Label>
                            <Form.Control
                                className='text-bg-dark'
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup className="position-relative">
                            <Form.Label className='text-light'>Password</Form.Label>
                            <Form.Control
                                className='text-bg-dark'
                                value={password}
                                type={toShowPassword ? "text" : "password"}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Image 
                                src={toShowPassword ? toHideIconUrl : toShowIconUrl } 
                                style={passwordIcon}
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                                onClick={showPassIconHandler}
                            />
                        </FormGroup>
                        <Button
                            className='position-absolute end-0 mt-3 btn-light'
                            onClick={loginHandler}
                            >
                            Log In
                        </Button>
                    </Form>
                </Container>      
            </>
        )
    }

}