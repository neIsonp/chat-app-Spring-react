import { BASE_API_URL } from "../../config/api";
import { CREATE_CHAT, CREATE_GROUP, GET_USERS_CHAT } from "./ActionType";

export const createChat = (chatData) => async (dispatch) => {
  try {
    const response = await fetch(`${BASE_API_URL}/api/chats/single`, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
        Authorization: `Bearer ${chatData.token}`,
      },
      body: JSON.stringify(chatData.data),
    });

    const data = await response.json();
    console.log("create chat", data);
    dispatch({ type: CREATE_CHAT, payload: data });
  } catch (error) {
    console.log("catch error while creating a chat" + error);
  }
};

export const createGroupChat = (chatData) => async (dispatch) => {
  try {
    const response = await fetch(`${BASE_API_URL}/api/chats/group`, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
        Authorization: `Bearer ${chatData.token}`,
      },
      body: JSON.stringify(chatData.data),
    });

    const data = await response.json();
    console.log("create group", data);
    dispatch({ type: CREATE_GROUP, payload: data });
  } catch (error) {
    console.log("catch error while creating a group chat" + error);
  }
};

export const getUsersChat = (chatData) => async (dispatch) => {
  try {
    const response = await fetch(`${BASE_API_URL}/api/chats/user`, {
      method: "GET",
      headers: {
        "content-Type": "application/json",
        Authorization: `Bearer ${chatData.token}`,
      },
    });

    const data = await response.json();
    console.log("get users chat", data);
    dispatch({ type: GET_USERS_CHAT, payload: data });
  } catch (error) {
    console.log("catch error while getting users chat" + error);
  }
};
