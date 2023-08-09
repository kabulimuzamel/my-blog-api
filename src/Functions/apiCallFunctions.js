
export const loginHandler = (e, userName, password, setIsLoggedIn, setAlertMessage) => {
    e.preventDefault();
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
            res.json().then((res) => {
                localStorage.setItem('token', res.token)
            })
        } else {
            res.json().then((err) => setAlertMessage(err.error))
        }
    }).catch(err => console.log(err.message));        
}

export const allPostFetcher = (setPostsArr, token) => {
    fetch(`http://localhost:3000/api/blog${token ? `/${token}` : '/'}`)
        .then((res) => res.json())
        .then((res) => {
            setPostsArr(res)
        })
        .catch(err => console.log(err));
}

export const submitPostHandler = (e, title, content, setAlertMessageVariant, setAlertMessage, token, setTitle, setContent) => {
    e.preventDefault();
    if(title === '' || content === '') {
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

export const handleButtonClick = (e, setIsModalVisible, setTitle, setContent, setId, postObj) => {
    e.preventDefault()
    setIsModalVisible(true)
    setTitle(postObj.title)
    setContent(postObj.content)
    setId(postObj._id)
}

export const closeModal = (setIsModalVisible, setAlertMessage) => {
    setIsModalVisible(false);
    setAlertMessage(null);
    window.location.reload();
}

export const deleteAPostHandler = (e, setAlertMessage, token, id) => {
    e.preventDefault()
    fetch(`http://localhost:3000/api/blog/${token}/${id}`, {
        method: 'DELETE',
    })
        .then((res) => {
            if (res.status === 200) {
                setAlertMessage('Deleted Successfully')
                setTimeout(() => {
                    setAlertMessage(null)
                    window.location.reload()
                }, 2000)
            } else {
                setAlertMessage('Please Login to your account')
            }
        })
        .catch((err) => console.log(err))
}

export const updatePostHandler = (e, title, content, setAlertMessage, token, id) => {
    e.preventDefault()
    if (title === '' || content === '') {
        setAlertMessage('You can not leave title and content empty')
        return
    }
    fetch(`http://localhost:3000/api/blog/${token}/${id}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
    })
        .then((res) => {
            setAlertMessage('Updated Successfully')
        })
        .catch((err) => console.log(err))
}

export const submitFormAccount = (e, name, userName, password, setIsAccountCreated, setAlertMessage) => {
	e.preventDefault();
	fetch('http://localhost:3000/api/user', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ name, userName, password }),
	})
		.then((res) => {
			if (res.status === 200) {
				res.json().then((data) => {
					localStorage.setItem('token', data.token)
					setIsAccountCreated(true)
				})
			} else {
				res.json().then((data) => {
					setAlertMessage(data.error)
				})
			}
		})
		.catch((err) => console.log(err.message))
}

export const updateInfoHandler = (e, name, userName, password, setAlertMessageVariant, setAlertMessage, token) => {
	e.preventDefault();
	if (!name || !userName || !password) {
		setAlertMessageVariant('danger')
		setAlertMessage('You cannot leave name, username, and password blank')
		return
	}

	fetch(`http://localhost:3000/api/user/${token}`, {
		method: 'PUT',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ name, userName, password }),
	}).then((res) => {
		if (res.status === 200) {
			setAlertMessageVariant('success')
			setAlertMessage('Updated Successfully')
			setTimeout(() => {
				window.location.reload()
			}, 1000)
		} else {
			res.json((res) => {
				setAlertMessageVariant('danger')
				setAlertMessage(res.error)
			})
		}
	})
}

export const deleteInfoHandler = (e, token, setAlertMessageVariant, setAlertMessage, setIsDeleted) => {
	e.preventDefault()
	fetch(`http://localhost:3000/api/user/${token}`, {
		method: 'DELETE',
	}).then((res) => {
		if (res.status === 200) {
			setAlertMessageVariant('success')
			setAlertMessage(
				'Your account was deleted successfully with all the posts you had published'
			)
			setTimeout(() => {
				setIsDeleted(true)
			}, 1000)
		}
	})
}

export const userIdentifier = (setToken) => {
    setTimeout(() => {        
        if(localStorage.getItem('token')) {
            fetch(`http://localhost:3000/api/user/${localStorage.getItem('token')}`)
                .then(res => {
                    if(res.status === 200) {
                        setToken(localStorage.getItem('token'));
                    } else {
                        setToken(false);
                    }
                })
        } else {
            setToken(false)
        }   
    }, 1000);
}