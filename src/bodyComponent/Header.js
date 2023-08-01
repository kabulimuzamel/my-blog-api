import { Navbar, Container, Nav } from "react-bootstrap";

export function Header() {
    return (
        <header className='pb-5'>
            <Navbar
                className='navBar border-bottom'
                bg='dark'
                data-bs-theme='light'>
                <Container>
                    <Navbar.Brand className='text-bg-dark' href='#'>
                        My blog
                    </Navbar.Brand>
                    <Nav className='me-auto'>
                        <Nav.Link className='text-bg-dark' href='/createAPost'>
                            Create a Post
                        </Nav.Link>
                        <Nav.Link className='text-bg-dark' href='/editAPost'>
                            Edit a Post
                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </header>
    )
}