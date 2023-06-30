import HomePage from "./components/HomePage";
import Status from "./components/Status/Status";
import { Route, Routes } from "react-router-dom";
import StatusViewer from "./components/Status/StatusViewer";
import SignIn from "./components/Register/SignIn";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/status" element={<Status />} />
        <Route path="/status/:userId" element={<StatusViewer />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </div>
  );
}

export default App;
