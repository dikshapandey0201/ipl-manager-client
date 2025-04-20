import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';




export default function ArchieveTable({archieveMenu,selectedTeamName}) {
    const selectedTeam = archieveMenu[0].teams.find(
        (team) => team.team_name === selectedTeamName
      );
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}  aria-label="simple table">
        <TableHead className='bg-slate-600 '>
          <TableRow>
          <TableCell ><span className="text-white font-semibold">Year</span></TableCell>

            <TableCell align="left"><span className="text-white font-semibold">Position</span></TableCell>
            <TableCell align="left"><span className="text-white font-semibold">Top Scorer</span></TableCell>
            <TableCell align="left"><span className="text-white font-semibold">Most Wickets</span></TableCell>
            <TableCell ></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {selectedTeam.seasons.map((row) => (
            <TableRow
              key={row.year}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.year}
              </TableCell>
              <TableCell align="left">{row.position}</TableCell>
              <TableCell align="left">{row.top_scorer} <span className='text-gray-500'>| {row.top_score}</span></TableCell>
              <TableCell align="left">{row.most_wickets} <span className='text-gray-500'>|  {row.wicket_count}</span></TableCell>
              <TableCell align="center"><button className='bg-orange-500 text-white p-2 '>Full Archieve</button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
