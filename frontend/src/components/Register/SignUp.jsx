import { Alert, Button, Snackbar } from "@mui/material";
import { blue } from "@mui/material/colors";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  const [inputData, setInputData] = useState({
    full_name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("handle submit");
    setOpenSnackbar(true);
  };

  const handleChange = () => {};

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <div>
      <div className="flex justify-center h-screen items-center">
        <div className="w-[30%] p-10 shadow-md bg-white">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <p className="mb-2">Username</p>
              <input
                type="text"
                className="py-2 outline outline-blue-600 w-full rounded-md border"
                placeholder="Enter username"
                name="full_name"
                onChange={(e) => handleChange(e)}
                value={inputData.full_name}
              />
            </div>
            <div>
              <p className="mb-2">Email</p>
              <input
                type="email"
                className="py-2 outline outline-blue-600 w-full rounded-md border"
                placeholder="Enter your email"
                name="email"
                onChange={(e) => handleChange(e)}
                value={inputData.email}
              />
            </div>
            <div>
              <p className="mb-2">Password</p>
              <input
                type="password"
                className="py-2 outline outline-blue-600 w-full rounded-md border"
                placeholder="Enter your password"
                name="password"
                onChange={(e) => handleChange(e)}
                value={inputData.password}
              />
            </div>
            <div>
              <Button
                sx={{ bgcolor: blue[600], padding: "0.6rem" }}
                type="submit"
                className="w-full "
                variant="contained"
              >
                Sign Up
              </Button>
            </div>
          </form>
          <div className="flex space-x-3 items-center mt-5">
            <p className="m-0">Already have an account?</p>
            <Button variant="text" onClick={() => navigate("/signin")}>
              signIn
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
          Your account successfully created!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default SignUp;
