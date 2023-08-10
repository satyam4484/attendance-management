import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { validateOtp } from '../../network/agent';
import { useGlobalContext } from '../../context/Context';
import Input from './Units/Input';
import { useNavigate } from 'react-router-dom';

const OtpForm = ({ show, onHide, user_id }) => {

    const { setMessage } = useGlobalContext();

    const navigate = useNavigate();

    const [otpCode, setOtpCode] = useState('');

    const handleOtpChange = (e) => {
        setOtpCode(e.target.value);
    };

    const handleVerifyClick = () => {

        if (otpCode.length !== 6) {
            setOtpCode('');
            setMessage(true, "error", "Please enter a valid OTP!");
            return;
        }

        validateOtp({
            user_id: user_id,
            otp: otpCode
        }).then(response => {
            if (response.error === false) {
                // setOtpCode('')
                setMessage(true, "success", "OTP verified successfully!");
                setTimeout(() => {
                    navigate('/auth/signin')
                }, [2000])
            } else {
                setOtpCode('')
                setMessage(true, "error", "Invalid OTP! Please try again!");
            }
        }).catch(error => {
            console.log(error);
        })
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            backdrop="static"
            keyboard={false}
            className="border-0"
        >
            <Modal.Header className="border-0 d-flex justify-content-center align-items-center">
                <Modal.Title>OTP Verification</Modal.Title>
            </Modal.Header>
            <Modal.Body className="border-0">
                <Form className="border border-0 rounded-4">
                    <div className="pe-4 ps-4">
                        <Input
                            type="text"
                            label="Enter OTP"
                            // autoFocus
                            value={otpCode}
                            onChange={handleOtpChange}
                            style={{ letterSpacing: "3px" }}
                        />
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer className="border-0 d-flex justify-content-center align-items-center pb-4">
                <Button variant="success" className="rounded-4 ps-3 pe-3 pt-2 pb-2" onClick={handleVerifyClick}>
                    Verify
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default OtpForm;
