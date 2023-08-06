import React, { useEffect, useState } from "react";
import {  Container } from "react-bootstrap";
import { UpdatePost } from "./UpdatePost";

export function Post({ postArr }) {

    return (
			<Container style={{width: '1000px'}}>
                <h2 className="text-light">Wanna edit your posts...</h2>
				{postArr.map((post, index) => {
					return (
						<Container className='post position-relative border rounded text-bg-dark my-5 py-4' key={index}>
							<UpdatePost postObj={postArr[index]} />
                            <div className="mb-3">
                                <h2>{post.title}</h2>
                                <h4>by {post.author}</h4>
                            </div>
							<div>{post.tags.length > 0 ? post.tags : null}</div>
							<div>{post.content}</div>
						</Container>
					)
				})}
			</Container>
		)
}