import * as React from "react";
import {
    Autocomplete,
    Box,
    Button,
    Checkbox,
    FormControl,
    FormLabel,
    Grid,
    styled,
    TextField,
    Typography,
    InputAdornment,
    CardContent,
    Card,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    ListItemButton,
    CircularProgress,
    InputLabel,
    MenuItem,
    Select,
    CardHeader,
    Divider,
    Tooltip,
    Popover,
} from "@mui/material";
import { DataGridPro, gridClasses } from "@mui/x-data-grid-pro";
import ClearIcon from "@mui/icons-material/Clear";
import { useTranslation } from "react-i18next";
import { useContext, useEffect, useState } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';




export default function InsightSegmentation({ resultData,segmentationData,insightData }) {
    const [openSegmentation, setopenSegmentation] = useState(false);
    const [mappingCrossTabQuestion, setMappingCrossTabQuestion] = useState([]);
    const [mappingListCrossTab, setMappingListCrossTab] = useState({});
    const [showLoderSegmentation, setLoaderShowSegmentation] = useState(false);
    const [filterPopup, setfilterPopup] = useState({
        xPosition: 0,
        yPosition: 0,
      });
      const [filterForBoxString, setfilterForBoxString] = useState("");
      
  
    const [openInsight, setopenInsight] = useState(false);
    const [generativeInsights, setGenerativeInsights] = useState("");
  
    const [isCreateOpenSegmentation, setIsCreateOpenSegmentation] = useState(false);
    const [selectedSegmentationOption, setselectedSegmentationOption] = useState({});
    const [segmentationCategoryMapping, setsegmentationCategoryMapping] = useState([]);
  
  
    useEffect(() => {
        // fetchSurveyResult();
    }, []);

   
  const openSegmentaionDialogBox = (e, dialogHeader) => {
    e.stopPropagation();
    setopenSegmentation(true);
    setfilterPopup({
      xPosition: (e.pageX - (dialogHeader == "Dashboard" ? 250 : 200)),
      yPosition: (e.pageY + 10),
    })
    setfilterForBoxString(dialogHeader)

  };

  const closeSegmentaionDialogBox = () => {
    setopenSegmentation(false);
  };

  const openInsightDialogBox = (e, dialogHeader) => {
    e.stopPropagation();
    setopenInsight(true);
    setfilterPopup({
      xPosition: (e.pageX - (dialogHeader == "Dashboard" ? 250 : 200)),
      yPosition: (e.pageY + 10),
    })
    setfilterForBoxString(dialogHeader)

  };

  const closeInsightDialogBox = () => {
    setopenInsight(false);
  };

  const handleSelectSegmentOption = (ev, questionName, Options) => {
    let tmpselectedSegmentationOption = { ...selectedSegmentationOption }
    if (ev.target.checked) {
      if (tmpselectedSegmentationOption[questionName] == undefined) {
        tmpselectedSegmentationOption[questionName] = [Options]
      } else {
        let newtmpVal = tmpselectedSegmentationOption[questionName];
        newtmpVal.push(Options);
        tmpselectedSegmentationOption[questionName] = newtmpVal;
      }
    } else {
      let newtmpVal = tmpselectedSegmentationOption[questionName];
      newtmpVal.splice(Options, 1)
      if (newtmpVal.length == 0) {
        delete tmpselectedSegmentationOption[questionName];
      } else {
        tmpselectedSegmentationOption[questionName] = newtmpVal
      }
    }
    setselectedSegmentationOption(tmpselectedSegmentationOption);
  };

  const handleubmitSegmentOptionFilter = (ev) => {
    setLoaderShowSegmentation(true);
    let newObj = {
      "project_name": resultData.project_name,
      "project_id": resultData._id,
      "user_id": resultData.user_id,
      "template": resultData.template,
      "mapping_json": resultData.mapping_json,
      "segments": selectedSegmentationOption,
    }
    // console.log("llll", JSON.stringify(mappingCrossTabQuestion))

    fetch(`${process.env.REACT_APP_API_URL}/survey/filterSegmentation`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newObj),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.success) {
          setMappingCrossTabQuestion(res.data.crosstab);
          let tmpMappingObj = {}
          res.data.mapping_list.forEach(ele => {
            tmpMappingObj[ele.tab_name] = ele.ques;
          })
          setMappingListCrossTab(tmpMappingObj);
          setsegmentationCategoryMapping(res.data.mapping_list)
          setIsCreateOpenSegmentation(false)
          setLoaderShowSegmentation(false);
        }
        
      });
  }


    return (<>
    
            <Popover
                open={openSegmentation}
                close={(e) => closeSegmentaionDialogBox()}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                style={{ "left": 0, "top": 0, overflow: "scroll", width: '100%' }}
                segmentation
            >
                <div className="p-3">
                    <Button
                        sx={{ mb: 1 }}
                        size="small"
                        color="primary"
                        variant="contained"
                        onClick={(e) => setIsCreateOpenSegmentation(true)}
                    >
                        <i className="fa fa-plus mr-2"></i>
                        Create Segmentation
                    </Button>
                    {
                        isCreateOpenSegmentation &&
                        <Card style={{ position: 'absolute' }}>
                            <Button
                                size="small"
                                color="primary"
                                variant="outlined"
                                className="float-right"
                                style={{ margin: '5px', }}
                                onClick={(e) => setIsCreateOpenSegmentation(false)}
                            >
                                <i className="fa fa-close mr-2"></i>
                                Close
                            </Button>
                            <CardHeader title={"All Survey Question"}>
                            </CardHeader>
                            <CardContent style={{ height: '60vh', overflow: 'auto' }}>
                                {mappingCrossTabQuestion.map((item, i) =>
                                (
                                    <>
                                        {
                                            item.tableHeader.map((itemHeader, ii) => (
                                                <>
                                                    {ii == 0 &&
                                                        <Accordion className="accodion-style">
                                                            <AccordionSummary
                                                                expandIcon={<ExpandMoreIcon />}
                                                                aria-controls={"panel" + i + "-content"}
                                                                id={"panel" + i + "-header"}
                                                            >
                                                                {i + 1}. {itemHeader}
                                                            </AccordionSummary>
                                                            <AccordionDetails>
                                                                {
                                                                    item.tableRow.map((itemBody, ind1) => (
                                                                        <>
                                                                            {
                                                                                itemBody.map((itemBodydata, iii) => (
                                                                                    <>
                                                                                        {
                                                                                            iii == 0 &&
                                                                                            <div className="checkbox-list"><Checkbox checked={selectedSegmentationOption[itemHeader] != undefined && (selectedSegmentationOption[itemHeader]).indexOf(itemBodydata) != -1 ? true : false} onChange={(event) => { handleSelectSegmentOption(event, itemHeader, itemBodydata) }} /> {itemBodydata}</div>
                                                                                        }
                                                                                    </>
                                                                                ))
                                                                            }
                                                                        </>
                                                                    ))
                                                                }

                                                            </AccordionDetails>
                                                        </Accordion>
                                                    }
                                                </>
                                            ))
                                        }
                                    </>
                                ))}
                            </CardContent>

                            <Button disabled={true}>{((Object.values(selectedSegmentationOption)).flat()).length} Selected</Button>

                            {showLoderSegmentation ? <>  <CircularProgress size="1.5rem" className="float-right m-2" /> </> : <> <Button
                                size="small"
                                color="primary"
                                variant="contained"
                                className="float-right"
                                disabled={Object.keys(selectedSegmentationOption).length <= 0}
                                style={{ margin: '5px', }}
                                onClick={(e) => handleubmitSegmentOptionFilter()}
                            >
                                Save
                            </Button> </>}

                        </Card>
                    }  <Button
                        size="small"
                        color="primary"
                        variant="outlined"
                        className="float-right"
                        onClick={(e) => closeSegmentaionDialogBox()}
                    >
                        <i className="fa fa-close mr-2"></i>
                        Close
                    </Button>
                    <div style={{ width: "100%", height: "70vh", overflow: 'auto' }} >
                        {mappingCrossTabQuestion.map((item, ind2) => (
                            <>

                                <table align='left' width={'100%'} className="segmentation-table" cellspacing='0' cellpadding='0' >

                                    <tr className="table-head">
                                        {
                                            ind2 == 0 &&
                                            segmentationCategoryMapping.map((tableTopHeader, catInd) => (
                                                <>
                                                    {
                                                        catInd == 0 &&
                                                        <th></th>
                                                    }
                                                    <th style={{ "text-align": "center" }} title={tableTopHeader.ques}>{tableTopHeader.tab_name.split("\n")[0]}</th>
                                                </>
                                            ))
                                        }

                                    </tr>

                                    <tbody>
                                        <tr className="table-head">
                                            {
                                                item.tableHeader.map((itemHeader, i) => (
                                                    <th title={i != 0 && itemHeader != "Respondent" ? mappingListCrossTab[itemHeader] : ""} style={{ "text-align": i == 0 ? `left` : "center" }}> {i == 0 ? `${ind2 + 1}.` : ""} <b>{i != 0 && itemHeader != "Respondent" ? itemHeader.split("\n")[1] : itemHeader}</b></th>
                                                ))
                                            }
                                        </tr>
                                        {
                                            item.tableRow.map((itemBody, iii) => (
                                                <tr>
                                                    {
                                                        itemBody.map((itemBodydata, ii) => (
                                                            <td style={{ "text-align": ii == 0 ? `left` : "center" }}>{itemBodydata}</td>
                                                        ))
                                                    }
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </>
                        ))}
                    </div>
                </div>

            </Popover >

            <Popover
                open={openInsight}
                close={(e) => closeInsightDialogBox()}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                style={{ "left": filterPopup.xPosition, "top": filterPopup.yPosition, overflow: "scroll" }}>
                <div className="p-3">
            <h2 className="float-left m-0"><img src="/json-media/img/convertmlLogoicon.png" alt='convertml'  width={40} className="float-left mr-2" />Dashboard Insight</h2> <Button
                    size="small"
                    color="primary"
                    variant="outlined"
                    className="float-right"
                    onClick={(e) => closeInsightDialogBox()}
                >
                    <i className="fa fa-close mr-2"></i>
                    Close
                </Button>
                <br/><div className='clearfix'></div>
        <h4 className="text-grey">Some Key takeaways from this dashboard insights</h4>
                {/* <div style={{ width: "100%", height: "70vh", overflow: 'auto' }} ></div> */}
                <div className="filterBox" style={{ width: "100%", height: "70vh", overflow: 'auto' }} dangerouslySetInnerHTML={
                    { __html: generativeInsights }
                }>
                    </div>
                </div>
            </Popover>
            {/* ------------filter box ------------ */}
            </>


    );
}
