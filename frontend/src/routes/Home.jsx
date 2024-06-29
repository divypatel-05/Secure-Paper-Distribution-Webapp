import React from "react";
import { useSelector } from "react-redux";
import { ExaminorHome } from "../components";
import { Admin } from "../routes";

const Home = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <>
      {user && user.role === "examiner" ? (
        <ExaminorHome />
      ) : user.role === "admin" ? (
        <Admin />
      ) : (
        <h1>Hello Invi</h1>
      )}
    </>
  );
};

export default Home;
