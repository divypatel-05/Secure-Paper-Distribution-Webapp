import { useState } from "react";
import { Navigate, Link, Form } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  function isInputInvalid(text) {
    return !text || text.trim() === "";
  }
  const onSignup = async (e) => {
    e.preventDefault();

    setErrorMessage("");

    if (isInputInvalid(email) || isInputInvalid(password)) {
      setErrorMessage("*Invalid input");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("*Password minimun length: 6");
      return;
    }
    if (confirmPassword !== password) {
      setErrorMessage("*Password mismatch");
      return;
    }
  };
  return (
    <Form method="post">
      <h1>Sign Up</h1>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />

      <input
        type="password"
        id="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />

      <input
        type="password"
        id="cfpassword"
        name="cfpassword"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => {
          setconfirmPassword(e.target.value);
        }}
      />

      <button onClick={onSignup}>
        {/* {isRegistering ? "Signing Up..." : "Sign Up"} */}
      </button>
      {errorMessage && <span className="text-red-600">{errorMessage}</span>}
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </Form>
  );
}

export default Signup;
