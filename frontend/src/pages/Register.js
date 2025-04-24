// src/pages/Register.js
import React, { useState } from 'react';
import { Card, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faDumbbell } from '@fortawesome/free-solid-svg-icons';

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('First name is required')
    .max(100, 'First name must be less than 100 characters'),
  lastName: Yup.string()
    .required('Last name is required')
    .max(100, 'Last name must be less than 100 characters'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required')
    .max(100, 'Email must be less than 100 characters'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm your password'),
  phone: Yup.string()
    .max(20, 'Phone number must be less than 20 characters'),
  dateOfBirth: Yup.date()
    .max(new Date(), 'Date of birth must be in the past')
});

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values, { resetForm }) => {
    setIsSubmitting(true);
    setError('');
    setSuccess('');

    // Remove confirmPassword before sending to API
    const { confirmPassword, ...userData } = values;

    try {
      const result = await register(userData);
      if (result.success) {
        setSuccess('Registration successful! You can now log in.');
        resetForm();
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Row className="justify-content-md-center">
      <Col lg={8}>
        <Card className="shadow-sm">
          <Card.Body className="p-4">
            <div className="text-center mb-4">
              <FontAwesomeIcon icon={faDumbbell} size="3x" className="text-primary mb-3" />
              <h2 className="fw-bold">Create an Account</h2>
              <p className="text-muted">Join FitLife Gym today and start your fitness journey</p>
            </div>

            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

            <Formik
              initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: '',
                phone: '',
                dateOfBirth: '',
                address: ''
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ handleSubmit, handleChange, values, touched, errors }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="firstName"
                          value={values.firstName}
                          onChange={handleChange}
                          isInvalid={touched.firstName && !!errors.firstName}
                          placeholder="Enter your first name"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.firstName}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="lastName"
                          value={values.lastName}
                          onChange={handleChange}
                          isInvalid={touched.lastName && !!errors.lastName}
                          placeholder="Enter your last name"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.lastName}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      isInvalid={touched.email && !!errors.email}
                      placeholder="Enter your email"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="password"
                          value={values.password}
                          onChange={handleChange}
                          isInvalid={touched.password && !!errors.password}
                          placeholder="Create a password"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.password}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="confirmPassword"
                          value={values.confirmPassword}
                          onChange={handleChange}
                          isInvalid={touched.confirmPassword && !!errors.confirmPassword}
                          placeholder="Confirm your password"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.confirmPassword}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                          type="text"
                          name="phone"
                          value={values.phone}
                          onChange={handleChange}
                          isInvalid={touched.phone && !!errors.phone}
                          placeholder="Enter your phone number"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.phone}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Date of Birth</Form.Label>
                        <Form.Control
                          type="date"
                          name="dateOfBirth"
                          value={values.dateOfBirth}
                          onChange={handleChange}
                          isInvalid={touched.dateOfBirth && !!errors.dateOfBirth}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.dateOfBirth}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-4">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="address"
                      value={values.address}
                      onChange={handleChange}
                      rows={2}
                      placeholder="Enter your address"
                    />
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100 py-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Creating Account...' : (
                      <>
                        <FontAwesomeIcon icon={faUserPlus} className="me-2" />
                        Create Account
                      </>
                    )}
                  </Button>

                  <div className="text-center mt-4">
                    <p className="mb-0">
                      Already have an account? <Link to="/login" className="text-primary">Sign in</Link>
                    </p>
                  </div>
                </Form>
              )}
            </Formik>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Register;
