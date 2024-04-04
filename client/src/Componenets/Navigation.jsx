import React, { useState, useEffect } from 'react';
import { Nav, Navbar, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NewPost from './NewPost';

function Navigation() {
  const [showForm, setShowForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const sessionData = localStorage.getItem('session');
    if (sessionData) {
      const session = JSON.parse(sessionData);
      setUsername(session.username);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLinkClick = () => {
    if(isLoggedIn){
      setShowForm(true);
    }else{
      alert('logging in is mandatory');
    }
    
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('session');
    setUsername('');
    setIsLoggedIn(false);
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
            <Nav.Link onClick={handleLinkClick}>New Post</Nav.Link>
          </Nav>
          <Nav>
            {isLoggedIn ? (
              <>
                <Nav.Link>Hello, {username}</Nav.Link>
                <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
              </>
            ) : (
              <Link to="/login">
                <Button variant="outline-light">Login</Button>
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {showForm && <NewPost onClose={handleCloseForm} />}
    </>
  );
}

export default Navigation;
