import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse'

export function Header() {
	return (
		<Navbar style={{height: '6rem'}} bg='dark' data-bs-theme='dark'>
			<Container>
				<Navbar.Brand href='/'>Home</Navbar.Brand>
				<Nav className='me-auto'>
					<Nav.Link href='/CreateUserPage'>Register as a User</Nav.Link>
					<Nav.Link href='/LoginPage'>Login</Nav.Link>
				</Nav>
				<NavbarCollapse className='justify-content-end'>
					<Navbar.Text>
						Photo Credit goes to FreePick
					</Navbar.Text>
				</NavbarCollapse>
			</Container>
		</Navbar>
	)
}
