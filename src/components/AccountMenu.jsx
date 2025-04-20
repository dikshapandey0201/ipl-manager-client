import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Divider } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../api/UserApi/UserAuthApi";
import { clearUser } from "../features/slices/UserSlice";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

export default function AccountMenu() {
  const { authenticated } = useSelector((state) => state.user);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenuClick = (path) => {
    navigate(path);
    setAnchorEl(null);
  };
  const handleAccountClick = (path) => {
    if (!authenticated) {
      alert("Please login to access this feature");
      return;
    }
    navigate(path);
    setAnchorEl(null);
  };
  const handleLogout = async () => {
    setAnchorEl(null);

    try {
      const response = await logoutUser();
      if (response.status === 200) {
        alert("Logout successful");
      } else {
        alert("Logout failed:", response.data.message);
      }
    } catch (jwtError) {
      console.warn(
        "JWT logout failed or user wasn't logged in with JWT:",
        jwtError.message
      );
    }

    try {
      const firebaseUser = auth.currentUser;
      if (firebaseUser) {
        const response = await signOut(auth);
        if (response) {
          alert("Logout successful");
        } else {
          alert("Logout failed:", response.data.message);
        }
      }
    } catch (fbError) {
      console.warn("Firebase logout failed:", fbError.message);
    }
    dispatch(clearUser());
    alert("Logged out successfully");
    navigate("/");
  };
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Admin Settings">
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <AdminPanelSettingsOutlinedIcon
              sx={{ width: 32, height: 32, color: "white" }}
            />
          </IconButton>
        </Tooltip>
      </Box>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClick={handleClose}
        sx={{
          mt: 1.5,
          "& .MuiMenu-paper": {
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            width: 200,
            backgroundColor: "#1C398E",
            color: "white",
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={() => handleAccountClick("/user-profile")}>
          <AccountCircleIcon sx={{ width: 20, height: 20, mr: 2 }} />
          My Account
        </MenuItem>

        <Divider orientation="horizontal" />
        {authenticated ? (
          <MenuItem onClick={handleLogout}>
            <LogoutIcon sx={{ width: 20, height: 20, mr: 2 }} />
            Logout
          </MenuItem>
        ) : (
          <MenuItem onClick={() => handleMenuClick("/user-login")}>
            <LoginIcon sx={{ width: 20, height: 20, mr: 2 }} />
            Login
          </MenuItem>
        )}
      </Menu>
    </React.Fragment>
  );
}
