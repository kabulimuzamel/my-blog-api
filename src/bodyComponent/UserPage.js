import React, {  useState, useEffect } from "react";
import { Post } from "../postComponent/Post";
import { CreatePost } from "../postComponent/CreatePost";
import { UserHeader } from "./UserHeader";
import { Alert, Container } from "react-bootstrap";

export function UserPage() {
	const [token, setToken] = useState('')

	useEffect(() => {
		if (!token) {
			const storedToken = localStorage.getItem('token')
			if (storedToken) {
				setToken(storedToken)
			}
		}
	}, [])

	return (
		<div>
			<UserHeader />
			<Container className='d-flex justify-content-center'>
				<Alert
					className={token ? 'd-none' : ''}
					style={{ width: '1000px' }}
					variant='danger'>
					Please login to your account
				</Alert>
			</Container>
			<div className={token ? '' : 'd-none'}>
				<CreatePost token={token} />
				<Post token={token} />
			</div>
		</div>
	)
}
