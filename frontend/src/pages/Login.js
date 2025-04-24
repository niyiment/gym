// src/pages/Login.js
import React, { useState } from 'react';
import { Card, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faDumbbell } from '@fortawesome/free-solid-svg-icons';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
});

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    setError('');

    try {
      const result = await login(values);
      if (result.success) {
        navigate(from, { replace: true });
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
      <Col md={6} lg={5}>
        <Card className="shadow-sm">
          <Card.Body className="p-4">
            <div className="text-center mb-4">
              <FontAwesomeIcon icon={faDumbbell} size="3x" className="text-primary mb-3" />
              <h2 className="fw-bold">Welcome Back</h2>
              <p className="text-muted">Please sign in to your account</p>
            </div>

            {error && <Alert variant="danger">{error}</Alert>}

            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ handleSubmit, handleChange, values, touched, errors }) => (
                <Form noValidate onSubmit={handleSubmit}>
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

                  <Form.Group className="mb-4">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      isInvalid={touched.password && !!errors.password}
                      placeholder="Enter your password"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100 py-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Signing in...' : (
                      <>
                        <FontAwesomeIcon icon={faSignInAlt} className="me-2" />
                        Sign In
                      </>
                    )}
                  </Button>

                  <div className="text-center mt-4">
                    <p className="mb-0">
                      Don't have an account? <Link to="/register" className="text-primary">Sign up</Link>
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

export default Login;