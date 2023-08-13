import React, { useState } from "react";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../../context/Context";
import { createUser, generateOtp } from "../../../network/agent";
import BasicInputField from "./BasicInputField";
import ContactInputField from "./ContactInputField";
import OtpForm from "../OtpForm";
import { useSignupContext } from "../../../context/SignupContext";

const SignupWrap = () => {

  const {
    name,
    email,
    password,
    confirmPassword,
    formValid,
    gender,
    userType,
    phoneNumber,
    dateOfBirth,
    pincode,
    city,
    address,
    stateNew,
    onBlurHandler,
    onFocusHandler,
    valueChangeHandler,
    resetForm
  } = useSignupContext();

  const { toggleSpinner, setMessage } = useGlobalContext();

  const [showModal, setShowModal] = useState(false);
  const [generatedUserId, setGeneratedUserId] = useState(null);

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requiredFields = [
      { field: name, fieldName: 'Name' },
      { field: email, fieldName: 'Email' },
      { field: password, fieldName: 'Password' },
      { field: confirmPassword, fieldName: 'Confirm Password' },
      { field: dateOfBirth, fieldName: 'Date of Birth' },
      { field: pincode, fieldName: 'Pincode' }
    ];

    const incompleteField = requiredFields.find(field => field.field.hasError || !field.field.touched);

    if (incompleteField || gender.value.length === 0 || userType.value === 0 || !formValid) {
      const errorMessage = incompleteField ? `Please fill out the "${incompleteField.fieldName}" field correctly!` : "Please fill out all required fields correctly!";

      setMessage(true, "error", errorMessage);
      return;
    }

    // Form is valid, proceed with the API call
    toggleSpinner();

    const formData = {
      name: name.value,
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
      userType: userType.value,
      Contact: {
        phoneNumber: phoneNumber.value,
        dateOfBirth: dateOfBirth.value,
        pincode: pincode.value,
        gender: gender.value,
        address: address.value,
        state: stateNew.value,
        city: city.value,
      },
    };

    // Create User API call
    createUser(formData)
      .then(handleSignUpSuccess)
      .catch(handleSignUpError);

    toggleSpinner();
  };

  const handleSignUpSuccess = (response) => {
    if (response.error === false) {
      toggleSpinner();

      setTimeout(() => {
        resetForm();
        setMessage(true, "success", "Registered successfully!");
      }, [1000]);

      setTimeout(() => {
        setMessage(true, "info", "Please verify OTP sent on your email!");
      }, [2000]);

      setTimeout(() => {

        // Generate OTP API call
        generateOtp({ email: response.data.email })
          .then((response) => {
            if (response.error === false) {
              setGeneratedUserId(response.data.user_id); // Set the generated user ID
              setMessage(true, "success", "OTP sent successfully!");
              handleModalOpen();
            }
          })
          .catch(handleSignUpError);

      }, 3000);
    }
  }
  const handleSignUpError = (error) => {
    setMessage(true, "error", error.response?.data.detail || "An error occurred");
  };

  return (
    <>
      <Container>
        <Row className="d-flex justify-content-center align-items-center">
          <Col sm={12} lg={10}>
            <div className="shadow p-4 border rounded-4 m-3">
              <h1 className="text-uppercase text-center">Register</h1>

              <Form onSubmit={handleSubmit}>
                <Row className="g-4 p-2">
                  <Col md={6}>
                    <BasicInputField />
                  </Col>

                  <Col md={6}>
                    <ContactInputField />
                  </Col>

                  <div className="d-flex align-items-center justify-content-center mt-5 mb-5">
                    <Button
                      type="submit"
                      className="rounded-4 ps-3 pe-3 pt-2 pb-2"
                    >
                      Create Account
                    </Button>
                  </div>
                </Row>
              </Form>

              <div className="d-flex align-items-center justify-content-center flex-column">
                <p className="p-0 m-0 text-muted">Already have an account?</p>
                <p className="p-0 m-0 text-muted">
                  <Link to="/auth/signin">Login</Link> <span>Now</span>
                </p>

                <p
                  className="mt-5 mb-0 text-muted"
                  style={{ fontSize: "12px" }}
                >
                  Go back to <Link to="/">Home</Link>{" "}
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      {showModal && (
        <OtpForm
          show={showModal}
          onHide={() => setShowModal(false)}
          user_id={generatedUserId}
          onBlurHandler={onBlurHandler}
          onFocusHandler={onFocusHandler}
          valueChangeHandler={valueChangeHandler}
        />
      )}
    </>
  );
};

export default SignupWrap;