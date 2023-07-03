import { Alert, Button, Snackbar } from "@mui/material";
import { blue } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { currentUser, login } from "../../redux/auth/Action";
import { FiEyeOff, FiEye } from "react-icons/fi";
import { Player } from "@lottiefiles/react-lottie-player";

function SignIn() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const [viewPassword, setViewPassword] = useState(false);

  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputData.email || !inputData.password) {
      setErrors({
        email: inputData.email ? "" : "This field is required",
        password: inputData.password ? "" : "This field is required",
      });
      setOpenSnackbar(true);
      return;
    }

    console.log("handle submit", inputData);
    setOpenSnackbar(true);
    dispatch(login(inputData));
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
            If you are already a member, easily log in
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              className={`p-2 mt-8 rounded-xl border ${
                errors.email ? "border-red-500" : ""
              }`}
              type="email"
              placeholder="Email"
              onChange={handleChange}
              value={inputData.email}
              name="email"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email}</span>
            )}
            <div className="relative">
              <input
                className={`p-2 rounded-xl border w-full ${
                  errors.password ? "border-red-500" : ""
                }`}
                type={viewPassword ? "password" : "text"}
                placeholder="Password"
                onChange={handleChange}
                value={inputData.password}
                name="password"
              />
              <div
                className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                onClick={() =>
                  setViewPassword((prevState) => (prevState = !prevState))
                }
              >
                {viewPassword ? <FiEye /> : <FiEyeOff />}
              </div>
            </div>
            {errors.password && (
              <span className="text-red-500 text-sm">{errors.password}</span>
            )}
            <button className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300">
              Login
            </button>
          </form>

          <div className="mt-5 text-xs border-b border-[#002D74]  text-[#002D74]"></div>

          <div className="mt-3 text-xs flex justify-between items-center text-[#002D74] mb-36">
            <p>Don't have an account?</p>
            <button
              className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300"
              onClick={() => navigate("/signup")}
            >
              Register
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

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="error">
          Invalid credentials. Please try again.
        </Alert>
      </Snackbar>
    </section>
  );
}

export default SignIn;
