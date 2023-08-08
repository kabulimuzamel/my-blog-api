import React, {  useState, useEffect } from "react";
import { Post } from "../postComponent/Post";
import { CreatePost } from "../postComponent/CreatePost";
import { UserHeader } from "./UserHeader";
import { Alert, Container } from "react-bootstrap";

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
			<div className={token ? '' : 'd-none'}>
				<CreatePost token={token} />
				<Post token={token} />
			</div>
		</div>
	)
}
