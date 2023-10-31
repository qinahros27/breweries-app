import React, { useEffect } from 'react';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Company from '../interface/companyInterface';

interface props {
    companies : Company[];
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    rowsPerPage: number;
    setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
}

const PageCompany = (props: props) => {
  const navigate = useNavigate();
  interface Column {
    id: 'name' | 'type' | 'url';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: string;
  }
  
  const columns: readonly Column[] = [
    { id: 'name', label: 'Name', minWidth: 300 },
    { id: 'type', label: 'Type', minWidth: 170 },
    { id: 'url', label: 'Detail\u00a0URL', minWidth: 170 },   
  ];

  const handleChangePage = (event: unknown, newPage: number) => {
    props.setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setRowsPerPage(+event.target.value);
    props.setPage(0);
  };

  return (
    <div>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth,fontWeight: 'bold'}}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {props.companies
                .slice(props.page * props.rowsPerPage, props.page * props.rowsPerPage + props.rowsPerPage)
                .map((row:any) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        let value = '';
                        if(column.id === 'name') {
                          value  = row.name;
                        }
                        else if (column.id === 'type') {
                          value = row.brewery_type;
                        }
                        else if(column.id === 'url') {
                          value = row.id;
                        }
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.id === "url" ? 
                              <Link onClick={() => navigate("/detail/"+ `${row.id}`)} sx={{cursor:'pointer'}}>Detail</Link>
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={props.companies.length}
          rowsPerPage={props.rowsPerPage}
          page={props.page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  )
}

export default PageCompany