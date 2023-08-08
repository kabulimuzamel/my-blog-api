import React, { useState } from "react";
import { Button, Container, Form, FormGroup, Alert, CloseButton, Image } from "react-bootstrap";
import { Navigate } from "react-router-dom";

export function CreateUser() {
    const [name, setName] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [isAccountCreated, setIsAccountCreated] = useState(false);
    const [alertMessage, setAlertMessage] = useState(null);
    const [toShowPassword, setToShowPassword] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const toShowIconUrl = 'https://img.icons8.com/?size=512&id=13758&format=png';
    const toHideIconUrl = 'https://img.icons8.com/?size=512&id=14744&format=png';

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
        toShowPassword ? setToShowPassword(false) : setToShowPassword(true)
    }

    const submitForm = (e) => {
        e.preventDefault();
        fetch('http://localhost:3000/api/user', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, userName, password })
        }) 
            .then(res => {
                if(res.status === 200) {
                    res.json().then(data => {
                        localStorage.setItem('token', data.token);
                        setIsAccountCreated(true);
                    })
                } else {
                    res.json().then((data) => {
                        setAlertMessage(data.error); 
                    });
                }
            })
            .catch(err => console.log(err.message));
    }

    if(isAccountCreated) {
        return <Navigate to='/UserPage' />
    }

    return (
        <Container className="mt-2 d-flex flex-column justify-content-center align-items-center">
            <Alert className={alertMessage? "" : 'd-none'} style={{width: '600px'}} variant="danger">
                <CloseButton onClick={() => setAlertMessage(null)} className="position-absolute end-0 me-2" />
                {alertMessage}
            </Alert>
            <h1 className="text-light my-3 my-5">Register as a User to enjoy our blog</h1>
            <Form className="position-relative" style={{width: '300px'}}>
                <FormGroup>
                    <Form.Label className="text-light">Name</Form.Label>
                    <Form.Control className="text-bg-dark" value={name} onChange={(e) => setName(e.target.value)}/>                    
                </FormGroup>
                <FormGroup>
                    <Form.Label className="text-light">User Name</Form.Label>
                    <Form.Control className="text-bg-dark" value={userName} onChange={(e) => setUserName(e.target.value)}/>
                </FormGroup>
                <FormGroup className="position-relative">
                    <Form.Label className="text-light">Password</Form.Label>
                    <Form.Control 
                        className="text-bg-dark" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        type={toShowPassword ? "text" : "password"}

                    />
                    <Image 
                        src={toShowPassword ? toHideIconUrl : toShowIconUrl } 
                        style={passwordIcon}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onClick={showPassIconHandler}
                    />  
                </FormGroup>
                <Button className="position-absolute end-0 mt-3 btn-light" onClick={submitForm}>Register</Button>
            </Form>
        </Container>
    )
}