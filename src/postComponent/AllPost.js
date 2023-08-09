import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { UserHeader } from "../bodyComponent/UserHeader";
import { backgroundUrlStyle } from '../Style/backgroundUrlStyle';
import { allPostFetcher } from "../Functions/apiCallFunctions";
const imgUrl = require('../Images/readingBook.avif')
const BodyBackground = backgroundUrlStyle(imgUrl);
export function AllPost() {
	const [postsArr, setPostsArr] = useState([]);

	useEffect(() => {
		allPostFetcher(setPostsArr);
	}, []);

	return (
		<>
			<UserHeader />
			<BodyBackground/>
			<h1 className={postsArr.length ? 'd-none' : 'text-light ms-5'}>Be the FIRST ONE to Publish a Post.................</h1>
			<Container className={postsArr.length ? '' : 'd-none'} style={{ width: '1000px' }}>
				{postsArr.map((post, index) => {
					return (
						<Container
							className='post position-relative border rounded text-bg-dark my-5 py-4'
							key={index}>
							<div className='mb-3'>
								<div className='d-flex align-items-center'>
									<h2 className='me-2'>{post.title}</h2>
									<h4 className='mt-1'>by {post.author.name}</h4>
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
		</>
	)
}