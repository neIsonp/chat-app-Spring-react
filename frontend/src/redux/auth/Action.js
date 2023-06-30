import { BASE_API_URL } from "../../config/api";
import {
  LOGIN,
  REGISTER,
  REQ_USER,
  SEARCH_USER,
  UPDATE_USER,
} from "./ActionType";

export const register = (data) => async (dispatch) => {
  try {
    const response = await fetch(`${BASE_API_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const resData = await response.json();
    console.log("register", resData);
    dispatch({ type: REGISTER, payload: resData });
  } catch (error) {
    console.log(error);
  }
};

export const login = (data) => async (dispatch) => {
  try {
    const response = await fetch(`${BASE_API_URL}/auth/signin`, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const resData = await response.json();
    console.log("login", resData);
    dispatch({ type: LOGIN, payload: resData });
  } catch (error) {
    console.log(error);
  }
};

export const currentUser = (token) => async (dispatch) => {
  try {
    const response = await fetch(`${BASE_API_URL}/users/profile`, {
      method: "GET",
      headers: {
        "content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const resData = await response.json();
    console.log("currentUser", resData);
    dispatch({ type: REQ_USER, payload: resData });
  } catch (error) {
    console.log(error);
  }
};

export const searchUser = (data) => async (dispatch) => {
  try {
    const response = await fetch(
      `${BASE_API_URL}/users/search?name=${data.keryword}`,
      {
        method: "GET",
        headers: {
          "content-Type": "application/json",
          Authorization: `Bearer ${data.token}`,
        },
      }
    );

    const resData = await response.json();
    console.log("searchUser", resData);
    dispatch({ type: SEARCH_USER, payload: resData });
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = (data) => async (dispatch) => {
  try {
    const response = await fetch(`${BASE_API_URL}/users/update/${data.id}`, {
      method: "GET",
      headers: {
        "content-Type": "application/json",
        Authorization: `Bearer ${data.token}`,
      },
    });

    const resData = await response.json();
    console.log("updateUser", resData);
    dispatch({ type: UPDATE_USER, payload: resData });
  } catch (error) {
    console.log(error);
  }
};
