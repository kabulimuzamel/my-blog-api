import React from "react";
import { CreateUser } from "./CreateUser";
import { Container, Navbar } from "react-bootstrap";

export function CreateUserPage() {
    return (
        <>
            <Navbar expand="lg" className="bg-dark" style={{height: '5rem'}}>
                <Container>
                    <Navbar.Brand className="text-light" href="/HomePage">Home Page</Navbar.Brand>
                </Container>
            </Navbar>
            <CreateUser/>
        </>
    )
}