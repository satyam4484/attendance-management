import React, { useReducer } from "react";
import { Form, Row, Col, Button, Container, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { signupReducer, initialStateSignup } from "../../reducers/SignupReducer";
import { useGlobalContext } from "../../context/Context";
import { createUser, validateEmail, validatePhoneNumber, validatePincode } from "../../network/agent";
import BasicInputField from "./Units/BasicInputField";
import ContactInputField from "./Units/ContactInputField";

const SignUp = () => {
    const [state, dispatch] = useReducer(signupReducer, initialStateSignup);

    const { name, email, password, confirmPassword, gender, formValid, userType } = state;

    const { toggleSpinner, setMessage } = useGlobalContext();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.hasError || email.hasError || password.hasError || confirmPassword.hasError || userType.hasError || gender.hasError || !formValid || !name.touched || !email.touched || !password.touched || !confirmPassword.touched || gender.trim().length === 0 || userType === 0) {
            // If there are errors in the form, do nothing
            setMessage(true, "error", "Please fill out all fields correctly!");
            return;
        }
        // Form is valid, proceed with the API call
        toggleSpinner()

        const formData = {
            name: name.value,
            email: email.value,
            password: password.value,
            confirmPassword: confirmPassword.value,
            userType: userType,
            Contact: {
                phoneNumber: state.phoneNumber.value,
                dateOfBirth: state.dateOfBirth.value,
                pincode: state.pincode.value,
                gender: gender,
                address: state.address.value,
                'state': state.stateNew.value,
                city: state.city.value,
            },
        };

        createUser(formData).then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error);
        })

        Spinner();
    }

    const onFocusHandler = (e) => {
        dispatch({ type: "SIGNUP_INPUT_FOCUSED", payload: e.target.name });
    }

    const onBlurHandler = (e) => {
        dispatch({
            type: "SIGNUP_INPUT_BLUR",
            payload: {
                key: e.target.name,
                value: e.target.value,
                placeholder: e.target.placeholder,
            }
        });
        if (e.target.name === 'email') {
            validateEmail({ email: state.email.value }).then((data) => {
                dispatch({
                    type: "SIGNUP_VALID_DATA",
                    payload: {
                        key: "email",
                        error: data.error,
                        value: data.message,
                        msgType: data.msgType
                    }
                });
            });
        }

        if (e.target.name === 'phoneNumber') {
            validatePhoneNumber({ phoneNumber: state.phoneNumber.value }).then((data) => {
                dispatch({
                    type: "SIGNUP_VALID_DATA",
                    payload: {
                        key: "phoneNumber",
                        error: data.error,
                        value: data.message,
                        msgType: data.msgType
                    }
                });
            });
        }

        //     if (e.target.name === "pincode") {
        //         validatePincode(state.pincode.value).then((data) => {
        //             if (data[0].Status === "Success") {
        //                 dispatch({
        //                     type: "SIGNUP_VALID_DATA",
        //                     payload: {
        //                         key: "pincode",
        //                         error: "Success",
        //                         value: `${data[0].PostOffice[0].District}, ${data[0].PostOffice[0].State}`,
        //                         msgType: "success"
        //                     }
        //                 });
        //             } else {
        //                 dispatch({
        //                     type: "SIGNUP_VALID_DATA",
        //                     payload: {
        //                         key: "pincode",
        //                         error: "Error",
        //                         value: "Pincode does not match with district/state!",
        //                         msgType: "danger"
        //                     }
        //                 });
        //             }
        //         });
        //     }

    }

    const valueChangeHandler = (e) => {
        dispatch({
            type: "SIGNUP_INPUT_CHANGE",
            payload: {
                key: e.target.name,
                value: e.target.value
            }
        });
    }

    const togglePasswordVisibility = () => {
        dispatch({ type: "SIGNUP_TOGGLE_PASSWORD_VISIBILITY" });
    };

    const genderHandler = (e) => {
        dispatch({ type: "SET_GENDER", payload: e.value });
    };

    const userTypeHandler = (e) => {
        dispatch({ type: "SIGNUP_USER_TYPE", payload: e.value });
    };

    const capitaliseDataHandler = (e) => {
        dispatch({
            type: "CAPITALISE_DATA", payload: {
                key: e.target.name,
                value: e.target.value // The user input value
            }
        })
    }

    return (
        <Container>
            <Row className="d-flex justify-content-center align-items-center">
                <Col md={10}>
                    <div className="shadow p-4 border rounded-4 m-5">
                        <h1 className="text-uppercase text-center">Register</h1>

                        <Form onSubmit={handleSubmit}>

                            <Row className="g-4 p-4">

                                <Col md={6}>
                                    <BasicInputField state={state} onBlurHandler={onBlurHandler} onFocusHandler={onFocusHandler} valueChangeHandler={valueChangeHandler} togglePasswordVisibility={togglePasswordVisibility} userTypeHandler={userTypeHandler} />
                                </Col>

                                <Col md={6}>
                                    <ContactInputField state={state} onBlurHandler={onBlurHandler} onFocusHandler={onFocusHandler} valueChangeHandler={valueChangeHandler} genderHandler={genderHandler} capitaliseDataHandler={capitaliseDataHandler} />
                                </Col>

                                <div className="d-flex align-items-center justify-content-center mt-5 mb-5">
                                    <Button type="submit" className="">
                                        Create Account
                                    </Button>
                                </div>
                            </Row>

                        </Form>

                        <div className="d-flex align-items-center justify-content-center flex-column" >
                            <p className="p-0 m-0 text-muted" >Already have an account?</p>
                            <p className="p-0 m-0 text-muted">
                                <Link to="/auth/signin">Login</Link>{" "}
                                <span>Now</span>
                            </p>

                            <p className="mt-5 mb-0 text-muted" style={{ fontSize: "12px" }}>Go back to <Link to="/">Home</Link> </p>
                        </div>
                    </div>
                </Col>
            </Row>

        </Container>
    )
}

export default SignUp;