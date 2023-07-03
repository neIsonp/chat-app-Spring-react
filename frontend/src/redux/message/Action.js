import { BASE_API_URL } from "../../config/api";
import { CREATE_NEW_MESSAGE, GET_ALL_MESSAGE } from "./ActionType";

export const createMessage = (messageData) => async (dispatch) => {
  try {
    const response = await fetch(`${BASE_API_URL}/api/messages/create`, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
        Authorization: `Bearer ${messageData.token}`,
      },
      body: JSON.stringify(messageData.data),
    });

    const data = await response.json();
    console.log("create message", data);
    dispatch({ type: CREATE_NEW_MESSAGE, payload: data });
  } catch (error) {
    console.log("catch error while creating a new message" + error);
  }
};

export const getAllMessages = (reqData) => async (dispatch) => {
  try {
    const response = await fetch(
      `${BASE_API_URL}/api/messages/chat/${reqData.chatId}`,
      {
        method: "GET",
        headers: {
          "content-Type": "application/json",
          Authorization: `Bearer ${reqData.token}`,
        },
      }
    );

    const data = await response.json();
    console.log("get all messages", data);
    dispatch({ type: GET_ALL_MESSAGE, payload: data });
  } catch (error) {
    console.log("catch error while creating a new message" + error);
  }
};
