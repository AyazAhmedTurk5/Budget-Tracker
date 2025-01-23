import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
