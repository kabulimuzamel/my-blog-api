import { Navbar, Container, Nav } from "react-bootstrap";

export function UserHeader({ setCreatePostSwitch }) {
    return (
			<header className='pb-5'>
				<Navbar
					className='navBar border-bottom'
					bg='dark'
					data-bs-theme='light'>
					<Container>
						<Navbar.Brand
							onClick={() => setCreatePostSwitch(false)}
							className='text-bg-dark'
							href='#'>
                            All Posts
						</Navbar.Brand>
						<Nav className='me-auto'>
							<Nav.Link
								onClick={() => setCreatePostSwitch(true)}
								className='text-bg-dark'
								href='#'>
								My Blog
							</Nav.Link>
						</Nav>
					</Container>
				</Navbar>
			</header>
		)
}