import React, { useState, useEffect } from "react";
import { Container, Alert, CloseButton, Form, FormGroup, Button, Modal, Image } from "react-bootstrap";
import { UserHeader } from "../bodyComponent/UserHeader";
import { Navigate } from "react-router-dom";
import { backgroundUrlStyle } from '../Style/backgroundUrlStyle';
import { updateInfoHandler, deleteInfoHandler } from "../Functions/apiCallFunctions";
const { toShowIconUrl, toHideIconUrl, passwordIconStyle, showPassIconHandler } = require('../Style/passwordHandler');

const imgUrl = require('../Images/creating.avif')
const BodyBackground = backgroundUrlStyle(imgUrl)

export function MyAccount() {
    const [name, setName] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [alertMessage, setAlertMessage] = useState(null);
    const [alertMessageVariant, setAlertMessageVariant] = useState(null);
    const [isDeleted, setIsDeleted] = useState(false);
    const [show, setShow] = useState(false);
    const [toShowPassword, setToShowPassword] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if(!token) {
            setToken(localStorage.getItem('token'));
        }
        if(token) {
            fetch(`http://localhost:3000/api/user/${token}`)
                .then(res => res.json())
                .then(res => {
                    setName(res.name);
                    setUserName(res.userName)
                    setPassword(res.password);
                })
                .catch(err => console.log(err));
        }
    }, [token]);

    if(isDeleted) {
        return <Navigate to="/LoginPage" />
    };

    return (
        <>
            <BodyBackground />
            <Modal show={show}>
                <Modal.Header>
                    <CloseButton onClick={() => setShow(false)} />
                </Modal.Header>
                <Modal.Body>
                    <Modal.Title>
                        Are you sure you wanna delete you account?
                    </Modal.Title>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        className='btn-sm'
                        variant='primary'
                        onClick={(event) =>
                            deleteInfoHandler(
                                event,
                                token,
                                setAlertMessageVariant,
                                setAlertMessage,
                                setIsDeleted
                            )
                        }>
                        Yes
                    </Button>
                    <Button
                        className='btn-sm'
                        variant='danger'
                        onClick={() => setShow(false)}>
                        No
                    </Button>
                </Modal.Footer>
            </Modal>
            <UserHeader />
            <Container className='mt-2 d-flex flex-column justify-content-center align-items-center'>
                <Alert
                    className={alertMessage ? '' : 'd-none'}
                    style={{ width: '600px' }}
                    variant={alertMessageVariant}>
                    <CloseButton
                        onClick={() => setAlertMessage(null)}
                        className='position-absolute end-0 me-2'
                    />
                    {alertMessage}
                </Alert>
                <h1 className='text-light my-3 my-5'>
                    Wanna update your account Info...
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
                    <div className='d-flex flex-column justify-content-center align-items-center'>
                        <Button
                            className='mt-3 btn-light btn-sm'
                            onClick={(event) =>
                                updateInfoHandler(
                                    event,
                                    name,
                                    userName,
                                    password,
                                    setAlertMessageVariant,
                                    setAlertMessage,
                                    token
                                )
                            }>
                            Update my account info
                        </Button>
                        <Button
                            className='mt-3 btn-danger btn-sm'
                            onClick={() => setShow(true)}>
                            Delete my account
                        </Button>
                    </div>
                </Form>
            </Container>
        </>
    )
}
