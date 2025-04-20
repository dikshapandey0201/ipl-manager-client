import { Button, TextField } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import MiniTable from "../../components/MiniTable";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetTeamByIdQuery,
  useUpdateTeamMutation,
  useDeleteTeamMutation,
} from "../../features/slices/TeamSlice";
import uploadLogo from "../../assets/uploadLogo.png";
import Spinner from "../../components/Spinner";

export default function ManageTeam() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, error, isLoading } = useGetTeamByIdQuery(id);
  const [updateTeam] = useUpdateTeamMutation();
  const [deleteTeam] = useDeleteTeamMutation();

  const [form, setForm] = useState({
    team_code: "",
    team_name: "",
    owners: "",
    head_coach: "",
    captain: "",
    team_theme_color: "",
    team_secondary_color: "",
    venue: "",
    team_logo: "",
  });

  const [championships, setChampionships] = useState([]);
  const [supportStaff, setSupportStaff] = useState([]);
  const [players, setPlayers] = useState([]);
  const [originalData, setOriginalData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data) {
      const formData = {
        team_code: data.team_code || "",
        team_name: data.team_name || "",
        owners: data.owners || "",
        head_coach: data.head_coach || "",
        captain: data.captain || "",
        team_theme_color: data.team_theme_color || "",
        team_secondary_color: data.team_name_bg || "",
        venue: data.venue || "",
        team_logo: data.team_logo || "",
      };

      setForm(formData);
      setChampionships(data.championships || []);
      setSupportStaff(data.support_staff || []);
      setPlayers(
        data.players?.map((p) => (typeof p === "string" ? p : p.name)) || []
      );

      setOriginalData({
        form: formData,
        championships: data.championships || [],
        supportStaff: data.support_staff || [],
        players:
          data.players?.map((p) => (typeof p === "string" ? p : p.name)) || [],
      });
    }
  }, [data]);

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const handleUpdate = async () => {
    if (!data?._id) return;

    const updatedFields = {};

    for (let key in form) {
      if (form[key] !== originalData.form[key] && form[key] !== "") {
        updatedFields[key] = form[key];
      }
    }

    if (
      JSON.stringify(championships) !==
      JSON.stringify(originalData.championships || [])
    ) {
      updatedFields.championships = championships;
    }

    if (
      JSON.stringify(supportStaff) !==
      JSON.stringify(originalData.supportStaff || [])
    ) {
      updatedFields.support_staff = supportStaff;
    }

    if (
      JSON.stringify(players) !== JSON.stringify(originalData.players || [])
    ) {
      updatedFields.players = players;
    }

    if (Object.keys(updatedFields).length === 0) {
      alert("No changes to update.");
      return;
    }

    try {
      setLoading(true);
      await updateTeam({ id: data._id, team: updatedFields }).unwrap();
      alert("Team updated successfully!");

      setOriginalData({
        form: { ...form },
        championships,
        supportStaff,
        players,
      });
    } catch (err) {
      console.error(err);
      alert("Update failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this team?")) return;

    try {
      setLoading(true);
      await deleteTeam(data._id).unwrap();
      alert("Team deleted.");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Delete failed.");
    } finally {
      setLoading(false);
    }
  };

  async function handleImageChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "ipl_manager");
    data.append("cloud_name", "dmtjstddn");
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dmtjstddn/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const imgUrl = await response.json();
    setForm({ ...form, team_logo: imgUrl.secure_url });
  }

  if (isLoading) return <Spinner />;

  return (
    <div className="w-full h-screen flex gap-10">
      <section className="w-60 p-5 border-r flex justify-end">
        <input
          type="file"
          id="file"
          onChange={handleImageChange}
          className="hidden"
        />
        <label htmlFor="file" className="cursor-pointer">
          <img src={form.team_logo || uploadLogo} alt="" />
        </label>
      </section>

      <section className="p-5 w-full">
        <div className="flex gap-5">
          <TextField
            sx={{ width: "100%" }}
            label="Team Code"
            size="small"
            value={form.team_code}
            onChange={handleChange("team_code")}
          />
          <TextField
            sx={{ width: "100%" }}
            label="Team Name"
            size="small"
            value={form.team_name}
            onChange={handleChange("team_name")}
          />
          <TextField
            sx={{ width: "100%" }}
            label="Team Owner"
            size="small"
            value={form.owners}
            onChange={handleChange("owners")}
          />
          <TextField
            sx={{ width: "100%" }}
            label="Head Coach"
            size="small"
            value={form.head_coach}
            onChange={handleChange("head_coach")}
          />
        </div>

        <div className="flex gap-5 mt-10">
          <TextField
            sx={{ width: "100%" }}
            label="Captain"
            size="small"
            value={form.captain}
            onChange={handleChange("captain")}
          />
          <TextField
            sx={{ width: "100%" }}
            label="Team Theme Color"
            size="small"
            value={form.team_theme_color}
            onChange={handleChange("team_theme_color")}
          />
          <TextField
            sx={{ width: "100%" }}
            label="Team Secondary Color"
            size="small"
            value={form.team_secondary_color}
            onChange={handleChange("team_secondary_color")}
          />
          <TextField
            sx={{ width: "100%" }}
            label="Venue"
            size="small"
            value={form.venue}
            onChange={handleChange("venue")}
          />
        </div>

        <div className="flex w-full gap-5 mt-10">
          <MiniTable
            title="Championships"
            rows={championships}
            setRows={setChampionships}
          />
          <MiniTable
            title="Supporting Staff"
            rows={supportStaff}
            setRows={setSupportStaff}
          />
          <MiniTable title="Players" rows={players} setRows={setPlayers} />
        </div>

        <div className="mt-10 flex gap-4">
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdate}
            fullWidth
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Team"}
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={handleDelete}
            fullWidth
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete Team"}
          </Button>
        </div>
      </section>
    </div>
  );
}
