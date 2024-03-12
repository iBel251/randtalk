import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import NewUserForm from "./components/NewUserForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NewUserForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
