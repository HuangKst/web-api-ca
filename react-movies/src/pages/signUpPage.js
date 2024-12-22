import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Alert,
} from "@mui/material";

const SignUpPage = () => {
  const context = useContext(AuthContext);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [registered, setRegistered] = useState(false);
  const [error, setError] = useState("");

  const passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  const validatePassword = () => {
    if (!passwordRegEx.test(password)) {
      setError(
        "Password must be at least 8 characters long and include one letter, one number, and one special character."
      );
      return false;
    }
    if (password !== passwordAgain) {
      setError("Passwords do not match.");
      return false;
    }
    setError("");
    return true;
  };

  const register = () => {
    if (validatePassword()) {
      context.register(userName, password);
      setRegistered(true);
    }
  };

  if (registered) {
    return <Navigate to="/login" />;
  }

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5" gutterBottom>
          Sign Up
        </Typography>
        <Typography variant="body2" color="textSecondary" align="center" gutterBottom>
          You must register a username and password to log in.
        </Typography>
        <Typography variant="body2" color="textSecondary" align="center" mb={2}>
          <strong>Password Requirements:</strong> At least 8 characters, include one letter, one number, and one special character.
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1, width: "100%" }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="User Name"
            name="username"
            autoComplete="username"
            autoFocus
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="passwordAgain"
            label="Confirm Password"
            type="password"
            id="passwordAgain"
            autoComplete="current-password"
            value={passwordAgain}
            onChange={(e) => setPasswordAgain(e.target.value)}
          />
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            onClick={register}
          >
            Register
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUpPage;
