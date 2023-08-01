import React, { useEffect, useState } from "react";
import {  Container } from "react-bootstrap";
import { UpdatePost } from "./UpdatePost";

export function Post() {
    const [postArr, setPost] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:3000/api/blog`)
            .then(res => res.json())
            .then(res => {
                setPost(res);
            })
            .catch(err => console.log(err));
        
    }, []);


    return (
			<div>
				{postArr.map((post, index) => {
					return (
						<Container className='post position-relative border rounded text-bg-dark mb-5 py-4' key={index}>
							<UpdatePost postObj={postArr[index]} />
                            <div className="mb-3">
                                <h2>{post.title}</h2>
                                <h4>by {post.author[0]}</h4>
                            </div>
							<div>{post.tags.length > 0 ? post.tags : null}</div>
							<div>{post.content}</div>
						</Container>
					)
				})}
			</div>
		)
}