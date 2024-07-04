import { useState, forwardRef, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Grid,
  Slide,
  Divider,
  Tooltip,
  IconButton,
  InputAdornment,
  MenuItem,
  AvatarGroup,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableContainer,
  TableRow,
  ToggleButton,
  ToggleButtonGroup,
  TextField,
  Button,
  Typography,
  Dialog,
  FormControl,
  Select,
  InputLabel,
  Zoom,
  CardMedia,
  lighten,
  styled,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import Label from "../../../components/Label";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import GridViewTwoToneIcon from "@mui/icons-material/GridViewTwoTone";
import TableRowsTwoToneIcon from "@mui/icons-material/TableRowsTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import ReplayCircleFilledIcon from '@mui/icons-material/ReplayCircleFilled';
import { useSnackbar } from "notistack";
import BulkActions from "./BulkActions";
import { SessionContext } from "../../../contexts/SessionContext";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { useSelector } from "react-redux";

const DialogWrapper = styled(Dialog)(
  () => `
      .MuiDialog-paper {
        overflow: visible;
      }
`
);

const AvatarError = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.error.lighter};
      color: ${theme.colors.error.main};
      width: ${theme.spacing(12)};
      height: ${theme.spacing(12)};

      .MuiSvgIcon-root {
        font-size: ${theme.typography.pxToRem(45)};
      }
`
);

const CardWrapper = styled(Card)(
  ({ theme }) => `

  position: relative;
  overflow: visible;

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    border-radius: inherit;
    z-index: 1;
    transition: ${theme.transitions.create(["box-shadow"])};
  }
      
    &.Mui-selected::after {
      box-shadow: 0 0 0 3px ${theme.colors.primary.main};
    }
  `
);

const ButtonError = styled(Button)(
  ({ theme }) => `
     background: ${theme.colors.error.main};
     color: ${theme.palette.error.contrastText};

     &:hover {
        background: ${theme.colors.error.dark};
     }
    `
);

const IconButtonError = styled(IconButton)(
  ({ theme }) => `
     background: ${theme.colors.error.lighter};
     color: ${theme.colors.error.main};
     padding: ${theme.spacing(0.75)};

     &:hover {
      background: ${lighten(theme.colors.error.lighter, 0.4)};
     }
`
);

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const getDatasetStatusLabel = (datasetStatus) => {
  const map = {
    not_started: {
      text: "Not started",
      color: "error",
    },
    progress: {
      text: "In progress",
      color: "info",
    },
    success: {
      text: "Completed",
      color: "success",
    },
    failed: {
      text: "Failed",
      color: "error",
    },
    deleted: {
      text: "Deleted",
      color: "error",
    },
  };

  const { text, color } = map[datasetStatus];

  return <Label color={color}>{text}</Label>;
};

const applyFilters = (datasets, query, filters) => {
  return datasets.filter((dataset) => {
    let matches = true;

    if (query) {
      const properties = ["title"];
      let containsQuery = false;

      properties.forEach((property) => {
        if (dataset[property].toLowerCase().includes(query.toLowerCase())) {
          containsQuery = true;
        }
      });

      if (filters.status && dataset.status !== filters.status) {
        matches = false;
      }

      if (!containsQuery) {
        matches = false;
      }
    }

    Object.keys(filters).forEach((key) => {
      const value = filters[key];

      if (value && dataset[key] !== value) {
        matches = false;
      }
    });

    return matches;
  });
};

const applyPagination = (datasets, page, limit) => {
  return datasets.slice(page * limit, page * limit + limit);
};

const Results = ({ datasets, fetchDatasets }) => {
  const [selectedItems, setSelectedDatasets] = useState([]);
  const [deletedDataset, setDeletedDataset] = useState(null);
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    status: null,
  });
  const [session, ,] = useContext(SessionContext);
  const { user } = session;

  const { userProfileImg } = useSelector(
    (state) => state.userImg
  );



  const statusOptions = [
    {
      id: "all",
      name: "All",
    },
    {
      id: "not_started",
      name: t("Not started"),
    },
    {
      id: "success",
      name: t("Completed"),
    },
    {
      id: "progress",
      name: t("In Progress"),
    },
    {
      id: "failed",
      name: t("Failed"),
    },
    {
      id: "deleted",
      name: t("Deleted"),
    },
  ];

    const [gridDataForGrid, setGridDataForGrid] = useState({
      columns: [],
      rows: []
    });

    
  useEffect(async () => {
    setGridDataForGrid({
      columns: new Array(
        { field: "title", headerName: "Title", sortable: true, width: 250, },
        { field: "dataType", headerName: "Data Type", sortable: true, width: 180, },
        { field: "createdTime", headerName: "Last Run Time", sortable: true, width: 220, },
        {
          field: "userid", headerName: "Members", sortable: true, width: 100, renderCell: (data) => {
            return (<div>
              <Box display="flex" justifyContent="flex-start">

                <AvatarGroup max={4}>

                  <Tooltip
                    arrow
                    placement="top"
                    // key={member._id}
                    title={user.username}
                  >
                    <Avatar
                      sx={{
                        width: 30,
                        height: 30,
                      }}
                      // key={member._id}
                      src={userProfileImg.profile_image==""?"/images/user.jpeg":"data:" + userProfileImg.profile_image.imageType + ";base64," + userProfileImg.profile_image.image}
                    />
                  </Tooltip>

                </AvatarGroup>

              </Box>
            </div>)
          }
        },
        {
          field: "status", headerName: "Status", sortable: true, width: 180, renderCell: (data) => {
            return (<div>
              <Box display="flex" justifyContent="flex-start">

                <Typography noWrap>
                  {getDatasetStatusLabel(data.row.status)}
                </Typography>

              </Box>
            </div>)
          }
        },

        {
          field: "status1", headerName: "Actions", sortable: true, width: 130, renderCell: (data) => {
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
        },
      ),
      rows: datasets
    })
  }, [userProfileImg]);




  const handleQueryChange = (event) => {
    event.persist();
    setQuery(event.target.value);
  };

  const handleStatusChange = (e) => {
    let value = null;

    if (e.target.value !== "all") {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value,
    }));
  };

  const handleSelectAllDatasets = (event) => {
    setSelectedDatasets(
      event.target.checked ? datasets.map((dataset) => dataset._id) : []
    );
  };

  const handleSelectOneDataset = (_event, datasetId) => {
    if (!selectedItems.includes(datasetId)) {
      setSelectedDatasets((prevSelected) => [...prevSelected, datasetId]);
    } else {
      setSelectedDatasets((prevSelected) =>
        prevSelected.filter((id) => id !== datasetId)
      );
    }
  };

  const handlePageChange = (_event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
  };

  const filteredDatasets = applyFilters(datasets, query, filters);
  const paginatedDatasets = applyPagination(filteredDatasets, page, limit);
  const selectedBulkActions = selectedItems.length > 0;
  const selectedSomeDatasets =
    selectedItems.length > 0 && selectedItems.length < datasets.length;
  const selectedAllDatasets = selectedItems.length === datasets.length;

  const [toggleView, setToggleView] = useState("table_view");

  const handleViewOrientation = (_event, newValue) => {
    setToggleView(newValue);
  };

  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);

  const handleConfirmDelete = () => {
    setOpenConfirmDelete(true);
  };

  const closeConfirmDelete = () => {
    setOpenConfirmDelete(false);
  };

  const handleDeleteCompleted = () => {
    fetch(`${process.env.REACT_APP_API_URL}/dataset/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        datasetId: deletedDataset,
      }),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          fetchDatasets();
          enqueueSnackbar(t("Dataset deleted"), {
            variant: "success",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
            TransitionComponent: Zoom,
          });
        } else {
          enqueueSnackbar(t("Dataset could not be deleted"), {
            variant: "error",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
            TransitionComponent: Zoom,
          });
        }
      })
      .catch((err) => {
        enqueueSnackbar(t("Dataset could not be deleted"), {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
          TransitionComponent: Zoom,
        });
      })
      .finally(() => {
        setDeletedDataset(null);
      });

    setOpenConfirmDelete(false);
  };

  return (
    <>
      <Card
        sx={{
          p: 1,
          mb: 3,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box p={1}>
              <TextField
                sx={{
                  m: 0,
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchTwoToneIcon />
                    </InputAdornment>
                  ),
                }}
                onChange={handleQueryChange}
                placeholder={t("Search by dataset name...")}
                value={query}
                fullWidth
                variant="outlined"
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box p={1}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>{t("Status")}</InputLabel>
                <Select
                  value={filters.status || "all"}
                  onChange={handleStatusChange}
                  label={t("Status")}
                >
                  {statusOptions.map((statusOption) => (
                    <MenuItem key={statusOption.id} value={statusOption.id}>
                      {statusOption.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={3}
            display="flex"
            justifyContent={{ xs: "center", md: "flex-end" }}
          >
            <Box p={1}>
              <ToggleButtonGroup
                value={toggleView}
                exclusive
                onChange={handleViewOrientation}
              >
                <ToggleButton disableRipple value="table_view">
                  <TableRowsTwoToneIcon />
                </ToggleButton>
                <ToggleButton disableRipple value="grid_view">
                  <GridViewTwoToneIcon />
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </Grid>
        </Grid>
      </Card>

      {toggleView === "table_view" && (
        <Card>
          {selectedBulkActions && (
            <Box p={2}>
              <BulkActions />
            </Box>
          )}
          {!selectedBulkActions && (
            <Box
              p={1}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box>
                {/* <Typography component="span" variant="subtitle1">
                  {t("Showing")}:
                </Typography>{" "}
                <b>{paginatedDatasets.length}</b> <b>{t("datasets")}</b> */}
                <Tooltip title={t("Refresh grid")} arrow>
                  <IconButton
                    onClick={() => {
                      fetchDatasets()
                    }}
                    color="primary"
                  >
                    <ReplayCircleFilledIcon fontSize="large" />
                  </IconButton>
                </Tooltip>

              </Box>
              {/* <TablePagination
                component="div"
                count={filteredDatasets.length}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleLimitChange}
                page={page}
                rowsPerPage={limit}
                rowsPerPageOptions={[5, 10, 15]}
              /> */}
            </Box>
          )}
          <Divider />

          {paginatedDatasets.length === 0 ? (
            <>
              <Typography
                sx={{
                  py: 10,
                }}
                variant="h3"
                fontWeight="normal"
                color="text.secondary"
                align="center"
              >
                {t(
                  "We couldn't find any datasets matching your search criteria"
                )}
              </Typography>
            </>
          ) : (
            <>
              {/* <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedAllDatasets}
                          indeterminate={selectedSomeDatasets}
                          onChange={handleSelectAllDatasets}
                        />
                      </TableCell>
                      <TableCell>{t("Title")}</TableCell>
                      <TableCell>{t("Data Type")}</TableCell>
                      <TableCell>{t("Started Time")}</TableCell>
                      <TableCell>{t("Members")}</TableCell>
                      <TableCell>{t("Status")}</TableCell>
                      <TableCell align="center">{t("Actions")}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedDatasets.map((dataset) => {
                      const isDatasetSelected = selectedItems.includes(
                        dataset._id
                      );
                      return (
                        <TableRow
                          hover
                          key={dataset._id}
                          selected={isDatasetSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isDatasetSelected}
                              onChange={(event) =>
                                handleSelectOneDataset(event, dataset._id)
                              }
                              value={isDatasetSelected}
                            />
                          </TableCell>
                          <TableCell>
                            <Typography noWrap variant="h5">
                              {dataset.title}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography noWrap variant="h5">
                              {dataset.dataType}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography noWrap color="text.secondary">
                              {dataset.createdTime}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Box display="flex" justifyContent="flex-start">
                             
                              <AvatarGroup max={4}>
                               
                                <Tooltip
                                  arrow
                                  placement="top"
                                  // key={member._id}
                                  title={user.username}
                                >
                                  <Avatar
                                    sx={{
                                      width: 30,
                                      height: 30,
                                    }}
                                    // key={member._id}
                                    src={`/images/user.jpeg`}
                                  />
                                </Tooltip>
                             
                              </AvatarGroup>
                            
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Typography noWrap>
                              {getDatasetStatusLabel(dataset.status)}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Typography noWrap>
                              <Tooltip title={t("Delete")} arrow>
                                <IconButton
                                  onClick={() => {
                                    setDeletedDataset(dataset._id);
                                    handleConfirmDelete();
                                  }}
                                  color="primary"
                                >
                                  <DeleteTwoToneIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </Typography>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer> */}
               <Box sx={{ height: 578, width: '100%' }}>
                <DataGridPro
                  rows={paginatedDatasets}
                  columns={gridDataForGrid.columns}
                  pageSizeOptions={[5, 10, 50, 100]}
                  checkboxSelection={true}
                  disableSelectionOnClick
                  pagination={false}
                  hideFooterRowCount={true}
                  hideFooter={true}
                  // paginationModel={paginationModel}
                  // onPaginationModelChange={setPaginationModel}
                />
              </Box>
              <Box p={2}>
                <TablePagination
                  component="div"
                  count={filteredDatasets.length}
                  onPageChange={handlePageChange}
                  onRowsPerPageChange={handleLimitChange}
                  page={page}
                  rowsPerPage={limit}
                  rowsPerPageOptions={[5, 10, 15]}
                />
              </Box>
            </>
          )}
        </Card>
      )}
      {toggleView === "grid_view" && (
        <>
          {paginatedDatasets.length !== 0 && (
            <Card
              sx={{
                p: 2,
                mb: 3,
              }}
            >
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <>
                  <Box display="flex" alignItems="center">
                    <Tooltip
                      arrow
                      placement="top"
                      title={t("Select all datasets")}
                    >
                      <Checkbox
                        checked={selectedAllDatasets}
                        indeterminate={selectedSomeDatasets}
                        onChange={handleSelectAllDatasets}
                      />
                    </Tooltip>
                  </Box>
                  {selectedBulkActions && (
                    <Box flex={1} pl={2}>
                      <BulkActions />
                    </Box>
                  )}
                  {!selectedBulkActions && (
                    <TablePagination
                      component="div"
                      count={filteredDatasets.length}
                      onPageChange={handlePageChange}
                      onRowsPerPageChange={handleLimitChange}
                      page={page}
                      rowsPerPage={limit}
                      rowsPerPageOptions={[5, 10, 15]}
                    />
                  )}
                </>
              </Box>
            </Card>
          )}
          {paginatedDatasets.length === 0 ? (
            <Typography
              sx={{
                py: 10,
              }}
              variant="h3"
              fontWeight="normal"
              color="text.secondary"
              align="center"
            >
              {t("We couldn't find any datasets matching your search criteria")}
            </Typography>
          ) : (
            <>
              <Grid container spacing={3}>
                {paginatedDatasets.map((dataset) => {
                  const isDatasetSelected = selectedItems.includes(dataset._id);

                  return (
                    <Grid item xs={12} sm={6} md={4} key={dataset.name}>
                      <CardWrapper
                        className={clsx({
                          "Mui-selected": isDatasetSelected,
                        })}
                      >
                        <Box
                          sx={{
                            position: "relative",
                            zIndex: "2",
                          }}
                        >
                          <Box
                            pl={2}
                            py={1}
                            pr={1}
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                          >
                            <Checkbox
                              checked={isDatasetSelected}
                              onChange={(event) =>
                                handleSelectOneDataset(event, dataset._id)
                              }
                              value={isDatasetSelected}
                            />
                          </Box>
                          <Divider />
                          <CardMedia
                            sx={{
                              minHeight: 180,
                            }}
                            image={`/images/default-dataset-image.jpeg`}
                          />
                          <Divider />
                          <Box p={2}>
                            {getDatasetStatusLabel(dataset.status)}

                            <Typography
                              sx={{
                                mt: 2,
                              }}
                              variant="h4"
                              gutterBottom
                            >
                              {dataset.title}
                            </Typography>
                          </Box>
                          <Box
                            px={2}
                            display="flex"
                            alignItems="flex-end"
                            justifyContent="space-between"
                          >
                            <Box>
                              <Typography variant="h5">
                                {dataset.createdTime}
                              </Typography>
                            </Box>
                          </Box>
                          <Divider />
                          <Box
                            p={2}
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                          >
                            <Box display="flex" justifyContent="flex-start">
                              {/* {dataset.memberIds.length > 0 && ( */}
                              <AvatarGroup max={4}>
                                {/* {dataset.memberIds.map((member) => ( */}
                                <Tooltip
                                  arrow
                                  placement="top"
                                  // key={member._id}
                                  title={user.username}
                                >
                                  <Avatar
                                    sx={{
                                      width: 30,
                                      height: 30,
                                    }}
                                    // key={member._id}
                                    src={userProfileImg.profile_image==""?"/images/user.jpeg":"data:" + userProfileImg.profile_image.imageType + ";base64," + userProfileImg.profile_image.image}

                                  />
                                </Tooltip>
                                {/* ))} */}
                              </AvatarGroup>
                              {/* )} */}
                            </Box>
                            <Box>
                              <Tooltip title={t("Delete")} arrow>
                                <IconButtonError
                                  onClick={() => {
                                    setDeletedDataset(dataset._id);
                                    handleConfirmDelete();
                                  }}
                                  color="primary"
                                >
                                  <DeleteTwoToneIcon fontSize="small" />
                                </IconButtonError>
                              </Tooltip>
                            </Box>
                          </Box>
                        </Box>
                      </CardWrapper>
                    </Grid>
                  );
                })}
              </Grid>
              <Card
                sx={{
                  p: 2,
                  mt: 3,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography component="span" variant="subtitle1">
                    {t("Showing")}
                  </Typography>{" "}
                  <b>{limit}</b> {t("of")} <b>{filteredDatasets.length}</b>{" "}
                  <b>{t("datasets")}</b>
                </Box>
                <TablePagination
                  component="div"
                  count={filteredDatasets.length}
                  onPageChange={handlePageChange}
                  onRowsPerPageChange={handleLimitChange}
                  page={page}
                  rowsPerPage={limit}
                  labelRowsPerPage=""
                  rowsPerPageOptions={[5, 10, 15]}
                />
              </Card>
            </>
          )}
        </>
      )}
      {!toggleView && (
        <Card
          sx={{
            textAlign: "center",
            p: 3,
          }}
        >
          <Typography
            align="center"
            variant="h4"
            fontWeight="normal"
            color="text.secondary"
            sx={{
              my: 5,
            }}
            gutterBottom
          >
            {t(
              "Choose between table or grid views for displaying the datasets list."
            )}
          </Typography>
        </Card>
      )}

      <DialogWrapper
        open={openConfirmDelete}
        maxWidth="sm"
        fullWidth
        TransitionComponent={Transition}
        keepMounted
        onClose={closeConfirmDelete}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          p={5}
        >
          <AvatarError>
            <CloseIcon />
          </AvatarError>

          <Typography
            align="center"
            sx={{
              pt: 4,
              px: 6,
            }}
            variant="h3"
          >
            {t("Do you really want to delete this dataset")}?
          </Typography>

          <Typography
            align="center"
            sx={{
              pt: 2,
              pb: 4,
              px: 6,
            }}
            fontWeight="normal"
            color="text.secondary"
            variant="h4"
          >
            {t("You won't be able to revert after deletion")}
          </Typography>

          <Box>
            <Button
              variant="text"
              size="large"
              sx={{
                mx: 1,
              }}
              onClick={closeConfirmDelete}
            >
              {t("Cancel")}
            </Button>
            <ButtonError
              onClick={handleDeleteCompleted}
              size="large"
              sx={{
                mx: 1,
                px: 3,
              }}
              variant="contained"
            >
              {t("Delete")}
            </ButtonError>
          </Box>
        </Box>
      </DialogWrapper>
    </>
  );
};

Results.propTypes = {
  datasets: PropTypes.array.isRequired,
};

Results.defaultProps = {
  datasets: [],
};

export default Results;
