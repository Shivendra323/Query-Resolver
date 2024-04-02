import React, {useState} from 'react';
import {Nav, Navbar, Button} from 'react-bootstrap';
import NewPost from './NewPost';
function Navigation() {
  const [showForm, setShowForm] = useState(false);

  const handleLinkClick = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="px-5">
        <Link to="/" className="text-white text-decoration-none">
          <Navbar.Brand>Query Resolver</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className='mx-auto'>
            <Nav.Link href="#Create_Post" onClick={handleLinkClick}>New Post</Nav.Link>
            {/* <Nav.Link href="#link"></Nav.Link>
            <Nav.Link href="#about"></Nav.Link> */}
          </Nav>
          <Nav>
            <Link to="/login">
              <Button variant="outline-light">Login</Button>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {showForm && <NewPost onClose={handleCloseForm} />}
    </>
  );
}

export default Navigation;
