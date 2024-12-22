import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";

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
    <>
      <h2>Sign Up Page</h2>
      <p>
        You must register a username and password to log in. <br />
        <strong>Password Requirements:</strong> At least 8 characters, include
        one letter, one number, and one special character.
      </p>
      <input
        value={userName}
        placeholder="User name"
        onChange={(e) => setUserName(e.target.value)}
      />
      <br />
      <input
        value={password}
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <input
        value={passwordAgain}
        type="password"
        placeholder="Password again"
        onChange={(e) => setPasswordAgain(e.target.value)}
      />
      <br />
      {/* Display error message */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={register}>Register</button>
    </>
  );
};

export default SignUpPage;