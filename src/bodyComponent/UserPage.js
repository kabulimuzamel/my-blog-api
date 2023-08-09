import React, {  useState, useEffect } from "react";
import { Post } from "../postComponent/Post";
import { CreatePost } from "../postComponent/CreatePost";
import { UserHeader } from "./UserHeader";
import { backgroundUrlStyle } from '../Style/backgroundUrlStyle'
const imgUrl = require('../Images/writing.avif')
const BodyBackground = backgroundUrlStyle(imgUrl)
export function UserPage() {
	const [token, setToken] = useState('')
	useEffect(() => {
		if(!token) {
			setToken(localStorage.getItem('token'))
		}
	}, [token])

	return (
		<div>
			<UserHeader />
			<BodyBackground />
			<div className={token ? '' : 'd-none'}>
				<CreatePost token={token} />
				<Post token={token} />
			</div>
		</div>
	)
}
