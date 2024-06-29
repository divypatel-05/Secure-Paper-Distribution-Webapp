import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addPaper } from "../features/paperSlice";
import { NavLink } from "react-router-dom";

const ExaminorHome = () => {
    const papers = useSelector((state) => state.paper.papers);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const getPapers = async () => {
        try {
            const res = await axios.get(
                "http://localhost:8000/api/v1/examiner/paper",
                {
                    withCredentials: true,
                }
            );
            if (res.status === 200) {
                dispatch(addPaper(res.data.papers));
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getPapers();
    }, []);

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

    const handleDownload = async ({ url, fileName }) => {
        await fetch(url)
            .then((response) => response.blob())
            .then((blob) => {
                const url = window.URL.createObjectURL(new Blob([blob]));
                const link = document.createElement("a");
                link.href = url;
                link.download = fileName || "downloaded-file";
                document.body.appendChild(link);

                link.click();

                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
            })
            .catch((error) => {
                console.error("Error fetching the file:", error);
            });
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
                                <iframe
                                    src={paper.url}
                                    frameBorder="0"
                                ></iframe>
                                <p className="text-center font-medium">
                                    {paper.name}
                                </p>
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
