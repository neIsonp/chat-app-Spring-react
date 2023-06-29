import HomePage from "./components/HomePage";
import Status from "./components/Status/Status";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/status" element={<Status />} />
      </Routes>
    </div>
  );
}

export default App;
