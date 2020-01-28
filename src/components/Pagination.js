import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableFooter from '@material-ui/core/TableFooter';

const Pagination = ({ count, getPokemos }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    getPokemos({
      pagination: { offset: newPage * rowsPerPage, limit: rowsPerPage },
    });
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    getPokemos({
      pagination: { offset: 0, limit: parseInt(event.target.value, 10) },
    });
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="custom pagination table">
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[10, 20, 50]}
              count={count}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

Pagination.propTypes = {
  count: PropTypes.number.isRequired,
  getPokemos: PropTypes.func.isRequired,
};

export default Pagination;
