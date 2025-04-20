import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  TablePagination,
  Autocomplete,
  TextField,
  IconButton,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PlayerModal from "../pages/PlayerDetails/PlayerModal";
import { useDeletePlayerMutation } from "../features/slices/PlayerSlice";

export default function BasicTable({ rows, tableData }) {
  const [open, setOpen] = useState(false);
  const [formtype, setFormtype] = useState("add");
  const [selectedId, setSelectedId] = useState(null);

  const [filteredData, setFilteredData] = useState(tableData);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [deletePlayer] = useDeletePlayerMutation();

  useEffect(() => {
    setFilteredData(tableData);
  }, [tableData]);

  const handleRowClick = (id) => {
    setSelectedId(id);
    setFormtype("edit");
    setOpen(true);
  };

  const handleAddClick = () => {
    setFormtype("add");
    setSelectedId(null);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this player?");
    if (!confirmDelete) return;

    try {
      await deletePlayer(id).unwrap();
      setFilteredData((prev) => prev.filter((player) => player._id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete player.");
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event, value) => {
    if (value) {
      const lowerVal = value.toLowerCase();
      const result = tableData.filter((player) =>
        player.name.toLowerCase().includes(lowerVal)
      );
      setFilteredData(result);
      setPage(0);
    } else {
      setFilteredData(tableData);
    }
  };

  const paginatedData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <Box sx={{ mb: 2, display: "flex", justifyContent: "space-between" }}>
        <Autocomplete
          freeSolo
          disableClearable={false}
          options={tableData.map((player) => player.name)}
          onInputChange={handleSearchChange}
          size="small"
          fullWidth
          renderInput={(params) => (
            <TextField {...params} label="Search Player" variant="outlined" />
          )}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleAddClick}
          size="small"
          sx={{ width: "150px", marginLeft: "10px" }}
        >
          Add Player
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="player table">
          <TableHead>
            <TableRow>
              {rows.map((row) => (
                <TableCell
                  key={row.id}
                  align="left"
                  sx={{ fontWeight: "bold" }}
                >
                  {row.label}
                </TableCell>
              ))}
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedData.map((row) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                hover
              >
                {rows.map((cell) => (
                  <TableCell key={cell.id} align="left">
                    {row[cell.id]}
                  </TableCell>
                ))}
                <TableCell align="center">
                  <Tooltip title="Edit">
                    <IconButton onClick={() => handleRowClick(row._id)}>
                      <EditIcon color="primary" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Delete">
                    <IconButton onClick={() => handleDelete(row._id)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={filteredData.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25, 50]}
        />
      </TableContainer>

      {open && (
        <PlayerModal
          open={open}
          setOpen={setOpen}
          formtype={formtype}
          id={selectedId}
        />
      )}
    </>
  );
}
