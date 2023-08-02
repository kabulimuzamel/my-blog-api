import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Header } from "../bodyComponent/Header";

export function CreatePost() {
    const [author, setAuthor] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');
    
    const submitPost = (e) => {
        if(author === '' && title === '' && content === '') {
            alert('Please enter something')
        } else {

            e.preventDefault()
            fetch(`http://localhost:3000/api/blog`, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ author, title, content, tags })
            })
                .then(res => {
                    console.log(res)
                    window.location.reload();
                })
                .catch(err => console.log(err));
        }

    } 
    

    return (
        <>
            <Header/>
            <Container style={{ width: '1000px' }}>
                <Form className='position-relative'>
                    <Form.Group>
                        <Form.Label className="text-light">Author</Form.Label>
                        <Form.Control
                            className="text-bg-dark"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="text-light">Title</Form.Label>
                        <Form.Control
                            className="text-bg-dark"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="text-light">Content</Form.Label>
                        <Form.Control
                            className="text-bg-dark"
                            as='textarea'
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            style={{
                                height: '300px',
                                resize: 'vertical',
                                overflowX: 'hidden',
                                msOverflowX: 'scroll',
                                wordWrap: 'break-word',
                            }}
                        />
                    </Form.Group>
                    <Button
                        className='position-absolute mt-4 end-0'
                        type='submit'
                        onClick={submitPost}>
                        Create a post
                    </Button>
                </Form>
            </Container>
        </>
    )
}