import React, { useEffect, useState } from "react";
import {  Container, Alert } from "react-bootstrap";
import { UpdatePost } from "./UpdatePost";

export function Post({ token }) {
    const [postArr, setPostArr] = useState([]);

	useEffect(() => {
		if(token) {
			fetch(`http://localhost:3000/api/blog/${token}`)
				.then((res) => {
					if(res.status === 200) {
						res.json().then((res) => setPostArr(res))
					}
				})
		}
	}, [token]);

	
    return (
			<Container style={{ width: '1000px' }}>
				<h2 className='text-light'>Wanna edit your posts...</h2>
				{postArr.map((post, index) => {
					return (
						<Container
							className='post position-relative border rounded text-bg-dark my-5 py-4'
							key={index}>
							<UpdatePost postObj={postArr[index]} token={token} />
							<div className='mb-3'>
								<h2>{post.title}</h2>
								<h4>by {post.author.name}</h4>
							</div>
							<div>{post.content}</div>
						</Container>
					)
				})}
			</Container>
		)
}