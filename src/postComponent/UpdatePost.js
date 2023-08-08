import React, { useState } from 'react'
import { Button, Modal, Form, CloseButton, Alert } from 'react-bootstrap'

export const UpdatePost = ({ token, postObj }) => {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [title, setTitle] = useState('')
	const [content, setContent] = useState('');
	const [id, setId] = useState('');
	const [alertMessage, setAlertMessage] = useState(null);

	const handleButtonClick = (e) => {
		e.preventDefault();
		setIsModalVisible(true);
		setTitle(postObj.title);
		setContent(postObj.content);
		setId(postObj._id);
	}

	const closeModal = () => {
		setIsModalVisible(false);
		setAlertMessage(null);
		window.location.reload();
	}

	const deleteAPost = (e) => {
		e.preventDefault();
		fetch(`http://localhost:3000/api/blog/${token}/${id}`, {
			method: 'DELETE',
		})
			.then(res => {
				if(res.status === 200) {
					setAlertMessage('Deleted Successfully');
					setTimeout(() => {
						setAlertMessage(null);
						window.location.reload();
					}, 2000)
				} else {
					setAlertMessage('Please Login to your account');
				}
			})
			.catch((err) => console.log(err));
	}



	const updatePost = (e) => {
		e.preventDefault();
		if(title === '' || content === '') {
			setAlertMessage('You can not leave title and content empty');
			return;
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

	return (
		<>
			<div className=' border-bottom position-absolute top-0 end-0'>
				<Button
					className='text-white'
					variant='link'
					onClick={handleButtonClick}>
					Edit
				</Button>

				<Modal show={isModalVisible} onHide={closeModal} centered>
					<Modal.Header closeButton>
						<Modal.Title
							className='text-success'
							onClick={() => setAlertMessage(null)}>
							{alertMessage}
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form>
							<Form.Group>
								<Form.Label>Title</Form.Label>
								<Form.Control
									value={title}
									onChange={(e) => setTitle(e.target.value)}
								/>
							</Form.Group>
							<Form.Group>
								<Form.Label>Content</Form.Label>
								<Form.Control
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
						</Form>
					</Modal.Body>
					<Modal.Footer>
						<Button variant='danger' onClick={deleteAPost}>
							Delete
						</Button>
						<Button variant='primary' onClick={updatePost}>
							Save changes
						</Button>
					</Modal.Footer>
				</Modal>
			</div>
		</>
	)
}
