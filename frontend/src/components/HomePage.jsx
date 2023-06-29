import React, { useState } from "react";
import { TbCircleDashed } from "react-icons/tb";
import { BiCommentDetail } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import {
  BsEmojiSmile,
  BsFilter,
  BsMicFill,
  BsThreeDotsVertical,
} from "react-icons/bs";
import { ImAttachment } from "react-icons/im";
import ChatCard from "./ChatCard/ChatCard";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import MessageCard from "./MessageCard/MessageCard";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile/Profile";

const HomePage = () => {
  const [querys, setQuerys] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [content, setContent] = useState("");
  const [isProfile, setIsProfile] = useState(false);
  const navigate = useNavigate();

  const handleClickOnChatCard = () => {
    setCurrentChat(true);
  };

  const handleSearch = () => [];

  const handleCreateNewMessage = () => {};

  const handleNavigate = () => {
    // navigate("/profile");
    setIsProfile(true);
  };

  const handleCloseOpenProfile = () => {
    setIsProfile(false);
  };

  return (
    <div className="relative">
      <div className="w-full py-14 bg-blue-400"></div>
      <div className="flex bg-[#f0f2f5] h-[90vh] absolute left-[2vw] top-[7vh] w-[96vw] rounded-md">
        <div className="left w-[30%] bg-white h-full rounded-md">
          {isProfile && (
            <div className="w-full h-full">
              <Profile handleCloseOpenProfile={handleCloseOpenProfile} />
            </div>
          )}
          {!isProfile && (
            <div className="w-full">
              {/* home */}

              <div className="flex justify-between items-center px-3 p-3">
                <div
                  onClick={handleNavigate}
                  className="flex items-center space-x-3"
                >
                  <img
                    className="rounded-full w-10 h-10 cursor-pointer"
                    src="https://cdn.pixabay.com/photo/2023/06/13/15/05/astronaut-8061095_640.png"
                    alt=""
                  />
                  <p>Username</p>
                </div>
                <div className="space-x-3 text-2xl flex">
                  <TbCircleDashed
                    className="cursor-pointer"
                    onClick={() => navigate("/status")}
                  />
                  <BiCommentDetail />
                </div>
              </div>

              <div className="relative flex justify-center items-center bg-white py-4 px-3">
                <input
                  className="border-none outline-none bg-slate-200 rounded-md w-[93%] pl-9 py-2"
                  type="text"
                  placeholder="Search our start a new chat"
                  onChange={(e) => {
                    setQuerys(e.target.value);
                    handleSearch(e.target.value);
                  }}
                  value={querys}
                />
                <AiOutlineSearch className="left-6 top-7 absolute" />
                <div>
                  <BsFilter className="ml-4 text-3xl" />
                </div>
              </div>
              {/*all users will show here*/}
              <div className="bg-white overflow-scroll h-[72vh] px-3">
                {querys &&
                  [1, 1, 1].map((item) => (
                    <div onClick={handleClickOnChatCard}>
                      <hr />
                      <ChatCard />
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>

        {/*default whats up page*/}
        {!currentChat && (
          <div className="w-[70%] flex flex-col items-center justify-center h-full w">
            <div className="max-w-[70%] text-center">
              <Player
                autoplay
                loop
                src="https://assets9.lottiefiles.com/packages/lf20_gfe2ipxg.json"
                style={{ height: "300px", width: "300px" }}
              ></Player>
              <h1 className="text-4xl text-gray-600">UfoChat</h1>
              <p className="my-9">
                Send and receive message without keeping you phone online.
              </p>
            </div>
          </div>
        )}
        {/*Message part*/}

        {currentChat && (
          <div className="w-[70%] relative ">
            <div className="header absolute top-0 w-full bg-[#f0f2f5]">
              <div className="flex justify-between">
                <div className="py-3 space-x-4 flex items-center px-3">
                  <img
                    className="w-10 h-10 rounded-full"
                    src="https://cdn.pixabay.com/photo/2023/06/11/12/03/lynx-8055805_640.jpg"
                    alt=""
                  />
                  <p>username</p>
                </div>
                <div className="py-3 flex space-x-4 items-center px-3">
                  <AiOutlineSearch />
                  <BsThreeDotsVertical />
                </div>
              </div>
            </div>

            {/* message section*/}
            <div className="px-10 h-[85vh] overflow-y-scroll bg-blue-200">
              <div className="space-y-1 flex flex-col justify-center mt-20 py-2">
                {[1, 1, 1, 1].map((item, i) => (
                  <MessageCard
                    isReqUserMessage={i % 2 === 0}
                    content={"message"}
                  />
                ))}
              </div>
            </div>

            {/* Footer part */}
            <div className="footer bg-[#f0f2f5] absolute bottom-0 w-full py-3 text-2xl">
              <div className="flex justify-between items-center px-5 relative">
                <BsEmojiSmile className="cursor-pointer" />
                <ImAttachment />

                <input
                  className="py-2 outline-none border-none bg-white pl-4 rounded-md w-[85%]"
                  type="text"
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Type a message..."
                  value={content}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleCreateNewMessage();
                      setContent("");
                    }
                  }}
                />
                <BsMicFill />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
