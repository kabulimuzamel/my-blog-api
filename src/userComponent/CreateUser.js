import React, { useState } from "react";
import { Button, Container, Form, FormGroup, Alert, CloseButton, Image } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { submitFormAccount } from "../Functions/apiCallFunctions";
const { toShowIconUrl, toHideIconUrl, passwordIconStyle, showPassIconHandler } = require('../Style/passwordHandler');

export function CreateUser() {
    const [name, setName] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [isAccountCreated, setIsAccountCreated] = useState(false);
    const [alertMessage, setAlertMessage] = useState(null);
    const [toShowPassword, setToShowPassword] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    if(isAccountCreated) {
        return <Navigate to='/UserPage' />
    }

    return (
        <Container className='mt-2 d-flex flex-column justify-content-center align-items-center'>
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
            <h1 className='text-light my-3 my-5'>
                Register as a User to enjoy our blog
            </h1>
            <Form className='position-relative' style={{ width: '300px' }}>
                <FormGroup>
                    <Form.Label className='text-light'>Name</Form.Label>
                    <Form.Control
                        className='text-bg-dark'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </FormGroup>
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
                        onChange={(e) => setPassword(e.target.value)}
                        type={toShowPassword ? 'text' : 'password'}
                    />
                    <Image
                        src={toShowPassword ? toHideIconUrl : toShowIconUrl}
                        style={passwordIconStyle(isHovered)}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onClick={(event) =>
                            showPassIconHandler(event, toShowPassword, setToShowPassword)
                        }
                    />
                </FormGroup>
                <Button
                    className='position-absolute end-0 mt-3 btn-light'
                    onClick={(event) =>
                        submitFormAccount(
                            event,
                            name,
                            userName,
                            password,
                            setIsAccountCreated,
                            setAlertMessage
                        )
                    }>
                    Register
                </Button>
            </Form>
        </Container>
    )
}