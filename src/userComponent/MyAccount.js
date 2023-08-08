import React, { useState, useEffect } from "react";
import { Container, Alert, CloseButton, Form, FormGroup, Button, Modal } from "react-bootstrap";
import { UserHeader } from "../bodyComponent/UserHeader";
import { Navigate } from "react-router-dom";

export function MyAccount() {
    const [name, setName] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [alertMessage, setAlertMessage] = useState(null);
    const [alertMessageVariant, setAlertMessageVariant] = useState(null);
    const [isDeleted, setIsDeleted] = useState(false);
    const [show, setShow] = useState(false);

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

    const updateInfoHandler = (e) => {
        e.preventDefault();
        if(!name || !userName || !password) {
            setAlertMessageVariant('danger');
            setAlertMessage('You cannot leave name, username, and password blank');
            return;
        }
        
        fetch(`http://localhost:3000/api/user/${token}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, userName, password })
        })
            .then(res => {
                if(res.status === 200) {
                    setAlertMessageVariant('success');
                    setAlertMessage('Updated Successfully');
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000)
                } else {
                    res.json(res => {
                        setAlertMessageVariant('danger');
                        setAlertMessage(res.error);
                    })
                }
            });
    };

    const deleteInfoHandler = (e) => {
        e.preventDefault();
        fetch(`http://localhost:3000/api/user/${token}`, {
            method: 'DELETE',
        })
            .then(res => {
                if(res.status === 200) {
                    setAlertMessageVariant('success')
                    setAlertMessage('Your account was deleted successfully with all the posts you had published');
                    setTimeout(() => {
                        setIsDeleted(true);
                    }, 1000)
                }
            });
    };

    if(isDeleted) {
        return <Navigate to="/LoginPage" />
    };

    return (
        <>
            <Modal show={show}>
                <Modal.Header>
                    <CloseButton onClick={() => setShow(false)}/>
                </Modal.Header>
                <Modal.Body>
                    <Modal.Title>Are you sure you wanna delete you account?</Modal.Title>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn-sm" variant="primary" onClick={deleteInfoHandler}>
                        Yes
                    </Button>
                    <Button className="btn-sm" variant="danger" onClick={() => setShow(false)}>
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
                    <FormGroup>
                        <Form.Label className='text-light'>Password</Form.Label>
                        <Form.Control
                            className='text-bg-dark'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </FormGroup>
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <Button className='mt-3 btn-light btn-sm'
                            onClick={updateInfoHandler}
                        >
                            Update my account info
                        </Button>
                        <Button className='mt-3 btn-danger btn-sm'
                            onClick={() => setShow(true)}
                        >
                            Delete my account
                        </Button>
                    </div>
                </Form>
            </Container>
        </>
    )
}
