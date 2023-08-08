import { Navbar, Container, Nav } from "react-bootstrap";

export function UserHeader() {
    return (
		<header className='pb-5'>
			<Navbar
				className='navBar border-bottom'
				bg='dark'
				data-bs-theme='light'>
				<Container>
					<Navbar.Brand className='text-bg-dark' href='/AllPosts'>
						All Posts
					</Navbar.Brand>
					<Nav className='me-auto'>
						<Nav.Link className='text-bg-dark' href='/UserPage'>
							My Blog
						</Nav.Link>
						<Nav.Link
							className='text-bg-dark'
							onClick={() => localStorage.clear()}
							href='/LoginPage'>
							Log Out
						</Nav.Link>
					</Nav>
					<Navbar.Collapse className='justify-content-end'>
						Hello
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	)
}