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
			<Container className={postArr.length ? '' : 'd-none'} style={{ width: '1000px' }}>
				<h2 className='text-light'>Wanna edit your posts...</h2>
				{postArr.map((post, index) => {
					return (
						<Container
							className='post position-relative border rounded text-bg-dark my-5 py-4'
							key={index}>
							<UpdatePost postObj={postArr[index]} token={token} />
							<div className='mb-3'>
								<div className="d-flex align-items-center">
									<h2 className="me-2">{post.title}</h2>
									<h4 className="mt-1">by {post.author.name}</h4>
								</div>
								<h6>@{post.author.userName}</h6>
								<h6 style={{ fontStyle: 'italic' }}>
									Published on {post.publishedDate.slice(0, 10)} at{' '}
									{post.publishedDate.slice(11, 16)} UTC
								</h6>
							</div>
							<div>{post.content}</div>
						</Container>
					)
				})}
			</Container>
		)
}