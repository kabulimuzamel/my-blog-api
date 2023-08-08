import React, { useState } from "react";
import { Container, Alert, Form, FormGroup, CloseButton, Button } from "react-bootstrap";
import { Header } from "./Header";
import { Navigate } from "react-router-dom";


export function LoginPage() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [alertMessage, setAlertMessage] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

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
                        <FormGroup>
                            <Form.Label className='text-light'>Password</Form.Label>
                            <Form.Control
                                className='text-bg-dark'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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