import React from "react";

const ExaminorHome = () => {
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-4">
        <button className="font-medium mt-16 w-2/12 mx-auto p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
          Upload Paper
        </button>
        <div className="grid grid-cols-3 gap-4">
          {items.map((item, id) => (
            <div
              key={id}
              className="relative p-2.5 w-full rounded-md border border-blue-300"
            >
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5SwD-Q0jF1cOiBaCdDdNY5h_okbdDBKFlTg&s"
                alt="Img"
              />
              <p className="text-center font-medium">Paper Name</p>
              <button className="absolute top-2 right-2 bg-red-400 hover:bg-red-500 rounded-md p-2">
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
