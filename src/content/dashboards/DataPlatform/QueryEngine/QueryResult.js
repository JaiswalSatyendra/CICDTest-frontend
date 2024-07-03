import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

export default function QueryResult({ data, name }) {
  const [pageSize, setPageSize] = useState(5);
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const isEmptyObject = (obj) => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };

  useEffect(() => {
    if (!isEmptyObject(data)) {
      setRows(
        data.rows.map((row, index) => {
          return {
            id: index,
            ...row,
          };
        })
      );

      setColumns(
        data.metaData.map((column, index) => {
          return {
            field: Object.keys(column)[0],
            headerName: Object.keys(column)[0],
            sortable: true,
            type: Object.values(column)[0],
            flex: 1,
          };
        })
      );
      console.log(data);
    }
  }, [data]);

  const columnValue = columns.length
    ? columns
    : [{ field: name, width: 150, sortable: false }];
  return (
    <Box
      sx={{
        height: 370,
        bgcolor: "background.paper",
        m: 1,
        borderRadius: "10px",
      }}
    >
      <DataGrid
        rows={rows}
        columns={columnValue}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 50, 100]}
        checkboxSelection={rows.length ? true : false}
        disableSelectionOnClick
        pagination
      />
    </Box>
  );
}
