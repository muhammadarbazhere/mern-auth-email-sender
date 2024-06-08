import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [inputs, setInputs] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    dateOfBirth: '',
    image: null,
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
  
    try {
      const formData = new FormData();
      formData.append('firstName', inputs.firstName);
      formData.append('lastName', inputs.lastName);
      formData.append('email', inputs.email);
      formData.append('password', inputs.password);
      formData.append('dateOfBirth', inputs.dateOfBirth);
      formData.append('image', inputs.image);
  
      const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });
  
      if (!response.ok) {
        const responseData = await response.json();
        throw new Error(responseData.message || "Signup failed");
      }
  
      console.log('Signup successful');
      
      // Navigate to login page
      navigate('/login');
  
      // Show success message to user
       alert('Account created successfully. Please check your email for confirmation.');
  
      // Clear form inputs
      setInputs({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        dateOfBirth: '',
        image: null,
      });
  
    } catch (err) {
      console.error(err);
      if (err.message === "Please upload an image" || err.message === "User already exists!" || err.message === "Error sending email. Signup succeeded but email sending failed.") {
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
          <Typography variant="h2">Signup</Typography>

          <TextField
            onChange={(e) => setInputs({ ...inputs, firstName: e.target.value })}
            value={inputs.firstName}
            variant="outlined"
            placeholder="First Name"
            margin="normal"
            required
          />
          <TextField
            onChange={(e) => setInputs({ ...inputs, lastName: e.target.value })}
            value={inputs.lastName}
            variant="outlined"
            placeholder="Last Name"
            margin="normal"
            required
          />
          <TextField
            onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            type="email"
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
          <TextField
            onChange={(e) => setInputs({ ...inputs, dateOfBirth: e.target.value })}
            type="date"
            value={inputs.dateOfBirth}
            variant="outlined"
            placeholder="Date of Birth"
            margin="normal"
            required
          />
          <Button
            variant="contained"
            component="label"
            style={{ marginTop: '1rem' }}
          >
            Upload Image
            <input
              type="file"
              // hidden
              name="image"
              onChange={(e) => setInputs({ ...inputs, image: e.target.files[0] })}
              accept="image/*"
              required
            />
          </Button>
          <Button variant="contained" type="submit" style={{ marginTop: '1rem' }}>
            Signup
          </Button>
        </Box>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default Signup;
