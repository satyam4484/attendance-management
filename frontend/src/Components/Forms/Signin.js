import React from "react";
import { Form, Row, Col, Button, Container, Spinner, FloatingLabel } from "react-bootstrap";
import signupBanner from "../../assets/images/signupBanner.png";
import { Link } from "react-router-dom";
import Icon from "../UI/Icon";

const SignIn = () => {

  return (
    <Container>
      <Row className="d-flex justify-content-center align-items-center">
        <Col md={8}>
          <div className="shadow p-4 border rounded-4 m-5">

            <h1 className="text-uppercase text-center">Login</h1>

            <Form className="p-4">
              <div className="mb-2">
                <FloatingLabel label="Email">
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="rounded-4"
                  />
                </FloatingLabel>
              </div>

              <div className="mb-2">
                <FloatingLabel label="Password">
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="rounded-4"
                  />
                </FloatingLabel>
              </div>

              <div className="d-flex align-items-center justify-content-center mt-5 mb-5">
                <Button type="submit" className="rounded-4 ps-3 pe-3 pt-2 pb-2">
                  Login
                </Button>
              </div>
            </Form>

            <div className="d-flex align-items-center justify-content-center flex-column" >
              <p className="p-0 m-0 text-muted">Don't have an account?</p>
              <p className="p-0 m-0 text-muted">
                <Link to="/auth/signup">Create New Account</Link>{" "}
                <span>Now</span>
              </p>
              <p className="mt-5 mb-0 text-muted" style={{ fontSize: "12px" }}>Go back to <Link to="/" >Home</Link> </p>
            </div>
          </div>

        </Col>
      </Row>
    </Container>

  )
}

export default SignIn;