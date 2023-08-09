import React from "react";
import { CreateUser } from "./CreateUser";
import { Header } from "../HomePage/Header";
import { backgroundUrlStyle } from '../Style/backgroundUrlStyle';
const imgUrl = require('../Images/top-view-office-stuff-with-laptop-coffee-cup-black-table.jpg')
const BodyBackground = backgroundUrlStyle(imgUrl)
export function CreateUserPage() {
    return (
        <>
            <BodyBackground />
            <Header/>
            <CreateUser/>
        </>
    )
}