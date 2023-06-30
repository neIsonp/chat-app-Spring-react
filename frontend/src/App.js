import HomePage from "./components/HomePage";
import Status from "./components/Status/Status";
import { Route, Routes } from "react-router-dom";
import StatusViewer from "./components/Status/StatusViewer";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/status" element={<Status />} />
        <Route path="/status/:userId" element={<StatusViewer />} />
      </Routes>
    </div>
  );
}

export default App;
