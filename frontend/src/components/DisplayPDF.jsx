import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { addPaper } from "../features/paperSlice";
import Loader from "./Loader";

const DisplayPDF = () => {
    const papers = useSelector((state) => state.paper.papers);
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

    const handleDownload = ({ url, fileName }) => {
        fetch(url)
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
            {loading ? (
                <>
                    <Loader />
                </>
            ) : (
                <>
                    <h1 className="text-2xl font-bold text-gray-800 text-center my-8">
                        Papers
                    </h1>
                    <div className="grid grid-cols-3 gap-4 w-10/12 mx-auto items-center justify-center">
                        {papers &&
                            papers.length > 0 &&
                            papers.map((paper, index) => (
                                <div
                                    key={index}
                                    className="p-2.5 w-96 h-fit rounded-md border border-blue-300 overflow-hidden scrollbar-none flex flex-col gap-2"
                                >
                                    <iframe
                                        src={paper.url}
                                        frameborder="0"
                                    ></iframe>
                                    <p className="text-center font-medium">
                                        {paper.subjectcode}
                                    </p>
                                    <div className="flex gap-2 justify-between">
                                        <a
                                            href={paper.url}
                                            target="_blank"
                                            className="w-full text-white text-center font-semibold rounded-md bg-blue-600 hover:bg-blue-700 p-2.5"
                                        >
                                            View
                                        </a>
                                        <a
                                            download
                                            onClick={() =>
                                                handleDownload({
                                                    url: paper.url,
                                                    fileName: `${paper.subjectcode}.pdf`,
                                                })
                                            }
                                            className="w-full cursor-pointer text-center text-white font-semibold rounded-md bg-blue-600 hover:bg-blue-700 p-2.5"
                                        >
                                            Download
                                        </a>
                                    </div>
                                </div>
                            ))}
                    </div>{" "}
                </>
            )}
        </>
    );
};

export default DisplayPDF;
