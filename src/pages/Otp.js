import React, { useState, useRef } from 'react';
import './Otp.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const Otppage = () => {
  const { email } = useParams();
  const inputRefs = useRef(Array(6).fill(null));
  const [otpValues, setOtpValues] = useState(Array(6).fill(''));
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const nav = useNavigate();

  const handleInputChange = (index, e) => {
    const value = e.target.value;
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);

    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleOtpValue = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/verify-otp/',
        {
          email: email,
          otp: otpValues.join(''),
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Response:', response);

      if (response.data.error) {
        setErrorMessage(response.data.error);
        setSuccessMessage('');
      } else {
        setErrorMessage('');
        setSuccessMessage('OTP verified successfully.');
        setTimeout(() => {
          nav('/');
        }, 1000);
      }
    } catch (error) {
      console.error('Error during OTP verification:', error);
      setErrorMessage('An unexpected error occurred. Please try again.');
      setSuccessMessage('');
    }
  };

  const handleResendOtp = async () => {
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/resend-otp/',
        {
          email: email,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Response:', response);

      if (response.data.error) {
        setErrorMessage(response.data.error);
        setSuccessMessage('');
      } else {
        setErrorMessage('');
        setSuccessMessage('OTP resent successfully.');
      }
    } catch (error) {
      console.error('Error during OTP resend:', error);
      setErrorMessage('An unexpected error occurred. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div className='main'>
      <div className="alert-container">
        {successMessage && (
          <Stack spacing={2}>
            <Alert severity="success">{successMessage}</Alert>
          </Stack>
        )}
      </div>

      <form className="form" onSubmit={handleOtpValue}>
        <span className="close">X</span>

        <div className="info">
          <span className="title">OTP Verification</span>
          <p className="description">Please enter the code we have sent you.</p>
        </div>

        <div className="inputs">
          {inputRefs.current.map((_, index) => (
            <label key={index}>
              <input
                placeholder=""
                type="tel"
                maxLength="1"
                ref={(el) => (inputRefs.current[index] = el)}
                value={otpValues[index]}
                onChange={(e) => handleInputChange(index, e)}
              />
            </label>
          ))}
        </div>

        <input className="validate" type='submit' value="Verify" />
        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}

        <p className="resend">
          Didn't receive the code? <button className="resend-action" onClick={handleResendOtp}>Resend</button>
        </p>
      </form>
    </div>
  );
};

export default Otppage;
