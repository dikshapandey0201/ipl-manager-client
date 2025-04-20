import { Modal, Box, List, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useGetAllTeamsQuery } from "../../features/slices/TeamSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

export default function TeamModal({ open, setOpen, actionType, dataId }) {
  const { data, error, isLoading } = useGetAllTeamsQuery();
  const [formData, setFormData] = useState({
    team_name: "",
    captain: "",
    team_logo: "",
    owners: "",
    head_coach: "",
    championships: "",
    venue: "",
    players: [],
  });

  useEffect(() => {
    if (data && data.length > 0 && dataId !== null) {
      const teamData = data.find((item) => item._id === dataId);
      if (teamData) {
        const selectedKeys = [
          "team_name",
          "captain",
          "team_logo",
          "owners",
          "head_coach",
          "championships",
          "venue",
          "players",
        ];
        const newFormData = {};
        selectedKeys.forEach((key) => {
          newFormData[key] = teamData[key];
        });
        setFormData(newFormData);
      }
    }
  }, [data, dataId]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  console.log(formData);
  console.log(dataId);
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <h2 className="font-semibold py-2 text-xl">{actionType} Team</h2>
        <form>
          <div className="flex gap-10">
            <div>
              <label className="text-xs">Team Name:</label>
              <input
                className="block border border-gray-300 rounded-md p-2 mb-2"
                type="text"
                value={formData.team_name}
                onChange={(e) =>
                  setFormData({ ...formData, team_name: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-xs">Captain:</label>
              <input
                className="block border border-gray-300 rounded-md p-2 mb-2"
                type="text"
                value={formData.captain}
                onChange={(e) =>
                  setFormData({ ...formData, captain: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-xs">Owners:</label>
              <input
                className="block border border-gray-300 rounded-md p-2 mb-2"
                type="text"
                value={formData.owners}
                onChange={(e) =>
                  setFormData({ ...formData, owners: e.target.value })
                }
              />
            </div>
          </div>
          <div className="flex gap-10">
            <div>
              <label className="text-xs">Head Coach:</label>
              <input
                className="block border border-gray-300 rounded-md p-2 mb-2"
                type="text"
                value={formData.head_coach}
                onChange={(e) =>
                  setFormData({ ...formData, head_coach: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-xs">Venue:</label>
              <input
                className="block border border-gray-300 rounded-md p-2 mb-2"
                type="text"
                value={formData.venue}
                onChange={(e) =>
                  setFormData({ ...formData, venue: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-xs">Team Logo:</label>
              <input
                className="block border border-gray-300 rounded-md p-2 mb-2"
                type="text"
                value={formData.team_logo}
                onChange={(e) =>
                  setFormData({ ...formData, team_logo: e.target.value })
                }
              />
            </div>
          </div>
          <div className="flex gap-10">
            <div className="flex-1">
              <label className="text-xs">Championships:</label>
              <span className="block">
                <input type="date" placeholder="Add new milestone" />
              </span>
              <List
                className="w-full border border-gray-300 text-center rounded-md p-2 mb-2"
                sx={{ maxHeight: 200, overflowY: "auto" }}
              >
                {formData.championships &&
                  formData.championships.map((championship, index) => (
                    <li key={index}>{championship}</li>
                  ))}
              </List>
            </div>
            <div className="flex-1">
              <label className="text-xs">Players:</label>
              <List
                className="block border border-gray-300 rounded-md p-2 mb-2"
                sx={{ maxHeight: 100, overflowY: "auto" }}
              >
                {formData.players &&
                  formData.players.map((player) => {
                    return (
                      <li key={player._id}>
                        {player ? player.name : "Player not found"}
                      </li>
                    );
                  })}
              </List>
            </div>
          </div>

          <Button variant="contained" type="submit">
            {actionType}
          </Button>
        </form>
        <button onClick={() => setOpen(false)}>Close</button>
      </Box>
    </Modal>
  );
}
