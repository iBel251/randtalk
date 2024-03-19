import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/Home";
import EditProfile from "./components/EditProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:id" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/edituser/:id" element={<EditProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
