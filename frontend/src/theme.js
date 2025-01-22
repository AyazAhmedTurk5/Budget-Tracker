import { createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Poppins', Arial, sans-serif;
  }
`;

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, Arial, sans-serif",
  },
});

export { GlobalStyle };
export default theme;
