import React, { useState } from "react";
import { Form, Row, Col, Button, Container, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import Icon from '../../UI/Icon';
import Input from '../Units/Input';
import { signinUser, getUser } from "../../../network/agent";
import { useGlobalContext } from "../../../context/Context";

const intialState = {
  email: "",
  password: "",
};

const SignIn = () => {

  const { toggleSpinner, setMessage, loginUser } = useGlobalContext();

  const [seePassword, setSeePassword] = useState("password");
  const [data, setData] = useState(intialState);

  const togglePasswordVisibility = (e) => {
    if (seePassword === "password") {
      setSeePassword("text");
    } else {
      setSeePassword("password");
    }
  }

  const onChangeHandler = (e) => {
    setData((state) => {
      return { ...state, [e.target.name]: e.target.value };
    });
  };

  const inputFields = [
    {
      label: "Email",
      type: "email",
      name: "email",
      value: data.email,
      placeholder: 'Email',
    },
    {
      label: "Password",
      type: seePassword,
      name: "password",
      value: data.password,
      placeholder: 'Password',
      className: 'rounded-start-4 rounded-end-0 outline-end-0 border-end-0',
      ariaDescribedBy: 'basic-addon1',
      togglePasswordVisibility: togglePasswordVisibility,
    },
  ]

  const submitLoginForm = (e) => {
    e.preventDefault();

    if (data.email.trim().length === 0 || data.password.trim().length === 0) {
      setMessage(true, "error", "Please fill all the fields!");
      return;
    }

    toggleSpinner();

    signinUser({ email: data.email, password: data.password })
      .then((response) => {
        if (response.error === false) {
          setMessage(true, "success", "Logged in successfully!");
          localStorage.setItem("token", response.data.token);

          getUser().then(({ error, data }) => {
            if (!error) {
              localStorage.setItem("userData", JSON.stringify(data));
              loginUser(data);
              setData(intialState);
            }
          });
        } else {
          setMessage(true, "error", "Invalid email or password!");
        }
      })
      .catch((error) => {
        console.log(error);
      })
  };

  return (
    <Container>
      <Row className="d-flex justify-content-center align-items-center">
        <Col md={8}>
          <div className="shadow p-4 border rounded-4 m-4">

            <h1 className="text-uppercase text-center">Login</h1>

            <Form className="p-4" onSubmit={submitLoginForm}>
              {inputFields.map(({ label, type, name, value, placeholder, className, ariaDescribedBy, togglePasswordVisibility }) => (
                <div key={name} className="mb-2">
                  <InputGroup>
                    <Input

                      label={label}
                      type={type}
                      name={name}
                      value={value}
                      placeholder={placeholder}
                      className={className}
                      aria-describedby={ariaDescribedBy}
                      onChange={onChangeHandler}
                    />
                    {name === "password" && (
                      <Button
                        className={`rounded-end-4 bg-white border-start-0`}
                        style={{ borderColor: 'lightgrey' }}
                        id="button-addon1"
                        onClick={togglePasswordVisibility}
                      >
                        {seePassword === 'password' ? (
                          <Icon name="EyeOff" color="#1c1c1c" size="18" />
                        ) : (
                          <Icon name="Eye" color="#1c1c1c" size="18" />
                        )}
                      </Button>
                    )}
                  </InputGroup>

                </div>
              ))}

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