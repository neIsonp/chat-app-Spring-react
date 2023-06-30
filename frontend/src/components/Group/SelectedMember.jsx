import React from "react";
import { AiOutlineClose } from "react-icons/ai";

function SelectedMember({ handleRemoveMember, member }) {
  return (
    <div className="flex items-center bg-slate-300 rounded-full">
      <img
        className="w-7 h-7 rounded-full"
        src="https://cdn.pixabay.com/photo/2023/05/23/14/38/mountain-8012898_640.jpg"
        alt=""
      />
      <p className="px-2">Username</p>
      <AiOutlineClose
        className="pr-1 cursor-pointer"
        onClick={handleRemoveMember}
      />
    </div>
  );
}

export default SelectedMember;
