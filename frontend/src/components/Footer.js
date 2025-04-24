// src/components/Footer.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDumbbell,
  faEnvelope,
  faPhone,
  faMapMarkerAlt
} from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white py-4 mt-auto">
      <Container>
        <Row className="justify-content-between">
          <Col md={4} className="mb-3 mb-md-0">
            <h5>
              <FontAwesomeIcon icon={faDumbbell} className="me-2" />
              FitLife Gym
            </h5>
            <p className="text-muted">
              Your destination for fitness and health. We offer the best gym equipment and trainers to help you achieve your fitness goals.
            </p>
          </Col>

          <Col md={3} className="mb-3 mb-md-0">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-decoration-none text-muted">Home</Link></li>
              <li><Link to="/plans" className="text-decoration-none text-muted">Membership Plans</Link></li>
              <li><Link to="/login" className="text-decoration-none text-muted">Login</Link></li>
              <li><Link to="/register" className="text-decoration-none text-muted">Register</Link></li>
            </ul>
          </Col>

          <Col md={4}>
            <h5>Contact Us</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2 text-muted" />
                <span className="text-muted">123 Fitness Street, Healthville, CA 90210</span>
              </li>
              <li className="mb-2">
                <FontAwesomeIcon icon={faPhone} className="me-2 text-muted" />
                <span className="text-muted">(555) 123-4567</span>
              </li>
              <li>
                <FontAwesomeIcon icon={faEnvelope} className="me-2 text-muted" />
                <span className="text-muted">info@fitlifegym.com</span>
              </li>
            </ul>
          </Col>
        </Row>

        <hr className="my-4" />

        <Row>
          <Col className="text-center text-muted">
            <small>&copy; {year} FitLife Gym. All rights reserved.</small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
