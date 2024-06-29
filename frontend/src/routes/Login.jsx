import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <div className="text-center flex flex-col justify-center items-center h-screen">
        <form className="flex flex-col justify-center items-center border border-blue-300 p-2.5 rounded-lg w-4/12 gap-4">
          <h1 className="text-3xl font-bold">Login</h1>
          <div className="flex flex-col text-left w-full">
            <label htmlFor="enrollment" className="font-medium">
              Enrollment no.
            </label>
            <input
              type="number"
              name="enrollment"
              id="enrollment"
              required
              placeholder="210280107111"
              className="border border-black p-2.5 rounded-md w-full placeholder:text-gray-300 spinner-none"
            />
          </div>
          <div className="flex flex-col text-left w-full">
            <label htmlFor="enrollment" className="font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              required
              placeholder="********"
              className="border border-black p-2.5 rounded-md w-full placeholder:text-gray-300 spinner-none"
            />
          </div>
          <div className="flex flex-col text-left w-full gap-2">
            <p className="text-sm text-blue-500 cursor-pointer">
              Forget Password?
            </p>
            <button className="p-2.5 bg-blue-600 text-white hover:bg-blue-700 rounded-md font-medium">
              Login
            </button>
            <p className="text-sm mt-2">
              Don't have an account?{" "}
              <Link to="/signup">
                <span className="text-blue-500 cursor-pointer">
                  Register here
                </span>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
