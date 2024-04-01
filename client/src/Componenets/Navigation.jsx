import { Link } from 'react-router-dom';
import { Nav, Navbar, Button } from 'react-bootstrap';

function Navigation() {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="px-5">
        <Link to="/" className="text-white text-decoration-none">
          <Navbar.Brand>Query Resolver</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className='mx-auto'>
            <Nav.Link href="#Post" className="text-white">New Post</Nav.Link>
          </Nav>
          <Nav>
            <Link to="/login">
              <Button variant="outline-light">Login</Button>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default Navigation;
