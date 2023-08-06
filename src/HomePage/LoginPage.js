import React, { useEffect, useState, createContext } from "react";
import { Container, Alert, Form, FormGroup, CloseButton, Button } from "react-bootstrap";
import { UserHeader } from "../bodyComponent/UserHeader";
import { Post } from "../postComponent/Post";
import { CreatePost } from "../postComponent/CreatePost";
import { Header } from "./Header";
import { AllPost } from "../postComponent/AllPost";


export function LoginPage() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [alertMessage, setAlertMessage] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [id, setId] = useState('');
    const [postArr, setPostArr] = useState([]);
    const [createPostSwitch, setCreatePostSwitch] = useState(false);

    useEffect(() => {
        if(id !== '') {
            fetch(`http://localhost:3000/api/blog/${id}`)
                .then(res => res.json())
                .then(res => setPostArr(res));
        }
    }, [id, createPostSwitch])

    const loginHandler = (e) => {
        e.preventDefault()
        fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userName, password })
        }).then(res => {
            if(res.status === 200) {
                setIsLoggedIn(true);
                res.json().then((res) => setId(res.userId))
            } else {
                res.json().then((err) => setAlertMessage(err.error))
                
            }
        }).catch(err => console.log(err.message));        
    }

        return (
                <>
                    <div className={isLoggedIn ? '' : 'd-none'}>
                        <UserHeader setCreatePostSwitch={setCreatePostSwitch} />
                        <div className={createPostSwitch ? 'd-none' : ''}>
                            <AllPost createPostSwitch={createPostSwitch}/>
                        </div>
                        <div className={createPostSwitch ? '' : 'd-none'}>
                            <CreatePost userId={id} setCreatePostSwitch={setCreatePostSwitch}/>
                            <Post postArr={postArr}/>
                        </div>
                    </div>
                    <div className={isLoggedIn ? 'd-none' : ''}>
                        <Header />
                        <Container className='mt-2 d-flex flex-column justify-content-center align-items-center'>
                            <Alert
                                className={alertMessage ? '' : 'd-none'}
                                style={{ width: '600px' }}
                                variant='danger'>
                                <CloseButton
                                    onClick={() => setAlertMessage(null)}
                                    className='position-absolute end-0 me-2'
                                />
                                {alertMessage}
                            </Alert>
                            <h1 className='text-light my-3'>
                                Login if you already have an account
                            </h1>
                            <Form className='position-relative' style={{ width: '300px' }}>
                                <FormGroup>
                                    <Form.Label className='text-light'>User Name</Form.Label>
                                    <Form.Control
                                        className='text-bg-dark'
                                        value={userName}
                                        onChange={(e) => setUserName(e.target.value)}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Form.Label className='text-light'>Password</Form.Label>
                                    <Form.Control
                                        className='text-bg-dark'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </FormGroup>
                                <Button
                                    className='position-absolute end-0 mt-3 btn-light'
                                    onClick={loginHandler}>
                                    Log In
                                </Button>
                            </Form>
                        </Container>
                    </div>
                </>
            )

}