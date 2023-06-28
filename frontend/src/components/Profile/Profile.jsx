import React, { useState } from "react";
import { BsArrowLeft, BsCheck2, BsPencil } from "react-icons/bs";

function Profile({ handleCloseOpenProfile }) {
  const [flag, setFlag] = useState(false);
  const [username, setUsername] = useState(null);

  const handleFlag = () => {
    setFlag(true);
  };

  const handleCheckClick = () => {
    setFlag(false);
  };

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  return (
    <div className="w-full h-full">
      <div className="flex items-center space-x-10 bg-blue-500 text-white pt-16 pb-5 px-1">
        <BsArrowLeft
          className="cursor-pointer text-2xl font-bold"
          onClick={handleCloseOpenProfile}
        />
        <p className="cursor-pointer font-semibold">Profile</p>
      </div>
      {/* profile picture */}
      <div className="flex flex-col justify-center items-center my-12">
        <label htmlFor="imgInput">
          <img
            className="rounded-full w-[15vw] h-[vw] cursor-pointer"
            src="https://cdn.pixabay.com/photo/2022/03/10/13/59/astronaut-7059915_1280.png"
            alt=""
          />
        </label>
        <input type="file" name="" id="imgInput" className="hidden" />
      </div>

      {/*Name Section */}
      <div className="bg-white mx-4 px-2">
        <p className="py-3">Your name</p>

        {!flag && (
          <div className="w-full flex justify-between items-center">
            <p className="py-3">{username || "Username"}</p>
            <BsPencil onClick={handleFlag} className="cursor-pointer" />
          </div>
        )}

        {flag && (
          <div className="w-full flex justify-between items-center py-2">
            <input
              onChange={handleChange}
              className="w-[80%] outline-none border-b-2 border-blue-700 p-2"
              type="text"
              placeholder="Enter your name"
            />
            <BsCheck2
              onClick={handleCheckClick}
              className="cursor-pointer text-2xl"
            />
          </div>
        )}
      </div>
      <div className="px-3 my-5">
        <p className="py-10">
          this is not your username, this name will be visible to your UfoChat
          contacts
        </p>
      </div>
    </div>
  );
}

export default Profile;
