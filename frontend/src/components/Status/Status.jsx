import React from "react";
import StatusUserCard from "./StatusUserCard";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function Status() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(-1);
  };

  return (
    <div>
      <div className="flex items-center justify-center px-[14vw] py-[7vh]">
        {/*Left section */}
        <div className="left h-[85vh] bg-[#13262c] lg:w-[30%] w-[50%] px-5">
          <div className="pt-5 h-[13%] ">
            <StatusUserCard />
          </div>
          <hr />
          <div className="overflow-y-scroll h-[86%] pt-2 ">
            {[
              1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 11, 1, 1, 1,
              1, 1, 1, 1,
            ].map((item) => (
              <StatusUserCard />
            ))}
          </div>
        </div>
        {/*Right side */}
        <div className="relative h-[85vh] lg:w[70%] w-[50%] bg-[#0b141a]">
          <AiOutlineClose
            className="text-white cursor-pointer absolute top-5 right-5 text-2xl"
            onClick={handleNavigate}
          />
        </div>
      </div>
    </div>
  );
}

export default Status;
