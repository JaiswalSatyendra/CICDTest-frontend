import { useEffect, useState, useContext, forwardRef } from "react";
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
import Label from "../../../../components/Label";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";
import LaunchTwoToneIcon from "@mui/icons-material/LaunchTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import { useSnackbar } from "notistack";
import { SessionContext } from "../../../../contexts/SessionContext";

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

const ButtonError = styled(Button)(
  ({ theme }) => `
     background: ${theme.colors.error.main};
     color: ${theme.palette.error.contrastText};

     &:hover {
        background: ${theme.colors.error.dark};
     }
    `
);
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const applyFilters = (projects, query, filters) => {
  return projects.filter((project) => {
    let matches = true;

    if (query) {
      const properties = ["name"];
      let containsQuery = false;

      properties.forEach((property) => {
        if (project[property].toLowerCase().includes(query.toLowerCase())) {
          containsQuery = true;
        }
      });

      if (filters.status && project.status !== filters.status) {
        matches = false;
      }

      if (!containsQuery) {
        matches = false;
      }
    }

    Object.keys(filters).forEach((key) => {
      const value = filters[key];

      if (value && project[key] !== value) {
        matches = false;
      }
    });

    return matches;
  });
};

const applyPagination = (projects, page, limit) => {
  return projects.slice(page * limit, page * limit + limit);
};

const getProjectStatusLabel = (projectStatus) => {
  const map = {
    failed: {
      text: "Failed",
      color: "error",
    },
    deleted: {
      text: "Deleted",
      color: "error",
    },
    running: {
      text: "Running",
      color: "success",
    },
    initializing: {
      text: "Initializing",
      color: "info",
    },
  };

  const { text, color } = map[projectStatus];

  return <Label color={color}>{text}</Label>;
};

const SupersetTable = ({ projects, columns }) => {
  const [deletingProject, setDeletingProject] = useState({});
  const [selectedItems, setSelectedProjects] = useState([]);
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    status: null,
  });
  const [session, , , ,] = useContext(SessionContext);
  const { user } = session;

  const handlePageChange = (_event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
  };

  const filteredProjects = applyFilters(projects, query, filters);
  const paginatedProjects = applyPagination(filteredProjects, page, limit);

  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);

  const handleConfirmDelete = () => {
    setOpenConfirmDelete(true);
  };

  const closeConfirmDelete = () => {
    setOpenConfirmDelete(false);
  };

  const handleDeleteCompleted = () => {
    fetch(`${process.env.REACT_APP_API_URL}/superset/delete`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        supersetId: deletingProject.id,
        ec2InstanceId: deletingProject.ec2Id,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success === true) {
          enqueueSnackbar(t("The instance has been deleted successfully"), {
            variant: "success",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
            TransitionComponent: Zoom,
          });
        } else {
          enqueueSnackbar(t("Error while deleting instance"), {
            variant: "error",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
            TransitionComponent: Zoom,
          });
        }
        setOpenConfirmDelete(false);
        setDeletingProject({});
      })
      .catch((err) => {
        enqueueSnackbar(t("Error while deleting instance"), {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
          TransitionComponent: Zoom,
        });
        setOpenConfirmDelete(false);
        setDeletingProject({});
      });
  };

  return (
    <>
      {
        <Card
          sx={{
            mx: 3,
          }}
        >
          <Box
            p={2}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography component="span" variant="subtitle1">
                {t("Showing")}:
              </Typography>{" "}
              <b>{paginatedProjects.length}</b> <b>{t("records")}</b>
            </Box>
            <TablePagination
              component="div"
              count={filteredProjects.length}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleLimitChange}
              page={page}
              rowsPerPage={limit}
              rowsPerPageOptions={[5, 10, 15]}
            />
          </Box>
          <Divider />
          {paginatedProjects.length === 0 ? (
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
                {t("We couldn't find any record")}
              </Typography>
            </>
          ) : (
            <>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => {
                        if (column !== "url") {
                          return (
                            <TableCell key={column}>{t(column)}</TableCell>
                          );
                        }
                      })}
                      <TableCell align="center">{t("Actions")}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedProjects.map((project) => {
                      const isProjectSelected = selectedItems.includes(
                        project.id
                      );
                      return (
                        <TableRow
                          hover
                          key={project._id}
                          selected={isProjectSelected}
                        >
                          {columns.map((column) => {
                            if (
                              column === "startDate" ||
                              column === "endDate"
                            ) {
                              if (
                                project[column] === "" ||
                                project[column] === null
                              ) {
                                return <TableCell key={column}>NA</TableCell>;
                              } else {
                                return (
                                  <TableCell key={column}>
                                    {new Date(project[column]).toLocaleString(
                                      "en-US"
                                    )}
                                  </TableCell>
                                );
                              }
                            } else if (column === "status") {
                              return (
                                <TableCell key={column}>
                                  <Typography noWrap>
                                    {getProjectStatusLabel(project.status)}
                                  </Typography>
                                </TableCell>
                              );
                            } else if (column !== "url") {
                              return (
                                <TableCell key={column}>
                                  {project[column]}
                                </TableCell>
                              );
                            }
                          })}
                          <TableCell align="center">
                            <Typography noWrap>
                              <Tooltip title={t("View")} arrow>
                                <IconButton
                                  color="primary"
                                  onClick={() =>
                                    window.open(project.url, "_blank")
                                  }
                                  disabled={
                                    project.status === "deleted" ||
                                    project.url === ""
                                      ? true
                                      : false
                                  }
                                >
                                  <LaunchTwoToneIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title={t("Delete")} arrow>
                                <IconButton
                                  onClick={() => {
                                    setDeletingProject((prev) => ({
                                      ...prev,
                                      id: project._id,
                                      ec2Id: project.ec2InstanceId,
                                    }));
                                    handleConfirmDelete();
                                  }}
                                  color="primary"
                                  disabled={
                                    project.status === "deleted" ? true : false
                                  }
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
              </TableContainer>
              <Box p={2}>
                <TablePagination
                  component="div"
                  count={filteredProjects.length}
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
      }

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
            {t("Do you really want to delete this instance")}?
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

export default SupersetTable;
