import { createRoot } from "react-dom/client";
import App from "./App";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container!);

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, Roboto, Helvetica, Arial, sans-serif",
  },
});

root.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);
