import { Alert, Button, Snackbar } from "@mui/material";
import { blue } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { currentUser, login } from "../../redux/auth/Action";

function SignIn() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
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
    <div>
      <div className="flex justify-center h-screen items-center">
        <div className="w-[30%] p-10 shadow-md bg-white">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <p className="mb-2">Email</p>
              <input
                type="email"
                className="py-2 outline outline-blue-600 w-full rounded-md border"
                placeholder="Enter your email"
                onChange={handleChange}
                value={inputData.email}
                name="email"
              />
            </div>
            <div>
              <p className="mb-2">Password</p>
              <input
                type="password"
                className="py-2 outline outline-blue-600 w-full rounded-md border"
                placeholder="Enter your password"
                onChange={handleChange}
                value={inputData.password}
                name="password"
              />
            </div>
            <div>
              <Button
                sx={{ bgcolor: blue[600], padding: "0.6rem" }}
                type="submit"
                className="w-full "
                variant="contained"
              >
                Sign In
              </Button>
            </div>
          </form>
          <div className="flex space-x-3 items-center mt-5">
            <p className="m-0">Create new Account</p>
            <Button variant="text" onClick={() => navigate("/signup")}>
              signUp
            </Button>
          </div>
        </div>
      </div>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Login successfull!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default SignIn;
