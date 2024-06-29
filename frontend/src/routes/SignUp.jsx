import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const [formData, setFormData] = useState({
    name: "",
    enrollment: "",
    password: "",
    gender: "",
    email: "",
    phone: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!checkConfirmPassword()) {
      setErrorMessage("* passwords do not match");
    } else if (formData.name.trim().length < 6) {
      setErrorMessage("* name must be at least 6 characters");
    } else if (formData.enrollment.trim().length !== 12) {
      setErrorMessage("* enrollment must be 12 digits");
    } else if (!pattern.test(formData.email)) {
      setErrorMessage("* invalid email");
    } else if (formData.phone.trim().length !== 10) {
      setErrorMessage("* phone number must be 10 digits");
    } else if (formData.password.trim().length < 8) {
      setErrorMessage("* password must be at least 8 characters");
    } else {
      setFormData({
        name: "",
        enrollment: "",
        password: "",
        gender: "",
        email: "",
        phone: "",
      });
      setErrorMessage("");
      setConfirmPassword("");
    }
  };

  const checkConfirmPassword = () => {
    if (confirmPassword !== formData.password) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <>
      <div className="text-center flex flex-col justify-center items-center h-screen">
        <form
          className="flex flex-col justify-center items-center border border-blue-300 p-2.5 rounded-lg w-4/12 gap-4"
          onSubmit={handleSubmit}
        >
          <h1 className="text-3xl font-bold">Sign Up</h1>
          {/* Name */}
          <div className="flex flex-col text-left w-full">
            <label htmlFor="name" className="font-medium text-gray-600">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              value={formData.name}
              onChange={handleInput}
              placeholder="John Doe"
              className="border border-black p-2.5 rounded-md w-full placeholder:text-gray-300 spinner-none"
            />
          </div>

          {/* Enrollment */}
          <div className="flex flex-col text-left w-full">
            <label htmlFor="enrollment" className="font-medium text-gray-600">
              Enrollment no.
            </label>
            <input
              type="number"
              name="enrollment"
              id="enrollment"
              required
              value={formData.enrollment}
              onChange={handleInput}
              placeholder="210280107111"
              className="border border-black p-2.5 rounded-md w-full placeholder:text-gray-300 spinner-none"
            />
          </div>

          {/* Email & phone */}
          <div className="flex gap-2 justify-between w-full">
            <div className="flex flex-col text-left w-full">
              <label htmlFor="email" className="font-medium text-gray-600">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                value={formData.email}
                onChange={handleInput}
                placeholder="dpatel@gmail.com"
                className="border border-black p-2.5 rounded-md w-full placeholder:text-gray-300 spinner-none"
              />
            </div>

            <div className="flex flex-col text-left w-full">
              <label htmlFor="phone" className="font-medium text-gray-600">
                Phone no.
              </label>
              <input
                type="number"
                name="phone"
                id="phone"
                required
                value={formData.phone}
                onChange={handleInput}
                placeholder="9876543210"
                className="border border-black p-2.5 rounded-md w-full placeholder:text-gray-300 spinner-none"
              />
            </div>
          </div>

          {/* gender */}
          <div className="flex flex-col text-left w-full">
            <label htmlFor="gender" className="font-medium text-gray-600">
              Gender
            </label>
            <div className="flex gap-4 items-center">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  id="male"
                  value="male"
                  required
                  onChange={handleInput}
                  checked={formData.gender === "male"}
                />
                <label htmlFor="male">Male</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  id="female"
                  value="female"
                  required
                  onChange={handleInput}
                  checked={formData.gender === "female"}
                />
                <label htmlFor="female">Female</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  id="other"
                  value="other"
                  required
                  onChange={handleInput}
                  checked={formData.gender === "other"}
                />
                <label htmlFor="female">Other</label>
              </div>
            </div>
          </div>

          {/* Password and confirm password */}
          <div className="flex gap-2 justify-between w-full">
            <div className="flex flex-col text-left w-full">
              <label htmlFor="enrollment" className="font-medium text-gray-600">
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

            <div className="flex flex-col text-left w-full">
              <label
                htmlFor="cnfpassword"
                className="font-medium text-gray-600"
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="cnfpassword"
                id="cnfpassword"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="********"
                className="border border-black p-2.5 rounded-md w-full placeholder:text-gray-300 spinner-none"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="flex flex-col text-left w-full gap-2">
            <p className="text-red-500 font-medium">{errorMessage}</p>
            <button
              className="p-2.5 bg-blue-600 text-white hover:bg-blue-700 rounded-md font-medium"
              type="submit"
            >
              Register
            </button>
            <p className="text-sm mt-2">
              Already have an account?{" "}
              <Link to="/login">
                <span className="text-blue-500 cursor-pointer">Login</span>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;
