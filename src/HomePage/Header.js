import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'

export function Header() {
	return (
		<Navbar bg='dark' data-bs-theme='dark'>
			<Container>
				<Navbar.Brand href='#home'>My Page</Navbar.Brand>
				<Nav className='me-auto'>
					<Nav.Link href='/HomePage/CreateUserPage'>Register as a User</Nav.Link>
					<Nav.Link href='/HomePage/LoginPage'>Login</Nav.Link>
					<Nav.Link href='#'>About Us</Nav.Link>
					<Nav.Link href='#'>Our Goal</Nav.Link>
				</Nav>
			</Container>
		</Navbar>
	)
}