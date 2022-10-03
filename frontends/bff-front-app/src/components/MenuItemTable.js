import * as React from 'react';
import { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, pu, qte, pt) {
  return { name, pu, qte, pt };
}

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24),
//   createData('Ice cream sandwich', 237, 9.0, 37),
//   createData('Eclair', 262, 16.0, 24),

  
// ];



export default function MenuItemTable(props) {
  const [rows, setRows] = React.useState([]);

  const fillRows = (chooseItems) => {
    let rows = [];
    chooseItems.forEach((value, key) => {
      rows.push(createData(key, value["pu"], value["nb"], value["pu"] * value["nb"]));
    });
    setRows(rows);
  }

  useEffect(() => {
    fillRows(props.items);
    console.log("props.items: " + rows);
  });

  console.log("props: " + props.items);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Articles</TableCell>
            <TableCell align="right">PU (Euro)</TableCell>
            <TableCell align="right">Qté</TableCell>
            <TableCell align="right">PT (Euro)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.pu}</TableCell>
              <TableCell align="right">{row.qte}</TableCell>
              <TableCell align="right">{row.pt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
