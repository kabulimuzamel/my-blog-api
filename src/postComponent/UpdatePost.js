import React, { useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap';
import { handleButtonClick, closeModal, deleteAPostHandler, updatePostHandler } from '../Functions/apiCallFunctions';

export const UpdatePost = ({ token, postObj }) => {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [title, setTitle] = useState('')
	const [content, setContent] = useState('');
	const [id, setId] = useState('');
	const [alertMessage, setAlertMessage] = useState(null);

	return (
		<>
			<div className=' border-bottom position-absolute top-0 end-0'>
				<Button
					className='text-white'
					variant='link'
					onClick={(event) => handleButtonClick(
						event,
						setIsModalVisible, 
						setTitle, 
						setContent, 
						setId, 
						postObj
					)}>
					Edit
				</Button>

				<Modal show={isModalVisible} onHide={() => closeModal(
					setIsModalVisible, 
					setAlertMessage
				)} centered>
				
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
						<Button variant='danger' onClick={(event) => deleteAPostHandler(
							event, 
							setAlertMessage, 
							token, 
							id
						)}>
							Delete
						</Button>
						<Button variant='primary' onClick={(event) => updatePostHandler(
							event, 
							title, 
							content, 
							setAlertMessage, 
							token, 
							id
						)}>
							Save changes
						</Button>
					</Modal.Footer>
				</Modal>
			</div>
		</>
	)
}
