import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../Store';

function Login() {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputs),
        credentials: 'include',
      });

      if (response.ok) {
        console.log('Login successful');
        dispatch(authActions.login());
        navigate('/welcome');
        alert('Login successful. Welcome!');
        setInputs({
          email: '',
          password: '',
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      if (err.message === "Email not found, please sign up" || err.message === "Incorrect password") {
        setError(err.message);
      } else {
        setError("Server error");
      }
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          width={300}
          marginLeft="auto"
          marginRight="auto"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h2">Login</Typography>

          <TextField
            onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            value={inputs.email}
            variant="outlined"
            placeholder="Email"
            name="email"
            margin="normal"
            required
          />
          <TextField
            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
            type="password"
            value={inputs.password}
            variant="outlined"
            placeholder="Password"
            margin="normal"
            required
          />
          <Button variant="contained" type="submit" style={{ marginTop: '1rem' }}>
            Login
          </Button>
        </Box>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default Login;
