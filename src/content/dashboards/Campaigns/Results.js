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

const applyFilters = (campaigns, query, filters) => {
  return campaigns.filter((campaign) => {
    let matches = true;

    if (query) {
      const properties = ["name"];
      let containsQuery = false;

      properties.forEach((property) => {
        if (campaign[property].toLowerCase().includes(query.toLowerCase())) {
          containsQuery = true;
        }
      });

      if (filters.status && campaign.status !== filters.status) {
        matches = false;
      }

      if (!containsQuery) {
        matches = false;
      }
    }

    Object.keys(filters).forEach((key) => {
      const value = filters[key];

      if (value && campaign[key] !== value) {
        matches = false;
      }
    });

    return matches;
  });
};

const applyPagination = (campaigns, page, limit) => {
  return campaigns.slice(page * limit, page * limit + limit);
};

const Results = ({ campaigns, fetchCampaigns }) => {
  const [selectedItems, setSelectedCampaigns] = useState([]);
  const [deletedCampaign, setDeletedCampaign] = useState(null);
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const [gridDataForGrid, setGridDataForGrid] = useState({
    columns: new Array(
      { field: "name", headerName: "Title", sortable: true, width: 250, },
      { field: "type", headerName: "Data Type", sortable: true, width: 180, },
      { field: "createdTime", headerName: "Started Time", sortable: true, width: 220, },
      { field: "senderMail", headerName: "Sender", sortable: true, width: 220, },
      { field: "subject", headerName: "Subject", sortable: true, width: 220, },
      
    ),
    rows: []
  });

  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    status: null,
  });
  const [session, ,] = useContext(SessionContext);
  const { user } = session;

  const [defaultImg, selectedImg] = useState("");
  const { userProfileImg } = useSelector(
    (state) => state.userImg
  );

  useEffect(async () => {
    const res = userProfileImg//await updateSession();
    selectedImg(res.profile_image==""?"/images/user.jpeg":"data:" + res.profile_image.imageType + ";base64," + res.profile_image.image)
  }, [userProfileImg]);

  

  // const statusOptions = [
  //   {
  //     id: "all",
  //     name: "All",
  //   },
  //   {
  //     id: "not_started",
  //     name: t("Not started"),
  //   },
  //   {
  //     id: "success",
  //     name: t("Completed"),
  //   },
  //   {
  //     id: "progress",
  //     name: t("In Progress"),
  //   },
  //   {
  //     id: "failed",
  //     name: t("Failed"),
  //   },
  //   {
  //     id: "deleted",
  //     name: t("Deleted"),
  //   },
  // ];

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

  const handleSelectAllCampaigns = (event) => {
    setSelectedCampaigns(
      event.target.checked ? campaigns.map((campaign) => campaign._id) : []
    );
  };

  const handleSelectOneCampaign = (_event, campaignId) => {
    if (!selectedItems.includes(campaignId)) {
      setSelectedCampaigns((prevSelected) => [...prevSelected, campaignId]);
    } else {
      setSelectedCampaigns((prevSelected) =>
        prevSelected.filter((id) => id !== campaignId)
      );
    }
  };

  const handlePageChange = (_event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
  };

  const filteredCampaigns = applyFilters(campaigns, query, filters);
  const paginatedCampaigns = applyPagination(filteredCampaigns, page, limit);
  const selectedBulkActions = selectedItems.length > 0;
  const selectedSomeCampaigns =
    selectedItems.length > 0 && selectedItems.length < campaigns.length;
  const selectedAllCampaigns = selectedItems.length === campaigns.length;

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
    fetch(`${process.env.REACT_APP_API_URL}/emailCampaign/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        datasetId: deletedCampaign,
      }),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          fetchCampaigns();
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
        enqueueSnackbar(t("Campaign could not be deleted"), {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
          TransitionComponent: Zoom,
        });
      })
      .finally(() => {
        setDeletedCampaign(null);
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
                placeholder={t("Search by campaign name...")}
                value={query}
                fullWidth
                variant="outlined"
              />
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
              {/* <Box>
                <Typography component="span" variant="subtitle1">
                  {t("Showing")}:
                </Typography>{" "}
                <b>{paginatedCampaigns.length}</b> <b>{t("campaigns")}</b>
              </Box>
              <TablePagination
                component="div"
                count={filteredCampaigns.length}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleLimitChange}
                page={page}
                rowsPerPage={limit}
                rowsPerPageOptions={[5, 10, 15]}
              /> */}
            </Box>
          )}
          <Divider />

          {paginatedCampaigns.length === 0 ? (
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
                  "We couldn't find any campaigns matching your search criteria"
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
                          checked={selectedAllCampaigns}
                          indeterminate={selectedSomeCampaigns}
                          onChange={handleSelectAllCampaigns}
                        />
                      </TableCell>
                      <TableCell>{t("Title")}</TableCell>
                      <TableCell>{t("Type")}</TableCell>
                      <TableCell>{t("Started Time")}</TableCell>
                      <TableCell>{t("Sender")}</TableCell>
                      <TableCell>{t("Subject")}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedCampaigns.map((campaign) => {
                      const isCampaignSelected = selectedItems.includes(
                        campaign._id
                      );
                      return (
                        <TableRow
                          hover
                          key={campaign._id}
                          selected={isCampaignSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isCampaignSelected}
                              onChange={(event) =>
                                handleSelectOneCampaign(event, campaign._id)
                              }
                              value={isCampaignSelected}
                            />
                          </TableCell>
                          <TableCell>
                            <Typography noWrap variant="h5">
                              {campaign.name}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography noWrap variant="text.secondary">
                              {campaign.type}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography noWrap color="text.secondary">
                              {campaign.createdTime}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography noWrap color="text.secondary">
                              {campaign.senderMail}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography noWrap color="text.secondary">
                              {campaign.subject}
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
                  rows={paginatedCampaigns}
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
                  count={filteredCampaigns.length}
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
          {paginatedCampaigns.length !== 0 && (
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
                      title={t("Select all campaigns")}
                    >
                      <Checkbox
                        checked={selectedAllCampaigns}
                        indeterminate={selectedSomeCampaigns}
                        onChange={handleSelectAllCampaigns}
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
                      count={filteredCampaigns.length}
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
          {paginatedCampaigns.length === 0 ? (
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
                "We couldn't find any campaigns matching your search criteria"
              )}
            </Typography>
          ) : (
            <>
              <Grid container spacing={3}>
                {paginatedCampaigns.map((campaign) => {
                  const isCampaignSelected = selectedItems.includes(
                    campaign._id
                  );

                  return (
                    <Grid item xs={12} sm={6} md={4} key={campaign.name}>
                      <CardWrapper
                        className={clsx({
                          "Mui-selected": isCampaignSelected,
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
                              checked={isCampaignSelected}
                              onChange={(event) =>
                                handleSelectOneCampaign(event, campaign._id)
                              }
                              value={isCampaignSelected}
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
                            <Typography
                              sx={{
                                mt: 2,
                              }}
                              variant="h4"
                              gutterBottom
                            >
                              {campaign.name}
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
                                {campaign.createdTime}
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
                                    src={defaultImg}
                                  />
                                </Tooltip>
                                {/* ))} */}
                              </AvatarGroup>
                              {/* )} */}
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
                  <b>{limit}</b> {t("of")} <b>{filteredCampaigns.length}</b>{" "}
                  <b>{t("campaigns")}</b>
                </Box>
                <TablePagination
                  component="div"
                  count={filteredCampaigns.length}
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
              "Choose between table or grid views for displaying the campaigns list."
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
            {t("Do you really want to delete this campaign")}?
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
  campaigns: PropTypes.array.isRequired,
};

Results.defaultProps = {
  campaigns: [],
};

export default Results;
