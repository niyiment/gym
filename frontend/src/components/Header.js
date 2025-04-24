
// src/components/Header.js
import React from 'react';
import { Navbar, Nav, Container, Button, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt, faDumbbell } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const { currentUser, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <FontAwesomeIcon icon={faDumbbell} className="me-2" />
          FitLife Gym
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/plans">Membership Plans</Nav.Link>
          </Nav>
          <Nav>
            {currentUser ? (
              <>
                {isAdmin() && (
                  <NavDropdown title="Admin" id="admin-dropdown">
                    <NavDropdown.Item as={Link} to="/admin/users">Manage Users</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/admin/plans">Manage Plans</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/admin/subscriptions">Manage Subscriptions</NavDropdown.Item>
                  </NavDropdown>
                )}
                <NavDropdown title={currentUser.name || 'Account'} id="user-dropdown">
                  <NavDropdown.Item as={Link} to="/dashboard">Dashboard</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/profile">
                    <FontAwesomeIcon icon={faUser} className="me-2" />
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/subscriptions">My Subscriptions</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Button as={Link} to="/login" variant="outline-light" className="me-2">
                  Login
                </Button>
                <Button as={Link} to="/register" variant="primary">
                  Sign Up
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
