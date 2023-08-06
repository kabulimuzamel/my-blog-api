import React from "react";
import { CreateUser } from "./CreateUser";
import { Container, Navbar } from "react-bootstrap";
import { Header } from "../HomePage/Header";

export function CreateUserPage() {
    return (
        <>
            <Header/>
            <CreateUser/>
        </>
    )
}