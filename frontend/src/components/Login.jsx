import { Link } from "react-router-dom";
import { useState } from "react";

function Login() {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  function isInputInvalid(text) {
    return !text || text.trim() === "";
  }

  const onLogin = async (e) => {
    e.preventDefault();

    setErrorMessage("");

    if (isInputInvalid(email) || isInputInvalid(password)) {
      setErrorMessage("*Invalid input");
      return;
    }
  };
  return (
    <>
      <form onSubmit={onLogin}>
        <h1>Login</h1>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInput}
        />

        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInput}
        />

        <button type="submit">Login</button>
        {errorMessage && <span className="text-red-600">{errorMessage}</span>}
        <p>
          Don't have an account? <button>Sign Up</button>
        </p>
      </form>
    </>
  );
}

export default Login;
