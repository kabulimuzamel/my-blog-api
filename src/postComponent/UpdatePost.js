import React, { useState } from 'react'
import { Button, Modal, Form, CloseButton, Alert } from 'react-bootstrap'

export const UpdatePost = ({postObj}) => {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [author, setAuthor] = useState('')
	const [title, setTitle] = useState('')
	const [content, setContent] = useState('');
	const [id, setId] = useState('');
	const [alertMessage, setAlertMessage] = useState(null);

	const handleButtonClick = (e) => {
		e.preventDefault();
		console.log(postObj)
		setIsModalVisible(true);
		setAuthor(postObj.author);
		setTitle(postObj.title);
		setContent(postObj.content);
		setId(postObj._id);
	}

	const closeModal = () => {
		setIsModalVisible(false);
		setAlertMessage(null);
	}

	const deleteAPost = (e) => {
		e.preventDefault();
		fetch(`http://localhost:3000/api/blog/${id}`, {
			method: 'DELETE',
		})
			.then(res => {
				setAlertMessage('Deleted Successfully');
				setTimeout(() => {
					setAlertMessage(null);
					setIsModalVisible(false);
				}, 2000)
			})
			.catch((err) => console.log(err));
	}



	const updatePost = (e) => {
		e.preventDefault();
		fetch(`http://localhost:3000/api/blog/${id}`, {
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ author, title, content }),
		})
			.then((res) => res.json())
			.then((res) => setAlertMessage('Updated Successfully'))
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
								<Form.Label>Author</Form.Label>
								<Form.Control
									value={author}
									onChange={(e) => setAuthor(e.target.value)}
								/>
							</Form.Group>
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
