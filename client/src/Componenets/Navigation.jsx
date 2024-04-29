import React, { useState, useEffect } from 'react';
import { Nav, Navbar, Button, Form, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NewPost from './NewPost';
import axios from 'axios';

function Navigation() {
  const [showForm, setShowForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const sessionData = localStorage.getItem('session');
    if (sessionData) {
      const session = JSON.parse(sessionData);
      setUsername(session.username);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLinkClick = () => {
    if (isLoggedIn) {
      setShowForm(true);
    } else {
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

  const handleSearch = async (e) => {
    if (e.key === 'Enter') {
      try {
        const response = await axios.get("http://localhost:3000/getResults", {
          params: {
            query: searchQuery
          }
        });
        setSearchResults(response.data); // Update searchResults state with the received data
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    }
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
          <Form>
            <FormControl
              type="text"
              placeholder="Search"
              className="mr-sm-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
            />
          </Form>
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
      {/* Display search results here */}
      {/* {searchResults.length > 0 && (
        <div className="search-results">
          <h5>Search Results:</h5>
          <ul>
            {searchResults.map(result => (
              <li key={result.id}>{result.title}</li>
            ))}
          </ul>
        </div>
      )} */}
    </>
  );
}

export default Navigation;
