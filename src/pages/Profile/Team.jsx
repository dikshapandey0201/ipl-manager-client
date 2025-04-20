import React, { useEffect, useState } from "react";
import { useGetAllTeamsQuery } from "../../features/slices/TeamSlice";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Spinner from "../../components/Spinner";

export default function Team() {
  const { data, error, isLoading } = useGetAllTeamsQuery();
  const [rows, setRows] = useState([]);
  const [tableData, setTableData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (data && data.length > 0) {
      const item = data[0];
      const selectedKeys = [
        "team_name",
        "captain",
        "owners",
        "head_coach",
        "championships",
        "venue",
      ];

      const rowsTitle = selectedKeys.map((key) => ({
        id: key,
        label: key
          .split("_")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" "),
      }));

      setRows(rowsTitle);
    }
  }, [data]);

  useEffect(() => {
    if (data && data.length > 0) {
      const newTableData = data.map((item) => {
        const selectedKeys = [
          "_id",
          "team_name",
          "captain",
          "owners",
          "head_coach",
          "championships",
          "venue",
        ];
        const newItem = {};
        selectedKeys.forEach((key) => {
          newItem[key] = item[key];
        });
        return newItem;
      });
      setTableData(newTableData);
    }
  }, [data]);

  const handleRowClick = (id) => {
    navigate(`${id}`);
  };
  
  if (isLoading) {
    return <Spinner/>
  }
  return (
    <div>
      <p className="my-2">Manage Team</p>
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  hover
                  style={{ cursor: "pointer" }}
                  onClick={() => handleRowClick(row._id)}
                >
                  {rows.map((cell) => (
                    <TableCell key={cell.id} align="left">
                      {row[cell.id]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      
      </div>
    
    </div>
  );
}
