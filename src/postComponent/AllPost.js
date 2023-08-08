import React, { useState, useEffect } from "react";
import { Container, Alert, CloseButton } from "react-bootstrap";
import { UserHeader } from "../bodyComponent/UserHeader";

export function AllPost() {
	const [postsArr, setPostsArr] = useState([]);

	useEffect(() => {
		fetch(`http://localhost:3000/api/blog`)
			.then((res) => res.json())
			.then((res) => {
				setPostsArr(res)
			})
	}, [])
	return (
		<>
			<UserHeader />
			<Container style={{ width: '1000px' }}>
				{postsArr.map((post, index) => {
					return (
						<Container
							className='post position-relative border rounded text-bg-dark my-5 py-4'
							key={index}>
							<div className='mb-3'>
								<h2>{post.title}</h2>
								<h4>by {post.author.name}</h4>
							</div>
							<div>{post.tags.length > 0 ? post.tags : null}</div>
							<div>{post.content}</div>
						</Container>
					)
				})}
			</Container>
		</>
	)
}