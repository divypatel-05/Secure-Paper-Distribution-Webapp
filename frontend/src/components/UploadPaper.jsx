import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addPaper } from "../features/paperSlice";
import Loader from "./Loader";

const UploadPaper = () => {
  const navigate = useNavigate();
  const papers = useSelector((state) => state.paper.papers);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [inputData, setInputData] = useState({
    year: "",
    semester: "",
    branch: "",
    subject: "",
    paper: "",
  });

  const handleInput = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // send data to server
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("year", inputData.year);
      formData.append("semester", inputData.semester);
      formData.append("branch", inputData.branch);
      formData.append("subject", inputData.subject);
      formData.append("paper", inputData.paper);

      const res = await axios.post(
        "http://localhost:8000/api/v1/examiner/paper",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res.status === 200) {
        dispatch(addPaper([res.data.paper, ...papers]));
        setLoading(false);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 w-4/12 mx-auto"
          encType="multipart/form-data"
        >
          <h1 className="text-3xl font-semibold text-center">Paper Details</h1>
          <div className="flex flex-col">
            <label htmlFor="year">Year</label>
            <input
              type="number"
              name="year"
              id="year"
              required
              min={2000}
              max={2024}
              value={inputData.year}
              onChange={handleInput}
              className="spinner-none p-2.5 border border-black rounded-md"
              placeholder="Year"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="semester">Semester</label>
            <input
              type="number"
              name="semester"
              id="semester"
              required
              min={1}
              max={8}
              value={inputData.semester}
              onChange={handleInput}
              className="spinner-none p-2.5 border border-black rounded-md"
              placeholder="semester"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="branch">Branch</label>
            <input
              type="text"
              name="branch"
              id="branch"
              required
              value={inputData.branch}
              onChange={handleInput}
              className="p-2.5 border border-black rounded-md"
              placeholder="branch"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="subject">Subject code</label>
            <input
              type="number"
              name="subject"
              id="subject"
              required
              value={inputData.subject}
              onChange={handleInput}
              className="spinner-none p-2.5 border border-black rounded-md"
              placeholder="subject code"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="paper">Paper</label>
            <input
              type="file"
              name="paper"
              id="paper"
              required
              onChange={handleFile}
              className="p-2.5 border border-black rounded-md"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Upload Paper
          </button>
        </form>
      )}
    </>
  );
};

export default UploadPaper;
