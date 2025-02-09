import { Box } from "@mui/material";

const IllustrationSection = ({ imgSrc }: { imgSrc: string }) => (
  <Box
    sx={{
      display: { xs: "none", md: "flex" },
      alignItems: "center",
      justifyContent: "center",
      width: "50%",
      height: "100%",
      paddingRight: "5px",
    }}
  >
    <img
      src={imgSrc}
      alt="Login Illustration"
      style={{ maxWidth: "80%", height: "auto" }}
    />
  </Box>
);

export default IllustrationSection;
