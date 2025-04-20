import React, { useState, useEffect } from "react";
import {
  Box,
  Modal,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import {
  useCreatePlayerMutation,
  useGetPlayerByIdQuery,
  useUpdatePlayerMutation,
} from "../../features/slices/PlayerSlice";
import uploadLogo from "../../assets/uploadLogo.png";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  padding: "20px",
  overflowY: "auto",
  maxHeight: "70vh",
  borderRadius: "20px",
};

export default function PlayerModal({ open, setOpen, id, formtype }) {
  const isEdit = formtype === "edit";

  const { data: playerData, isLoading } = useGetPlayerByIdQuery(id, {
    skip: !isEdit || !id,
  });

  const [updatePlayer] = useUpdatePlayerMutation();
  const [addPlayer] = useCreatePlayerMutation();

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    skill: "",
    dob: "",
    debut: "",
    image: "",
    matches_played: "",
    runs: "",
    wickets: "",
    nationality: "",
  });

  useEffect(() => {
    if (isEdit && playerData) {
      setFormData({
        name: playerData.name || "",
        age: playerData.age || "",
        skill: playerData.skill || "Batter",
        dob: playerData.dob ? playerData.dob.slice(0, 10) : "",
        debut: playerData.debut ? playerData.debut.slice(0, 10) : "",
        image: playerData.image || "",
        matches_played: playerData.matches_played || "",
        runs: playerData.runs || "",
        wickets: playerData.wickets || "",
        nationality: playerData.nationality || "",
      });
    }
    if (!isEdit) {
      setFormData({
        name: "",
        age: "",
        skill: "Batter",
        dob: "",
        debut: "",
        image: "",
        matches_played: "",
        runs: "",
        wickets: "",
        nationality: "",
      });
    }
  }, [playerData, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    try {
      if (isEdit) {
        await updatePlayer({ id, player: formData }).unwrap();
        alert("Player updated successfully!");
      } else {
        await addPlayer(formData).unwrap();
        alert("Player added successfully!");
      }
      setOpen(false);
    } catch (err) {

      alert("Operation failed.");
    }
  };
  async function handleImageChange(e){
    const file = e.target.files[0];
    if(!file) return;
    const data = new FormData();
    data.append("file", file);  
    data.append("upload_preset","ipl_manager");
    data.append("cloud_name","dmtjstddn")
    const response = await fetch("https://api.cloudinary.com/v1_1/dmtjstddn/image/upload", {
      method: "POST",
      body: data,
    })
    const imgUrl = await response.json();
    setFormData({ ...formData, image: imgUrl.secure_url });
  } 

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography variant="h6" component="h2" mb={2}>
          {isEdit ? "Edit Player" : "Add Player"}
        </Typography>
        <section className="p-5 flex flex-col items-center justify-center">
          <input
            type="file"
            id="file"
            onChange={handleImageChange}
            className="hidden"
          />
          <label htmlFor="file" className="cursor-pointer border w-40 h-40 p-2 rounded-md">
            <img src={formData?.image || uploadLogo} alt="" />
          </label>
          upload photo
        </section>

        <TextField
          fullWidth
          margin="normal"
          label="Player Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Player Age"
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Skill</InputLabel>
          <Select name="skill" value={formData.skill} onChange={handleChange}>
            <MenuItem value="Batter">Batter</MenuItem>
            <MenuItem value="Bowler">Bowler</MenuItem>
            <MenuItem value="All-Rounder">All-Rounder</MenuItem>
            <MenuItem value="WK-Batter">WK-Batter</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          margin="normal"
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          margin="normal"
          type="date"
          name="debut"
          value={formData.debut}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Matches Played"
          type="number"
          name="matches_played"
          value={formData.matches_played}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Runs"
          type="number"
          name="runs"
          value={formData.runs}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Wickets"
          type="number"
          name="wickets"
          value={formData.wickets}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Nationality"
          name="nationality"
          value={formData.nationality}
          onChange={handleChange}
        />

        <Box mt={3}>
          <Button
            onClick={handleClose}
            variant="outlined"
            color="error"
            sx={{ mr: 2 }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            disabled={isEdit && isLoading}
          >
            {isEdit ? "Update Player" : "Add Player"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
