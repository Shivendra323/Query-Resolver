import {Nav, Navbar, Button} from 'react-bootstrap';

function Navigation() {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className='px-5'>
        <Navbar.Brand href="#home">Query Resolver</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className='mx-auto'>
            <Nav.Link href="#Post">New Post</Nav.Link>
            {/* <Nav.Link href="#link"></Nav.Link>
            <Nav.Link href="#about"></Nav.Link> */}
          </Nav>
          <Nav>
            <Button variant="outline-light">Login</Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default Navigation;