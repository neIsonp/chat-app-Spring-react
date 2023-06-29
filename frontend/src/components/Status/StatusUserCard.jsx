import React from "react";
import { useNavigate } from "react-router-dom";

function StatusUserCard() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/status/{userId}");
  };

  return (
    <div
      onClick={handleNavigate}
      className="flex items-center p-3 cursor-pointer"
    >
      <div>
        <img
          className="h-7 w-7 lg:w-10 lg:h-10 rounded-full"
          src="https://static.vecteezy.com/system/resources/previews/020/002/571/original/astronaut-graphic-clipart-design-free-png.png"
          alt=""
        />
      </div>
      <div className="ml-2 text-white ">
        <p>Username</p>
      </div>
    </div>
  );
}

export default StatusUserCard;
