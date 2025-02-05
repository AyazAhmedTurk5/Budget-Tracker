import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { CssBaseline } from "@mui/material";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Logo from "../../assets/images/Logo.svg";
import expensesIcon from "../../assets/images/Expenses-logo.svg";
import Logout from "../../assets/images/Logout.svg";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import BudgetTrackerlogo from "../../assets/images/BudgetTracker.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/root-reducer";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  setLoggedIn,
  setToggleDrawer,
  setUser,
} from "../../store/user/user.slice";
import { toast } from "react-toastify";

const drawerWidth = 240;

const drawerOptions = [
  {
    id: 0,
    name: "Expenses",
    route: "/",
    icon: <img src={expensesIcon} alt="expenses" />,
  },
  {
    id: 1,
    name: "Profile",
    route: "/profile",
    icon: <PersonOutlinedIcon className="opacity-70" />,
  },
  {
    id: 2,
    name: "Logout",
    route: "/logout",
    icon: <img src={Logout} alt="logout" />,
  },
];

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

export default function Sidenav() {
  const { isDrawerOpen } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const theme = useTheme();
  const [open, setOpen] = React.useState(isDrawerOpen);

  useEffect(() => {
    setOpen(isDrawerOpen);
  }, [isDrawerOpen]);

  const handleLogout = () => {
    //reset user state and navigate to login page
    localStorage.removeItem("token");
    dispatch(setUser(null));
    dispatch(setLoggedIn(false));
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton
            disableRipple
            sx={{ "&:hover": { backgroundColor: "transparent" } }}
            onClick={() => {
              dispatch(setToggleDrawer());
            }}
          >
            {theme.direction === "rtl" ? (
              <img src={Logo} alt="app-logo" />
            ) : (
              <img
                src={BudgetTrackerlogo}
                style={{ width: "200px" }}
                alt="app-logo"
              />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {drawerOptions.map((option) => (
            <ListItem
              key={option.id}
              disablePadding
              sx={{ display: "block" }}
              onClick={() => {
                const route = option.route;
                if (route !== "/logout") {
                  navigate(route);
                } else {
                  handleLogout();
                }
              }}
            >
              <ListItemButton
                sx={[
                  {
                    minHeight: 48,
                    px: 2.5,
                  },
                  open
                    ? {
                        justifyContent: "initial",
                      }
                    : {
                        justifyContent: "center",
                      },
                ]}
              >
                <ListItemIcon
                  sx={[
                    {
                      minWidth: 0,
                      justifyContent: "center",
                    },
                    open
                      ? {
                          mr: 3,
                        }
                      : {
                          mr: "auto",
                        },
                  ]}
                >
                  {option.icon}
                </ListItemIcon>
                <ListItemText
                  primary={option.name}
                  sx={[
                    open
                      ? {
                          opacity: 1,
                        }
                      : {
                          opacity: 0,
                        },
                  ]}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
