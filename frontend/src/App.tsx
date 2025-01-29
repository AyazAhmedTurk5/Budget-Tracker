import UserProfile from "./pages/user-profile/UserProfile";
import { createTheme, ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Header from "./pages/header/Header";
import Expenses from "./pages/expenses/Expenses";
import { useSelector } from "react-redux";
import { RootState } from "./store/root-reducer";

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, Roboto, Helvetica, Arial, sans-serif",
  },
});

const App = () => {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Routes>
        <Route path="/" element={<Expenses />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
