import PageHeader from "./PageHeader";
import * as React from 'react';
import PageTitleWrapper from "../../../../components/PageTitleWrapper";
import { Helmet } from "react-helmet-async";
import { useEffect, useState, useContext, forwardRef } from "react";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { DataGrid } from '@mui/x-data-grid';
import {
  Avatar,
  Box,
  Card, CardHeader, CardContent,
  Slide,
  Divider,
  Tooltip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableContainer,
  TableRow,
  Button,
  Typography,
  Dialog,
  Zoom,
  styled,
} from "@mui/material";
import Chart from 'react-apexcharts';
import ListItemIcon from '@mui/material/ListItemIcon';
import { useTranslation } from "react-i18next";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';
import StorageIcon from '@mui/icons-material/Storage';
import { dataSetsListData, pipelineMoniteringData } from "../../../../assets/data/data";
function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}


export default function DataProfilingComponent({ }) {
  const { t } = useTranslation();
  const [pageSize, setPageSize] = React.useState(10);
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  const [state, setState] = useState({
    optionsUniqueDistribution: {
      colors: ['#3f51b5'],
      chart: {
        id: 'basic-bar',
      },
      xaxis: {
        categories: [
          1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999,
        ],
        title: {
          text: 'Column Name',
          style: {
            color: undefined,
            fontSize: '12px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 600,
            cssClass: 'apexcharts-yaxis-title',
          },
        },
      },
      yaxis: {
        title: {
          text: 'Unique Distribution',
          style: {
            color: undefined,
            fontSize: '12px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 600,
            cssClass: 'apexcharts-yaxis-title',
          },
        },
      },
    },
    seriesUniqueDistribution: [
      {
        name: 'People Born',
        data: [30, 40, 45, 50, 49, 60, 70, 91],
        title: {
          text: 'Frequency',
          style: {
            color: undefined,
            fontSize: '12px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 600,
            cssClass: 'apexcharts-yaxis-title',
          },
        },
      },
    ],
    optionsNullDistribution: {
      colors: ['#3f51b5'],
      chart: {
        id: 'basic-bar',
      },
      xaxis: {
        categories: [
          1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999,
        ],
        title: {
          text: 'Column Name',
          style: {
            color: undefined,
            fontSize: '12px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 600,
            cssClass: 'apexcharts-yaxis-title',
          },
        },
      },
      yaxis: {
        title: {
          text: 'Unique Distribution',
          style: {
            color: undefined,
            fontSize: '12px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 600,
            cssClass: 'apexcharts-yaxis-title',
          },
        },
      },
    },
    seriesNullDistribution: [
      {
        name: 'People Born',
        data: [30, 40, 45, 50, 49, 60, 70, 91],
        title: {
          text: 'Frequency',
          style: {
            color: undefined,
            fontSize: '12px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 600,
            cssClass: 'apexcharts-yaxis-title',
          },
        },
      },
    ],

    
  });

  const dataSetsList = dataSetsListData;

  const columns = [
    {
      field: 'dataSet',
      headerName: 'Data Set',
      width: 200,
    },
    {
      field: "dataType",
      headerName: "Data Type",
      width: 200,
    },
    {
      field: "dataTypeDB",
      headerName: "Data Type DB",
      width: 150,
    },
    {
      field: "decimalavg",
      headerName: "Decimal avg",
      width: 150,
    },
    {
      field: "decimalmax",
      headerName: "Decimal Max",
      width: 150,
    },
    {
      field: "knowledge",
      headerName: "knowledge",
      width: 150,
    },
    {
      field: "maxcount",
      headerName: "Max count",
      width: 150,
    },
    {
      field: "mean",
      headerName: "Mean",
      width: 150,
    },
    {
      field: "median",
      headerName: "Median",
      width: 150,
    },
    {
      field: "mincount",
      headerName: " Min count",
      width: 150,
    },
    {
      field: "mode",
      headerName: "Mode",
      width: 150,
    },
    {
      field: "modefrequency",
      headerName: "Mode frequency",
      width: 150,
    },
    {
      field: "categorical",
      headerName: " Categorical",
      width: 150,
    },
  ];

  const rows = pipelineMoniteringData;

  return (
    <>
      <Box
        sx={{
          width: "100%",
          boxShadow: 1,
        }}
      >
        <div>
          <Helmet>
            <title>Pipeline Monitoring</title>
          </Helmet>
          <PageTitleWrapper>
            <PageHeader />
          </PageTitleWrapper>
        </div>
        <Card
          sx={{
            mx: 3,
          }}
        >
          <Box sx={{ bgcolor: "background.paper", height: 650, position: 'relative' }}>
            <SplitterLayout primaryIndex={1} secondaryInitialSize={250}>
              <div>
                <CardHeader title={t("Data Sets")} />
                <Divider />
                {/* {dataSetsList.map(dataSetsItems => (
                  <li>{dataSetsItems.text}</li>
                ))} */}

                <List dense={dense} className='list-custom'>
                  {dataSetsList.map(dataSetsItems => (<>
                    <ListItem> <ListItemIcon>
                      <StorageIcon />
                    </ListItemIcon>
                      <ListItemText
                        primary={dataSetsItems.text}
                        secondary={secondary ? 'Secondary text' : null}
                      /> </ListItem>
                  </>))}
                </List>
              </div>
              <SplitterLayout secondaryInitialSize={150} >
                <SplitterLayout vertical >
                  <SplitterLayout secondaryInitialSize={300}>
                    <div>
                      <Chart
                       height={650}
                        width={650}
                        options={state.optionsUniqueDistribution}
                        series={state.seriesUniqueDistribution}
                        type="bar"
                      />
                    </div>
                    <div> 
                    <Chart
                       height={650}
                        width={650}
                        options={state.optionsNullDistribution}
                        series={state.seriesNullDistribution}
                        type="bar"
                      />
                    </div>
                  </SplitterLayout>
                  <Box sx={{ height: 250, width: '100%' }}>
                    <DataGrid
                      rows={rows}
                      columns={columns}
                      pageSize={pageSize}
                      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                      rowsPerPageOptions={[5, 10, 20]}
                      disableSelectionOnClick
                      experimentalFeatures={{ newEditingApi: true }}
                    />
                  </Box>
                </SplitterLayout>
              </SplitterLayout>
            </SplitterLayout>
          </Box>
        </Card>
      </Box >
    </>
  );
} 