import React,{useState} from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";
import Modal from "@mui/material/Modal";
import { Button, TextField } from "@mui/material";
import { updateUser } from "../api/UserApi/UserAuthApi";
import {setUser} from "../features/slices/UserSlice";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
};

export default function UserModal({ open, setOpen }) {
  const {user} = useSelector((state) => state.user);
  const [userDetails, setUserDetails] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleUpdate = async (e) => {
    e.preventDefault();
    // Validate user input 
    if (!userDetails.name || !userDetails.email) {
      alert("Please fill in all fields");
      return;
    }
    // Check if the email format is valid
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(userDetails.email)) {
      alert("Please enter a valid email address");
      return;
    }
    try {
      const response = await updateUser(userDetails, user._id);

      if (!response) {
        alert("Failed to update user details. Please try again.");
        return;
      }
      alert("User details updated successfully!");
      const updatedUser = response.user;

      dispatch(setUser(updatedUser));
      setUserDetails({ name: updatedUser.name, email: updatedUser.email });
      setOpen(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  }


  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update Details
          </Typography>
          <form  className="flex flex-col gap-2 my-5" onSubmit={handleUpdate}>
            <TextField
              type="text"
              label="Name"
              variant="outlined"
              fullWidth
              size="small"
              value={userDetails.name}
              onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
            />
            <TextField
              type="email"
              label="Email"
              variant="outlined"
              fullWidth
              size="small"
              value={userDetails.email}
              onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
            />
            <div className="flex gap-2 mt-2">
              <Button variant="contained" color="error" fullWidth size="small" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="small"
                type="submit"
                disabled={loading}
              
              >
                {loading ? "Updating..." : "Update"}
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
