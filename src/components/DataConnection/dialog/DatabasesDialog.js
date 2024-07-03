import React, { useState, forwardRef, useContext, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FormControl, Grid, TextField, InputAdornment, Tooltip, IconButton, Card, } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { DataGridPro } from "@mui/x-data-grid-pro";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import { useTranslation } from "react-i18next";
import CloseIcon from '@mui/icons-material/Close';



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  // border: '1px solid #ddd',
  boxShadow: 24,
  p: 4
};


const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

function DatabasesDialog({ open, handleClose }) {

  const [isConfirm, setIsConfirm] = React.useState(false);

  const [isConnectTypeform, setIsConnectTypeform] = React.useState(false);

  const [expanded, setExpanded] = React.useState('panel1');

  const [deletedDataset, setDeletedDataset] = useState(null);
  const { t } = useTranslation();

  const [gridDataForGrid, setGridDataForGrid] = useState({
    columns: [],
    rows: []
  });

  const handleIsConfirm = () => {
    handleClose();
    setIsConfirm(true);
  }
  const handleCloseIsConfirm = () => {
    setIsConfirm(false);
  }

  const handleIsConnectTypeform = () => {
    setIsConnectTypeform(true);
  }

  const handleCloseIsConnectTypeform = () => {
    handleClose();
    setIsConfirm(false);
    setIsConnectTypeform(false);
  }

  const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  const formData = [
    { title: 'Form 1', year: 1994 },
    { title: 'Form 2', year: 1972 },
    { title: 'Form 3', year: 1974 },
    { title: 'Form 4', year: 2008 },
    { title: 'Form 5', year: 1957 }
  ];

  const selectData = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: 'Pulp Fiction', year: 1994 }
  ];

  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);

  const handleConfirmDelete = () => {
    setOpenConfirmDelete(true);
  };

  const closeConfirmDelete = () => {
    setOpenConfirmDelete(false);
  };


  useEffect(async () => {
    setGridDataForGrid(
      {

        columns: new Array(
          { field: 'formName', headerName: 'Form Name', width: 250, editable: true },
          { field: 'aliasName', headerName: 'Alias Name', width: 250, editable: true },
          { field: 'metaData', headerName: 'Meta Data', width: 200, editable: true },
          {
            field: "status1", headerName: "Actions", sortable: true, width: 70, renderCell: (data) => {
              return (<div>
                <Typography noWrap>
                  <Tooltip title={t("Delete")} arrow>
                    <IconButton
                      onClick={() => {
                        setDeletedDataset(data.row._id);
                        handleConfirmDelete();
                      }}
                      color="primary"
                    >
                      <DeleteTwoToneIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Typography>
              </div>)
            }
          }
        ),
        rows: new Array(
          { id: 1, formName: 'Form 1', aliasName: 'F-1', metaData: 'Not chosen' },
          { id: 2, formName: 'Form 2', aliasName: 'F-2', metaData: 'Not chosen' },
          { id: 3, formName: 'Form 3', aliasName: 'F-3', metaData: 'Not chosen' },
          { id: 4, formName: 'Form 4', aliasName: 'F-4', metaData: 'Not chosen' },
          { id: 5, formName: 'Form 5', aliasName: 'F-5', metaData: 'Not chosen' }
        )
      }
      //   {
      //   columns: new Array(
      //     { field: "title", headerName: "Title", sortable: true, width: 250, },
      //     { field: "dataType", headerName: "Data Type", sortable: true, width: 180, },
      //     { field: "createdTime", headerName: "Last Run Time", sortable: true, width: 220, },
      //     {
      //       field: "status1", headerName: "Actions", sortable: true, width: 130, renderCell: (data) => {
      //         return (<div>
      //           <Typography noWrap>
      //             <Tooltip title={t("Delete")} arrow>
      //               <IconButton
      //                 onClick={() => {
      //                   setDeletedDataset(data.row._id);
      //                   handleConfirmDelete();
      //                 }}
      //                 color="primary"
      //               >
      //                 <DeleteTwoToneIcon fontSize="small" />
      //               </IconButton>
      //             </Tooltip>
      //           </Typography>
      //         </div>)
      //       }
      //     },
      //   ),
      //   rows: datasets
      // }
    )
  }, []);

  return (
    <>

      {/* typeform agree code */}

      {open ?
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >

          <Box sx={style}>

            <Box sx={{ display: 'flex', flexDirection: 'row', pb: 2 }} className='flex items-end justify-end' >
              <CloseIcon onClick={handleClose} className='cursor-pointer' style={{ color: '#212121' }} />
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'row', pb: 2 }}>
              <Grid item>
                <Typography id="modal-modal-title" variant="h3" component="h3" className='flex items-center justify-center'>
                  Connecting SaaS Platforms to ConvertML
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                SaaS Platforms is requesting access to your ConvertML account.
                  Continue connecting if you agree.
                </Typography>
              </Grid>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <Grid item xs={12} className='flex justify-center items-center'>
                <Typography variant="span" gutterBottom>
                  <div className="flex justify-center items-center grayscale-image">
                    <span className="flex items-center my-4 justify-center">
                      <span style={{ fontSize: '22px', marginRight: '15px' }}>SaaS Platforms</span> <img
                        className="text-center mx-auto" style={{ marginRight: '15px' }}
                        src={"/images/right-arrow.png"} alt='arrow-left'
                      />  <img
                        className="w-44 mx-auto"
                        src={"/images/convertmlLogo.png"} alt='convertML'
                      />
                    </span>
                  </div>
                </Typography>
              </Grid>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <Grid item mt={1} mb={1}>
                <FormGroup>
                  <FormControlLabel required control={<Checkbox />} label="I authorise SaaS Platforms to connect to my ConvertML Account" />
                </FormGroup>
              </Grid>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <Grid container item spacing={3}>
                <Grid item xs={12} md={12}>
                  <Grid item xs={6} md={6} style={{ float: 'left', width: '100%', padding: '10px' }}>
                    <Button color="inherit" variant='outlined' style={{ width: '100%' }} onClick={handleClose}>Cancel22</Button>
                  </Grid>
                  <Grid item xs={6} md={6} style={{ float: 'left', width: '100%', padding: '10px' }}>
                    <Button variant='contained' style={{ width: '100%' }} onClick={handleIsConfirm}>Agree22</Button>
                  </Grid>
                </Grid>
              </Grid>
            </Box>

          </Box>

        </Modal>
        : ''}

      {/* end */}


      {/* typeform confirmation code */}

      {isConfirm ? <Modal
        open={isConfirm}
        onClose={handleCloseIsConfirm}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Box container sx={style}>

          <Box sx={{ display: 'flex', flexDirection: 'row', pb: 2 }} className='flex items-end justify-end' >
            <CloseIcon onClick={handleCloseIsConfirm} className='cursor-pointer' style={{ color: '#212121' }} />
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Grid item spacing={3}>
              <Typography id="modal-modal-title" variant="h3" component="h3" className='flex items-center justify-center'>
                Select Saas platform you want to Connect to ConvertML
              </Typography>
            </Grid>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Grid container item spacing={3} xs={12} style={{
              width: '100%'
            }}>

              <Grid item xs={12}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={selectData}
                  sx={{ width: '100%' }}
                  renderInput={(params) => <TextField {...params} label="Select Workspace" />}
                />
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={3} sx={{ width: '100%' }}>
                  <Autocomplete
                    multiple
                    id="tags-outlined"
                    options={formData}
                    getOptionLabel={(option) => option.title}
                    defaultValue={[formData[4]]}
                    filterSelectedOptions
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Form"
                        placeholder="Form"
                      />
                    )}
                  />
                </Stack>
              </Grid>

            </Grid>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Grid container item spacing={3}>
              <Grid item xs={12} md={12}>
                <Grid item xs={6} md={6} style={{ float: 'left', width: '100%', padding: '10px' }}>
                  <Button color="inherit" variant='outlined' style={{ width: '100%' }} onClick={handleCloseIsConfirm}>Cancel</Button>
                </Grid>
                <Grid item xs={6} md={6} style={{ float: 'left', width: '100%', padding: '10px' }}>
                  <Button variant='contained' style={{ width: '100%' }} onClick={handleIsConnectTypeform}>Confirm</Button>
                </Grid>
              </Grid>
            </Grid>
          </Box>

        </Box>

      </Modal>
        : ''
      }

      {/* end */}


      {/* connect to typeform */}

      {isConnectTypeform ? <Modal
        open={isConfirm}
        onClose={handleCloseIsConfirm}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Box container sx={style} style={{ width: '900px', padding: '0px' }}>


          <Box style={{ padding: '36px 36px 0px 36px' }} >

            <Box sx={{ display: 'flex', flexDirection: 'row', pb: 2 }} className='flex items-end justify-end' >
              <CloseIcon onClick={handleCloseIsConnectTypeform} className='cursor-pointer' style={{ color: '#212121' }} />
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'row' }} className='flex items-center justify-center'>
              <Grid item spacing={3}>
                <Typography id="modal-modal-title" variant="h3" component="h3">
                  Saas platform you want to Connect to ConvertML
                </Typography>
              </Grid>
            </Box>
          </Box>

          <Box style={{ maxHeight: '70vh', overflowX: 'hidden', overflowY: 'auto', padding: '0 36px 0px 36px' }}>

            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Grid container item spacing={3} xs={12} style={{
                width: '100%'
              }}>

                <Grid item xs={12}>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={selectData}
                    sx={{ width: '100%' }}
                    renderInput={(params) => <TextField {...params} label="Select Workspace" />}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Stack spacing={3} sx={{ width: '100%' }}>
                    <Autocomplete
                      multiple
                      id="tags-outlined"
                      options={formData}
                      getOptionLabel={(option) => option.title}
                      defaultValue={[formData[4]]}
                      filterSelectedOptions
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Form"
                          placeholder="Form"
                        />
                      )}
                    />
                  </Stack>
                </Grid>

              </Grid>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Grid container spacing={4} display="flex" alignItems="center">
                <Grid item xs={12}>
                  <Box sx={{ height: 'auto', width: '100%' }}>
                    <DataGridPro
                      rows={gridDataForGrid.rows}
                      columns={gridDataForGrid.columns}
                      pageSizeOptions={[5, 10, 50, 100]}
                      checkboxSelection={false}
                      disableSelectionOnClick
                      pagination={false}
                      hideFooterRowCount={true}
                      hideFooter={true}
                      editable
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Grid container spacing={4} display="flex" alignItems="center">
                <Grid item xs={7} className='flex items-center'>
                  <Box>
                    <Typography variant="h3" sx={{ fontWeight: "bold", color: "#090F0F" }} gutterBottom>
                      Form Details
                    </Typography>
                  </Box>
                  <Box marginLeft={2}>
                    <FormGroup>
                      <FormControlLabel control={<Switch defaultChecked />} className="text-primary" label="Mergemode" />
                    </FormGroup>
                  </Box>
                </Grid>
                <Grid item xs={5}>
                  <Box p={1} style={{ paddingRight: '0px' }}>
                    <TextField
                      sx={{
                        m: 0
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchTwoToneIcon />
                          </InputAdornment>
                        ),
                      }}
                      placeholder="Search"
                      fullWidth
                      variant="outlined"
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Grid container spacing={4} display="flex" alignItems="center">
                <Grid item xs={12}>
                  <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} style={{ marginBottom: '10px' }}>
                    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
                      <Typography>Form 1</Typography>
                    </AccordionSummary>
                    <AccordionDetails style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
                      <Typography>
                        <Grid container spacing={4} display="flex" alignItems="center">
                          <Grid item xs={12}>
                            <Box sx={{ height: 'auto', width: '100%' }}>
                              <DataGridPro
                                rows={gridDataForGrid.rows}
                                columns={gridDataForGrid.columns}
                                pageSizeOptions={[5, 10, 50, 100]}
                                checkboxSelection={false}
                                disableSelectionOnClick
                                pagination={false}
                                hideFooterRowCount={true}
                                hideFooter={true}
                                editable
                              />
                            </Box>
                          </Grid>
                        </Grid>
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} style={{ marginBottom: '10px' }}>
                    <AccordionSummary aria-controls="panel2d-content" id="panel2d-header" style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
                      <Typography>Form 2</Typography>
                    </AccordionSummary>
                    <AccordionDetails style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
                      <Typography>
                        <Grid container spacing={4} display="flex" alignItems="center">
                          <Grid item xs={12}>
                            <Box sx={{ height: 'auto', width: '100%' }}>
                              <DataGridPro
                                rows={gridDataForGrid.rows}
                                columns={gridDataForGrid.columns}
                                pageSizeOptions={[5, 10, 50, 100]}
                                checkboxSelection={false}
                                disableSelectionOnClick
                                pagination={false}
                                hideFooterRowCount={true}
                                hideFooter={true}
                                editable
                              />
                            </Box>
                          </Grid>
                        </Grid>
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')} style={{ marginBottom: '10px' }}>
                    <AccordionSummary aria-controls="panel3d-content" id="panel3d-header" style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
                      <Typography>Form 3</Typography>
                    </AccordionSummary>
                    <AccordionDetails style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
                      <Typography>
                        <Grid container spacing={4} display="flex" alignItems="center">
                          <Grid item xs={12}>
                            <Box sx={{ height: 'auto', width: '100%' }}>
                              <DataGridPro
                                rows={gridDataForGrid.rows}
                                columns={gridDataForGrid.columns}
                                pageSizeOptions={[5, 10, 50, 100]}
                                checkboxSelection={false}
                                disableSelectionOnClick
                                pagination={false}
                                hideFooterRowCount={true}
                                hideFooter={true}
                                editable
                              />
                            </Box>
                          </Grid>
                        </Grid>
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
              </Grid>
            </Box>

          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }} style={{ padding: '0 36px 36px 36px' }}>
            <Grid container item spacing={3}>
              <Grid item xs={12} md={12}>
                <Grid item xs={6} md={6} style={{ float: 'left', width: '100%', padding: '10px' }}>
                  <Button color="inherit" variant='outlined' style={{ width: '100%' }} onClick={handleCloseIsConnectTypeform}>Cancel</Button>
                </Grid>
                <Grid item xs={6} md={6} style={{ float: 'left', width: '100%', padding: '10px' }}>
                  <Button variant='contained' style={{ width: '100%' }}  onClick={handleCloseIsConnectTypeform}>Confirm</Button>
                </Grid>
              </Grid>
            </Grid>
          </Box>

        </Box>

      </Modal>

        : ''}

      {/* end */}


    </ >
  );
}



export default DatabasesDialog;