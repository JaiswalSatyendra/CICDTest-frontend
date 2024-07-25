import {
  Box,
  Button,
  CircularProgress,
  Grid,
  ListItemIcon,
  ListItemText,
  MenuList,
  MenuItem,
  Typography,
  CardContent,
  Card,
  Stack,
  LinearProgress,
  IconButton,
} from "@mui/material";
import { Helmet } from "react-helmet-async";
import CreateDataConnection from "../../../components/DataConnection/DatasetForm/CreateDataConnection";
import PageHeader from "../../../content/dashboards/Users/PageHeader";
import PageTitleWrapper from "../../../components/PageTitleWrapper/index";
import MlResultsConnection from "../../../content/dashboards/DataPlatform/ML-result";
import { useNavigate } from "react-router";
import { DataGrid } from "@mui/x-data-grid";
import { DataGridPro } from "@mui/x-data-grid-pro";
import React, { useContext, useEffect, useState } from "react";
import { SessionContext } from "../../../contexts/SessionContext";
import axios from "axios";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import HeaderButtons from "../../../layouts/ExtendedSidebarLayout/Header/Buttons";
import HeaderUserbox from "../../../layouts/ExtendedSidebarLayout/Header/Userbox";

import nodataavailable from "../../../assets/img/nodataavailable.png";
import refreshData from "../../../assets/icons/data-refresh.svg";
import { styled } from "@mui/material/styles";

function ProjectManagement() {
  const [progressBar, setprogressBar] = React.useState(50);

  const [session, ,] = useContext(SessionContext);
  const { user } = session;
  const [gridDataForGrid, setGridDataForGrid] = useState({
    columns: [],
    rows: [],
  });
  const [announcement, Isannouncement] = useState(true);

  const hideannouncementBar = () => {
    Isannouncement(false);
  };
  const [showMenuitem, setshowMenuitem] = useState(null);
  const [showLoder, setLoaderShow] = useState(false);
  const [selectedRows, setSelectedRows] = React.useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getProjectList(true);
    //  axios.post(`${process.env.REACT_APP_API_URL}/survey/saveTypeformUserRecord`, { utm_campaign:"utm_campaign1", utm_medium:"utm_medium2", utm_source:"utm_source3"}).then((response) => {

    // }).catch(err => {
    //     setLoaderShow(false);
    //     console.log(err)
    // })
  }, []);

  // useEffect(() => {
  //   let tmpGrid = { ...gridDataForGrid };
  //   let temGridVal = tmpGrid.rows.map((ele) => ({
  //     ...ele,
  //     menuList: ele.id == showMenuitem ? true : false,
  //   }));
  //   tmpGrid.rows = temGridVal;
  //   setGridDataForGrid(tmpGrid);
  // }, [showMenuitem]);

  const StyledGridOverlay = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    "& .ant-empty-img-1": {
      fill: theme.palette.mode === "light" ? "#aeb8c2" : "#262626",
    },
    "& .ant-empty-img-2": {
      fill: theme.palette.mode === "light" ? "#f5f5f7" : "#595959",
    },
    "& .ant-empty-img-3": {
      fill: theme.palette.mode === "light" ? "#dce0e6" : "#434343",
    },
    "& .ant-empty-img-4": {
      fill: theme.palette.mode === "light" ? "#fff" : "#1c1c1c",
    },
    "& .ant-empty-img-5": {
      fillOpacity: theme.palette.mode === "light" ? "0.8" : "0.08",
      fill: theme.palette.mode === "light" ? "#f5f5f5" : "#fff",
    },
  }));

  function CustomNoRowsOverlay() {
    return (
      <StyledGridOverlay>
        <img src={nodataavailable} alt="img" />
        <Box sx={{ mt: 1 }}>
          {" "}
          <Button
            sx={{ mt: { xs: 2, sm: 1 } }}
            color="primary"
            variant="contained"
            onClick={() => {
              gotoCreateProjectScreen();
            }}
          >
            <i className="fa fa-plus mr-2"></i> Create Project
          </Button>
        </Box>
      </StyledGridOverlay>
    );
  }

  const getProjectList = async (loader) => {
    setLoaderShow(loader);
    await axios
      .post(`${process.env.REACT_APP_API_URL}/survey/listAllSurveyProject`, { withCredentials: true })
      .then((response) => {
        setLoaderShow(false);
        let newRows = response.data.data.map((el, ind) => ({
          ...el,
          id: ind + 1,
          menuList: false,
          dataupdateloader: false,
          datasetUpdated: false,
          data_source:
            el.mapping_json == undefined
              ? ""
              : [
                  ...new Set(
                    JSON.parse(el.mapping_json).map((eel) => eel.dataType)
                  ),
                ]
                  .sort()
                  .join(","),
        }));
        setGridDataForGrid({
          columns: new Array(
            {
              field: "project_name",
              headerName: "Name",
              flex: 2,
              minWidth: 150,
              editable: false,
              renderCell: (data) => {
                // console.log("====", data)
                return (
                  <div style={{ width: "100%" }}>
                    <b className="project-name"> {data.row.project_name}</b>
                    {data.row.status == undefined ||
                    data.row.status == "running" ? (
                      <div className="chips-status float-right">
                        {" "}
                        <button
                          className="btn btn-small medium-sm"
                          color="primary"
                          variant="outlined"
                        >
                          Draft
                        </button>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                );
              },
            },
            {
              field: "data_source",
              headerName: "Data Source",
              flex: 2,
              minWidth: 150,
              editable: false,
              renderCell: (data) => {
                let dataSource = data.row.data_source.split(",");
                // let dataSourceList1 = [...dataSource].sort((a, b) => a.dataType > b.dataType ? -1 : 1, );
                let dataSourceList = dataSource.map((source) => (
                  <span
                    key={dataSource.toString()}
                    className={source}
                    title={source}
                  >
                    {/* {source}   */}
                  </span>
                ));
                return (
                  <div className="project-source-list" title={dataSourceList}>
                    {dataSourceList}
                  </div>
                );
              },
            },
            {
              field: "template",
              headerName: "Template",
              flex: 2,
              minWidth: 150,
              editable: false,
            },
            {
              field: "mapping_json",
              headerName: "Dataset",
              flex: 3,
              minWidth: 200,
              editable: false,
              renderCell: (data) => {
                let survayList = JSON.parse(data.value);
                console.log(survayList);
                let newArrr = survayList.map((ele) => ({
                  ...ele.survey,
                  dataType: ele.dataType,
                  ptag: false,
                }));
                let listLabel = newArrr.map((ele) => (
                  <span
                    key={newArrr.toString()}
                    className={ele.dataType}
                    title={ele.label}
                  >
                    {ele.label}
                  </span>
                ));
                return (
                  <div className="project-source-list"> 
                    {!data.row.dataupdateloader ? (
                      <>
                        {" "}
                        <p
                          onClick={(event, value) => {
                            data.row.ptag = !data.row.ptag;
                          }}
                          className={
                            data.row.ptag ? "chips" : "ptagOneline chips"
                          }
                        >
                          {listLabel}
                        </p>
                      </>
                    ) : (
                      <>
                        {data.row.datasetUpdated ? (
                          <Box sx={{ width: "250px", mt: 0.5 }}>
                            <label>Updating Dataset...</label>
                            <br />
                            <LinearProgress color="success" />
                          </Box>
                        ) : (
                          <span className="successicons">
                            <i class="fa fa-check-circle fa-1x"></i> Update
                            Successful
                          </span>
                        )}{" "}
                      </>
                    )}
                  </div>
                );
              },
            },
            {
              field: "created_on",
              headerName: "Last created",
              type: true ? "date" : "dateTime",
              flex: 1.7,
              minWidth: 200,
              valueGetter: ({ value }) => value && new Date(value),
            },
            {
              headerName: "Action",
              sortable: false,
              editable: false,
              flex: 1.6,
              minWidth: 200,
              renderCell: (data) => {
                // console.log("====", data)
                return (
                  <div
                    style={{ width: "100%" }} 
                  > 
                    {data.row.status == undefined ||
                    data.row.status == "running" ? (
                      <> 
                         <IconButton    color="primary" title="delete" aria-label="add an alarm" size="small" onClick={() => {
                                  deleteProjectDetail(data.row);
                                }}>
<i className="fa fa-trash"></i>
</IconButton>
<IconButton aria-label="Data Update" title="Data Refresh"  color="primary"   size="small" onClick={() => {
                                  dataRefreshProject(data.row);
                                }}>
<span class="icon-data-refresh"></span>
</IconButton>
<Button  className="ml-1"  color="primary"  size="small"  variant="outlined" onClick={() => {
                            editSaveDraft(data.row);
                          }}>
<i class="fa fa-edit  mr-1"></i> Edit
</Button>
                      </>
                    ) : (
                      <>   
                      <IconButton color="primary" title="delete" aria-label="add an alarm" size="small" onClick={() => {
                                  deleteProjectDetail(data.row);
                                }}>
<i className="fa fa-trash"></i>
</IconButton>
<IconButton aria-label="Data Update" color="primary" title="Data Refresh"   size="small" onClick={() => {
                                  dataRefreshProject(data.row);
                                }}>
<span class="icon-data-refresh"></span>
</IconButton>

<Button  className="ml-1"  color="primary"  size="small"  variant="outlined"  onClick={() => {
                            viewResult(data.row);
                          }}>
<i className="fa fa-bar-chart mr-1"></i> View Result
</Button>    
                      </>
                    )}
                     </div>
                );
              },
            }
          ),
          rows: newRows,
        });
      })
      .catch((err) => {
        setLoaderShow(false);
        console.log(err);
      });
  };

  const editSaveDraft = (rowData) => {
    // console.log(rowData);
    navigate("/dashboard/data-platform/create-data-connection", {
      state: { newObj: rowData, isViewResult: false },
    });
  };

  const viewResult = (rowData) => {
    // console.log(rowData);
    navigate("/dashboard/data-platform/create-data-connection", {
      state: { newObj: rowData, isViewResult: true },
    });
  };

  const gotoCreateProjectScreen = () => {
    navigate("/dashboard/data-platform/create-data-connection");
  };

  const deleteProjectDetail = (rowData) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/survey/removeSurvey`, {
        selectedProjectId: rowData._id,
      },{ withCredentials: true })
      .then((response) => {
        if (response.data.success) {
          let newRows = response.data.data.map((el, ind) => ({
            ...el,
            id: ind + 1, 
            data_source:
              el.mapping_json == undefined
                ? ""
                : [
                    ...new Set(
                      JSON.parse(el.mapping_json).map((eel) => eel.dataType)
                    ),
                  ].join(","),
          }));
          setGridDataForGrid((prevState) => {
            return {
              ...prevState,
              rows: newRows,
            };
          });
        }
      })
      .catch((err) => {
        setLoaderShow(false);
        console.log(err);
      });
  };
  const multipledeleteProject = () => {
    const listItems = selectedRows.map((d) => d._id);
    axios
      .post(`${process.env.REACT_APP_API_URL}/survey/removeallSurvey`, {
        selectedProjectId: listItems,
      },{ withCredentials: true })
      .then((response) => {
        console.log("200");
        let newMap = new Set(listItems.map((item) => item));
        let updatedRow = gridDataForGrid.rows.filter(
          (item) => !newMap.has(item._id)
        );
        let tmpGrid = { ...gridDataForGrid };
        tmpGrid.rows = updatedRow;
        setGridDataForGrid(tmpGrid);
        selectedRows(null);
      })
      .catch((err) => {
        setLoaderShow(false);
        console.log(err);
      });
  };

  const submenuOpen =(e,rowData)=>{
         e.stopPropagation();
         console.log(rowData._id) 
    let dataForGrid = { ...gridDataForGrid };
    dataForGrid.rows.forEach((row) => {
      if (row._id === rowData._id) {
        row.menuList= true;
      }
    });
    setGridDataForGrid(dataForGrid);     
  }

  const dataRefreshProject = (sid) => { 
     const listItems = [sid._id]; 
     console.log(gridDataForGrid) 
     let dataForGrid = { ...gridDataForGrid }; 
    listItems.forEach((ele) => {
      dataForGrid.rows.forEach((row) => {
        if (row._id === ele) {
          row.dataupdateloader = true;
          row.datasetUpdated = true;
        }
      });
    });
    //  setGridDataForGrid(dataForGrid);
     startSequentialTimeout(listItems); 
  };

  const multipleDataRefreshProject = () => {
    const listItems = selectedRows.map((d) => d._id);
    let dataForGrid = { ...gridDataForGrid };
    listItems.forEach((ele) => {
      dataForGrid.rows.forEach((row) => {
        if (row._id === ele) {
          row.dataupdateloader = true;
          row.datasetUpdated = true;
        }
      });
    });
    setGridDataForGrid(dataForGrid);
    startSequentialTimeout(listItems);
  };

  const startSequentialTimeout = (listItems) => { 
    listItems.forEach((item, index) => {
      setTimeout(() => {
        setGridDataForGrid((prevData) => {
          const updatedRows = prevData.rows.map((row) => {
            if (row._id === item) {
              // if (index === 0) {
              //     setTimeout(5000);
              // }
              return { ...row, dataupdateloader: true, datasetUpdated: false };
            }
            return row;
          });
          return { ...prevData, rows: updatedRows };
        });
      }, index * 5000);
    });
  };

  return (
    <>
      <div
        className="container-full"
        // onClick={(ev) => {
        //   ev.stopPropagation();
        //   setshowMenuitem(null);
        // }}
      >
        {/* -------------------- header section -------------------- */}
        <div className="after-login-header" style={{ marginBottom: 0 }}>
          {announcement ? (
            <>
              {" "}
              <div class="announcement">
                <a
                  className="fa fa-times-circle close-icon"
                  onClick={() => hideannouncementBar()}
                ></a>
                <div class="container">
                  <div class="announcement-text">
                    <Link to="/power-user-program-convertml">
                      {" "}
                      <b>
                        {" "}
                        Pioneer with the 20 leaders! Join the{" "}
                        <strong>Power User Program</strong> for
                        exclusive benefits.
                      </b>
                    </Link>
                  </div>{" "}
                </div>
              </div>
            </>
          ) : (
            <> </>
          )}

          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Link to="/">
                <LazyLoadImage
                  className="logo"
                  src={"/json-media/img/convertmlLogo.png"}
                  alt={"Convertml"}
                />
              </Link>
            </Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
              <div className="float-right">
                <Box display="flex">
                  <HeaderButtons />
                  <HeaderUserbox />
                </Box>
              </div>
            </Grid>
          </Grid>
        </div>
        {/* -------------------- header section end -------------------- */}
        {/* <section className="left-navigation">
                    <div>
                        /* <img 
                src={"/images/convertmlLogo-old.png"}
                alt="companylogo" width={150}
              />  *
                    </div>
                    <ul>
                        /* <li>
                            <a>Dashboard</a>
                        </li> *
                        <li>
                            <a className="active">Projects</a>
                        </li>
                    </ul>
                </section> */}
        <section className="main-container" style={{ width: "100%" }}>
          <div className="project-list-topcardlink">
            <Grid container spacing={3}>
              <Grid item xs={6} md={4}>
                <Card>
                  <CardContent>
                    <Link to={"../../help-guide/convertML-user-guide"}>
                      <i className="fa fa-angle-right" />
                      <b>ConvertML Guide:</b> Comprehensive guide, designed to
                      enhance your understanding and utilization of ConvertML{" "}
                    </Link>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6} md={4}>
                <Card>
                  <CardContent>
                    <Link to={"../../help-guide/typeform-integration"}>
                      <i className="fa fa-angle-right" />
                      <b>Typeform Guide:</b> Elevate survey intelligence with
                      ConvertML's tailored analytics guide for Typeform data
                    </Link>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6} md={4}>
                <Card>
                  <CardContent>
                    <Link to={"../../faqs"}>
                      <i className="fa fa-angle-right" />
                      <b>Help Resources:</b> Need help? Articles and FAQs to get
                      <br /> you unstuck{" "}
                    </Link>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </div>
          <br />
          <Grid
            direction="row"
            justifyContent="space-between"
            alignItems="baseline"
            className="mb-3"
          >
            <Typography
              variant="h4"
              component="h4"
              gutterBottom
              style={{ fontSize: "20px" }}
            >
              Projects
            </Typography>
            <div className="web-view">
              <Stack spacing={1} direction="row">
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    gotoCreateProjectScreen();
                  }}
                >
                  <i className="fa fa-plus mr-2"></i> Create Project
                </Button>
                <Button
                  color="primary"
                  variant="outlined"
                  disabled={selectedRows.length == 0}
                  onClick={() => {
                    multipledeleteProject();
                  }}
                  className="icon-btn"
                >
                  <i className="fa fa-trash"></i>
                </Button>
                <Button
                  color="primary"
                  variant="outlined"
                  disabled={selectedRows.length == 0}
                  onClick={() => {
                    multipleDataRefreshProject();
                  }}
                  className="icon-btn"
                >
                 <span class="icon-data-refresh fa-1x"></span>
                </Button>
              </Stack>
            </div>
            <div className="mobile-view">
              <small>
                Maximize your ConvertML experience by using desktop. Mobile
                enhancements are in development.
              </small>
              <br />
            </div>
          </Grid>
          <hr style={{ border: "1px solid #ddd" }} />
          {/* </Box> */}
          {/* <MlResultsConnection /> */}
          {/* <DataUpload /> */}
          {/* <DatasetForm /> */}
          {/* </Grid> */}
          {showLoder && (
            <Box sx={{ textAlign: "center" }}>
              <CircularProgress />
            </Box>
          )}
          {!showLoder && (
            <Box sx={{ height: "59.5vh", width: "100%" }}>
              <DataGrid
                slots={{
                  noRowsOverlay: CustomNoRowsOverlay,
                }}
                rows={gridDataForGrid.rows}
                columns={gridDataForGrid.columns}
                pagination={true}
                pageSizeOptions={[20, 50, 100]}
                
                hideFooterRowCount={true}
                checkboxSelection={true}

                
                onSelectionModelChange={(ids) => {
                  const selectedIDs = new Set(ids);
                  const selectedRows = gridDataForGrid.rows.filter((row) =>
                    selectedIDs.has(row.id)
                  );
                  setSelectedRows(selectedRows);
                }}
                // onRowSelectionModelChange={(ids) => {
                //   const selectedIDs = new Set(ids);
                //   const selectedRows = gridDataForGrid.rows.filter((row) =>
                //     selectedIDs.has(row.id)
                //   );
                //   setSelectedRows(selectedRows);
                // }}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 20,
                    },
                  },
                }}
              />
            </Box>
          )}
        </section>
        {/* </Grid> */}
        {/* </Grid> */}
        {/* </Box> */}
      </div>
    </>
  );
}

export default ProjectManagement;
