import { AppBar, Toolbar, IconButton, Avatar, Box } from "@mui/material";
import menuIcon from "../../assets/Hamburger.svg";
import bellIcon from "../../assets/bellIcon.svg";

const Header = () => {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <IconButton edge="start" color="inherit">
          <img src={menuIcon} alt="Logo" />
        </IconButton>

        <Box display="flex" alignItems="center" gap={2}>
          <IconButton color="inherit">
            <img src={bellIcon} alt="Bell Icon" />
          </IconButton>
          <Avatar src="https://via.placeholder.com/40" alt="User Avatar" />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
