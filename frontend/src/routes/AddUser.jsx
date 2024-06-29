import React, { useState } from "react";
import { Navbar } from "../components";

const AddUser = () => {
  const pattern = /[\w_\.]+@([\w]+\.)+[\w-]{2,10}/gi;
  const [formData, setFormData] = useState({
    role: "",
    name: "",
    password: "",
    email: "",
    phone: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    if (formData.name.trim().length < 6) {
      setErrorMessage("* name must be at least 6 characters");
    } else if (!pattern.test(formData.email)) {
      setErrorMessage("* invalid email");
    } else if (formData.phone.trim().length !== 10) {
      setErrorMessage("* phone number must be 10 digits");
    } else if (formData.password.trim().length < 8) {
      setErrorMessage("* password must be at least 8 characters");
    } else {
      setFormData({
        role: "",
        name: "",
        password: "",
        email: "",
        phone: "",
      });
      setErrorMessage("");
    }
  };

  return (
    <>
      <Navbar />
      <div className="text-center flex flex-col justify-center items-center h-screen">
        <form
          className="flex flex-col justify-center items-center border border-blue-300 p-2.5 rounded-lg lg:w-6/12 sm:w-8/12 md:gap-4 w-11/12 m-2.5"
          onSubmit={handleSubmit}
        >
          <h1 className="text-3xl font-semibold">Add User</h1>

          {/* Role */}
          <div className="flex flex-col text-left w-full">
            <label htmlFor="role" className="font-medium text-gray-600">
              Role
            </label>
            <select
              name="role"
              id="role"
              className="border border-black p-2.5 rounded-md w-full placeholder:text-gray-300 spinner-none"
              required
              value={formData.role}
              onChange={handleInput}
            >
              <option value="" disabled>
                Select
              </option>
              <option value="examinor">Examinor</option>
              <option value="invigilator">Invigilator</option>
            </select>
          </div>

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

          {/* Email & phone*/}
          <div className="flex w-full md:gap-2 md:flex-row flex-col">
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
                pattern="[\w_\.]+@([\w]+\.)+[\w\-]{2,10}"
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

          {/* Password */}
          <div className="flex flex-col text-left w-full">
            <label htmlFor="password" className="font-medium text-gray-600">
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

          {/* Submit */}
          <div className="flex flex-col text-left w-full gap-2">
            <p className="text-red-500 font-medium">{errorMessage}</p>
            <button
              className="p-2.5 bg-blue-600 text-white hover:bg-blue-700 rounded-md font-medium"
              type="submit"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddUser;
