import React, { useState, forwardRef, useContext, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid, TextField, InputAdornment, Tooltip, IconButton, Card, CircularProgress, List, MenuItem, Select, FormControl, InputLabel, ListSubheader, ListItemButton, ListItemIcon, ListItemText, Collapse, Avatar } from '@mui/material';
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
import axios from 'axios';
import { SessionContext } from '../../../contexts/SessionContext';
import { categoriesData_cs, categoriesData_brand, categoriesData_nps, templateData } from "../../../assets/data/result";


import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import FormHelperText from '@mui/material/FormHelperText';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ToastMessage from '../../organisms/UnlayerEmailEditor/ToastMessage';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { hubspotModuleData } from '../../../assets/data/data';
import CheckCircleIcon from "@mui/icons-material/CheckCircle";


const steps = ['Agreement', 'Data Connnection'];



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  // width: 900,
  bgcolor: 'background.paper',
  // border: '1px solid #ddd',
  boxShadow: 24,
  // p: 4
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

const AvatarNotSuccess = styled(Avatar)(
  ({ theme }) => `
  background: ${theme.colors.alpha.black[8]};
    width: ${theme.spacing(4)};
    height: ${theme.spacing(4)};
`
);
const AvatarSuccess = styled(Avatar)(
  ({ theme }) => `
    background: ${theme.colors.success.light};
    width: ${theme.spacing(4)};
    height: ${theme.spacing(4)};
`
);



// const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
//   padding: theme.spacing(2),
//   borderTop: '1px solid rgba(0, 0, 0, .125)',
// }));

function ConnectDialog({ open, handleClose, openHubspot, openZendesk, openFacebook, openTwitter, openFeshdesk, openSalesforce,openbraze, openInstagram, listOfWorkspace, listListOfContact, checkedMappingForSurvey, checkedMappingForHubspot, isOpenPopupTypeform, isOpenPopupHubspot, token, hubspotTokenName, hubspotRefreshtokenName, isTypeFormEmptyData, isHubspotEmptyData, selectedWorkspace }) {

  // const [isConfirm, setIsConfirm] = React.useState(false);

  // const [isConnectTypeform, setIsConnectTypeform] = React.useState(false);

  // const [expanded, setExpanded] = React.useState('panel1');

  const [collapse, setCollapse] = React.useState(true);
  const [isCheckConfrm, setIsCheckConfrm] = React.useState(false);
  const [isCheckConfrmHubspot, setIsCheckConfrmHubspot] = React.useState(false);

  // const [deletedDataset, setDeletedDataset] = useState(null);
  // const { t } = useTranslation();

  // const [gridDataForGrid, setGridDataForGrid] = useState({
  //   columns: [],
  //   rows: []
  // });

  const [workspaceList, setWorkspaceList] = React.useState([]);
  const [contactList, setContactList] = React.useState([]);
  const [listOfForm, setlistOfForm] = React.useState([]);
  const [listMapping, setlistMapping] = React.useState([]);
  const [selectedForm, setselectedForm] = React.useState([]);
  const [toastObject, setToastObject] = useState({});
  const [showLoder, setLoaderShow] = useState(false);
  const [listContactMapping, setlistContactMapping] = React.useState([]);

  // const [selectedRows, setSelectedRows] = React.useState([]);
  // const [selectionModel, setSelectionModel] = React.useState(() => []);
  // const [selectionModelHubspot, setSelectionModelForHubspot] = React.useState(() => []);
  const [selectedDefaultWorkspace, setselectedDefaultWorkspace] = useState({});

  const [selectedDefaultHubspotModule, setselectedDefaultHubspotModule] = useState(null);
  const [displayNotification, setdisplayNotification] = useState(true);
  const [displayNotificationFeedback, setdisplayNotificationFeedback] = useState(true);

  const [isShowHubspotObject, setisShowHubspotObject] = useState(false);
  const [hubspotModule1, sethubspotModule1] = React.useState([]);
  const [listOfFeedbackSurvey, setlistOfFeedbackSurvey] = React.useState([]);
  // const [checkDuplicateSurveyList, setcheckDuplicateSurveyList] = useState("");
  const [errorListDisplay, seterrorListDisplay] = useState([]);

  // const [selectedContact, setselectedContact] = useState(null);
  const [selectedFeedbackSurvey, setselectedFeedbackSurvey] = useState(null);
  const [isFetchedFeedbackList, setisFetchedFeedbackList] = useState(false);

  const hubspotModule = [
    { id: 1, "name": "contact", "displayName": "Contacts", "type": "Crm" },
    { id: 2, "name": "feedback", "displayName": "Feedback Submissions", "type": "Crm" }]





  const [session, ,] = useContext(SessionContext);
  const { user } = session;

  // const isModalCloseHubspot = () => {
  //   handleClose();
  //   // setlistContactMapping([]);
  //   // setcheckDuplicateSurveyList("");
  //   seterrorListDisplay([]);
  // }
  // const isModalCloseZendesk = () => {
  //   handleCloseZendesk(); 
  // }


  // const [open11, setOpen11] = React.useState(true);

  // const handleClick11 = (ind) => {
  //   let newListObj = [...hubspotModule1];
  //   newListObj[ind].isopen = !newListObj[ind].isopen;
  //   sethubspotModule1(newListObj);
  // };
  const handleClick12 = (ev, val) => {
    setselectedDefaultHubspotModule(val);
    setselectedFeedbackSurvey(null)
    if (val.name.toLowerCase() == "contact") {
      getFeedbackSurveyList("contact")
      setdisplayNotification(false);
      setdisplayNotificationFeedback(true)
    } else {
      getFeedbackSurveyList("feedback")
      setdisplayNotificationFeedback(false)
      setdisplayNotification(true);
    }
  };


  const isModalCloseHubspot1 = async () => {
    setLoaderShow(true)
    let counter = 0;
    let failedCounter = 0;
    let passSelectedQuestion = []
    listContactMapping.forEach((ele) => {

      let newTitle = ele.displayName;
      let newEle = { ...ele };
      if (ele.hs_object == "contact") {
        newEle.colList = ele.colList.filter(eleIsused => eleIsused.used == "True")
        newEle.selectedRow = newEle.colList.map(eleUsusedId => eleUsusedId.id)

      }
      let newName = newEle.displayName.replace(/[^a-zA-Z0-9_ ]/g, "_").replace(/\s+/g, '_').toLowerCase();
      newEle.displayName = newName.replace(/[_]{2,}/g, "_");
      let newObj = {
        "user": user._id,
        "dataSource": "hubspot",
        "title": newTitle,
        "formId": JSON.stringify(newEle),
        "dataType": "customer",
        "token": hubspotTokenName,
        "listId": ele.value,
        'refresh_token': hubspotRefreshtokenName,
        "hs_object": ele.hs_object,
      }
      // ser, title, dataSource, dataType, formId, token, listId, refresh_token, question_list, hs_object
      axios.post(`${process.env.REACT_APP_API_URL}/survey/createAndUpdatedataIngestForSurvey`, newObj,
        {
          headers: {
            "Content-type": "application/json",
          }
        })
        .then((response) => {

          if (response.data.success) {
            counter = counter + 1;

          } else {
            failedCounter = failedCounter + 1;
            seterrorListDisplay([{ alertType: 'error-message', isCollapsable: true, short_text: 'Ingestion Error', message: [response.data.message] }]);
          }
          if (listContactMapping.length == counter) {
            listContactMapping.forEach(element => {
              let newlistObj = { ...element }
              let newColList = element.colList.filter((ele1) => (element.selectedRow.indexOf(ele1.id) != -1));
              newlistObj.colList = element.hs_object == "contact" ? (newColList.filter(elemUsed => elemUsed.used == "True")) : newColList
              newlistObj.selectedRow = newlistObj.colList.map(eleUsusedId => eleUsusedId.id);
              passSelectedQuestion.push(newlistObj)
            });
            seterrorListDisplay([])
            checkedMappingForHubspot(passSelectedQuestion);
            handleClose();
            // setlistContactMapping([]);
            setLoaderShow(false);
          } else if (failedCounter == 1) {
            setLoaderShow(false);
          } else {
            // checkedMappingForHubspot([]);
          }

        })
        .catch((err) => {
          setLoaderShow(false)
        });
    })



  }

  const isModalClose = () => {
    handleClose();
    // setlistMapping([]);
    // setcheckDuplicateSurveyList("");
    seterrorListDisplay([]);
  }


  const isModalClose1 = async () => {
    setLoaderShow(true)
    let counter = 0;
    let failedCounter = 0;
    let passSelectedQuestion = []
    selectedForm.forEach((ele) => {
      let newColListSelectedQuest = []
      listMapping.forEach(element => {
        if (element.formId == ele.value) {
          let newColList = element.formFields.filter((ele1) => (element.selectedRow.indexOf(ele1.id) != -1));
          newColListSelectedQuest = newColList
        }
      });

      let newObj = {
        "user": user._id,
        "dataSource": "typeform",
        "title": ele.title,
        "formId": ele.value,
        "dataType": "customer",
        "token": token,
        "question_list": newColListSelectedQuest,
        "hs_object": ele.hs_object,
        "workspace_id":JSON.stringify(selectedDefaultWorkspace)
      }
      axios.post(`${process.env.REACT_APP_API_URL}/survey/createAndUpdatedataIngestForSurvey`, newObj,
        {
          headers: {
            "Content-type": "application/json",
          }
        })
        .then((response) => {
          if (response.data.success) {
            counter = counter + 1;
          } else {
            failedCounter = failedCounter + 1;
            seterrorListDisplay([{ alertType: 'error-message', isCollapsable: true, short_text: 'Ingestion Error', message: [response.data.message] }]);
          }
          if (selectedForm.length == counter) {
            listMapping.forEach(element => {
              let newlistObj = { ...element }
              let newColList = element.formFields.filter((ele1) => (element.selectedRow.indexOf(ele1.id) != -1));
              newlistObj.formFields = newColList
              passSelectedQuestion.push(newlistObj)
            });
            seterrorListDisplay([])
            checkedMappingForSurvey(passSelectedQuestion);
            // setlistMapping([]);
            handleClose();
            setLoaderShow(false);
          } else if (failedCounter == 1) {
            setLoaderShow(false);
          } else {
            setLoaderShow(false);
            // checkedMappingForHubspot([]);
          }
        })
        .catch((err) => {
          setLoaderShow(false)
        });
    })

  }




  useEffect(async () => {
    setWorkspaceList(listOfWorkspace);
  }, [listOfWorkspace]);

  useEffect(async () => {
    // setContactList(listListOfContact);
    // getFeedbackSurveyList("feedback")
  }, [hubspotRefreshtokenName]);

  useEffect(async () => {
    setselectedDefaultWorkspace(selectedWorkspace);

  }, [selectedWorkspace]);



  useEffect(async () => {
    if (isTypeFormEmptyData.length == 0) {
      setlistMapping([]);
      setselectedForm([]);
      setselectedDefaultWorkspace(null);
    } else {
      let selectedFormForWorkspace = isTypeFormEmptyData.map(ele => ( `${user._id}/${ele.formName.replace(/[^a-zA-Z0-9_ ]/g, "_").replace(/\s+/g, '_').replace(/[_]{2,}/g, "_").toLowerCase()}/${ele.formId}` ));
      await axios
        .post(
          `${process.env.REACT_APP_API_URL}/survey/getSelectedDataSourceStatus`,
          {
            selectedSouce: selectedFormForWorkspace,
          }
        )
        .then(async (response1) => {
          let selectedworkspaceTmp = JSON.parse(response1.data.data[0].workspace_id)
          setselectedDefaultWorkspace(selectedworkspaceTmp);
        }).catch((err) => {
          console.log("Error: " + err);
        });
      setlistMapping(isTypeFormEmptyData);
      let selectedForm = isTypeFormEmptyData.map(ele => ({ "title": ele.formName, "value": ele.formId }));
      setselectedForm(selectedForm);
    }
  }, [open]);

  useEffect(async () => {
    if (isHubspotEmptyData.length == 0) {
      setlistContactMapping([]);
      setselectedDefaultHubspotModule(null);
      // setselectedContact(null);
      setselectedFeedbackSurvey(null);
    } else {
      setlistContactMapping(isHubspotEmptyData);
      let selectedSurveyOrContact = isHubspotEmptyData[0]
      if (isHubspotEmptyData.length != 0 && selectedSurveyOrContact.hs_object == "feedback") {
        setselectedFeedbackSurvey(selectedSurveyOrContact);
        handleClick12(null, { id: 2, "name": "feedback", "displayName": "Feedback Submissions", "type": "Crm" });
      } else {
        setselectedFeedbackSurvey(selectedSurveyOrContact);
        handleClick12(null, { id: 1, "name": "contact", "displayName": "Contacts", "type": "Crm" });
      }
    }
  }, [openHubspot]);



  useEffect(async () => {
    // getFeedbackSurveyList()
    sethubspotModule1(hubspotModuleData);
  }, []);






  // const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
  //   setExpanded(newExpanded ? panel : false);
  // };



  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);


  const handleConfirmDelete = () => {
    setOpenConfirmDelete(true);
  };

  const closeConfirmDelete = () => {
    setOpenConfirmDelete(false);
  };

  const checkConfrm = (ev) => {
    console.log(ev);
    setIsCheckConfrm(ev.target.checked);
  }

  const checkConfrmHubspot = (ev) => {
    console.log(ev);
    setIsCheckConfrmHubspot(ev.target.checked);
  }




  const colList = [{
    field: 'item', headerName: 'Questions', width: 700, editable: false, renderCell: (data) => {
      return (<div style={{ textWrap: 'wrap' }}>{data.row.item} </div>);
    }
  },
  {
    field: 'module', headerName: 'Preview Answer', width: 400, editable: false, renderCell: (data) => {
      let liststiring = data.row.module.split(',');
      return (
        <div className='chiplabels'>
          {liststiring.map((number) => <span>{number}</span>)}
        </div>
      );
    },
  },]

  //   renderCell: (data) => {
  //     return (    
  // <>
  // <div style={{textWrap:'wrap'}}>{data.row.module.map((number) =><> <li>{number}</li></>)}  </div> 
  // </>);
  //   }, 
  //  },
  // ]

  const colListHubspot = [
    {
      field: 'displayName', headerName: 'List of properties', width: 700, editable: false, renderCell: (data) => {
        return (<div style={{ textWrap: 'wrap' }}>{data.row.displayName} </div>);
      }
    },
    {
      field: 'module', headerName: 'Preview Answer', width: 400, editable: false, renderCell: (data) => {
        let liststiring = data.row.module.split(',');
        return (
          <div className='chiplabels'>
            {liststiring.map((number) => <span>{number}</span>)}
          </div>
        );
      },
    }
  ]

  const colListHubspotContact = [
    {
      field: 'displayName', headerName: 'List of properties', width: 700, editable: false, renderCell: (data) => {
        return (<div style={{ textWrap: 'wrap' }}>{data.row.displayName} </div>);
      }
    },
    {
      field: 'module', headerName: 'Data type', width: 300, editable: false, renderCell: (data) => {
        let liststiring = data.row.module.split(',');
        return (
          <div className='chiplabels'>
            {liststiring.map((number) => <span>{number}</span>)}
          </div>
        );
      },
    },
    {
      field: 'used', headerName: 'Active field', width: 100, editable: false, renderCell: (data, indx) => {
        return (
          <div style={{ width: "100%" }} className="py-2">
            {data.row.used == "True" ? (
              <AvatarSuccess variant="rounded">
                <CheckCircleIcon />
              </AvatarSuccess>
            ) : (
              <AvatarNotSuccess variant="rounded">
                <CheckCircleIcon />
              </AvatarNotSuccess>
            )}
          </div>
        );
      },

    },

  ]



  const handleNext = (seltype) => {
    let newConnectionType = "";
    if (seltype == 'typeform') {
      localStorage.setItem("userConnectionSourceType", process.env.REACT_APP_TYPEFORM_CLIENT_ID);
      newConnectionType = process.env.REACT_APP_TYPEFORM_CLIENT_ID
      window.location = 'https://admin.typeform.com/oauth/authorize?client_id=' + process.env.REACT_APP_TYPEFORM_CLIENT_ID + '&scope=offline+workspaces:read+workspaces:write+accounts:read+responses:read+responses:write+forms:write+forms:read+webhooks:read+webhooks:write&redirect_uri=' + process.env.REACT_APP_TYPEFORM_REDIRECT_URI + '&state=xyz789';
    }
    else if (seltype == 'hubspot') {
      localStorage.setItem("userConnectionSourceType", process.env.REACT_APP_HUBSPOT_CLIENT_ID);
      newConnectionType = process.env.REACT_APP_HUBSPOT_CLIENT_ID
      window.location = 'https://app.hubspot.com/oauth/authorize?client_id=' + process.env.REACT_APP_HUBSPOT_CLIENT_ID + '&scope=cms.domains.write+crm.schemas.quotes.read+cms.functions.read+crm.objects.line_items.read+cms.functions.write+crm.schemas.deals.read+crm.schemas.line_items.read+cms.knowledge_base.articles.publish+cms.knowledge_base.articles.write+actions+cms.knowledge_base.articles.read+cms.knowledge_base.settings.read+cms.knowledge_base.settings.write+crm.objects.owners.read+forms+settings.users.teams.read+analytics.behavioral_events.send+account-info.security.read+integration-sync+cms.performance.read+settings.currencies.read+crm.objects.marketing_events.read+crm.schemas.custom.read+crm.objects.custom.read+crm.objects.feedback_submissions.read+forms-uploaded-files+crm.objects.goals.read+crm.objects.companies.read+crm.lists.read+settings.users.read+crm.objects.deals.read+crm.schemas.contacts.read+ctas.read+crm.objects.contacts.read+cms.domains.read+crm.schemas.companies.read+crm.objects.quotes.read+accounting&redirect_uri=' + process.env.REACT_APP_HUBSPOT_REDIRECT_URI;
    }
    else if (seltype == 'zendesk') {
      localStorage.setItem("userConnectionSourceType", process.env.REACT_APP_Zendesk_CLIENT_ID);
      newConnectionType = process.env.REACT_APP_Zendesk_CLIENT_ID
      window.location = 'https://' + process.env.REACT_APP_Zendesk_subdomain + '.zendesk.com/oauth/authorizations/new?response_type=code&redirect_uri=' + process.env.REACT_APP_Zendesk_REDIRECT_URI + '&client_id=' + process.env.REACT_APP_Zendesk_CLIENT_ID + '&scope=read%20write';
      /* --------------  Don't delete --------------  */
      //app id client id
      // login: https://cml5331.zendesk.com/
      // Sub Domain: https://www.zendesk.com/in/login/ 
      // User Name: aman.chaurasia@convertml.ai
      // password: Tech@5050 
      /* -------------- Don't delete --------------  */
    }
    else if (seltype == 'facebook') {
      localStorage.setItem("userConnectionSourceType", process.env.REACT_APP_HUBSPOT_CLIENT_ID);
      window.location = 'https://www.facebook.com/v19.0/dialog/oauth?client_id=' + process.env.REACT_APP_facebook_CLIENT_ID + '&redirect_uri=' + process.env.REACT_APP_facebook_REDIRECT_URI + '&state=xyzABC123'
      /* --------------  Don't delete --------------  */
      // login: https://www.facebook.com/login/ 
      // User Name: harikant121@gmail.com
      // password: 22197225 
      /* -------------- Don't delete --------------  */
    }
    else if (seltype == 'twitter') {
      localStorage.setItem("userConnectionSourceType", process.env.REACT_APP_HUBSPOT_CLIENT_ID);
      window.location = 'https://twitter.com/i/oauth2/authorize?response_type=code&client_id=b1pqN1lJSDV0b3A0Qm9tTnZScFE6MTpjaQ&redirect_uri=https://convertml.ai/dashboard/data-platform/create-data-connection&scope=tweet.read%20users.read%20follows.read%20offline.access&state=state&code_challenge=challenge&code_challenge_method=plain'
      /* --------------  Don't delete --------------  */
      // login: https://www.facebook.com/login/ 
      // User Name: aman.chaurasia-nzgm@force.com
      // password: Tech@5050 
      /* -------------- Don't delete --------------  */
    }
    else if (seltype == 'feshdesk') {
      localStorage.setItem("userConnectionSourceType", process.env.REACT_APP_HUBSPOT_CLIENT_ID);
      window.location = ''
      /* --------------  Don't delete --------------  */
      // login: https://www.feshdesk.com/login/ 
      // User Name: aman.chaurasia-nzgm@force.com
      // password: Tech@5050 
      /* -------------- Don't delete --------------  */
    }
    else if (seltype == 'salesforce') {
      localStorage.setItem("userConnectionSourceType", process.env.REACT_APP_HUBSPOT_CLIENT_ID);
      window.location = 'https://efficiency-velocity-7985.my.salesforce.com/services/oauth2/authorize?client_id=3MVG9GBhY6wQjl2vsFAygvxDXmCvnIni0guyyKikpMTlfLAobaHK_KHPoC0XtQdwEBASGOWEyOw==&redirect_uri=http://localhost:3000/dashboard/data-platform/create-data-connection&response_type=code&code_challenge=aQRLMpUbCUdk_gXXsWiQlKI5RYXuUb6XA8Q7Z9j0lXg'
      /* --------------  Don't delete --------------  */
      // User Name: aman.chaurasia-nzgm@force.com
      // password: Tech@5050 
      /* -------------- Don't delete --------------  */
    }

    else if (seltype == 'braze') {
      localStorage.setItem("userConnectionSourceType", process.env.REACT_APP_HUBSPOT_CLIENT_ID);
      window.location = 'https://www.braze.com/#'
      /* --------------  Don't delete --------------  */
      // User Name: aman.chaurasia-nzgm@force.com
      // password: Tech@5050 
      /* -------------- Don't delete --------------  */
    }
    

    else if (seltype == 'instagram') {
      localStorage.setItem("userConnectionSourceType", process.env.REACT_APP_HUBSPOT_CLIENT_ID);
      window.location = 'https://api.instagram.com/oauth/authorize?force_authentication=1&client_id=458136926822674&redirect_uri=https://test.convertml.ai/dashboard/data-platform/create-data-connection&scope=user_profile,user_media&state=1&response_type=code'

      /* --------------  Don't delete --------------  */
      // login: https://www.facebook.com/login/ 
      // User Name: aman.chaurasia-nzgm@force.com
      // password: Tech@5050 
      /* -------------- Don't delete --------------  */
    }
    setSelectedSourceType(newConnectionType);
  };


  //  ---- app id client id 
  //https://twitter.com/i/oauth2/authorize?response_type=code&client_id=ZmRGUDVhSE10YWUxVGVuT2pRNDY6MTpjaQ&redirect_uri=http://localhost:3000/dashboard/data-platform/create-data-connection&scope=tweet.read%20users.read%20follows.read%20follows.write&state=state&code_challenge=challenge&code_challenge_method=plain

  // 1effd418104505d04acca789fe74c8b6e7ae437e8925c4f35b3f1216afd02876 


  const collapseGrid = () => {
    setCollapse(!collapse);
  }

  const saveTokenZendesk = () => {

  }


  const setSelectedSourceType = (connectionType) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/user/updateConnectionType`, { "id": user._id, "connectionType": connectionType })
      .then((response) => {


      })
      .catch((err) => {

      });

  }
  const selectWorkSpace = (ev, val) => {
    setselectedForm([])
    setlistMapping([]);
    setselectedDefaultWorkspace(val);
    // ${process.env.REACT_APP_API_URL}/survey/getFeedbackListOfHubspot
    // "token": "FcCmBqwFNAYWKtXv5F6g6CZtfmBQKgMnBP7vSMTYGshg"
    axios
      .post(`${process.env.REACT_APP_AMEZON_AWSAPI_URL}/workspace/forms`, { "token": token, "workspaceid": val.value })
      .then((response) => {
        if (response.data.length != 0) {
          let newWorkspace = [];
          response.data.forEach(ele => {
            newWorkspace.push({ "title": ele.title, "value": ele.id })
          })
          setlistOfForm(newWorkspace);

        }
      })
      .catch((err) => {
        setlistOfForm([]);
      });

  }

  const hubContactLit = [{ id: 1, "item": "age", "displayName": "Age", "is_mapped": true, "weightage": "H" },
  { id: 2, "item": "firstname", "displayName": "First Name", "is_mapped": true, "weightage": "H" },
  { id: 3, "item": "gender", "displayName": "Gender", "is_mapped": true, "weightage": "H" },
  { id: 4, "item": "lastname", "displayName": "Last Name", "is_mapped": true, "weightage": "H" },
  { id: 5, "item": "email", "displayName": "Email", "is_mapped": true, "weightage": "H" },
  { id: 6, "item": "average_purchase_value", "displayName": "Average Purchase Value", "is_mapped": true, "weightage": "H" },
  { id: 7, "item": "purchase_frequency", "displayName": "Purchase Frequency", "is_mapped": true, "weightage": "H" },
  { id: 8, "item": "cart_drop_rate", "displayName": "Days Since Last Purchased", "is_mapped": true, "weightage": "H" }]

  const selectList = async (ev, val) => {
    // let cloneContactMap = [...listContactMapping];
    // let getIndex = cloneContactMap.findIndex(ele => ele.displayName == val.name)
    // if (getIndex == -1) {
    //   let addNewFieldList = hubContactLit.map((ele1, indx) => ({ ...ele1, "module": hubContactLit[indx].item }))
    //   cloneContactMap.push({
    //     displayName: val.name, value: val.listId, hs_object: "contact", colList: addNewFieldList, selectedRow: [1, 2, 3, 4, 5, 6, 7, 8]
    //   })
    //   setlistContactMapping(cloneContactMap);//For mapping selecte list id with selectedColumn
    //   setcheckDuplicateSurveyList("")
    //   seterrorListDisplay([]);
    //   setselectedContact(val);

    // } else {
    //   seterrorListDisplay([{ alertType: 'error-message', isCollapsable: true, short_text: 'Duplicate Survey', message: ["Already added in the list"] }]);
    //   // setcheckDuplicateSurveyList("Already added in the list")

    // }


    // await axios.post(`${process.env.REACT_APP_API_URL}/user/fetchSelectedListContact`, { "token": hubspotTokenName, "listId": val.listId })
    //   .then(async (response) => {
    //     if (response.data.list.length != 0) {
    //       let addNewFieldList = hubContactLit.map((ele1, indx) => ({ ...ele1, "module": hubContactLit[indx].item }))
    //       cloneContactMap.push({
    //         list: { displayName: val.name, value: val.listId }, colList: addNewFieldList, selectedRow: [1, 2, 3, 4, 5, 6, 7, 8]
    //       })
    //       setlistContactMapping(cloneContactMap);//For mapping selecte list id with selectedColumn
    //       // setSelectionModelForHubspot([1, 2, 3, 4, 5, 6, 7, 8])//For selectedColumn id
    //     }
    //   })
    //   .catch((err) => {
    //     setlistContactMapping([]);
    //   });
  }
  const selectFeedbackSurvey = (ev, val) => {
    if (val == null) {
      seterrorListDisplay([]);
      return;
    }
    let cloneContactMap = [...listContactMapping];
    let getIndex = cloneContactMap.findIndex(ele => ele.displayName == val.displayName)
    if (getIndex == -1) {
      let questionList = val.colList.map(ele => ele.item);
      let newFeedbacktmpList = cloneContactMap.length == 0 ? [] : ((cloneContactMap.filter(elef => elef.hs_object == val.hs_object)));
      let savedQuestionList = newFeedbacktmpList.length == 0 ? [] : newFeedbacktmpList[0].colList.map(ele => ele.item);
      let symDifference = savedQuestionList.length == 0 ? [] : questionList.filter((x) => !savedQuestionList.includes(x)).concat(savedQuestionList.filter((x) => !questionList.includes(x)));
      if (symDifference.length == 0) {
        cloneContactMap.push(val)
        setlistContactMapping(cloneContactMap);
        // setcheckDuplicateSurveyList("")
        seterrorListDisplay([]);
        setselectedFeedbackSurvey(val)
      } else {
        // setcheckDuplicateSurveyList("If you are selecting multiple surveys, ensure identical questions sets")
        seterrorListDisplay([{ alertType: 'error-message', isCollapsable: true, short_text: 'Question Mapping Error', message: ["If you are selecting multiple surveys, ensure identical questions sets"] }]);

      }


    } else {
      seterrorListDisplay([{ alertType: 'error-message', isCollapsable: true, short_text: 'Duplicate Survey', message: ["Already added in the list"] }]);
      // setcheckDuplicateSurveyList("Already added in the list")

    }

  }

  const handleRemoveSurvey = (ev, ind) => {
    let newSelectedSurveyList = [...listContactMapping];
    newSelectedSurveyList.splice(ind, 1);
    setlistContactMapping(newSelectedSurveyList);
  }

  const getFeedbackSurveyList = async (hsObject) => {
    if (hubspotRefreshtokenName != "") {
      let cloneContactMap = []//[...listContactMapping];
      let cloneContactMap1 = [];
      setisFetchedFeedbackList(true)
      await axios.post(`${process.env.REACT_APP_API_URL}/survey/getFeedbackListOfHubspot`, { user: user._id, "token": hubspotTokenName, refresh_token: hubspotRefreshtokenName, hs_object: hsObject })
        .then(async (response) => {
          console.log(response.data);
          setisFetchedFeedbackList(false)
          if (response.data.success) {
            seterrorListDisplay([]);
            let newRespFeedbackData = response.data.data.forms == null ? null : response.data.data.forms//lists
            if (newRespFeedbackData != null) {
              let selectedKeySurvey = Object.keys(newRespFeedbackData);
              selectedKeySurvey.forEach(ele => {
                let questionList = Object.keys(newRespFeedbackData[ele].field_meta)
                let newMappedList = questionList.map((eleques, index) => (({
                  id: index + 1,
                  item: eleques.replace(/&nbsp;/g, ''),
                  displayName: eleques.replace(/&nbsp;/g, ''),
                  module: (newRespFeedbackData[ele].field_meta[eleques].type === "enumeration" ? (newRespFeedbackData[ele].field_meta[eleques].answers.join(", ").toLowerCase()) : newRespFeedbackData[ele].field_meta[eleques].type),
                })))
                let newChekedList = newMappedList.map(ele => ele.id)
                cloneContactMap.push({ displayName: newRespFeedbackData[ele].hs_survey_name, value: ele, hs_object: "feedback", colList: newMappedList, selectedRow: newChekedList })
              })
            }

            let newRespContactData = response.data.data.lists == null ? null : response.data.data.lists;
            if (newRespContactData != null) {
              let selectedKeyContact = Object.keys(newRespContactData);
              selectedKeyContact.forEach(ele => {
                if (newRespContactData[ele].field_meta != null) {


                  let questionList = Object.keys(newRespContactData[ele].field_meta)
                  let newMappedList = questionList.map((eleques, index) => (({
                    id: index + 1,
                    item: eleques,
                    displayName: newRespContactData[ele].field_meta[eleques].label,
                    module: (newRespContactData[ele].field_meta[eleques].type),
                    used: newRespContactData[ele].field_meta[eleques].used
                  })))
                  let newChekedList = newMappedList.map(ele => ele.id)
                  cloneContactMap1.push({ displayName: newRespContactData[ele].name, value: ele, hs_object: "contact", colList: newMappedList, selectedRow: newChekedList })
                }
              })
            }
            setContactList(cloneContactMap1)
            setlistOfFeedbackSurvey(cloneContactMap);
          }
          else {
            seterrorListDisplay([{ alertType: 'error-message', isCollapsable: true, short_text: 'No data', message: ["No data found"] }]);


          }

        })
        .catch((err) => {
          setisFetchedFeedbackList(false)
          console.log(err)
        });
    }
  }


  const clearSelectForm = () => {
    // console.log("xx", val)
    setlistMapping([]);
    seterrorListDisplay([]);

  }

  const getMapCategary = async (typeformDataQuestmap) => {
    let newFormFiled = [];
    await axios
      .post(
        `https://9ewqs5vmz2.execute-api.us-east-1.amazonaws.com/Production/endpoint`,
        typeformDataQuestmap
      )
      .then((response1) => {
        response1.data.data.forEach((ele, index) => {
          newFormFiled.push({
            id: index + 1,
            item: ele.question,
            module: ele.best_category,
          });
        });
      })
      .catch((err) => { });
    return newFormFiled;
  };

  const selectForm = async (ev, val) => {
    let newList = val.map(ele => ele.value)
    setLoaderShow(true);
    // ${process.env.REACT_APP_AMEZON_AWSAPI_URL}/form
    //${process.env.REACT_APP_API_URL}/survey/getTypePreviewListData
    await axios
      .post(`${process.env.REACT_APP_API_URL}/survey/getTypePreviewListData`, { "token": token, "formidlist": newList })
      .then((response) => {
        setLoaderShow(false);

        // response.data.status != "failure"
        if (response.data.success) {
          // "formId": "cfAeMgsq",
          // "formFields"
          let newresData = newList.map(ele2 => { })
          let newgridData = [];
          response.data.data.forEach(async (element) => {
            let newMappedList = element.formFields.map((ele, index) => (({
              id: index + 1,
              item: ele.title,
              module: ele.type,
            })))

            // module: (ele.options === null ? ele.type : (ele.options.join(",").toLowerCase())),

            let selectedFormDetail = listOfForm.filter(el => el.value == element.formId);
            let newChekedList = newMappedList.map(ele => ele.id);

            let questionList = newMappedList.map(ele => ele.item);
            let savedQuestionList = newgridData.length == 0 ? [] : newgridData[0].formFields.map(ele => ele.item);
            let symDifference = savedQuestionList.length == 0 ? [] : questionList.filter((x) => !savedQuestionList.includes(x)).concat(savedQuestionList.filter((x) => !questionList.includes(x)));
            if (symDifference.length == 0) {
              // setcheckDuplicateSurveyList("");
              seterrorListDisplay([]);
              newgridData.push({ "formName": selectedFormDetail[0].title, "formId": element.formId, "isCollapse": false, "formFields": newMappedList, "selectedRow": newChekedList });

            } else {
              seterrorListDisplay([{ alertType: 'error-message', isCollapsable: true, short_text: 'Question Mapping Error', message: ["If you are selecting multiple surveys, ensure identical questions sets"] }]);

              // setcheckDuplicateSurveyList("If you are selecting multiple surveys, ensure identical questions sets")
            }
          })
          setselectedForm(val)
          setlistMapping(newgridData);

        } else {
          seterrorListDisplay([]);
          setselectedForm([])
          setlistMapping([]);

          // setSelectionModel([])
        }
      })
      .catch((err) => {
        seterrorListDisplay([{ alertType: 'error-message', isCollapsable: true, short_text: 'Question Mapping Error', message: ["Sorry, an unexpected error occurred. Please retry shortly or contact support for assistance."] }]);
        setLoaderShow(false);
        console.log("");
      });

  }


  const submenuOpen = (select) => {
    // alert(select);
    console.log(select)
  }

  const collapseAndExpandError = (val, ind) => {
    let newObj = [...errorListDisplay];
    newObj[ind].isCollapsable = !newObj[ind].isCollapsable;
    seterrorListDisplay(newObj)
  }



  // end

  return (
    <>

      {/* typeform agree code */}


      {open && <Modal
        open={open}
        onClose={isModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {/* // Connect Typeform */}
        <Box sx={style} style={{ width: !isOpenPopupTypeform ? '35%' : '65%' }} className='panel'>

          <Box sx={{ display: 'flex', flexDirection: 'row', pb: 2 }} className='flex panel-header' >
            <Typography id="modal-modal-title" variant="h4" component="h4" className='flex'>
              {!isOpenPopupTypeform ? "Connect Typeform" : "Ingest Form"}

            </Typography>
            <Typography id="modal-modal-title" variant="p" component="p" className='panel-close-icon'>
              <CloseIcon onClick={isModalClose} className='cursor-pointer' style={{ color: '#212121' }} />
            </Typography>
          </Box>

          <Box className='panel-body'>
            <Box width={'100%'}>
              <React.Fragment>
                {!isOpenPopupTypeform ? (
                  <Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }} className='panel-box-bg'>
                      <Grid item xs={12} className='flex justify-center items-center'>
                        <Typography variant="span" component="span" gutterBottom>
                          <div className="flex justify-center items-center grayscale-image">
                            <span className="flex items-center my-4 justify-center">
                              <img src={"/images/partners/typeform.svg"} className="w-44 mx-auto img-box" style={{ marginRight: '15px' }} alt="Type form" /> <img
                                className="text-center mx-auto" style={{ marginRight: '15px' }}
                                src={"/images/right-arrow.png"} alt='convertml'
                              />  <img
                                className="w-44 mx-auto img-box"
                                src={"/images/convertmlLogo.png"} alt='convertml'
                              />
                            </span>
                          </div>
                        </Typography>
                      </Grid>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                      <Grid item mt={1} mb={1}>
                        <Typography variant="span" component="span" gutterBottom color="text.secondary">ConvertML is request access to your Typeform account</Typography>
                      </Grid>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                      <Grid item>
                        <FormGroup>
                          <FormControlLabel required control={<Checkbox onChange={checkConfrm} />} label="I agree to continue connecting" />
                        </FormGroup>
                      </Grid>
                    </Box>
                  </Box>
                ) : (
                  <Box>
                    <Box container>
                      <Box style={{ maxHeight: '60vh', overflowX: 'hidden', overflowY: 'auto', padding: '0 10px 0 0' }}>
                        {workspaceList.length == 0 &&
                          <Box className='text-center'>
                            <div><CircularProgress />  </div><br />
                            <div className='ml-3'>
                              <p>Syncing data from your Typeform account, thank you for your patience...</p> </div>
                          </Box>
                        }

                        {workspaceList.length != 0 &&
                          <Box sx={{ display: 'flex', flexDirection: 'row', py: 2 }}>
                            <Grid container item spacing={3} xs={12} style={{
                              width: '100%'
                            }}>

                              <Grid item xs={12}>
                                <Autocomplete
                                  disablePortal
                                  id="combo-box-demo"
                                  value={selectedDefaultWorkspace}
                                  onChange={(ev, val) => { selectWorkSpace(ev, val) }}
                                  getOptionLabel={(option) => option.displayName}
                                  options={workspaceList}
                                  sx={{ width: '100%' }}
                                  renderInput={(params) => <TextField {...params} label="Select Workspace" />}
                                />
                              </Grid>

                              <Grid item xs={12} spacing={3}>
                                <Stack sx={{ width: '100%' }}>
                                  <Autocomplete
                                    id="tags-filled1"
                                    multiple
                                    options={listOfForm}
                                    getOptionLabel={(option) => option.title}
                                    value={selectedForm}
                                    onChange={(ev, val) => { selectForm(ev, val) }}



                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label="Select Form"
                                        placeholder="Select Form"
                                      />
                                    )}
                                  />
                                  <FormHelperText style={{ margin: '0px' }}>You can select several forms</FormHelperText>
                                  {
                                    errorListDisplay.map(
                                      (itemMessage, i) => (
                                        <section style={{ height: (itemMessage.isCollapsable == true ? '50px' : 'auto') }}
                                          className={`message-box ${itemMessage.alertType}`}
                                        >
                                          <span>{itemMessage.short_text}</span>
                                          <a
                                            onClick={(val, ind) => {

                                              collapseAndExpandError(val, i)
                                            }
                                            }
                                          >
                                            <i
                                              className={
                                                !itemMessage.isCollapsable
                                                  ? "fa fa-angle-up"
                                                  : "fa fa-angle-down"
                                              }
                                            ></i>
                                          </a>
                                          {!itemMessage.isCollapsable ? (
                                            <>
                                              <ul>
                                                {
                                                  itemMessage.message.map((mssgList, ii) => (
                                                    <li>{mssgList} </li>
                                                  ))
                                                }
                                              </ul>
                                            </>
                                          ) : (
                                            <> </>
                                          )}

                                        </section>
                                      ))
                                  }
                                  {/* {
                                    checkDuplicateSurveyList != "" &&
                                    <p className="error-text">{checkDuplicateSurveyList}</p>
                                  } */}
                                </Stack>
                              </Grid>

                            </Grid>
                          </Box>
                        }


                        <Grid container spacing={4} display="flex" alignItems="center">
                          <Grid item xs={12}>
                            <Box sx={{ maxHeight: 400 }}>
                              {listMapping.map((item, index) =>
                              (
                                <>
                                  <Box sx={{ display: 'flex', flexDirection: 'row' }} className='justify-between cursor-pointer'>
                                    <Typography variant="h4" component="h4" gutterBottom>
                                      {item.formName}
                                    </Typography>
                                    {item.isCollapse ?
                                      <ExpandLessIcon className='cursor-pointer' style={{ color: '#212121' }} />
                                      : <ExpandMoreIcon className='cursor-pointer' style={{ color: '#212121' }} />
                                    }
                                  </Box>
                                  <Box sx={{ height: 300, width: '100%', paddingBottom: '10px' }}>
                                    <DataGridPro
                                      rows={item.formFields}
                                      columns={colList}
                                      pageSizeOptions={[5, 10, 50, 100]}
                                      checkboxSelection={true}
                                      getRowHeight={() => 'auto'}
                                      rowSelectionModel={item.selectedRow}
                                      onRowSelectionModelChange={(e) => {
                                        let newList1 = [...listMapping]
                                        newList1[index].selectedRow = e;
                                        setlistMapping(newList1);
                                        // item.selectedRow = e;
                                      }}
                                      pagination={false}
                                      hideFooterRowCount={true}
                                      hideFooter={true}
                                      editable
                                    />
                                  </Box>
                                </>

                              )

                              )}
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>


                    </Box>

                  </Box>
                )
                }
              </React.Fragment>

            </Box>

          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'row' }} className='panel-footer'>
            <Grid container item>
              <Grid item xs={12}>
                <Button variant='outlined' size="small" style={{ float: 'left' }} onClick={isModalClose}>Cancel</Button>
                {isOpenPopupTypeform ? <>

                  <Button variant='contained' size="small" style={{ float: 'right' }} disabled={listMapping.length == 0} onClick={isModalClose1}>OK</Button> {showLoder && <CircularProgress style={{ float: 'right', marginRight: 15 }} />}
                </>
                  : <Button variant='contained' size="small" style={{ float: 'right' }} disabled={!isCheckConfrm} onClick={(e) => handleNext('typeform')}>Next Step</Button>
                }
              </Grid>
            </Grid>
          </Box>

        </Box>
      </Modal>
      }

      {openHubspot && <Modal
        open={openHubspot}
        onClose={isModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {/* // Connect Typeform */}
        <Box sx={style} onClick={(ev) => { ev.stopPropagation(); setisShowHubspotObject(false) }} style={{ width: !isOpenPopupHubspot ? '35%' : '65%' }} className='panel'>

          <Box sx={{ display: 'flex', flexDirection: 'row', pb: 2 }} className='flex panel-header' >
            <Typography id="modal-modal-title" variant="h4" component="h4" className='flex'>
              {!isOpenPopupHubspot ? "Connect Hubspot" : "Contact Details"}

            </Typography>
            <Typography id="modal-modal-title" variant="p" component="p" className='panel-close-icon'>
              <CloseIcon onClick={isModalClose} className='cursor-pointer' style={{ color: '#212121' }} />
            </Typography>
          </Box>

          <Box className='panel-body'>
            <Box width={'100%'}>
              <React.Fragment>
                {!isOpenPopupHubspot ? (
                  <Box>

                    <Box sx={{ display: 'flex', flexDirection: 'row' }} className='panel-box-bg'>
                      <Grid item xs={12} className='flex justify-center items-center'>
                        <Typography variant="span" component="span" gutterBottom>
                          <div className="flex justify-center items-center grayscale-image">
                            <span className="flex items-center my-4 justify-center">
                              <img src={"/images/partners/hubspot.svg"} className="w-44 mx-auto img-box" style={{ marginRight: '15px' }} alt="Typeform" /> <img
                                className="text-center mx-auto" style={{ marginRight: '15px' }}
                                src={"/images/right-arrow.png"} alt='arrow-left'
                              />  <img
                                className="w-44 mx-auto img-box"
                                src={"/images/convertmlLogo.png"} alt='convertML'
                              />
                            </span>
                          </div>
                        </Typography>
                      </Grid>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                      <Grid item mt={1} mb={1}>
                        <Typography variant="span" component="span" gutterBottom color="text.secondary">ConvertML is requesting access to your Hubspot account</Typography>
                      </Grid>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                      <Grid item>
                        <FormGroup>
                          <FormControlLabel required control={<Checkbox onChange={checkConfrmHubspot} />} label="I agree to continue connecting" />
                        </FormGroup>
                      </Grid>
                    </Box>
                  </Box>
                ) : (
                  <Box>
                    <Box container>
                      <Box style={{ maxHeight: '60vh', overflowX: 'hidden', overflowY: 'auto', padding: '0 10px 0 0' }}>


                        <Box sx={{ display: 'flex', flexDirection: 'row', py: 2 }}>
                          <Grid container item spacing={2} xs={12} style={{
                            width: '100%'
                          }}>

                            {/* <Grid item xs={12}>
                                <Autocomplete
                                 
                                  id="combo-box-demo"
                                  multiple
                                  onChange={(ev, val) => { selectList(ev, val) }}
                                  getOptionLabel={(option) => option.name}
                                  options={contactList}
                                  sx={{ width: '100%' }}
                                  renderInput={(params) => <TextField {...params} label="Select List" />}
                                />
                              </Grid> */}

                            <Grid item xs={12} spacing={2}>
                              <Stack sx={{ width: '100%' }}>

                                {/* <TextField fullWidth onClick={(ev) => { ev.stopPropagation(); setisShowHubspotObject(!isShowHubspotObject) }} id="standard-search" label="Select Object" value={selectedDefaultHubspotModule.displayName} />
                                  `<List className='custom-list' style={{ marginTop: '-23px' }} component="nav" aria-labelledby="nested-list-subheader">
                                    {!isShowHubspotObject == true ? "" :
                                      hubspotModule1.map((item, i) => (
                                        <>
                                          <ListItemButton style={{ background: '#F7F7F7' }} onClick={(ev) => { ev.stopPropagation(); handleClick11(i) }}>
                                            {item.isopen ? <ExpandLess /> : <ExpandMore />}
                                            <ListItemText primary={item.displayName} />
                                          </ListItemButton>
                                          <Box style={{ maxHeight: 150, overflowY: 'scroll' }}>
                                            {item.children.map((childItem, i) => (
                                              <Collapse in={item.isopen} timeout="auto" unmountOnExit>
                                                <List component="div" disablePadding>
                                                  <ListItemButton sx={{ pl: 4 }} onClick={() => { handleClick12(childItem.name, childItem.displayName) }}>
                                                    <ListItemText primary={childItem.displayName} />
                                                  </ListItemButton>
                                                </List>
                                              </Collapse>
                                            ))}
                                          </Box>
                                        </>
                                      ))}
                                  </List> `   
                                  {
                                    displayNotification == true && selectedDefaultHubspotModule.displayName != "" ? <FormHelperText style={{ margin: '0px' }}>No data is available</FormHelperText> : ''
                                  } */}

                                <Autocomplete
                                  id="tags-filled"

                                  // value={selectedDefaultHubspotModule}
                                  onChange={(ev, val) => { handleClick12(ev, val) }}
                                  getOptionLabel={(option) => option.displayName}
                                  options={hubspotModule}
                                  // groupBy={(option) => option.type}
                                  value={selectedDefaultHubspotModule}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      label="Select Object"
                                      placeholder="Select Object"
                                    />
                                  )}
                                />
                                <br />
                              </Stack>

                              {isFetchedFeedbackList == true &&
                                <Box className='text-center'>
                                  <div><CircularProgress />  </div><br />
                                  <div className='ml-3'>
                                    <p>Syncing data from your Hubspot account, thank you for your patience...</p> </div>
                                </Box>


                              }


                              {
                                isFetchedFeedbackList == false && displayNotification == false && <Stack sx={{ width: '100%', }}>
                                  <Autocomplete
                                    id="tags-filled"

                                    onChange={(ev, val) => { selectFeedbackSurvey(ev, val) }}
                                    getOptionLabel={(option) => option.displayName}
                                    options={contactList}
                                    value={selectedFeedbackSurvey}


                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label="Select List"
                                        placeholder="Select List"
                                      />
                                    )}
                                  />
                                  {/* <FormHelperText style={{ margin: '0px' }}>You can select several forms</FormHelperText> */}
                                </Stack>
                              }
                              {
                                isFetchedFeedbackList == false && displayNotificationFeedback == false && <Stack sx={{ width: '100%', }}>

                                  <Autocomplete
                                    id="tags-filled"
                                    onChange={(ev, val) => { selectFeedbackSurvey(ev, val) }}
                                    getOptionLabel={(option) => option.displayName}
                                    options={listOfFeedbackSurvey}
                                    value={selectedFeedbackSurvey}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label="Select Survey"
                                        placeholder="Select Survey"
                                      />
                                    )}
                                  />


                                  {/* <FormHelperText style={{ margin: '0px' }}>{checkDuplicateSurveyList}</FormHelperText> */}
                                </Stack>
                              }

                              {
                                errorListDisplay.map(
                                  (itemMessage, i) => (
                                    <section style={{ height: (itemMessage.isCollapsable == true ? '50px' : 'auto') }}
                                      className={`message-box mt-2 ${itemMessage.alertType}`}
                                    >
                                      <span>{itemMessage.short_text}</span>
                                      <a
                                        onClick={(val, ind) => {

                                          collapseAndExpandError(val, i)
                                        }
                                        }
                                      >
                                        <i
                                          className={
                                            !itemMessage.isCollapsable
                                              ? "fa fa-angle-up"
                                              : "fa fa-angle-down"
                                          }
                                        ></i>
                                      </a>
                                      {!itemMessage.isCollapsable ? (
                                        <>
                                          <ul>
                                            {
                                              itemMessage.message.map((mssgList, ii) => (
                                                <li>{mssgList} </li>
                                              ))
                                            }
                                          </ul>
                                        </>
                                      ) : (
                                        <> </>
                                      )}

                                    </section>
                                  ))
                              }


                              {/* {
                                  checkDuplicateSurveyList != "" &&
                                  <p className="error-text">{checkDuplicateSurveyList}</p>
                                } */}

                            </Grid>

                          </Grid>
                        </Box>



                        <Grid container spacing={4} display="flex" alignItems="center">
                          <Grid item xs={12} >
                            {listContactMapping.map((item, index) =>
                            (
                              <>
                                <Box sx={{ display: 'flex', flexDirection: 'row' }} className='justify-between cursor-pointer'>
                                  <button
                                    className='chips-btn'
                                    color="primary"
                                    size="small"
                                    variant="outlined"
                                    onClick={(ev) => {
                                      handleRemoveSurvey(ev, index);
                                    }}
                                  >
                                    {item.displayName} <i className='fa fa-times-circle'></i>
                                  </button>
                                  {/* {item.isCollapse ?
                                    <ExpandLessIcon className='cursor-pointer' style={{ color: '#212121' }} />
                                    : <ExpandMoreIcon className='cursor-pointer' style={{ color: '#212121' }} />
                                  } */}
                                </Box><br />
                                <Box sx={{ height: 300, width: '100%', paddingBottom: '10px' }}>
                                  <DataGridPro
                                    rows={item.colList}
                                    columns={(item.hs_object == "contact" ? colListHubspotContact : colListHubspot)}
                                    pageSizeOptions={[5, 10, 50, 100]}
                                    checkboxSelection={true}
                                    isRowSelectable={(params) => (params.row.used == "False" ? false : true)}
                                    disableSelectionOnClick
                                    getRowHeight={() => 'auto'}
                                    rowSelectionModel={item.selectedRow}
                                    // onRowSelectionModelChange={(e) => {
                                    //   let newList1 = [...listContactMapping]
                                    //   newList1[index].selectedRow = e;
                                    //   setlistContactMapping(newList1);
                                    //   // item.selectedRow = e;
                                    // }}

                                    pagination={false}
                                    hideFooterRowCount={true}
                                    hideFooter={true}
                                    editable
                                  />
                                </Box>
                              </>

                            )

                            )}
                          </Grid>
                        </Grid>
                      </Box>
                    </Box>
                  </Box>
                )
                }
              </React.Fragment>

            </Box>

          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'row' }} className='panel-footer'>
            <Grid container item>
              <Grid item xs={12}>
                <Button variant='outlined' size="small" style={{ float: 'left' }} onClick={isModalClose}>Cancel</Button>
                {isOpenPopupHubspot ? <>

                  <Button variant='contained' size="small" style={{ float: 'right' }} disabled={listContactMapping.length == 0} onClick={isModalCloseHubspot1}>OK</Button> {showLoder && <CircularProgress style={{ float: 'right', marginRight: 15 }} />}
                </>
                  : <Button variant='contained' size="small" style={{ float: 'right' }} disabled={!isCheckConfrmHubspot} onClick={(e) => handleNext('hubspot')}>Next Step</Button>
                }
              </Grid>
            </Grid>
          </Box>

        </Box>
      </Modal>
      }
      {openZendesk && <Modal
        open={openZendesk}
        onClose={isModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {/* // Connect Typeform */}
        <Box sx={style} onClick={(ev) => { ev.stopPropagation(); setisShowHubspotObject(false) }} style={{ width: !isOpenPopupHubspot ? '35%' : '65%' }} className='panel'>

          <Box sx={{ display: 'flex', flexDirection: 'row', pb: 2 }} className='flex panel-header' >
            <Typography id="modal-modal-title" variant="h4" component="h4" className='flex'>
              {!isOpenPopupHubspot ? "Connect Zendesk" : "Contact Details"}

            </Typography>
            <Typography id="modal-modal-title" variant="p" component="p" className='panel-close-icon'>
              <CloseIcon onClick={isModalClose} className='cursor-pointer' style={{ color: '#212121' }} />
            </Typography>
          </Box>

          <Box className='panel-body'>
            <Box width={'100%'}>
              <React.Fragment>
                {true ? (
                  <Box>

                    <Box sx={{ display: 'flex', flexDirection: 'row' }} className='panel-box-bg'>
                      <Grid item xs={12} className='flex justify-center items-center'>
                        <Typography variant="span" component="span" gutterBottom>
                          <div className="flex justify-center items-center grayscale-image">
                            <span className="flex items-center my-4 justify-center">
                              <img src={"/images/partners/zendesk-sm.svg"} className="w-44 mx-auto img-box" style={{ marginRight: '15px' }} alt="zendeskicons" /> <img
                                className="text-center mx-auto" style={{ marginRight: '15px' }}
                                src={"/images/right-arrow.png"} alt='arrow-left'
                              />  <img
                                className="w-44 mx-auto img-box"
                                src={"/images/convertmlLogo.png"} alt='convertML'
                              />
                            </span>
                          </div>
                        </Typography>
                      </Grid>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                      <Grid item mt={1} mb={1}>
                        <Typography variant="span" component="span" gutterBottom color="text.secondary">ConvertML is requesting access to your Zendesk account</Typography>
                      </Grid>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                      <Grid item>
                        <FormGroup>
                          <FormControlLabel required control={<Checkbox onChange={checkConfrmHubspot} />} label="I agree to continue connecting" />
                        </FormGroup>
                      </Grid>
                    </Box>
                  </Box>
                ) : (
                  <Box>
                    <Box container>
                      <Box style={{ maxHeight: '60vh', overflowX: 'hidden', overflowY: 'auto', padding: '0 10px 0 0' }}>


                        <Box sx={{ display: 'flex', flexDirection: 'row', py: 2 }}>
                          <Grid container item spacing={2} xs={12} style={{
                            width: '100%'
                          }}>
                            <Grid item xs={12} spacing={2}>
                              <Stack sx={{ width: '100%' }}>

                                {/* <TextField fullWidth onClick={(ev) => { ev.stopPropagation(); setisShowHubspotObject(!isShowHubspotObject) }} id="standard-search" label="Select Object" value={selectedDefaultHubspotModule.displayName} />
                                  `<List className='custom-list' style={{ marginTop: '-23px' }} component="nav" aria-labelledby="nested-list-subheader">
                                    {!isShowHubspotObject == true ? "" :
                                      hubspotModule1.map((item, i) => (
                                        <>
                                          <ListItemButton style={{ background: '#F7F7F7' }} onClick={(ev) => { ev.stopPropagation(); handleClick11(i) }}>
                                            {item.isopen ? <ExpandLess /> : <ExpandMore />}
                                            <ListItemText primary={item.displayName} />
                                          </ListItemButton>
                                          <Box style={{ maxHeight: 150, overflowY: 'scroll' }}>
                                            {item.children.map((childItem, i) => (
                                              <Collapse in={item.isopen} timeout="auto" unmountOnExit>
                                                <List component="div" disablePadding>
                                                  <ListItemButton sx={{ pl: 4 }} onClick={() => { handleClick12(childItem.name, childItem.displayName) }}>
                                                    <ListItemText primary={childItem.displayName} />
                                                  </ListItemButton>
                                                </List>
                                              </Collapse>
                                            ))}
                                          </Box>
                                        </>
                                      ))}
                                  </List> `   
                                  {
                                    displayNotification == true && selectedDefaultHubspotModule.displayName != "" ? <FormHelperText style={{ margin: '0px' }}>No data is available</FormHelperText> : ''
                                  } */}

                                <Autocomplete
                                  id="tags-filled"

                                  // value={selectedDefaultHubspotModule}
                                  onChange={(ev, val) => { handleClick12(ev, val) }}
                                  getOptionLabel={(option) => option.displayName}
                                  options={hubspotModule}
                                  // groupBy={(option) => option.type}
                                  value={selectedDefaultHubspotModule}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      label="Select Object"
                                      placeholder="Select Object"
                                    />
                                  )}
                                />
                                <br />
                              </Stack>

                              {isFetchedFeedbackList == true &&
                                <Box className='text-center'>
                                  <div><CircularProgress />  </div><br />
                                  <div className='ml-3'>
                                    <p>Syncing data from your Hubspot account, thank you for your patience...</p> </div>
                                </Box>


                              }


                              {
                                isFetchedFeedbackList == false && displayNotification == false && <Stack sx={{ width: '100%', }}>
                                  <Autocomplete
                                    id="tags-filled"

                                    onChange={(ev, val) => { selectFeedbackSurvey(ev, val) }}
                                    getOptionLabel={(option) => option.displayName}
                                    options={contactList}
                                    value={selectedFeedbackSurvey}


                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label="Select List"
                                        placeholder="Select List"
                                      />
                                    )}
                                  />
                                  {/* <FormHelperText style={{ margin: '0px' }}>You can select several forms</FormHelperText> */}
                                </Stack>
                              }
                              {
                                isFetchedFeedbackList == false && displayNotificationFeedback == false && <Stack sx={{ width: '100%', }}>

                                  <Autocomplete
                                    id="tags-filled"
                                    onChange={(ev, val) => { selectFeedbackSurvey(ev, val) }}
                                    getOptionLabel={(option) => option.displayName}
                                    options={listOfFeedbackSurvey}
                                    value={selectedFeedbackSurvey}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label="Select Survey"
                                        placeholder="Select Survey"
                                      />
                                    )}
                                  />


                                  {/* <FormHelperText style={{ margin: '0px' }}>{checkDuplicateSurveyList}</FormHelperText> */}
                                </Stack>
                              }

                              {
                                errorListDisplay.map(
                                  (itemMessage, i) => (
                                    <section style={{ height: (itemMessage.isCollapsable == true ? '50px' : 'auto') }}
                                      className={`message-box mt-2 ${itemMessage.alertType}`}
                                    >
                                      <span>{itemMessage.short_text}</span>
                                      <a
                                        onClick={(val, ind) => {

                                          collapseAndExpandError(val, i)
                                        }
                                        }
                                      >
                                        <i
                                          className={
                                            !itemMessage.isCollapsable
                                              ? "fa fa-angle-up"
                                              : "fa fa-angle-down"
                                          }
                                        ></i>
                                      </a>
                                      {!itemMessage.isCollapsable ? (
                                        <>
                                          <ul>
                                            {
                                              itemMessage.message.map((mssgList, ii) => (
                                                <li>{mssgList} </li>
                                              ))
                                            }
                                          </ul>
                                        </>
                                      ) : (
                                        <> </>
                                      )}

                                    </section>
                                  ))
                              }


                              {/* {
                                  checkDuplicateSurveyList != "" &&
                                  <p className="error-text">{checkDuplicateSurveyList}</p>
                                } */}

                            </Grid>

                          </Grid>
                        </Box>



                        <Grid container spacing={4} display="flex" alignItems="center">
                          <Grid item xs={12} >
                            {listContactMapping.map((item, index) =>
                            (
                              <>
                                <Box sx={{ display: 'flex', flexDirection: 'row' }} className='justify-between cursor-pointer'>
                                  <button
                                    className='chips-btn'
                                    color="primary"
                                    size="small"
                                    variant="outlined"
                                    onClick={(ev) => {
                                      handleRemoveSurvey(ev, index);
                                    }}
                                  >
                                    {item.displayName} <i className='fa fa-times-circle'></i>
                                  </button>
                                  {/* {item.isCollapse ?
                                    <ExpandLessIcon className='cursor-pointer' style={{ color: '#212121' }} />
                                    : <ExpandMoreIcon className='cursor-pointer' style={{ color: '#212121' }} />
                                  } */}
                                </Box><br />
                                <Box sx={{ height: 300, width: '100%', paddingBottom: '10px' }}>
                                  <DataGridPro
                                    rows={item.colList}
                                    columns={(item.hs_object == "contact" ? colListHubspotContact : colListHubspot)}
                                    pageSizeOptions={[5, 10, 50, 100]}
                                    checkboxSelection={true}
                                    isRowSelectable={(params) => (params.row.used == "False" ? false : true)}
                                    disableSelectionOnClick
                                    getRowHeight={() => 'auto'}
                                    rowSelectionModel={item.selectedRow}
                                    // onRowSelectionModelChange={(e) => {
                                    //   let newList1 = [...listContactMapping]
                                    //   newList1[index].selectedRow = e;
                                    //   setlistContactMapping(newList1);
                                    //   // item.selectedRow = e;
                                    // }}

                                    pagination={false}
                                    hideFooterRowCount={true}
                                    hideFooter={true}
                                    editable
                                  />
                                </Box>
                              </>

                            )

                            )}
                          </Grid>
                        </Grid>
                      </Box>
                    </Box>
                  </Box>
                )
                }
              </React.Fragment>

            </Box>

          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'row' }} className='panel-footer'>
            <Grid container item>
              <Grid item xs={12}>
                <Button variant='outlined' size="small" style={{ float: 'left' }} onClick={isModalClose}>Cancel</Button>
                {!isModalClose ? <>
                  <Button variant='contained' size="small" style={{ float: 'right' }} disabled={listContactMapping.length == 0} onClick={isModalCloseHubspot1}>OK</Button> {showLoder && <CircularProgress style={{ float: 'right', marginRight: 15 }} />}
                </>
                  : <Button variant='contained' size="small" style={{ float: 'right' }} disabled={!isCheckConfrmHubspot} onClick={(e) => handleNext('zendesk')}>Next Step</Button>
                }
              </Grid>
            </Grid>
          </Box>

        </Box>
      </Modal>
      }


      {openFacebook && <Modal
        open={openFacebook}
        onClose={isModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {/* // Connect Typeform */}
        <Box sx={style} style={{ width: !isOpenPopupHubspot ? '35%' : '65%' }} className='panel'>
          <Box sx={{ display: 'flex', flexDirection: 'row', pb: 2 }} className='flex panel-header' >
            <Typography id="modal-modal-title" variant="h4" component="h4" className='flex'>
              {!isOpenPopupHubspot ? "Connect Facebook" : "Contact Details"}
            </Typography>
            <Typography id="modal-modal-title" variant="p" component="p" className='panel-close-icon'>
              <CloseIcon onClick={isModalClose} className='cursor-pointer' style={{ color: '#212121' }} />
            </Typography>
          </Box>

          <Box className='panel-body'>
            <Box width={'100%'}>
              <React.Fragment>
                {true ? (
                  <Box>

                    <Box sx={{ display: 'flex', flexDirection: 'row' }} className='panel-box-bg'>
                      <Grid item xs={12} className='flex justify-center items-center'>
                        <Typography variant="span" component="span" gutterBottom>
                          <div className="flex justify-center items-center grayscale-image">
                            <span className="flex items-center my-4 justify-center">
                              <img src={"/images/partners/facebook-sm.svg"} className="w-44 mx-auto img-box" style={{ marginRight: '15px' }} alt="zendeskicons" /> <img
                                className="text-center mx-auto" style={{ marginRight: '15px' }}
                                src={"/images/right-arrow.png"} alt='arrow-left'
                              />  <img
                                className="w-44 mx-auto img-box"
                                src={"/images/convertmlLogo.png"} alt='convertML'
                              />
                            </span>
                          </div>
                        </Typography>
                      </Grid>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                      <Grid item mt={1} mb={1}>
                        <Typography variant="span" component="span" gutterBottom color="text.secondary">ConvertML is requesting access to your Facebook account</Typography>
                      </Grid>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                      <Grid item>
                        <FormGroup>
                          <FormControlLabel required control={<Checkbox onChange={checkConfrmHubspot} />} label="I agree to continue connecting" />
                        </FormGroup>
                      </Grid>
                    </Box>
                  </Box>
                ) : (
                  <Box>
                    <Box container>
                      <Box style={{ maxHeight: '60vh', overflowX: 'hidden', overflowY: 'auto', padding: '0 10px 0 0' }}>


                        <Box sx={{ display: 'flex', flexDirection: 'row', py: 2 }}>
                          <Grid container item spacing={2} xs={12} style={{
                            width: '100%'
                          }}>
                            <Grid item xs={12} spacing={2}>
                              <Stack sx={{ width: '100%' }}>

                                {/* <TextField fullWidth onClick={(ev) => { ev.stopPropagation(); setisShowHubspotObject(!isShowHubspotObject) }} id="standard-search" label="Select Object" value={selectedDefaultHubspotModule.displayName} />
                                  `<List className='custom-list' style={{ marginTop: '-23px' }} component="nav" aria-labelledby="nested-list-subheader">
                                    {!isShowHubspotObject == true ? "" :
                                      hubspotModule1.map((item, i) => (
                                        <>
                                          <ListItemButton style={{ background: '#F7F7F7' }} onClick={(ev) => { ev.stopPropagation(); handleClick11(i) }}>
                                            {item.isopen ? <ExpandLess /> : <ExpandMore />}
                                            <ListItemText primary={item.displayName} />
                                          </ListItemButton>
                                          <Box style={{ maxHeight: 150, overflowY: 'scroll' }}>
                                            {item.children.map((childItem, i) => (
                                              <Collapse in={item.isopen} timeout="auto" unmountOnExit>
                                                <List component="div" disablePadding>
                                                  <ListItemButton sx={{ pl: 4 }} onClick={() => { handleClick12(childItem.name, childItem.displayName) }}>
                                                    <ListItemText primary={childItem.displayName} />
                                                  </ListItemButton>
                                                </List>
                                              </Collapse>
                                            ))}
                                          </Box>
                                        </>
                                      ))}
                                  </List> `   
                                  {
                                    displayNotification == true && selectedDefaultHubspotModule.displayName != "" ? <FormHelperText style={{ margin: '0px' }}>No data is available</FormHelperText> : ''
                                  } */}

                                <Autocomplete
                                  id="tags-filled"

                                  // value={selectedDefaultHubspotModule}
                                  onChange={(ev, val) => { handleClick12(ev, val) }}
                                  getOptionLabel={(option) => option.displayName}
                                  options={hubspotModule}
                                  // groupBy={(option) => option.type}
                                  value={selectedDefaultHubspotModule}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      label="Select Object"
                                      placeholder="Select Object"
                                    />
                                  )}
                                />
                                <br />
                              </Stack>

                              {isFetchedFeedbackList == true &&
                                <Box className='text-center'>
                                  <div><CircularProgress />  </div><br />
                                  <div className='ml-3'>
                                    <p>Syncing data from your Hubspot account, thank you for your patience...</p> </div>
                                </Box>


                              }


                              {
                                isFetchedFeedbackList == false && displayNotification == false && <Stack sx={{ width: '100%', }}>
                                  <Autocomplete
                                    id="tags-filled"

                                    onChange={(ev, val) => { selectFeedbackSurvey(ev, val) }}
                                    getOptionLabel={(option) => option.displayName}
                                    options={contactList}
                                    value={selectedFeedbackSurvey}


                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label="Select List"
                                        placeholder="Select List"
                                      />
                                    )}
                                  />
                                  {/* <FormHelperText style={{ margin: '0px' }}>You can select several forms</FormHelperText> */}
                                </Stack>
                              }
                              {
                                isFetchedFeedbackList == false && displayNotificationFeedback == false && <Stack sx={{ width: '100%', }}>

                                  <Autocomplete
                                    id="tags-filled"
                                    onChange={(ev, val) => { selectFeedbackSurvey(ev, val) }}
                                    getOptionLabel={(option) => option.displayName}
                                    options={listOfFeedbackSurvey}
                                    value={selectedFeedbackSurvey}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label="Select Survey"
                                        placeholder="Select Survey"
                                      />
                                    )}
                                  />


                                  {/* <FormHelperText style={{ margin: '0px' }}>{checkDuplicateSurveyList}</FormHelperText> */}
                                </Stack>
                              }

                              {
                                errorListDisplay.map(
                                  (itemMessage, i) => (
                                    <section style={{ height: (itemMessage.isCollapsable == true ? '50px' : 'auto') }}
                                      className={`message-box mt-2 ${itemMessage.alertType}`}
                                    >
                                      <span>{itemMessage.short_text}</span>
                                      <a
                                        onClick={(val, ind) => {

                                          collapseAndExpandError(val, i)
                                        }
                                        }
                                      >
                                        <i
                                          className={
                                            !itemMessage.isCollapsable
                                              ? "fa fa-angle-up"
                                              : "fa fa-angle-down"
                                          }
                                        ></i>
                                      </a>
                                      {!itemMessage.isCollapsable ? (
                                        <>
                                          <ul>
                                            {
                                              itemMessage.message.map((mssgList, ii) => (
                                                <li>{mssgList} </li>
                                              ))
                                            }
                                          </ul>
                                        </>
                                      ) : (
                                        <> </>
                                      )}

                                    </section>
                                  ))
                              }


                              {/* {
                                  checkDuplicateSurveyList != "" &&
                                  <p className="error-text">{checkDuplicateSurveyList}</p>
                                } */}

                            </Grid>

                          </Grid>
                        </Box>



                        <Grid container spacing={4} display="flex" alignItems="center">
                          <Grid item xs={12} >
                            {listContactMapping.map((item, index) =>
                            (
                              <>
                                <Box sx={{ display: 'flex', flexDirection: 'row' }} className='justify-between cursor-pointer'>
                                  <button
                                    className='chips-btn'
                                    color="primary"
                                    size="small"
                                    variant="outlined"
                                    onClick={(ev) => {
                                      handleRemoveSurvey(ev, index);
                                    }}
                                  >
                                    {item.displayName} <i className='fa fa-times-circle'></i>
                                  </button>
                                  {/* {item.isCollapse ?
                                    <ExpandLessIcon className='cursor-pointer' style={{ color: '#212121' }} />
                                    : <ExpandMoreIcon className='cursor-pointer' style={{ color: '#212121' }} />
                                  } */}
                                </Box><br />
                                <Box sx={{ height: 300, width: '100%', paddingBottom: '10px' }}>
                                  <DataGridPro
                                    rows={item.colList}
                                    columns={(item.hs_object == "contact" ? colListHubspotContact : colListHubspot)}
                                    pageSizeOptions={[5, 10, 50, 100]}
                                    checkboxSelection={true}
                                    isRowSelectable={(params) => (params.row.used == "False" ? false : true)}
                                    disableSelectionOnClick
                                    getRowHeight={() => 'auto'}
                                    rowSelectionModel={item.selectedRow}
                                    // onRowSelectionModelChange={(e) => {
                                    //   let newList1 = [...listContactMapping]
                                    //   newList1[index].selectedRow = e;
                                    //   setlistContactMapping(newList1);
                                    //   // item.selectedRow = e;
                                    // }}

                                    pagination={false}
                                    hideFooterRowCount={true}
                                    hideFooter={true}
                                    editable
                                  />
                                </Box>
                              </>

                            )

                            )}
                          </Grid>
                        </Grid>
                      </Box>
                    </Box>
                  </Box>
                )
                }
              </React.Fragment>

            </Box>

          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'row' }} className='panel-footer'>
            <Grid container item>
              <Grid item xs={12}>
                <Button variant='outlined' size="small" style={{ float: 'left' }} onClick={isModalClose}>Cancel</Button>
                {!isModalClose ? <>
                  <Button variant='contained' size="small" style={{ float: 'right' }} disabled={listContactMapping.length == 0} onClick={isModalCloseHubspot1}>OK</Button> {showLoder && <CircularProgress style={{ float: 'right', marginRight: 15 }} />}
                </>
                  : <Button variant='contained' size="small" style={{ float: 'right' }} disabled={!isCheckConfrmHubspot} onClick={(e) => handleNext('facebook')}>Next Step</Button>
                }
              </Grid>
            </Grid>
          </Box>

        </Box>
      </Modal>
      }

      {openTwitter && <Modal
        open={openTwitter}
        onClose={isModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {/* // Connect Typeform */}
        <Box sx={style} style={{ width: !isOpenPopupHubspot ? '35%' : '65%' }} className='panel'>
          <Box sx={{ display: 'flex', flexDirection: 'row', pb: 2 }} className='flex panel-header' >
            <Typography id="modal-modal-title" variant="h4" component="h4" className='flex'>
              {!isOpenPopupHubspot ? "Connect Twitter" : "Contact Details"}
            </Typography>
            <Typography id="modal-modal-title" variant="p" component="p" className='panel-close-icon'>
              <CloseIcon onClick={isModalClose} className='cursor-pointer' style={{ color: '#212121' }} />
            </Typography>
          </Box>

          <Box className='panel-body'>
            <Box width={'100%'}>
              <React.Fragment>
                {true ? (
                  <Box>

                    <Box sx={{ display: 'flex', flexDirection: 'row' }} className='panel-box-bg'>
                      <Grid item xs={12} className='flex justify-center items-center'>
                        <Typography variant="span" component="span" gutterBottom>
                          <div className="flex justify-center items-center grayscale-image">
                            <span className="flex items-center my-4 justify-center">
                              <img src={"/images/partners/twitter-sm.svg"} className="w-44 mx-auto img-box" style={{ marginRight: '15px' }} alt="zendeskicons" /> <img
                                className="text-center mx-auto" style={{ marginRight: '15px' }}
                                src={"/images/right-arrow.png"} alt='arrow-left'
                              />  <img
                                className="w-44 mx-auto img-box"
                                src={"/images/convertmlLogo.png"} alt='convertML'
                              />
                            </span>
                          </div>
                        </Typography>
                      </Grid>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                      <Grid item mt={1} mb={1}>
                        <Typography variant="span" component="span" gutterBottom color="text.secondary">ConvertML is requesting access to your Twitter account</Typography>
                      </Grid>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                      <Grid item>
                        <FormGroup>
                          <FormControlLabel required control={<Checkbox onChange={checkConfrmHubspot} />} label="I agree to continue connecting" />
                        </FormGroup>
                      </Grid>
                    </Box>
                  </Box>
                ) : (
                  <Box>
                    <Box container>
                      <Box style={{ maxHeight: '60vh', overflowX: 'hidden', overflowY: 'auto', padding: '0 10px 0 0' }}>


                        <Box sx={{ display: 'flex', flexDirection: 'row', py: 2 }}>
                          <Grid container item spacing={2} xs={12} style={{
                            width: '100%'
                          }}>
                            <Grid item xs={12} spacing={2}>
                              <Stack sx={{ width: '100%' }}>

                                {/* <TextField fullWidth onClick={(ev) => { ev.stopPropagation(); setisShowHubspotObject(!isShowHubspotObject) }} id="standard-search" label="Select Object" value={selectedDefaultHubspotModule.displayName} />
                                  `<List className='custom-list' style={{ marginTop: '-23px' }} component="nav" aria-labelledby="nested-list-subheader">
                                    {!isShowHubspotObject == true ? "" :
                                      hubspotModule1.map((item, i) => (
                                        <>
                                          <ListItemButton style={{ background: '#F7F7F7' }} onClick={(ev) => { ev.stopPropagation(); handleClick11(i) }}>
                                            {item.isopen ? <ExpandLess /> : <ExpandMore />}
                                            <ListItemText primary={item.displayName} />
                                          </ListItemButton>
                                          <Box style={{ maxHeight: 150, overflowY: 'scroll' }}>
                                            {item.children.map((childItem, i) => (
                                              <Collapse in={item.isopen} timeout="auto" unmountOnExit>
                                                <List component="div" disablePadding>
                                                  <ListItemButton sx={{ pl: 4 }} onClick={() => { handleClick12(childItem.name, childItem.displayName) }}>
                                                    <ListItemText primary={childItem.displayName} />
                                                  </ListItemButton>
                                                </List>
                                              </Collapse>
                                            ))}
                                          </Box>
                                        </>
                                      ))}
                                  </List> `   
                                  {
                                    displayNotification == true && selectedDefaultHubspotModule.displayName != "" ? <FormHelperText style={{ margin: '0px' }}>No data is available</FormHelperText> : ''
                                  } */}

                                <Autocomplete
                                  id="tags-filled"

                                  // value={selectedDefaultHubspotModule}
                                  onChange={(ev, val) => { handleClick12(ev, val) }}
                                  getOptionLabel={(option) => option.displayName}
                                  options={hubspotModule}
                                  // groupBy={(option) => option.type}
                                  value={selectedDefaultHubspotModule}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      label="Select Object"
                                      placeholder="Select Object"
                                    />
                                  )}
                                />
                                <br />
                              </Stack>

                              {isFetchedFeedbackList == true &&
                                <Box className='text-center'>
                                  <div><CircularProgress />  </div><br />
                                  <div className='ml-3'>
                                    <p>Syncing data from your Hubspot account, thank you for your patience...</p> </div>
                                </Box>


                              }


                              {
                                isFetchedFeedbackList == false && displayNotification == false && <Stack sx={{ width: '100%', }}>
                                  <Autocomplete
                                    id="tags-filled"

                                    onChange={(ev, val) => { selectFeedbackSurvey(ev, val) }}
                                    getOptionLabel={(option) => option.displayName}
                                    options={contactList}
                                    value={selectedFeedbackSurvey}


                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label="Select List"
                                        placeholder="Select List"
                                      />
                                    )}
                                  />
                                  {/* <FormHelperText style={{ margin: '0px' }}>You can select several forms</FormHelperText> */}
                                </Stack>
                              }
                              {
                                isFetchedFeedbackList == false && displayNotificationFeedback == false && <Stack sx={{ width: '100%', }}>

                                  <Autocomplete
                                    id="tags-filled"
                                    onChange={(ev, val) => { selectFeedbackSurvey(ev, val) }}
                                    getOptionLabel={(option) => option.displayName}
                                    options={listOfFeedbackSurvey}
                                    value={selectedFeedbackSurvey}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label="Select Survey"
                                        placeholder="Select Survey"
                                      />
                                    )}
                                  />


                                  {/* <FormHelperText style={{ margin: '0px' }}>{checkDuplicateSurveyList}</FormHelperText> */}
                                </Stack>
                              }

                              {
                                errorListDisplay.map(
                                  (itemMessage, i) => (
                                    <section style={{ height: (itemMessage.isCollapsable == true ? '50px' : 'auto') }}
                                      className={`message-box mt-2 ${itemMessage.alertType}`}
                                    >
                                      <span>{itemMessage.short_text}</span>
                                      <a
                                        onClick={(val, ind) => {

                                          collapseAndExpandError(val, i)
                                        }
                                        }
                                      >
                                        <i
                                          className={
                                            !itemMessage.isCollapsable
                                              ? "fa fa-angle-up"
                                              : "fa fa-angle-down"
                                          }
                                        ></i>
                                      </a>
                                      {!itemMessage.isCollapsable ? (
                                        <>
                                          <ul>
                                            {
                                              itemMessage.message.map((mssgList, ii) => (
                                                <li>{mssgList} </li>
                                              ))
                                            }
                                          </ul>
                                        </>
                                      ) : (
                                        <> </>
                                      )}

                                    </section>
                                  ))
                              }


                              {/* {
                                  checkDuplicateSurveyList != "" &&
                                  <p className="error-text">{checkDuplicateSurveyList}</p>
                                } */}

                            </Grid>

                          </Grid>
                        </Box>



                        <Grid container spacing={4} display="flex" alignItems="center">
                          <Grid item xs={12} >
                            {listContactMapping.map((item, index) =>
                            (
                              <>
                                <Box sx={{ display: 'flex', flexDirection: 'row' }} className='justify-between cursor-pointer'>
                                  <button
                                    className='chips-btn'
                                    color="primary"
                                    size="small"
                                    variant="outlined"
                                    onClick={(ev) => {
                                      handleRemoveSurvey(ev, index);
                                    }}
                                  >
                                    {item.displayName} <i className='fa fa-times-circle'></i>
                                  </button>
                                  {/* {item.isCollapse ?
                                    <ExpandLessIcon className='cursor-pointer' style={{ color: '#212121' }} />
                                    : <ExpandMoreIcon className='cursor-pointer' style={{ color: '#212121' }} />
                                  } */}
                                </Box><br />
                                <Box sx={{ height: 300, width: '100%', paddingBottom: '10px' }}>
                                  <DataGridPro
                                    rows={item.colList}
                                    columns={(item.hs_object == "contact" ? colListHubspotContact : colListHubspot)}
                                    pageSizeOptions={[5, 10, 50, 100]}
                                    checkboxSelection={true}
                                    isRowSelectable={(params) => (params.row.used == "False" ? false : true)}
                                    disableSelectionOnClick
                                    getRowHeight={() => 'auto'}
                                    rowSelectionModel={item.selectedRow}
                                    // onRowSelectionModelChange={(e) => {
                                    //   let newList1 = [...listContactMapping]
                                    //   newList1[index].selectedRow = e;
                                    //   setlistContactMapping(newList1);
                                    //   // item.selectedRow = e;
                                    // }}

                                    pagination={false}
                                    hideFooterRowCount={true}
                                    hideFooter={true}
                                    editable
                                  />
                                </Box>
                              </>

                            )

                            )}
                          </Grid>
                        </Grid>
                      </Box>
                    </Box>
                  </Box>
                )
                }
              </React.Fragment>

            </Box>

          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'row' }} className='panel-footer'>
            <Grid container item>
              <Grid item xs={12}>
                <Button variant='outlined' size="small" style={{ float: 'left' }} onClick={isModalClose}>Cancel</Button>
                {!isModalClose ? <>
                  <Button variant='contained' size="small" style={{ float: 'right' }} disabled={listContactMapping.length == 0} onClick={isModalCloseHubspot1}>OK</Button> {showLoder && <CircularProgress style={{ float: 'right', marginRight: 15 }} />}
                </>
                  : <Button variant='contained' size="small" style={{ float: 'right' }} disabled={!isCheckConfrmHubspot} onClick={(e) => handleNext('twitter')}>Next Step</Button>
                }
              </Grid>
            </Grid>
          </Box>

        </Box>
      </Modal>
      }

      {openFeshdesk && <Modal
        open={openFeshdesk}
        onClose={isModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {/* // Connect Typeform */}
        <Box sx={style} style={{ width: !isOpenPopupHubspot ? '35%' : '65%' }} className='panel'>
          <Box sx={{ display: 'flex', flexDirection: 'row', pb: 2 }} className='flex panel-header' >
            <Typography id="modal-modal-title" variant="h4" component="h4" className='flex'>
              {!isOpenPopupHubspot ? "Connect Feshdesk" : "Contact Details"}
            </Typography>
            <Typography id="modal-modal-title" variant="p" component="p" className='panel-close-icon'>
              <CloseIcon onClick={isModalClose} className='cursor-pointer' style={{ color: '#212121' }} />
            </Typography>
          </Box>

          <Box className='panel-body'>
            <Box width={'100%'}>
              <React.Fragment>
                {true ? (
                  <Box>

                    <Box sx={{ display: 'flex', flexDirection: 'row' }} className='panel-box-bg'>
                      <Grid item xs={12} className='flex justify-center items-center'>
                        <Typography variant="span" component="span" gutterBottom>
                          <div className="flex justify-center items-center grayscale-image">
                            <span className="flex items-center my-4 justify-center">
                              <img src={"/images/partners/feshdesk-sm.svg"} className="w-44 mx-auto img-box" style={{ marginRight: '15px' }} alt="zendeskicons" /> <img
                                className="text-center mx-auto" style={{ marginRight: '15px' }}
                                src={"/images/right-arrow.png"} alt='arrow-left'
                              />  <img
                                className="w-44 mx-auto img-box"
                                src={"/images/convertmlLogo.png"} alt='convertML'
                              />
                            </span>
                          </div>
                        </Typography>
                      </Grid>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                      <Grid item mt={1} mb={1}>
                        <Typography variant="span" component="span" gutterBottom color="text.secondary">ConvertML is requesting access to your Feshdesk account</Typography>
                      </Grid>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                      <Grid item>
                        <FormGroup>
                          <FormControlLabel required control={<Checkbox onChange={checkConfrmHubspot} />} label="I agree to continue connecting" />
                        </FormGroup>
                      </Grid>
                    </Box>
                  </Box>
                ) : (
                  <Box>
                    <Box container>
                      <Box style={{ maxHeight: '60vh', overflowX: 'hidden', overflowY: 'auto', padding: '0 10px 0 0' }}>


                        <Box sx={{ display: 'flex', flexDirection: 'row', py: 2 }}>
                          <Grid container item spacing={2} xs={12} style={{
                            width: '100%'
                          }}>
                            <Grid item xs={12} spacing={2}>
                              <Stack sx={{ width: '100%' }}>

                                {/* <TextField fullWidth onClick={(ev) => { ev.stopPropagation(); setisShowHubspotObject(!isShowHubspotObject) }} id="standard-search" label="Select Object" value={selectedDefaultHubspotModule.displayName} />
                                  `<List className='custom-list' style={{ marginTop: '-23px' }} component="nav" aria-labelledby="nested-list-subheader">
                                    {!isShowHubspotObject == true ? "" :
                                      hubspotModule1.map((item, i) => (
                                        <>
                                          <ListItemButton style={{ background: '#F7F7F7' }} onClick={(ev) => { ev.stopPropagation(); handleClick11(i) }}>
                                            {item.isopen ? <ExpandLess /> : <ExpandMore />}
                                            <ListItemText primary={item.displayName} />
                                          </ListItemButton>
                                          <Box style={{ maxHeight: 150, overflowY: 'scroll' }}>
                                            {item.children.map((childItem, i) => (
                                              <Collapse in={item.isopen} timeout="auto" unmountOnExit>
                                                <List component="div" disablePadding>
                                                  <ListItemButton sx={{ pl: 4 }} onClick={() => { handleClick12(childItem.name, childItem.displayName) }}>
                                                    <ListItemText primary={childItem.displayName} />
                                                  </ListItemButton>
                                                </List>
                                              </Collapse>
                                            ))}
                                          </Box>
                                        </>
                                      ))}
                                  </List> `   
                                  {
                                    displayNotification == true && selectedDefaultHubspotModule.displayName != "" ? <FormHelperText style={{ margin: '0px' }}>No data is available</FormHelperText> : ''
                                  } */}

                                <Autocomplete
                                  id="tags-filled"

                                  // value={selectedDefaultHubspotModule}
                                  onChange={(ev, val) => { handleClick12(ev, val) }}
                                  getOptionLabel={(option) => option.displayName}
                                  options={hubspotModule}
                                  // groupBy={(option) => option.type}
                                  value={selectedDefaultHubspotModule}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      label="Select Object"
                                      placeholder="Select Object"
                                    />
                                  )}
                                />
                                <br />
                              </Stack>

                              {isFetchedFeedbackList == true &&
                                <Box className='text-center'>
                                  <div><CircularProgress />  </div><br />
                                  <div className='ml-3'>
                                    <p>Syncing data from your Hubspot account, thank you for your patience...</p> </div>
                                </Box>


                              }


                              {
                                isFetchedFeedbackList == false && displayNotification == false && <Stack sx={{ width: '100%', }}>
                                  <Autocomplete
                                    id="tags-filled"

                                    onChange={(ev, val) => { selectFeedbackSurvey(ev, val) }}
                                    getOptionLabel={(option) => option.displayName}
                                    options={contactList}
                                    value={selectedFeedbackSurvey}


                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label="Select List"
                                        placeholder="Select List"
                                      />
                                    )}
                                  />
                                  {/* <FormHelperText style={{ margin: '0px' }}>You can select several forms</FormHelperText> */}
                                </Stack>
                              }
                              {
                                isFetchedFeedbackList == false && displayNotificationFeedback == false && <Stack sx={{ width: '100%', }}>

                                  <Autocomplete
                                    id="tags-filled"
                                    onChange={(ev, val) => { selectFeedbackSurvey(ev, val) }}
                                    getOptionLabel={(option) => option.displayName}
                                    options={listOfFeedbackSurvey}
                                    value={selectedFeedbackSurvey}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label="Select Survey"
                                        placeholder="Select Survey"
                                      />
                                    )}
                                  />


                                  {/* <FormHelperText style={{ margin: '0px' }}>{checkDuplicateSurveyList}</FormHelperText> */}
                                </Stack>
                              }

                              {
                                errorListDisplay.map(
                                  (itemMessage, i) => (
                                    <section style={{ height: (itemMessage.isCollapsable == true ? '50px' : 'auto') }}
                                      className={`message-box mt-2 ${itemMessage.alertType}`}
                                    >
                                      <span>{itemMessage.short_text}</span>
                                      <a
                                        onClick={(val, ind) => {

                                          collapseAndExpandError(val, i)
                                        }
                                        }
                                      >
                                        <i
                                          className={
                                            !itemMessage.isCollapsable
                                              ? "fa fa-angle-up"
                                              : "fa fa-angle-down"
                                          }
                                        ></i>
                                      </a>
                                      {!itemMessage.isCollapsable ? (
                                        <>
                                          <ul>
                                            {
                                              itemMessage.message.map((mssgList, ii) => (
                                                <li>{mssgList} </li>
                                              ))
                                            }
                                          </ul>
                                        </>
                                      ) : (
                                        <> </>
                                      )}

                                    </section>
                                  ))
                              }


                              {/* {
                                  checkDuplicateSurveyList != "" &&
                                  <p className="error-text">{checkDuplicateSurveyList}</p>
                                } */}

                            </Grid>

                          </Grid>
                        </Box>



                        <Grid container spacing={4} display="flex" alignItems="center">
                          <Grid item xs={12} >
                            {listContactMapping.map((item, index) =>
                            (
                              <>
                                <Box sx={{ display: 'flex', flexDirection: 'row' }} className='justify-between cursor-pointer'>
                                  <button
                                    className='chips-btn'
                                    color="primary"
                                    size="small"
                                    variant="outlined"
                                    onClick={(ev) => {
                                      handleRemoveSurvey(ev, index);
                                    }}
                                  >
                                    {item.displayName} <i className='fa fa-times-circle'></i>
                                  </button>
                                  {/* {item.isCollapse ?
                                    <ExpandLessIcon className='cursor-pointer' style={{ color: '#212121' }} />
                                    : <ExpandMoreIcon className='cursor-pointer' style={{ color: '#212121' }} />
                                  } */}
                                </Box><br />
                                <Box sx={{ height: 300, width: '100%', paddingBottom: '10px' }}>
                                  <DataGridPro
                                    rows={item.colList}
                                    columns={(item.hs_object == "contact" ? colListHubspotContact : colListHubspot)}
                                    pageSizeOptions={[5, 10, 50, 100]}
                                    checkboxSelection={true}
                                    isRowSelectable={(params) => (params.row.used == "False" ? false : true)}
                                    disableSelectionOnClick
                                    getRowHeight={() => 'auto'}
                                    rowSelectionModel={item.selectedRow}
                                    // onRowSelectionModelChange={(e) => {
                                    //   let newList1 = [...listContactMapping]
                                    //   newList1[index].selectedRow = e;
                                    //   setlistContactMapping(newList1);
                                    //   // item.selectedRow = e;
                                    // }}

                                    pagination={false}
                                    hideFooterRowCount={true}
                                    hideFooter={true}
                                    editable
                                  />
                                </Box>
                              </>

                            )

                            )}
                          </Grid>
                        </Grid>
                      </Box>
                    </Box>
                  </Box>
                )
                }
              </React.Fragment>

            </Box>

          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'row' }} className='panel-footer'>
            <Grid container item>
              <Grid item xs={12}>
                <Button variant='outlined' size="small" style={{ float: 'left' }} onClick={isModalClose}>Cancel</Button>
                {!isModalClose ? <>
                  <Button variant='contained' size="small" style={{ float: 'right' }} disabled={listContactMapping.length == 0} onClick={isModalCloseHubspot1}>OK</Button> {showLoder && <CircularProgress style={{ float: 'right', marginRight: 15 }} />}
                </>
                  : <Button variant='contained' size="small" style={{ float: 'right' }} disabled={!isCheckConfrmHubspot} onClick={(e) => handleNext('feshdesk')}>Next Step</Button>
                }
              </Grid>
            </Grid>
          </Box>

        </Box>
      </Modal>
      }

      {openSalesforce && <Modal
        open={openSalesforce}
        onClose={isModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {/* // Connect Typeform */}
        <Box sx={style} style={{ width: !isOpenPopupHubspot ? '35%' : '65%' }} className='panel'>
          <Box sx={{ display: 'flex', flexDirection: 'row', pb: 2 }} className='flex panel-header' >
            <Typography id="modal-modal-title" variant="h4" component="h4" className='flex'>
              {!isOpenPopupHubspot ? "Connect Salesforce" : "Contact Details"}
            </Typography>
            <Typography id="modal-modal-title" variant="p" component="p" className='panel-close-icon'>
              <CloseIcon onClick={isModalClose} className='cursor-pointer' style={{ color: '#212121' }} />
            </Typography>
          </Box>

          <Box className='panel-body'>
            <Box width={'100%'}>
              <React.Fragment>
                {true ? (
                  <Box>

                    <Box sx={{ display: 'flex', flexDirection: 'row' }} className='panel-box-bg'>
                      <Grid item xs={12} className='flex justify-center items-center'>
                        <Typography variant="span" component="span" gutterBottom>
                          <div className="flex justify-center items-center grayscale-image">
                            <span className="flex items-center my-4 justify-center">
                              <img src={"/images/partners/salesforce-sm.svg"} className="w-44 mx-auto img-box" style={{ marginRight: '15px' }} alt="zendeskicons" /> <img
                                className="text-center mx-auto" style={{ marginRight: '15px' }}
                                src={"/images/right-arrow.png"} alt='arrow-left'
                              />  <img
                                className="w-44 mx-auto img-box"
                                src={"/images/convertmlLogo.png"} alt='convertML'
                              />
                            </span>
                          </div>
                        </Typography>
                      </Grid>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                      <Grid item mt={1} mb={1}>
                        <Typography variant="span" component="span" gutterBottom color="text.secondary">ConvertML is requesting access to your Salesforce account</Typography>
                      </Grid>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                      <Grid item>
                        <FormGroup>
                          <FormControlLabel required control={<Checkbox onChange={checkConfrmHubspot} />} label="I agree to continue connecting" />
                        </FormGroup>
                      </Grid>
                    </Box>
                  </Box>
                ) : (
                  <Box>
                    <Box container>
                      <Box style={{ maxHeight: '60vh', overflowX: 'hidden', overflowY: 'auto', padding: '0 10px 0 0' }}>


                        <Box sx={{ display: 'flex', flexDirection: 'row', py: 2 }}>
                          <Grid container item spacing={2} xs={12} style={{
                            width: '100%'
                          }}>
                            <Grid item xs={12} spacing={2}>
                              <Stack sx={{ width: '100%' }}>

                                {/* <TextField fullWidth onClick={(ev) => { ev.stopPropagation(); setisShowHubspotObject(!isShowHubspotObject) }} id="standard-search" label="Select Object" value={selectedDefaultHubspotModule.displayName} />
                                  `<List className='custom-list' style={{ marginTop: '-23px' }} component="nav" aria-labelledby="nested-list-subheader">
                                    {!isShowHubspotObject == true ? "" :
                                      hubspotModule1.map((item, i) => (
                                        <>
                                          <ListItemButton style={{ background: '#F7F7F7' }} onClick={(ev) => { ev.stopPropagation(); handleClick11(i) }}>
                                            {item.isopen ? <ExpandLess /> : <ExpandMore />}
                                            <ListItemText primary={item.displayName} />
                                          </ListItemButton>
                                          <Box style={{ maxHeight: 150, overflowY: 'scroll' }}>
                                            {item.children.map((childItem, i) => (
                                              <Collapse in={item.isopen} timeout="auto" unmountOnExit>
                                                <List component="div" disablePadding>
                                                  <ListItemButton sx={{ pl: 4 }} onClick={() => { handleClick12(childItem.name, childItem.displayName) }}>
                                                    <ListItemText primary={childItem.displayName} />
                                                  </ListItemButton>
                                                </List>
                                              </Collapse>
                                            ))}
                                          </Box>
                                        </>
                                      ))}
                                  </List> `   
                                  {
                                    displayNotification == true && selectedDefaultHubspotModule.displayName != "" ? <FormHelperText style={{ margin: '0px' }}>No data is available</FormHelperText> : ''
                                  } */}

                                <Autocomplete
                                  id="tags-filled"

                                  // value={selectedDefaultHubspotModule}
                                  onChange={(ev, val) => { handleClick12(ev, val) }}
                                  getOptionLabel={(option) => option.displayName}
                                  options={hubspotModule}
                                  // groupBy={(option) => option.type}
                                  value={selectedDefaultHubspotModule}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      label="Select Object"
                                      placeholder="Select Object"
                                    />
                                  )}
                                />
                                <br />
                              </Stack>

                              {isFetchedFeedbackList == true &&
                                <Box className='text-center'>
                                  <div><CircularProgress />  </div><br />
                                  <div className='ml-3'>
                                    <p>Syncing data from your Hubspot account, thank you for your patience...</p> </div>
                                </Box>


                              }


                              {
                                isFetchedFeedbackList == false && displayNotification == false && <Stack sx={{ width: '100%', }}>
                                  <Autocomplete
                                    id="tags-filled"

                                    onChange={(ev, val) => { selectFeedbackSurvey(ev, val) }}
                                    getOptionLabel={(option) => option.displayName}
                                    options={contactList}
                                    value={selectedFeedbackSurvey}


                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label="Select List"
                                        placeholder="Select List"
                                      />
                                    )}
                                  />
                                  {/* <FormHelperText style={{ margin: '0px' }}>You can select several forms</FormHelperText> */}
                                </Stack>
                              }
                              {
                                isFetchedFeedbackList == false && displayNotificationFeedback == false && <Stack sx={{ width: '100%', }}>

                                  <Autocomplete
                                    id="tags-filled"
                                    onChange={(ev, val) => { selectFeedbackSurvey(ev, val) }}
                                    getOptionLabel={(option) => option.displayName}
                                    options={listOfFeedbackSurvey}
                                    value={selectedFeedbackSurvey}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label="Select Survey"
                                        placeholder="Select Survey"
                                      />
                                    )}
                                  />


                                  {/* <FormHelperText style={{ margin: '0px' }}>{checkDuplicateSurveyList}</FormHelperText> */}
                                </Stack>
                              }

                              {
                                errorListDisplay.map(
                                  (itemMessage, i) => (
                                    <section style={{ height: (itemMessage.isCollapsable == true ? '50px' : 'auto') }}
                                      className={`message-box mt-2 ${itemMessage.alertType}`}
                                    >
                                      <span>{itemMessage.short_text}</span>
                                      <a
                                        onClick={(val, ind) => {

                                          collapseAndExpandError(val, i)
                                        }
                                        }
                                      >
                                        <i
                                          className={
                                            !itemMessage.isCollapsable
                                              ? "fa fa-angle-up"
                                              : "fa fa-angle-down"
                                          }
                                        ></i>
                                      </a>
                                      {!itemMessage.isCollapsable ? (
                                        <>
                                          <ul>
                                            {
                                              itemMessage.message.map((mssgList, ii) => (
                                                <li>{mssgList} </li>
                                              ))
                                            }
                                          </ul>
                                        </>
                                      ) : (
                                        <> </>
                                      )}

                                    </section>
                                  ))
                              }


                              {/* {
                                  checkDuplicateSurveyList != "" &&
                                  <p className="error-text">{checkDuplicateSurveyList}</p>
                                } */}

                            </Grid>

                          </Grid>
                        </Box>



                        <Grid container spacing={4} display="flex" alignItems="center">
                          <Grid item xs={12} >
                            {listContactMapping.map((item, index) =>
                            (
                              <>
                                <Box sx={{ display: 'flex', flexDirection: 'row' }} className='justify-between cursor-pointer'>
                                  <button
                                    className='chips-btn'
                                    color="primary"
                                    size="small"
                                    variant="outlined"
                                    onClick={(ev) => {
                                      handleRemoveSurvey(ev, index);
                                    }}
                                  >
                                    {item.displayName} <i className='fa fa-times-circle'></i>
                                  </button>
                                  {/* {item.isCollapse ?
                                    <ExpandLessIcon className='cursor-pointer' style={{ color: '#212121' }} />
                                    : <ExpandMoreIcon className='cursor-pointer' style={{ color: '#212121' }} />
                                  } */}
                                </Box><br />
                                <Box sx={{ height: 300, width: '100%', paddingBottom: '10px' }}>
                                  <DataGridPro
                                    rows={item.colList}
                                    columns={(item.hs_object == "contact" ? colListHubspotContact : colListHubspot)}
                                    pageSizeOptions={[5, 10, 50, 100]}
                                    checkboxSelection={true}
                                    isRowSelectable={(params) => (params.row.used == "False" ? false : true)}
                                    disableSelectionOnClick
                                    getRowHeight={() => 'auto'}
                                    rowSelectionModel={item.selectedRow}
                                    // onRowSelectionModelChange={(e) => {
                                    //   let newList1 = [...listContactMapping]
                                    //   newList1[index].selectedRow = e;
                                    //   setlistContactMapping(newList1);
                                    //   // item.selectedRow = e;
                                    // }}

                                    pagination={false}
                                    hideFooterRowCount={true}
                                    hideFooter={true}
                                    editable
                                  />
                                </Box>
                              </>

                            )

                            )}
                          </Grid>
                        </Grid>
                      </Box>
                    </Box>
                  </Box>
                )
                }
              </React.Fragment>

            </Box>

          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'row' }} className='panel-footer'>
            <Grid container item>
              <Grid item xs={12}>
                <Button variant='outlined' size="small" style={{ float: 'left' }} onClick={isModalClose}>Cancel</Button>
                {!isModalClose ? <>
                  <Button variant='contained' size="small" style={{ float: 'right' }} disabled={listContactMapping.length == 0} onClick={isModalCloseHubspot1}>OK</Button> {showLoder && <CircularProgress style={{ float: 'right', marginRight: 15 }} />}
                </>
                  : <Button variant='contained' size="small" style={{ float: 'right' }} disabled={!isCheckConfrmHubspot} onClick={(e) => handleNext('salesforce')}>Next Step</Button>
                }
              </Grid>
            </Grid>
          </Box>

        </Box>
      </Modal>
      }

{openbraze && <Modal
        open={openbraze}
        onClose={isModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {/* // Connect Typeform */}
        <Box sx={style} style={{ width: !isOpenPopupHubspot ? '35%' : '65%' }} className='panel'>
          <Box sx={{ display: 'flex', flexDirection: 'row', pb: 2 }} className='flex panel-header' >
            <Typography id="modal-modal-title" variant="h4" component="h4" className='flex'>
              {!isOpenPopupHubspot ? "Connect braze" : "Contact Details"}
            </Typography>
            <Typography id="modal-modal-title" variant="p" component="p" className='panel-close-icon'>
              <CloseIcon onClick={isModalClose} className='cursor-pointer' style={{ color: '#212121' }} />
            </Typography>
          </Box>

          <Box className='panel-body'>
            <Box width={'100%'}>
              <React.Fragment>
                {true ? (
                  <Box>

                    <Box sx={{ display: 'flex', flexDirection: 'row' }} className='panel-box-bg'>
                      <Grid item xs={12} className='flex justify-center items-center'>
                        <Typography variant="span" component="span" gutterBottom>
                          <div className="flex justify-center items-center grayscale-image">
                            <span className="flex items-center my-4 justify-center">
                              <img src={"/images/partners/braze-sm.svg"} className="w-44 mx-auto img-box" style={{ marginRight: '15px' }} alt="zendeskicons" /> <img
                                className="text-center mx-auto" style={{ marginRight: '15px' }}
                                src={"/images/right-arrow.png"} alt='arrow-left'
                              />  <img
                                className="w-44 mx-auto img-box"
                                src={"/images/convertmlLogo.png"} alt='convertML'
                              />
                            </span>
                          </div>
                        </Typography>
                      </Grid>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                      <Grid item mt={1} mb={1}>
                        <Typography variant="span" component="span" gutterBottom color="text.secondary">ConvertML is requesting access to your Salesforce account</Typography>
                      </Grid>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                      <Grid item>
                        <FormGroup>
                          <FormControlLabel required control={<Checkbox onChange={checkConfrmHubspot}  />} label="I agree to continue connecting" />
                        </FormGroup>
                      </Grid>
                    </Box>
                  </Box>
                ) : (
                  <Box>
                    <Box container>
                      <Box style={{ maxHeight: '60vh', overflowX: 'hidden', overflowY: 'auto', padding: '0 10px 0 0' }}>


                        <Box sx={{ display: 'flex', flexDirection: 'row', py: 2 }}>
                          <Grid container item spacing={2} xs={12} style={{
                            width: '100%'
                          }}>
                            <Grid item xs={12} spacing={2}>
                              <Stack sx={{ width: '100%' }}> 

                                <Autocomplete
                                  id="tags-filled"

                                  // value={selectedDefaultHubspotModule}
                                  onChange={(ev, val) => { handleClick12(ev, val) }}
                                  getOptionLabel={(option) => option.displayName}
                                  options={hubspotModule}
                                  // groupBy={(option) => option.type}
                                  value={selectedDefaultHubspotModule}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      label="Select Object"
                                      placeholder="Select Object"
                                    />
                                  )}
                                />
                                <br />
                              </Stack>

                              {isFetchedFeedbackList == true &&
                                <Box className='text-center'>
                                  <div><CircularProgress />  </div><br />
                                  <div className='ml-3'>
                                    <p>Syncing data from your Hubspot account, thank you for your patience...</p> </div>
                                </Box>


                              }


                              {
                                isFetchedFeedbackList == false && displayNotification == false && <Stack sx={{ width: '100%', }}>
                                  <Autocomplete
                                    id="tags-filled"

                                    onChange={(ev, val) => { selectFeedbackSurvey(ev, val) }}
                                    getOptionLabel={(option) => option.displayName}
                                    options={contactList}
                                    value={selectedFeedbackSurvey}


                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label="Select List"
                                        placeholder="Select List"
                                      />
                                    )}
                                  />
                                  {/* <FormHelperText style={{ margin: '0px' }}>You can select several forms</FormHelperText> */}
                                </Stack>
                              }
                              {
                                isFetchedFeedbackList == false && displayNotificationFeedback == false && <Stack sx={{ width: '100%', }}>

                                  <Autocomplete
                                    id="tags-filled"
                                    onChange={(ev, val) => { selectFeedbackSurvey(ev, val) }}
                                    getOptionLabel={(option) => option.displayName}
                                    options={listOfFeedbackSurvey}
                                    value={selectedFeedbackSurvey}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label="Select Survey"
                                        placeholder="Select Survey"
                                      />
                                    )}
                                  />


                                  {/* <FormHelperText style={{ margin: '0px' }}>{checkDuplicateSurveyList}</FormHelperText> */}
                                </Stack>
                              }

                              {
                                errorListDisplay.map(
                                  (itemMessage, i) => (
                                    <section style={{ height: (itemMessage.isCollapsable == true ? '50px' : 'auto') }}
                                      className={`message-box mt-2 ${itemMessage.alertType}`}
                                    >
                                      <span>{itemMessage.short_text}</span>
                                      <a
                                        onClick={(val, ind) => {

                                          collapseAndExpandError(val, i)
                                        }
                                        }
                                      >
                                        <i
                                          className={
                                            !itemMessage.isCollapsable
                                              ? "fa fa-angle-up"
                                              : "fa fa-angle-down"
                                          }
                                        ></i>
                                      </a>
                                      {!itemMessage.isCollapsable ? (
                                        <>
                                          <ul>
                                            {
                                              itemMessage.message.map((mssgList, ii) => (
                                                <li>{mssgList} </li>
                                              ))
                                            }
                                          </ul>
                                        </>
                                      ) : (
                                        <> </>
                                      )}

                                    </section>
                                  ))
                              }


                              {/* {
                                  checkDuplicateSurveyList != "" &&
                                  <p className="error-text">{checkDuplicateSurveyList}</p>
                                } */}

                            </Grid>

                          </Grid>
                        </Box>



                        <Grid container spacing={4} display="flex" alignItems="center">
                          <Grid item xs={12} >
                            {listContactMapping.map((item, index) =>
                            (
                              <>
                                <Box sx={{ display: 'flex', flexDirection: 'row' }} className='justify-between cursor-pointer'>
                                  <button
                                    className='chips-btn'
                                    color="primary"
                                    size="small"
                                    variant="outlined"
                                    onClick={(ev) => {
                                      handleRemoveSurvey(ev, index);
                                    }}
                                  >
                                    {item.displayName} <i className='fa fa-times-circle'></i>
                                  </button>
                                  {/* {item.isCollapse ?
                                    <ExpandLessIcon className='cursor-pointer' style={{ color: '#212121' }} />
                                    : <ExpandMoreIcon className='cursor-pointer' style={{ color: '#212121' }} />
                                  } */}
                                </Box><br />
                                <Box sx={{ height: 300, width: '100%', paddingBottom: '10px' }}>
                                  <DataGridPro
                                    rows={item.colList}
                                    columns={(item.hs_object == "contact" ? colListHubspotContact : colListHubspot)}
                                    pageSizeOptions={[5, 10, 50, 100]}
                                    checkboxSelection={true}
                                    isRowSelectable={(params) => (params.row.used == "False" ? false : true)}
                                    disableSelectionOnClick
                                    getRowHeight={() => 'auto'}
                                    rowSelectionModel={item.selectedRow}
                                    // onRowSelectionModelChange={(e) => {
                                    //   let newList1 = [...listContactMapping]
                                    //   newList1[index].selectedRow = e;
                                    //   setlistContactMapping(newList1);
                                    //   // item.selectedRow = e;
                                    // }}

                                    pagination={false}
                                    hideFooterRowCount={true}
                                    hideFooter={true}
                                    editable
                                  />
                                </Box>
                              </>

                            )

                            )}
                          </Grid>
                        </Grid>
                      </Box>
                    </Box>
                  </Box>
                )
                }
              </React.Fragment>

            </Box>

          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'row' }} className='panel-footer'>
            <Grid container item>
              <Grid item xs={12}>
                <Button variant='outlined' size="small" style={{ float: 'left' }} onClick={isModalClose}>Cancel</Button>
                {!isModalClose ? <>
                  <Button variant='contained' size="small" style={{ float: 'right' }} disabled={listContactMapping.length == 0} onClick={isModalCloseHubspot1}>OK</Button> {showLoder && <CircularProgress style={{ float: 'right', marginRight: 15 }} />}
                </>
                  : <Button variant='contained' size="small" style={{ float: 'right' }} disabled={!isCheckConfrmHubspot} onClick={(e) => handleNext('braze')}>Next Step</Button>
                }
              </Grid>
            </Grid>
          </Box>

        </Box>
      </Modal>
      }

      {openInstagram && <Modal
        open={openInstagram}
        onClose={isModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {/* // Connect Typeform */}
        <Box sx={style} style={{ width: !isOpenPopupHubspot ? '35%' : '65%' }} className='panel'>
          <Box sx={{ display: 'flex', flexDirection: 'row', pb: 2 }} className='flex panel-header' >
            <Typography id="modal-modal-title" variant="h4" component="h4" className='flex'>
              {!isOpenPopupHubspot ? "Connect Instagram" : "Contact Details"}
            </Typography>
            <Typography id="modal-modal-title" variant="p" component="p" className='panel-close-icon'>
              <CloseIcon onClick={isModalClose} className='cursor-pointer' style={{ color: '#212121' }} />
            </Typography>
          </Box>

          <Box className='panel-body'>
            <Box width={'100%'}>
              <React.Fragment>
                {true ? (
                  <Box>

                    <Box sx={{ display: 'flex', flexDirection: 'row' }} className='panel-box-bg'>
                      <Grid item xs={12} className='flex justify-center items-center'>
                        <Typography variant="span" component="span" gutterBottom>
                          <div className="flex justify-center items-center grayscale-image">
                            <span className="flex items-center my-4 justify-center">
                              <img src={"/images/partners/instagram-sm.svg"} className="w-44 mx-auto img-box" style={{ marginRight: '15px' }} alt="zendeskicons" /> <img
                                className="text-center mx-auto" style={{ marginRight: '15px' }}
                                src={"/images/right-arrow.png"} alt='arrow-left'
                              />  <img
                                className="w-44 mx-auto img-box"
                                src={"/images/convertmlLogo.png"} alt='convertML'
                              />
                            </span>
                          </div>
                        </Typography>
                      </Grid>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                      <Grid item mt={1} mb={1}>
                        <Typography variant="span" component="span" gutterBottom color="text.secondary">ConvertML is requesting access to your Instagram account</Typography>
                      </Grid>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                      <Grid item>
                        <FormGroup>
                          <FormControlLabel required control={<Checkbox onChange={checkConfrmHubspot} />} label="I agree to continue connecting" />
                        </FormGroup>
                      </Grid>
                    </Box>
                  </Box>
                ) : (
                  <Box>
                    <Box container>
                      <Box style={{ maxHeight: '60vh', overflowX: 'hidden', overflowY: 'auto', padding: '0 10px 0 0' }}>


                        <Box sx={{ display: 'flex', flexDirection: 'row', py: 2 }}>
                          <Grid container item spacing={2} xs={12} style={{
                            width: '100%'
                          }}>
                            <Grid item xs={12} spacing={2}>
                              <Stack sx={{ width: '100%' }}>

                                {/* <TextField fullWidth onClick={(ev) => { ev.stopPropagation(); setisShowHubspotObject(!isShowHubspotObject) }} id="standard-search" label="Select Object" value={selectedDefaultHubspotModule.displayName} />
                                  `<List className='custom-list' style={{ marginTop: '-23px' }} component="nav" aria-labelledby="nested-list-subheader">
                                    {!isShowHubspotObject == true ? "" :
                                      hubspotModule1.map((item, i) => (
                                        <>
                                          <ListItemButton style={{ background: '#F7F7F7' }} onClick={(ev) => { ev.stopPropagation(); handleClick11(i) }}>
                                            {item.isopen ? <ExpandLess /> : <ExpandMore />}
                                            <ListItemText primary={item.displayName} />
                                          </ListItemButton>
                                          <Box style={{ maxHeight: 150, overflowY: 'scroll' }}>
                                            {item.children.map((childItem, i) => (
                                              <Collapse in={item.isopen} timeout="auto" unmountOnExit>
                                                <List component="div" disablePadding>
                                                  <ListItemButton sx={{ pl: 4 }} onClick={() => { handleClick12(childItem.name, childItem.displayName) }}>
                                                    <ListItemText primary={childItem.displayName} />
                                                  </ListItemButton>
                                                </List>
                                              </Collapse>
                                            ))}
                                          </Box>
                                        </>
                                      ))}
                                  </List> `   
                                  {
                                    displayNotification == true && selectedDefaultHubspotModule.displayName != "" ? <FormHelperText style={{ margin: '0px' }}>No data is available</FormHelperText> : ''
                                  } */}

                                <Autocomplete
                                  id="tags-filled"

                                  // value={selectedDefaultHubspotModule}
                                  onChange={(ev, val) => { handleClick12(ev, val) }}
                                  getOptionLabel={(option) => option.displayName}
                                  options={hubspotModule}
                                  // groupBy={(option) => option.type}
                                  value={selectedDefaultHubspotModule}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      label="Select Object"
                                      placeholder="Select Object"
                                    />
                                  )}
                                />
                                <br />
                              </Stack>

                              {isFetchedFeedbackList == true &&
                                <Box className='text-center'>
                                  <div><CircularProgress />  </div><br />
                                  <div className='ml-3'>
                                    <p>Syncing data from your Hubspot account, thank you for your patience...</p> </div>
                                </Box>


                              }


                              {
                                isFetchedFeedbackList == false && displayNotification == false && <Stack sx={{ width: '100%', }}>
                                  <Autocomplete
                                    id="tags-filled"

                                    onChange={(ev, val) => { selectFeedbackSurvey(ev, val) }}
                                    getOptionLabel={(option) => option.displayName}
                                    options={contactList}
                                    value={selectedFeedbackSurvey}


                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label="Select List"
                                        placeholder="Select List"
                                      />
                                    )}
                                  />
                                  {/* <FormHelperText style={{ margin: '0px' }}>You can select several forms</FormHelperText> */}
                                </Stack>
                              }
                              {
                                isFetchedFeedbackList == false && displayNotificationFeedback == false && <Stack sx={{ width: '100%', }}>

                                  <Autocomplete
                                    id="tags-filled"
                                    onChange={(ev, val) => { selectFeedbackSurvey(ev, val) }}
                                    getOptionLabel={(option) => option.displayName}
                                    options={listOfFeedbackSurvey}
                                    value={selectedFeedbackSurvey}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label="Select Survey"
                                        placeholder="Select Survey"
                                      />
                                    )}
                                  />


                                  {/* <FormHelperText style={{ margin: '0px' }}>{checkDuplicateSurveyList}</FormHelperText> */}
                                </Stack>
                              }

                              {
                                errorListDisplay.map(
                                  (itemMessage, i) => (
                                    <section style={{ height: (itemMessage.isCollapsable == true ? '50px' : 'auto') }}
                                      className={`message-box mt-2 ${itemMessage.alertType}`}
                                    >
                                      <span>{itemMessage.short_text}</span>
                                      <a
                                        onClick={(val, ind) => {

                                          collapseAndExpandError(val, i)
                                        }
                                        }
                                      >
                                        <i
                                          className={
                                            !itemMessage.isCollapsable
                                              ? "fa fa-angle-up"
                                              : "fa fa-angle-down"
                                          }
                                        ></i>
                                      </a>
                                      {!itemMessage.isCollapsable ? (
                                        <>
                                          <ul>
                                            {
                                              itemMessage.message.map((mssgList, ii) => (
                                                <li>{mssgList} </li>
                                              ))
                                            }
                                          </ul>
                                        </>
                                      ) : (
                                        <> </>
                                      )}

                                    </section>
                                  ))
                              }


                              {/* {
                                  checkDuplicateSurveyList != "" &&
                                  <p className="error-text">{checkDuplicateSurveyList}</p>
                                } */}

                            </Grid>

                          </Grid>
                        </Box>



                        <Grid container spacing={4} display="flex" alignItems="center">
                          <Grid item xs={12} >
                            {listContactMapping.map((item, index) =>
                            (
                              <>
                                <Box sx={{ display: 'flex', flexDirection: 'row' }} className='justify-between cursor-pointer'>
                                  <button
                                    className='chips-btn'
                                    color="primary"
                                    size="small"
                                    variant="outlined"
                                    onClick={(ev) => {
                                      handleRemoveSurvey(ev, index);
                                    }}
                                  >
                                    {item.displayName} <i className='fa fa-times-circle'></i>
                                  </button>
                                  {/* {item.isCollapse ?
                                    <ExpandLessIcon className='cursor-pointer' style={{ color: '#212121' }} />
                                    : <ExpandMoreIcon className='cursor-pointer' style={{ color: '#212121' }} />
                                  } */}
                                </Box><br />
                                <Box sx={{ height: 300, width: '100%', paddingBottom: '10px' }}>
                                  <DataGridPro
                                    rows={item.colList}
                                    columns={(item.hs_object == "contact" ? colListHubspotContact : colListHubspot)}
                                    pageSizeOptions={[5, 10, 50, 100]}
                                    checkboxSelection={true}
                                    isRowSelectable={(params) => (params.row.used == "False" ? false : true)}
                                    disableSelectionOnClick
                                    getRowHeight={() => 'auto'}
                                    rowSelectionModel={item.selectedRow}
                                    // onRowSelectionModelChange={(e) => {
                                    //   let newList1 = [...listContactMapping]
                                    //   newList1[index].selectedRow = e;
                                    //   setlistContactMapping(newList1);
                                    //   // item.selectedRow = e;
                                    // }}

                                    pagination={false}
                                    hideFooterRowCount={true}
                                    hideFooter={true}
                                    editable
                                  />
                                </Box>
                              </>

                            )

                            )}
                          </Grid>
                        </Grid>
                      </Box>
                    </Box>
                  </Box>
                )
                }
              </React.Fragment>

            </Box>

          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'row' }} className='panel-footer'>
            <Grid container item>
              <Grid item xs={12}>
                <Button variant='outlined' size="small" style={{ float: 'left' }} onClick={isModalClose}>Cancel</Button>
                {!isModalClose ? <>
                  <Button variant='contained' size="small" style={{ float: 'right' }} disabled={listContactMapping.length == 0} onClick={isModalCloseHubspot1}>OK</Button> {showLoder && <CircularProgress style={{ float: 'right', marginRight: 15 }} />}
                </>
                  : <Button variant='contained' size="small" style={{ float: 'right' }} disabled={!isCheckConfrmHubspot} onClick={(e) => handleNext('instagram')}>Next Step</Button>
                }
              </Grid>
            </Grid>
          </Box>

        </Box>
      </Modal>
      }
      <ToastMessage toastObject={toastObject} setToastObject={setToastObject} />

    </ >
  );
}



export default ConnectDialog;
