import { Alert, Button, Snackbar } from "@mui/material";
import { blue } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { currentUser, register } from "../../redux/auth/Action";
import { FiEyeOff, FiEye } from "react-icons/fi";
import { Player } from "@lottiefiles/react-lottie-player";

function SignUp() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const [viewPassword, setViewPassword] = useState(false);

  console.log("current user", auth.reqUser);

  const [inputData, setInputData] = useState({
    full_name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    full_name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputData.full_name || !inputData.email || !inputData.password) {
      setErrors({
        full_name: inputData.full_name ? "" : "This field is required",
        email: inputData.email ? "" : "This field is required",
        password: inputData.password ? "" : "This field is required",
      });
      setOpenSnackbar(true);
      return;
    }
    console.log("handle submit", inputData);
    dispatch(register(inputData));
    setOpenSnackbar(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData((values) => ({ ...values, [name]: value }));
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    if (token) dispatch(currentUser(token));
  }, [token]);

  useEffect(() => {
    if (auth.reqUser?.full_name) {
      navigate("/");
    }
  }, [auth.reqUser]);

  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
        <div className="md:w-1/2 px-8 md:px-16">
          <h2 className="font-bold text-2xl text-[#002D74] mt-16">UfoChat</h2>
          <p className="text-xs mt-4 text-[#002D74]">
            If you aren't a member, easily sign up
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              className="p-2 mt-8 rounded-xl border"
              placeholder="Username"
              name="full_name"
              onChange={(e) => handleChange(e)}
              value={inputData.full_name}
            />
            {errors.full_name && (
              <span className="text-red-500 text-sm">{errors.full_name}</span>
            )}
            <input
              className="p-2 rounded-xl border"
              type="email"
              placeholder="Email"
              name="email"
              onChange={(e) => handleChange(e)}
              value={inputData.email}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email}</span>
            )}
            <div className="relative">
              <input
                className="p-2 rounded-xl border w-full"
                type={viewPassword ? "password" : "text"}
                placeholder="Password"
                name="password"
                onChange={(e) => handleChange(e)}
                value={inputData.password}
              />
              <div
                className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2"
                onClick={() =>
                  setViewPassword((prevState) => (prevState = !prevState))
                }
              >
                {viewPassword ? <FiEyeOff /> : <FiEye />}
              </div>
            </div>
            {errors.password && (
              <span className="text-red-500 text-sm">{errors.password}</span>
            )}
            <button className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300">
              Register
            </button>
          </form>

          <div className="mt-5 text-xs border-b border-[#002D74]  text-[#002D74] "></div>

          <div className="mt-3 text-xs flex justify-between items-center text-[#002D74] mb-32">
            <p>Already have an account?</p>
            <button
              className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300"
              onClick={() => navigate("/signin")}
            >
              Login
            </button>
          </div>
        </div>

        <Player
          className="md:block hidden w-full h-fullflex items-center"
          autoplay
          loop
          src="https://assets7.lottiefiles.com/packages/lf20_l4ny0jjm.json"
        ></Player>
      </div>
    </section>
  );
}

export default SignUp;
