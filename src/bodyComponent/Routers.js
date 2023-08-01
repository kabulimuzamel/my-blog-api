import { CreatePost } from "../postComponent/CreatePost"
import React from "react"
import { Routes, Route } from "react-router-dom"
import { Post } from "../postComponent/Post"

export function Routers () {
    return (
        <Routes>
            <Route path='/createAPost' element={<CreatePost />} />
            <Route path="/editAPost" element={<Post />}/>
        </Routes>
    )
}