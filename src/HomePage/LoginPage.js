import React, { useState } from "react";
import { loginHandler } from "../Functions/apiCallFunctions";
import { Container, Alert, Form, FormGroup, CloseButton, Button, Image } from "react-bootstrap";
import { Header } from "./Header";
import { Navigate } from "react-router-dom";
import { backgroundUrlStyle } from "../Style/backgroundUrlStyle";
const { toShowIconUrl, toHideIconUrl, passwordIconStyle, showPassIconHandler } = require('../Style/passwordHandler');

const imgUrl = require('../Images/img3.avif')
const BodyBackground = backgroundUrlStyle(imgUrl)

export function LoginPage() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [alertMessage, setAlertMessage] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [toShowPassword, setToShowPassword] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

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
                    <Form
                        className='position-relative mt-5'
                        style={{ width: '300px' }}>
                        <FormGroup>
                            <Form.Label className='text-light'>User Name</Form.Label>
                            <Form.Control
                                className='text-bg-dark'
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup className='position-relative'>
                            <Form.Label className='text-light'>Password</Form.Label>
                            <Form.Control
                                className='text-bg-dark'
                                value={password}
                                type={toShowPassword ? 'text' : 'password'}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Image
                                src={toShowPassword ? toHideIconUrl : toShowIconUrl}
                                style={passwordIconStyle(isHovered)}
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                                onClick={(event) => showPassIconHandler(event, toShowPassword, setToShowPassword)}
                            />
                        </FormGroup>
                        <Button
                            className='position-absolute end-0 mt-3 btn-light'
                            onClick={(event) =>
                                loginHandler(
                                    event,
                                    userName,
                                    password,
                                    setIsLoggedIn,
                                    setAlertMessage
                                )
                            }>
                            Log In
                        </Button>
                    </Form>
                </Container>
            </>
        )
    }

}