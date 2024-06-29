import axios from "axios";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addPaper } from "../features/paperSlice";
import { NavLink } from "react-router-dom";

const ExaminorHome = () => {
  const { papers } = useSelector((state) => state.paper);
  const dispatch = useDispatch();

  const handleDelete = async (_id) => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/v1/examiner/paper/${_id}`,
        { withCredentials: true }
      );
      if (res.status === 200) {
        const newPapers = papers.filter(
          (paper) => paper._id.toString() !== _id.toString()
        );
        dispatch(addPaper(newPapers));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-4">
        <NavLink
          to={"/uploadpaper"}
          className="text-center font-medium mt-16 w-2/12 mx-auto p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
        >
          Upload Paper
        </NavLink>
        <div className="grid grid-cols-3 gap-4">
          {papers &&
            papers.length > 0 &&
            papers.map((paper, index) => (
              <div
                key={index}
                className="relative p-2.5 w-full rounded-md border border-blue-300"
              >
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5SwD-Q0jF1cOiBaCdDdNY5h_okbdDBKFlTg&s"
                  alt="Img"
                />
                <p className="text-center font-medium">Paper Name</p>
                <button
                  className="absolute top-2 right-2 bg-red-400 hover:bg-red-500 rounded-md p-2"
                  onClick={() => handleDelete(paper._id)}
                >
                  🗑️
                </button>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default ExaminorHome;
