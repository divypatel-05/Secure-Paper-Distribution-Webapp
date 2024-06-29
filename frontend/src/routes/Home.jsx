import React from "react";
import { useSelector } from "react-redux";
import { ExaminorHome } from "../components";

const Home = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <>
      {user && user.role === "examiner" ? (
        <ExaminorHome />
      ) : (
        <h1>Hello world</h1>
      )}
    </>
  );
};

export default Home;
