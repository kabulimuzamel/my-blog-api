import React, { useState } from "react";
import { Button, Container, Form, Alert, CloseButton } from "react-bootstrap";
import { submitPostHandler } from "../Functions/apiCallFunctions";

export function CreatePost({ token }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [alertMessage, setAlertMessage] = useState(null);
    const [alertMessageVariant, setAlertMessageVariant] = useState('');
    
    return (
        <>
            <Container className='mb-5' style={{ width: '1000px' }}>
                <div className='d-flex justify-content-center'>
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
                <h2 className='text-light'>Wanna Share Something...</h2>
                <br />
                <Form className='position-relative'>
                    <Form.Group>
                        <Form.Label className='text-light'>Title</Form.Label>
                        <Form.Control
                            className='text-bg-dark'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className='text-light'>Content</Form.Label>
                        <Form.Control
                            className='text-bg-dark'
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
                        onClick={(event) =>
                            submitPostHandler(
                                event,
                                title,
                                content,
                                setAlertMessageVariant,
                                setAlertMessage,
                                token,
                                setTitle,
                                setContent
                            )
                        }>
                        Create a post
                    </Button>
                </Form>
            </Container>
        </>
    )
}