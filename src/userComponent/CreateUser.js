import React, { useState } from "react";
import { Button, Container, Form, FormGroup, Alert, CloseButton } from "react-bootstrap";

export function CreateUser() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [alertMessage, setAlertMessage] = useState(null);

    const submitForm = (e) => {
        e.preventDefault();
        fetch('http://localhost:3000/api/user', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userName, password })
        }) 
            .then(res => {
                if(res.status === 200) {
                    window.location.reload();
                } else {
                    res.json().then((data) => {
                        setAlertMessage(data.error); 
                    });
                }
            })
            .catch(err => console.log(err.message));

    }

    return (
        <Container className="mt-2 d-flex flex-column justify-content-center align-items-center">
            <Alert className={alertMessage? "" : 'd-none'} style={{width: '600px'}} variant="danger">
                <CloseButton onClick={() => setAlertMessage(null)} className="position-absolute end-0 me-2" />
                {alertMessage}
            </Alert>
            <h1 className="text-light my-3">Register as a User to enjoy our blog</h1>
            <Form className="position-relative" style={{width: '600px'}}>
                <FormGroup>
                    <Form.Label className="text-light">User Name</Form.Label>
                    <Form.Control className="text-bg-dark" value={userName} onChange={(e) => setUserName(e.target.value)}/>
                </FormGroup>
                <FormGroup>
                    <Form.Label className="text-light">Password</Form.Label>
                    <Form.Control className="text-bg-dark" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </FormGroup>
                <Button className="position-absolute end-0 mt-3 btn-light" onClick={submitForm}>Register</Button>
            </Form>
        </Container>
    )
}