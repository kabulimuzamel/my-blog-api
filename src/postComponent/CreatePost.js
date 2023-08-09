import React, { useState } from "react";
import { Button, Container, Form, Alert, CloseButton } from "react-bootstrap";

export function CreatePost({ token }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [alertMessage, setAlertMessage] = useState(null);
    const [alertMessageVariant, setAlertMessageVariant] = useState('');
    
    const submitPost = (e) => {
        e.preventDefault();
        if(title == '' || content == '') {
            setAlertMessageVariant('danger')
            setAlertMessage('Please fill out the author, title, and content of the post you want to share');
        } else {
            e.preventDefault()
            fetch(`http://localhost:3000/api/blog/${token}`, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, content })
            })
                .then(res => {
                    if(res.status === 400) {
                        setAlertMessageVariant('danger')
                        setAlertMessage('Please Login to your account');  
                        return;
                    } else if(res.status === 200) {
                        setAlertMessageVariant('success')
                        setAlertMessage('Post Created Successfully');
                        setTimeout(() => {
                            setTitle('');
                            setContent('');
                            window.location.reload();
                        }, 1000)
                    }
                    
                    
                })
                .catch(err => console.log(err));
        }

    } 

    return (
        <>
            <Container className="mb-5" style={{ width: '1000px' }}>
                <div className="d-flex justify-content-center">
                    <Alert
                        className={alertMessage ? '' : 'd-none'}
                        style={{ width: '600px' }}
                        variant={alertMessageVariant}>
                        <CloseButton
                            onClick={() => setAlertMessage(null)}
                            className='position-absolute end-0 me-2'
                        />
                        {alertMessage}
                    </Alert>
                </div>
                <h2 className="text-light">Wanna Share Something...</h2>
                <br/>
                <Form className='position-relative'>
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