import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/Home";
import EditProfile from "./components/EditProfile";
import EditPreference from "./components/EditPreference";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:id" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/edituser/:id" element={<EditProfile />} />
        <Route path="/edituser/" element={<EditProfile />} />
        <Route path="/editpreference/:id" element={<EditPreference />} />
        <Route path="/editpreference/" element={<EditPreference />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
