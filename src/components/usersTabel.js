import React, {useState,useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';
import SearchIcon from '@mui/icons-material/Search';
import {Button ,FormControl,InputAdornment,InputLabel,OutlinedInput , TablePagination} from '@mui/material';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


const useStyles = makeStyles({
    table: {
      minWidth: 650
    }
});
export function BasicTable({data, updatePaid,sendSms ,resetUsers}) {
    const [rows, setRows] = useState(data);
    const [searched, setSearched] = useState("");
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    useEffect(() => {
      setRows(data)
    }, [data])

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

  

  const requestSearch = (searchedVal) => {
    if(searchedVal.length === 0 ){
      setRows(data);
    }
    else if(searchedVal.length > 1){ 
    const filteredRows = rows.filter((row) => {
      return row.firstName.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
  }
  };


  return (
    
  <Paper sx = {{margin: '1rem' , }}>
    <FormControl sx={{ m: 2, width: '25ch' }}>
      <InputLabel 
      htmlFor='outlined-adornment-amount'>Search filter</InputLabel>
      <OutlinedInput
        onChange={(event) => requestSearch(event.target.value)}
        id='outlined-adornment-amount'
        startAdornment={
          <InputAdornment position='end'>
            <SearchIcon />
          </InputAdornment>
        }
        label='Search'
      />

      <Button     
      item
          sm={4}
          md={6} 
          variant = {"contained"} fullWidth  sx={{ mt: 3, mb: 2 }} onClick = {resetUsers}>
          לחץ  לאיפוס תשלום לכולם  (תחילת חודש חדש)
      </Button>
    </FormControl>
    <TableContainer component={Paper} 
     className="container"
       >
      <Table aria-label="customized table"  className={classes.table}  >
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">שם</StyledTableCell>
            <StyledTableCell align="center">משפחה</StyledTableCell>
            <StyledTableCell align="center">טלפון</StyledTableCell>
            <StyledTableCell align="center">שילם? </StyledTableCell>
            <StyledTableCell align="center" border>שלח sms</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { rows.length && rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row ,index) => (
            <StyledTableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
              <StyledTableCell component="th" scope="row">
                {row.firstName}
              </StyledTableCell>
              <StyledTableCell border= {1} align="center">{row.lastName}</StyledTableCell>
              <StyledTableCell align="center">{row.phone}</StyledTableCell>
              <StyledTableCell align="center">{
              row.paid ? "כן " : "לא"}
              <Button variant = "text" fullWidth  sx={{ mt: 3, mb: 2 }} onClick={() => updatePaid({...row , paid : !row.paid})}>
                עדכן תשלום
             </Button>
              </StyledTableCell>
              <StyledTableCell align="right"><Button onClick = {() => sendSms([row])}>שלח sms</Button></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
        )
}