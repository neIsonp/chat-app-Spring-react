import React, { useState } from "react";
import { BsArrowLeft, BsCheck2, BsPencil } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/auth/Action";
import { upload } from "@testing-library/user-event/dist/upload";

function Profile({ handleCloseOpenProfile }) {
  const [flag, setFlag] = useState(false);
  const [username, setUsername] = useState(null);
  const [tempPicture, setTempPicture] = useState(null);
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();

  const handleFlag = () => {
    setFlag(true);
  };

  const handleCheckClick = () => {
    setFlag(false);
  };

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  const uploadToCloud = (pics) => {
    const data = new FormData();

    data.append("file", pics);
    data.append("upload_preset", "ufochat");
    data.append("cloud_name", "dcwu97ie4");

    fetch("https://api.cloudinary.com/v1_1/dcwu97ie4/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((dataa) => {
        console.log("imgUrl", dataa);
        setTempPicture(dataa.url.toString());
        // setMessage("profile image updated!");
        // setOpen(true);
        const data = {
          id: auth.reqUser.id,
          token: localStorage.getItem("token"),
          data: { profile_picture: dataa.url.toString() },
        };

        dispatch(updateUser(data));
      });
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
            className="cursor-pointer"
            src={
              tempPicture ||
              "https://cdn3.iconfinder.com/data/icons/halloween-2278/512/halloween_avatar_costume_masquerade-36-512.png"
            }
            alt=""
            style={{ borderRadius: "50%", width: "20vw", height: "20vw" }}
          />
        </label>
        <input
          onChange={(e) => uploadToCloud(e.target.files[0])}
          type="file"
          name=""
          id="imgInput"
          className="hidden"
        />
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
