import { AppBar, Toolbar, IconButton, Avatar, Box } from "@mui/material";
import menuIcon from "../../assets/Hamburger.svg";
import bellIcon from "../../assets/bellIcon.svg";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/root-reducer";

const Header = () => {
  const users = useSelector((state: RootState) => state.user.user);

  const navigate = useNavigate();
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <IconButton onClick={() => {}} edge="start" color="inherit">
          <img src={menuIcon} alt="Logo" />
        </IconButton>

        <Box display="flex" alignItems="center" gap={2}>
          <IconButton color="inherit">
            <img src={bellIcon} alt="Bell Icon" />
          </IconButton>
          <Avatar
            className="cursor-pointer"
            onClick={() => {
              navigate("/profile");
            }}
            src={users[0].profilePicture || "https://via.placeholder.com/100"}
            alt="User Avatar"
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
