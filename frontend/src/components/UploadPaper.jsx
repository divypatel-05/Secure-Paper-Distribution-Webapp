import React from "react";

const UploadPaper = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-4/12 mx-auto"
      >
        <h1 className="text-3xl font-semibold text-center">Paper Details</h1>
        <div className="flex flex-col">
          <label htmlFor="year">Year</label>
          <input
            type="number"
            name="year"
            id="year"
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
            className="p-2.5 border border-black rounded-md"
            placeholder="branch"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="subjectcode">Subject code</label>
          <input
            type="number"
            name="subjectcode"
            id="subjectcode"
            className="spinner-none p-2.5 border border-black rounded-md"
            placeholder="subject code"
          />
        </div>
        <div className="flex flex-col">
          {/* <label htmlFor="paperfile">Subject code</label>
          <input
            type="file"
            name="paperfile"
            id="paperfile"
            className="border border-black rounded-md"
          /> */}

          {/* <label
            className="block mb-2 text-sm font-medium text-gray-900"
            htmlFor="file_input"
          >
            Upload file
          </label>
          <input
            className="block w-full mb-5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="file_input"
            type="file"
          /> */}

          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input id="dropzone-file" type="file" className="hidden" />
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Upload Paper
        </button>
      </form>
    </>
  );
};

export default UploadPaper;
