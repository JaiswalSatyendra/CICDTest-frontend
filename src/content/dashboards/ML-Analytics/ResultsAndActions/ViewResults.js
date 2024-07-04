import { useState, useEffect, useMemo, useRef } from "react";
import { Box } from "@mui/material";
import { DataGridPro, GridColDef, GridRenderCellParams, GridFilterForm, GridToolbar } from '@mui/x-data-grid-pro';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';

function ViewResults({ rowsData, filterItm }) {
  const [pageSize, setPageSize] = useState(10);
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });
  // const isEmptyObject = (obj) => {
  //   for (var key in obj) {
  //     if (obj.hasOwnProperty(key)) return false;
  //   }
  //   return true;
  // };

  // useEffect(() => {
  //   console.log("predictedResult")
  //   if (!isEmptyObject(data)) {
  //     setRows(
  //       data.rows.map((row, index) => {
  //         return {
  //           id: index,
  //           ...row,
  //         };
  //       })
  //     );

  //     setColumns(
  //       data.metaData.map((column, index) => {
  //         return {
  //           field: Object.keys(column)[0],
  //           headerName: Object.keys(column)[0],
  //           sortable: true,
  //           type: Object.values(column)[0],
  //           flex: 1,
  //         };
  //       })
  //     );
  //     console.log(data);
  //   }
  // }, [data]);



  useEffect(() => {
    if (rowsData.length != 0) {
      let newCols = Object.keys(rowsData[0]);
      let getInd = newCols.indexOf("category");
      newCols.splice(1, 0, newCols.splice(getInd, 1)[0]);
      if(getInd==-1){
      let getInd1 = newCols.indexOf("churn");
      newCols.splice(1, 0, newCols.splice(getInd1, 1)[0]);
      }
      setRows(
        rowsData.map((row, index) => {
          let getInd2 = newCols.indexOf("churn");
          if(getInd2!=-1){
            return {
              ...row,
              id: index,
              "churn":(row.churn=="1"?"YES":"NO"),
            };
          }else{
            return {
              id: index,
              ...row,
            };
          }
         
        })
      );
      // renderCell: renderCellExpand,
      setColumns(
        newCols.map((column, index) => {
          return {
            field: column,
            headerName: column[0].toUpperCase() + column.slice(1),
            sortable: true,

            width: 230,
          };
        })
      );
    }

  }, [rowsData]);

  

  // const columnValue = columns.length
  //   ? columns
  //   : [{ field: name, width: 150, sortable: false }];
  return (
    <Box
      sx={{
        height: 640,
        bgcolor: "background.paper",
      }}
    >
      {rowsData.length == 0 ?
        "Please select a predicted source to view result"
        :
        <DataGridPro
          columns={columns}
          rows={rows}
          pageSizeOptions={[5, 10, 50, 100]}
          checkboxSelection={rows.length ? true : false}
          disableSelectionOnClick
          pagination
          // filterModel={{ items: [{ field: 'category', operator: 'contains', value: filterItm }], }}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          
        />
      }
    </Box>
  );
}
export default ViewResults;
