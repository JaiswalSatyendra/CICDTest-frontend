import { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
  Paper,
  Button,
} from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { visuallyHidden } from "@mui/utils";

function createData(column, fit, empty, type) {
  return {
    column,
    fit,
    empty,
    type,
  };
}

const rows = [
  createData("TotalCharges", true, 1, "Number"),
  createData("customerId", false, 1, "Number"),
  createData("gender", true, 1, "Text"),
  createData("SeniorCitizen", true, 1, "Text"),
  createData("Partner", false, 1, "Text"),
  createData("tenure", true, 1, "Number"),
  createData("PhoneService", true, 1, "Text"),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "column",
    numeric: false,
    disablePadding: true,
    label: "Column",
  },
  {
    id: "fit",
    numeric: false,
    disablePadding: false,
    label: "Fit for use?",
  },
  {
    id: "empty",
    numeric: true,
    disablePadding: false,
    label: "Empty",
  },
  {
    id: "type",
    numeric: false,
    disablePadding: false,
    label: "Type",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            sx={{ fontWeight: "bold" }}
            key={headCell.id}
            align={"left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function OverviewTable(data) {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("column");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        boxShadow: 1,
      }}
    >
      <Paper sx={{ width: "100%", mb: 2, p: 2 }}>
        <Typography
          sx={{ flex: "1 1 100%", fontWeight: "bold" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Overview
        </Typography>
        <TableContainer sx={{ p: 1 }}>
          <Table aria-labelledby="tableTitle" size={"medium"}>
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.column}
                    >
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.column}
                      </TableCell>
                      <TableCell align="left">
                        {row.fit === true ? (
                          <Button
                            variant="contained"
                            size="small"
                            sx={{
                              backgroundColor: "#00bfa5",
                            }}
                            startIcon={<CheckCircleIcon />}
                          >
                            Yes
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            size="small"
                            sx={{
                              backgroundColor: "#d50000",
                            }}
                            startIcon={<CancelIcon />}
                          >
                            No
                          </Button>
                        )}
                      </TableCell>
                      <TableCell align="left">{row.empty}</TableCell>
                      <TableCell align="left">{row.type}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
