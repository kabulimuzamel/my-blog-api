import React, { useState, useEffect } from "react";
import { Container, Alert, CloseButton, Form, FormGroup, Button } from "react-bootstrap";

function MyAccount() {
    const [name, setName] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [alertMessage, setAlertMessage] = useState(null);

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
                <FormGroup>
                    <Form.Label className="text-light">Password</Form.Label>
                    <Form.Control className="text-bg-dark" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </FormGroup>
                <Button className="position-absolute end-0 mt-3 btn-light">Update My Info</Button>
            </Form>
        </Container>
    )
}
