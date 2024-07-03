import { TableCell, TableHead, TableRow } from "@mui/material";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  tableHeaderCell: {
    borderRight: `0.5px solid ${theme.palette.divider}`,
  },
}));

const TableHeader = ({ headerCells = [] }) => {
  const classes = useStyles();

  return (
    <TableHead>
      <TableRow>
        {headerCells.map((headCell) => (
          <TableCell
            className={classes.tableHeaderCell}
            key={headCell.id}
            align="center"
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;

TableHeader.propTypes = {
  rowCount: PropTypes.number.isRequired,
};
