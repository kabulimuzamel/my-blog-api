import React from "react";
import { Header } from "./Header";
import { backgroundUrlStyle } from "../Style/backgroundUrlStyle";
const imgUrl = require('../Images/top-view-workspace-with-laptop-cup-tea.jpg')
const BodyBackground = backgroundUrlStyle(imgUrl, '150vh');
export function HomePage() {
    return (
        <>
            <Header/>
            <BodyBackground/>
            <main>
                <div className="homePageMain">
                    <h1 className="text-light p-4" style={{fontSize: '4rem', border: '3px solid white'}}>
                        Welcome to MY BLOG
                    </h1>
                </div>
            </main>
        </>
    )
}