import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  TextField,
  Button,
  Paper,
  Typography,
  Box
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';

const MiniTable = ({ title, rows, setRows }) => {
  const [selected, setSelected] = useState([]);

  const handleChange = (index, newValue) => {
    const updated = [...rows];
    updated[index] = newValue;
    setRows(updated);
  };

  const handleCheckboxChange = (index) => {
    setSelected((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  const handleAddRow = () => {
    setRows([...rows, '']);
  };

  const handleRemoveSelected = () => {
    const filtered = rows.filter((_, i) => !selected.includes(i));
    setRows(filtered);
    setSelected([]);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="subtitle1" gutterBottom>
        {title}
      </Typography>
      <TableContainer component={Paper} sx={{ maxHeight: 250, overflow: 'auto' }}>
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox" />
              <TableCell>{title} Item</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((value, index) => (
              <TableRow key={index}>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selected.includes(index)}
                    onChange={() => handleCheckboxChange(index)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={value}
                    onChange={(e) => handleChange(index, e.target.value)}
                    fullWidth
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddRow}
        >
          Add
        </Button>
        <Button
          variant="outlined"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={handleRemoveSelected}
          disabled={selected.length === 0}
        >
          Remove Selected
        </Button>
      </Box>
    </Box>
  );
};

export default MiniTable;
