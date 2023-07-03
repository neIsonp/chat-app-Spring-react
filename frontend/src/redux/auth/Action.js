import { type } from "@testing-library/user-event/dist/type";
import { BASE_API_URL } from "../../config/api";
import {
  LOGIN,
  LOGOUT,
  REGISTER,
  REQ_USER,
  SEARCH_USER,
  UPDATE_USER,
} from "./ActionType";

export const register = (data) => async (dispatch) => {
  console.log(JSON.stringify(data));

  try {
    const response = await fetch(`${BASE_API_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const resData = await response.json();

    if (resData.jwt) localStorage.setItem("token", resData.jwt);

    console.log(resData);

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

    if (resData.jwt) localStorage.setItem("token", resData.jwt);

    console.log("login", resData);
    dispatch({ type: LOGIN, payload: resData });
  } catch (error) {
    console.log(error);
  }
};

export const currentUser = (token) => async (dispatch) => {
  console.log("current user token", token);

  try {
    const response = await fetch(`${BASE_API_URL}/api/users/profile`, {
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
    const response = await fetch(`${BASE_API_URL}/api/users/${data.keyword}`, {
      method: "GET",
      headers: {
        "content-Type": "application/json",
        Authorization: `Bearer ${data.token}`,
      },
    });

    const resData = await response.json();
    console.log("search User", resData);
    dispatch({ type: SEARCH_USER, payload: resData });
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = (data) => async (dispatch) => {
  try {
    const response = await fetch(
      `${BASE_API_URL}/api/users/update/${data.id}`,
      {
        method: "GET",
        headers: {
          "content-Type": "application/json",
          Authorization: `Bearer ${data.token}`,
        },
      }
    );

    const resData = await response.json();
    console.log("updateUser", resData);
    dispatch({ type: UPDATE_USER, payload: resData });
  } catch (error) {
    console.log(error);
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem("token");
  dispatch({ type: LOGOUT, payload: null });
  dispatch({ type: REQ_USER, payload: null });
};
