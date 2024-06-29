import React from "react";
import { useSelector } from "react-redux";
import { ExaminorHome, DisplayPDF } from "../components";
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
        <DisplayPDF />
      )}
    </>
  );
};

export default Home;
