import UserProfile from "./pages/user-profile/UserProfile";
import { createTheme, ThemeProvider } from "@mui/material";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Header from "./pages/header/Header";
import Expenses from "./pages/expenses/Expenses";
import { useSelector } from "react-redux";
import { RootState } from "./store/root-reducer";
import { useEffect } from "react";

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, Roboto, Helvetica, Arial, sans-serif",
  },
});

const App = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get current route
  const { user } = useSelector((state: RootState) => state.user);
  const isLoggedIn = user[0]?.isLoggedIn;

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
      {isLoggedIn &&
      location.pathname !== "/login" &&
      location.pathname !== "/signup" ? (
        <Header />
      ) : null}
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
    </ThemeProvider>
  );
};

export default App;
