import PageHeader from "./PageHeader";
import * as React from 'react';
import PageTitleWrapper from "../../../../components/PageTitleWrapper";
import { Helmet } from "react-helmet-async";
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState, useContext, forwardRef } from "react";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import {
  Avatar,
  Box,
  Card,
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
import { pipelineMoniteringData } from "../../../../assets/data/data";
import TextField from '@mui/material/TextField';
import { DateTimePicker } from "@mui/lab";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const columns = [
  {
    field: 'dataSet',
    headerName: 'Data Set',
    width: 200,
    // editable: true,
  },
  {
    field: "pipelineSummary",
    headerName: "Pipeline Summary",
    width: 200,
    renderCell: (params) => (
      <div className="pipelinecout-containor">
        <a className="source-pipeline" id="source-pipeline" matTooltip="Previous" matTooltipPosition="below"></a>
        <a className="target-pipeline" id="target-pipeline" matTooltip="Next" matTooltipPosition="below"></a>
        <div className="pipelinecout" id='PipelineCounter'>
          <span>
            <b title="ToLower, Contextualization, SentimentAnalysis, KeywordExtraction, PunctuationRemover">5</b>
          </span>
          <span>
            <b title="KeywordExtraction, PunctuationRemover">2</b>
          </span>
        </div>
      </div>
    )
  },
  {
    field: "scheduleDateandTime",
    headerName: "Schedule Date and Time",
    width: 250,
    renderCell: (params) => (
      <div>
        <div className="mt-2"></div>
        <DateTimePicker size="small" label="Date&Time picker" autoComplete="off" InputLabelProps={{ shrink: true }}
          renderInput={(params) => <TextField {...params} size="small" />} />
      </div>
    )
  },
  {
    field: "frequency",
    headerName: "Frequency",
    width: 150,
    renderCell: (params) => (
      <Box sx={{ minWidth: 140 }}>
        <div className="mt-2"></div>
        <FormControl fullWidth size="small">
          <InputLabel id="demo-simple-select-label">Frequency</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Age"
          >
            <MenuItem value={10}> Run Once</MenuItem>
            <MenuItem value={20}> Run Hourly </MenuItem>
            <MenuItem value={30}> Run Daily </MenuItem>
          </Select>
        </FormControl>
      </Box>
    )
  },
  {
    field: "loadType",
    headerName: "Load Type",
    width: 130,
    renderCell: (params) => (
      <div> {params.value} </div>
    )
  },
  {
    field: "status",
    headerName: "Status",
    width: 150,
    renderCell: (params) => (
      <div className="statuscompleted">
        <div class="completed">Completed <a class="fail-reason schema-change"></a></div>
      </div>
    )
  },
  {
    field: "updatedBy",
    headerName: "Updated By",
    width: 170,
    renderCell: (params) => (
      <div>   {params.value}  </div>
    )
  },
  {
    field: "targetRuntime",
    headerName: "Target Runtime",
    width: 180,
    renderCell: (params) => (
      <Box sx={{ minWidth: 170 }}>
        <div className="mt-2"></div>
        <FormControl fullWidth size="small">
          <InputLabel id="demo-simple-select-label">Target Runtime</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Age"
          >
            <MenuItem value={10}> LOCAL</MenuItem>
            <MenuItem value={20}> GCP  </MenuItem>
            <MenuItem value={30}> AZURE  </MenuItem>
          </Select>
        </FormControl>
      </Box>
    )
  },
  {
    field: "action",
    headerName: "Action",
    renderCell: (params) => (
      <Box>
      <div className="mt-1"></div>
      <Button variant="contained"  sx={{ width: '30', borderRadius: "5px" }}>
        <PlayCircleIcon />
      </Button>
      </Box>
    )
  }
];

const rows = pipelineMoniteringData;


export default function PipelineMonitoringComponent({ }) {
  const [pageSize, setPageSize] = React.useState(10);

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
          <Box sx={{ bgcolor: "background.paper", height: 650, width: '100%' }}>
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
        </Card>
      </Box>
    </>
  );
}
