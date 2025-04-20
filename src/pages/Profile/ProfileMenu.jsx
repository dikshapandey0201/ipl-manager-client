import SortOutlinedIcon from '@mui/icons-material/SortOutlined';
import { IconButton, Tooltip } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserModal from "../../components/UserModal";

export default function ProfileMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [userModalOpen, setUserModalOpen] = useState(false);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenuClick = (path) => {
      navigate(path);
    handleClose();
  }
  const handleUpdateProfile = () => {
    setUserModalOpen(true);
    handleClose();
  };

  return (
    <div>
      <Tooltip title="More Options">
        <IconButton
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          
        >
          <SortOutlinedIcon className="text-2xl text-blue-900 rotate-y-180" />
        </IconButton>
      </Tooltip>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={()=>handleMenuClick("")}>Upload Data</MenuItem>
        <MenuItem onClick={()=>handleMenuClick("manage-team")}>Manage Team</MenuItem>
        <MenuItem onClick={()=>handleMenuClick("manage-player")}>Manage Players</MenuItem>
        <MenuItem onClick={handleUpdateProfile}>Update Profile</MenuItem>
      </Menu>
      {userModalOpen && (
        <UserModal
          open={userModalOpen}
          setOpen={setUserModalOpen}
        />
      )}
    </div>
  );
}
