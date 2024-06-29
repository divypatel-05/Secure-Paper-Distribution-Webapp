import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../features/userSlice.js";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password.trim().length < 8) {
      setErrorMessage("* password must be at least 8 characters");
    } else {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/login",
        formData,
        {
          withCredentials: true,
        }
      );

      dispatch(addUser(res.data.user));
      navigate("/");
      setErrorMessage("");
      setFormData({
        email: "",
        password: "",
      });
    }
  };

  return (
    <>
      <div className="text-center flex flex-col justify-center items-center h-screen">
        <form
          className="flex flex-col justify-center items-center border border-blue-300 p-2.5 rounded-lg sm:w-6/12 md:w-5/12 lg:w-4/12 w-11/12 gap-4"
          onSubmit={handleSubmit}
        >
          <h1 className="text-3xl font-semibold">Login</h1>
          <div className="flex flex-col text-left w-full">
            <label htmlFor="email" className="font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              value={formData.email}
              onChange={handleInput}
              placeholder="niga@odoo.com"
              className="border border-black p-2.5 rounded-md w-full placeholder:text-gray-300 spinner-none"
            />
          </div>
          <div className="flex flex-col text-left w-full">
            <label htmlFor="password" className="font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              required
              value={formData.password}
              onChange={handleInput}
              placeholder="********"
              className="border border-black p-2.5 rounded-md w-full placeholder:text-gray-300 spinner-none"
            />
          </div>
          <div className="flex flex-col text-left w-full gap-2">
            <p className="text-red-500 font-medium">{errorMessage}</p>
            <p className="text-sm text-blue-500 cursor-pointer">
              Forget Password?
            </p>
            <button
              className="p-2.5 bg-blue-600 text-white hover:bg-blue-700 rounded-md font-medium"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
