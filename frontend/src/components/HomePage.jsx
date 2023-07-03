import React, { useEffect, useState } from "react";
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
import { Button, Menu, MenuItem } from "@mui/material";
import CreateGroup from "./Group/CreateGroup";
import { useDispatch, useSelector } from "react-redux";
import { currentUser, logout, searchUser } from "../redux/auth/Action";
import { createChat, getUsersChat } from "../redux/chat/Action";
import { createMessage, getAllMessages } from "../redux/message/Action";

const HomePage = () => {
  const [querys, setQuerys] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [content, setContent] = useState("");
  const [isProfile, setIsProfile] = useState(false);
  const [isGroup, setIsGroup] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth, chat, message } = useSelector((store) => store);
  const token = localStorage.getItem("token");

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickOnChatCard = (userId) => {
    // setCurrentChat(item);
    // console.log(userID, "----", item);
    // console.log(userId);
    dispatch(createChat({ token, data: { userId } }));
    setQuerys("");
  };

  const handleSearch = (keyword) => {
    dispatch(searchUser({ keyword, token }));
  };

  const handleCreateNewMessage = () => {
    dispatch(
      createMessage({
        token,
        data: { chatId: currentChat.id, content: content },
      })
    );
    console.log("created new message");
  };

  useEffect(() => {
    dispatch(getUsersChat({ token }));
  }, [chat.createChat, chat.CreateGroup]);

  useEffect(() => {
    if (currentChat?.id) {
      dispatch(getAllMessages({ chatId: currentChat.id, token }));
    }
  }, [currentChat, message.newMessage]);

  const handleNavigate = () => {
    // navigate("/profile");
    setIsProfile(true);
  };

  const handleCloseOpenProfile = () => {
    setIsProfile(false);
  };

  const handleCreategroup = () => {
    setIsGroup(true);
  };

  useEffect(() => {
    dispatch(currentUser(token));
  }, [token]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/signin");
  };

  useEffect(() => {
    if (!auth.reqUser) {
      navigate("/signin");
    }
  }, [auth.reqUser]);

  const handleCurrentChat = (item) => {
    setCurrentChat(item);
  };

  console.log(currentChat);

  return (
    <div className="relative">
      <div className="w-full py-14 bg-blue-400"></div>
      <div className="flex bg-[#f0f2f5] h-[90vh] absolute left-[2vw] top-[7vh] w-[96vw] rounded-md">
        <div className="left w-[30%] bg-white h-full rounded-md">
          {/*Profile */}
          {isGroup && <CreateGroup />}
          {isProfile && (
            <div className="w-full h-full">
              <Profile handleCloseOpenProfile={handleCloseOpenProfile} />
            </div>
          )}
          {!isProfile && !isGroup && (
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
                  <p>{auth.reqUser?.full_name}</p>
                </div>
                <div className="space-x-3 text-2xl flex">
                  <TbCircleDashed
                    className="cursor-pointer"
                    onClick={() => navigate("/status")}
                  />
                  <BiCommentDetail />
                  <div>
                    <BsThreeDotsVertical
                      className="cursor-pointer"
                      id="basic-button"
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={handleClick}
                    />
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      <MenuItem onClick={handleClose}>Profile</MenuItem>
                      <MenuItem onClick={handleCreategroup}>
                        Create group
                      </MenuItem>
                      <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                  </div>
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
                  Array.isArray(auth.searchUser) &&
                  auth.searchUser.map((item) => (
                    <div onClick={() => handleClickOnChatCard(item.id)}>
                      <hr />
                      <ChatCard
                        name={item.full_name}
                        userImg={
                          item.profile_picture ||
                          "https://img.freepik.com/free-vector/cute-alien-riding-ufo-with-love-sign-cartoon-vector-icon-illustration-science-technology-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-3810.jpg?w=2000"
                        }
                      />
                    </div>
                  ))}
                {chat.chats.length > 0 &&
                  !querys &&
                  Array.isArray(chat.chats) &&
                  chat.chats.map((item) => (
                    <div onClick={() => handleCurrentChat(item)}>
                      <hr />
                      {item.is_group ? (
                        <ChatCard
                          name={item.chat_name}
                          userImg={
                            item.chat_image ||
                            "https://img.freepik.com/free-vector/cute-astronaut-alien-sitting-with-peace-hand-cartoon-vector-icon-illustration-science-techno_138676-6748.jpg"
                          }
                        />
                      ) : (
                        <ChatCard
                          isChat={true}
                          name={
                            auth.reqUser?.id !== item.users[0]?.id
                              ? item.users[0].full_name
                              : item.users[1].full_name
                          }
                          userImg={
                            auth.reqUser.id !== item.users[0].id
                              ? item.users[0].profile_picture ||
                                "https://cdn3.iconfinder.com/data/icons/halloween-2278/512/halloween_avatar_costume_masquerade-36-512.png"
                              : item.users[1].profile_picture ||
                                "https://cdn3.iconfinder.com/data/icons/halloween-2278/512/halloween_avatar_costume_masquerade-36-512.png"
                          }
                          // notifications={notifications.length}
                          // isNotification={
                          //   notifications[0]?.chat?.id === item.id
                          // }
                          // message={
                          //   (item.id ===
                          //     messages[messages.length - 1]?.chat?.id &&
                          //     messages[messages.length - 1]?.content) ||
                          //   (item.id === notifications[0]?.chat?.id &&
                          //     notifications[0]?.content)
                          // }
                        />
                      )}
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
                    src={
                      currentChat.isGroup
                        ? currentChat.chat_image ||
                          "https://cdn.pixabay.com/photo/2016/04/15/18/05/computer-1331579_640.png"
                        : auth.reqUser.id !== currentChat.users[0].id
                        ? currentChat.users[0].profile_picture ||
                          "https://cdn3.iconfinder.com/data/icons/halloween-2278/512/halloween_avatar_costume_masquerade-36-512.png"
                        : currentChat.users[1].profile_picture ||
                          "https://cdn3.iconfinder.com/data/icons/halloween-2278/512/halloween_avatar_costume_masquerade-36-512.png"
                    }
                    alt=""
                  />
                  <p>
                    {currentChat.is_group
                      ? currentChat.chat_name
                      : auth.reqUser?.id === currentChat.users[0].id
                      ? currentChat.users[1].full_name
                      : currentChat.users[0].full_name}
                  </p>
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
                {message.messages.length > 0 &&
                  message.messages?.map((item, i) => (
                    <MessageCard
                      isReqUserMessage={item.user.id !== auth.reqUser.id}
                      content={item.content}
                    />
                  ))}
              </div>
            </div>
            {/* Footer part */}
            <div className="footer bg-[#f0f2f5] absolute bottom-0 w-full py-3 text-2xl ">
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
