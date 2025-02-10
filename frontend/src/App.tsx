import UserProfile from "./pages/user-profile/UserProfile";
import { createTheme, ThemeProvider } from "@mui/material";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/register";
import Expenses from "./pages/expenses/Expenses";
import { useSelector } from "react-redux";
import { RootState } from "./store/root-reducer";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, Roboto, Helvetica, Arial, sans-serif",
  },
});

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn } = useSelector((state: RootState) => state.user);

  // Redirect to login only if trying to access Expenses or Profile page
  useEffect(() => {
    if (
      !isLoggedIn &&
      location.pathname !== "/login" &&
      location.pathname !== "/signup"
    ) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate, location.pathname]);

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        {isLoggedIn ? (
          <>
            <Route path="/" element={<Expenses />} />
            <Route path="/profile" element={<UserProfile />} />
          </>
        ) : null}
      </Routes>
      <ToastContainer
        toastStyle={{
          backgroundColor: "#E1F3EC",
          color: "#08B461",
          border: "1px solid #08B461 ",
        }}
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={true}
        theme="light"
        aria-label={undefined}
      />
    </ThemeProvider>
  );
};

export default App;
