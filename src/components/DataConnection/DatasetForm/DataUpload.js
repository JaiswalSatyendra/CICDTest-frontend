import * as React from 'react';
// import { CloudUploadOutlined } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  styled,
  TextField,
  Tooltip,
  tooltipClasses,
  Typography,
  InputAdornment,
  CardContent,
  Card,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemButton
} from "@mui/material";
// import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useContext, useEffect, useState } from "react";
import { SessionContext } from "../../../contexts/SessionContext";
import { SnackbarProvider, useSnackbar } from "notistack";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
// import Button from '@mui/material/Button';
//import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
// import AddIcon from '@mui/icons-material/Add';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CloseIcon from '@mui/icons-material/Close';

import ConnectDialog from '../dialog/ConnectDialog';
import DatabasesDialog from '../dialog/DatabasesDialog';
import UploadDialog from '../dialog/UploadDialog';



const steps = ['Name a project & Connect data source', 'Choose a template', 'Visualise your data'];

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}



function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}


function DataUpload() {
  const { t } = useTranslation();

  const [title, setTitle] = useState("");
  const [formattedTitle, setFormattedTitle] = useState("");


  const [session, ,] = useContext(SessionContext);
  const { user } = session;
  const [open, setOpen] = React.useState(false);

  //stepper code
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  //end

  useEffect(() => {

  }, []);

  const handleOpen = (value) => {
    console.log(value);
    setOpen(true);
  };

  const handleClose = () => { setOpen(false) };
  //sass platform json

  const sassPlatform = [
    { id: 1, img: '/images/partners/typeform-sm.svg', name: 'Typeform', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', btnLink: '', active: false },
    { id: 2, img: '/images/partners/hubspot-sm.svg', name: 'Hubspot', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', btnLink: '', active: false },
    { id: 3, img: '/images/partners/salesforce.svg', name: 'Salesforce', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', btnLink: '', active: false },
    { id: 4, img: '/images/partners/sass-platform.svg', name: 'SaaS Platforms', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', btnLink: '', active: false }
  ];

  //databases json

  const databases = [
    { id: 1, img: '/images/partners/google-bigquery-sm.svg', name: 'Google BigQuery', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', btnLink: '', active: false },
    { id: 2, img: '/images/partners/couchdb-sm.svg', name: 'CouchDB', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', btnLink: '', active: false },
    { id: 3, img: '/images/partners/document-database.svg', name: 'Document Database', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', btnLink: '', active: false },
    { id: 4, img: '/images/partners/gridgain.svg', name: 'Gridgain', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', btnLink: '', active: false }
  ];

  //upload a file json

  const uploadFile = [
    { id: 1, img: '/images/partners/azure.svg', name: 'Azure', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', btnLink: '', active: false },
    { id: 2, img: '/images/partners/s3-bucket.svg', name: 'S3 Bucket', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', btnLink: '', active: false },
  ];

  //selected form data

  const selectedForm = [
    { id: 1, name: 'Typeform', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', img: '/images/partners/typeform-sm.svg' },
    { id: 2, name: 'Salesforce', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', img: '/images/partners/salesforce.svg' },
    { id: 3, name: 'Hubspot', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', img: '/images/partners/hubspot-sm.svg' }
  ];

  //step2

  const gridData = [
    {
      id: 1, name: 'Customer retention', img: '', title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', survey: {
        surveryName: [
          {
            id: 1,
            name: "Typeform Survery 1"
          },
          {
            id: 2,
            name: "Typeform Survery 2"
          }
        ],
        questionSurvery: [
          {
            id: 1,
            question: "How satisfied are you with our overall product?",
            answer: [
              'Option 1',
              'Option 2',
              'Option 3'
            ]
          },
          {
            id: 2,
            question: "Satisfaction score",
            answer: [
              'Option 1',
              'Option 2',
              'Option 3'
            ]
          },
          {
            id: 3,
            question: "How likely are you to recommended our company?",
            answer: [
              'Option 1',
              'Option 2',
              'Option 3'
            ]
          },
          {
            id: 4,
            question: "Recommendation Scale 1-10",
            answer: [
              'Option 1',
              'Option 2',
              'Option 3'
            ]
          },
          {
            id: 5,
            question: "How would you are the quality of our product",
            answer: [
              'Option 1',
              'Option 2',
              'Option 3'
            ]
          },
          {
            id: 6,
            question: "Opinion scale",
            answer: [
              'Option 1',
              'Option 2',
              'Option 3'
            ]
          }
        ],
        uploadName: [
          {
            id: 1,
            name: "Estimation.xlxs"
          }
        ],
        uploadSurvery: [
          {
            id: 1,
            question: "Improvements",
            answer: ["Option 1", "Option 2", "Option 3", "Option 4"]
          },
          {
            id: 2,
            question: "Comment",
            answer: ["Option 1", "Option 2", "Option 3", "Option 4"]
          }
        ]
      }
    },
    {
      id: 2, name: 'RFM Segmentation', img: '', title: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit.', survey: {
        surveryName: [
          {
            id: 1,
            name: "Typeform Survery 1"
          },
          {
            id: 2,
            name: "Typeform Survery 2"
          }
        ],
        questionSurvery: [
          {
            id: 1,
            question: "How satisfied are you with our overall product?",
            answer: [
              'Option 1',
              'Option 2',
              'Option 3'
            ]
          },
          {
            id: 2,
            question: "Satisfaction score",
            answer: [
              'Option 1',
              'Option 2',
              'Option 3'
            ]
          },
          {
            id: 3,
            question: "How likely are you to recommended our company?",
            answer: [
              'Option 1',
              'Option 2',
              'Option 3'
            ]
          },
          {
            id: 4,
            question: "Recommendation Scale 1-10",
            answer: [
              'Option 1',
              'Option 2',
              'Option 3'
            ]
          },
          {
            id: 5,
            question: "How would you are the quality of our product",
            answer: [
              'Option 1',
              'Option 2',
              'Option 3'
            ]
          },
          {
            id: 6,
            question: "Opinion scale",
            answer: [
              'Option 1',
              'Option 2',
              'Option 3'
            ]
          }
        ],
        uploadName: [
          {
            id: 1,
            name: "Estimation.xlxs"
          }
        ],
        uploadSurvery: [
          {
            id: 1,
            question: "Improvements",
            answer: ["Option 1", "Option 2", "Option 3", "Option 4"]
          },
          {
            id: 2,
            question: "Comment",
            answer: ["Option 1", "Option 2", "Option 3", "Option 4"]
          }
        ]
      }
    },
    {
      id: 3, name: 'Sentiment Model', img: '', title: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit.', survey: {
        surveryName: [
          {
            id: 1,
            name: "Typeform Survery 1"
          },
          {
            id: 2,
            name: "Typeform Survery 2"
          }
        ],
        questionSurvery: [
          {
            id: 1,
            question: "How satisfied are you with our overall product?",
            answer: [
              'Option 1',
              'Option 2',
              'Option 3'
            ]
          },
          {
            id: 2,
            question: "Satisfaction score",
            answer: [
              'Option 1',
              'Option 2',
              'Option 3'
            ]
          },
          {
            id: 3,
            question: "How likely are you to recommended our company?",
            answer: [
              'Option 1',
              'Option 2',
              'Option 3'
            ]
          },
          {
            id: 4,
            question: "Recommendation Scale 1-10",
            answer: [
              'Option 1',
              'Option 2',
              'Option 3'
            ]
          },
          {
            id: 5,
            question: "How would you are the quality of our product",
            answer: [
              'Option 1',
              'Option 2',
              'Option 3'
            ]
          },
          {
            id: 6,
            question: "Opinion scale",
            answer: [
              'Option 1',
              'Option 2',
              'Option 3'
            ]
          }
        ],
        uploadName: [
          {
            id: 1,
            name: "Estimation.xlxs"
          }
        ],
        uploadSurvery: [
          {
            id: 1,
            question: "Improvements",
            answer: ["Option 1", "Option 2", "Option 3", "Option 4"]
          },
          {
            id: 2,
            question: "Comment",
            answer: ["Option 1", "Option 2", "Option 3", "Option 4"]
          }
        ]
      }
    },
    {
      id: 4, name: 'General Aggregation', img: '', title: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit.', survey: {
        surveryName: [
          {
            id: 1,
            name: "Typeform Survery 1"
          },
          {
            id: 2,
            name: "Typeform Survery 2"
          }
        ],
        questionSurvery: [
          {
            id: 1,
            question: "How satisfied are you with our overall product?",
            answer: [
              'Option 1',
              'Option 2',
              'Option 3'
            ]
          },
          {
            id: 2,
            question: "Satisfaction score",
            answer: [
              'Option 1',
              'Option 2',
              'Option 3'
            ]
          },
          {
            id: 3,
            question: "How likely are you to recommended our company?",
            answer: [
              'Option 1',
              'Option 2',
              'Option 3'
            ]
          },
          {
            id: 4,
            question: "Recommendation Scale 1-10",
            answer: [
              'Option 1',
              'Option 2',
              'Option 3'
            ]
          },
          {
            id: 5,
            question: "How would you are the quality of our product",
            answer: [
              'Option 1',
              'Option 2',
              'Option 3'
            ]
          },
          {
            id: 6,
            question: "Opinion scale",
            answer: [
              'Option 1',
              'Option 2',
              'Option 3'
            ]
          }
        ],
        uploadName: [
          {
            id: 1,
            name: "Estimation.xlxs"
          }
        ],
        uploadSurvery: [
          {
            id: 1,
            question: "Improvements",
            answer: ["Option 1", "Option 2", "Option 3", "Option 4"]
          },
          {
            id: 2,
            question: "Comment",
            answer: ["Option 1", "Option 2", "Option 3", "Option 4"]
          }
        ]
      }
    },
    {
      id: 5, name: 'Satisfaction Survey Model', img: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit.', title: '', survey: {
        surveryName: [
          {
            id: 1,
            name: "Typeform Survery 1"
          },
          {
            id: 2,
            name: "Typeform Survery 2"
          }
        ],
        questionSurvery: [
          {
            id: 1,
            question: "How satisfied are you with our overall product?",
            answer: [
              'Option 1',
              'Option 2',
              'Option 3'
            ]
          },
          {
            id: 2,
            question: "Satisfaction score",
            answer: [
              'Option 1',
              'Option 2',
              'Option 3'
            ]
          },
          {
            id: 3,
            question: "How likely are you to recommended our company?",
            answer: [
              'Option 1',
              'Option 2',
              'Option 3'
            ]
          },
          {
            id: 4,
            question: "Recommendation Scale 1-10",
            answer: [
              'Option 1',
              'Option 2',
              'Option 3'
            ]
          },
          {
            id: 5,
            question: "How would you are the quality of our product",
            answer: [
              'Option 1',
              'Option 2',
              'Option 3'
            ]
          },
          {
            id: 6,
            question: "Opinion scale",
            answer: [
              'Option 1',
              'Option 2',
              'Option 3'
            ]
          }
        ],
        uploadName: [
          {
            id: 1,
            name: "Estimation.xlxs"
          }
        ],
        uploadSurvery: [
          {
            id: 1,
            question: "Improvements",
            answer: ["Option 1", "Option 2", "Option 3", "Option 4"]
          },
          {
            id: 2,
            question: "Comment",
            answer: ["Option 1", "Option 2", "Option 3", "Option 4"]
          }
        ]
      }
    },
    {
      id: 6, name: 'Model template', img: '', title: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit.', survey: {
        surveryName: [
          {
            id: 1,
            name: "Typeform Survery 1"
          },
          {
            id: 2,
            name: "Typeform Survery 2"
          }
        ],
        questionSurvery: [
          {
            id: 1,
            question: "How satisfied are you with our overall product?"
          },
          {
            id: 2,
            question: "Satisfaction score"
          },
          {
            id: 3,
            question: "How likely are you to recommended our company?"
          },
          {
            id: 4,
            question: "Recommendation Scale 1-10"
          },
          {
            id: 5,
            question: "How would you are the quality of our product"
          },
          {
            id: 6,
            question: "Opinion scale"
          }
        ],
        uploadName: [
          {
            id: 1,
            name: "Estimation.xlxs"
          }
        ],
        uploadSurvery: [
          {
            id: 1,
            question: "Improvements",
            answer: ["Option 1", "Option 2", "Option 3", "Option 4"]
          },
          {
            id: 2,
            question: "Comment",
            answer: ["Option 1", "Option 2", "Option 3", "Option 4"]
          }
        ]
      }
    }
  ];

  const TooltipWrapper = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.colors.alpha.trueWhite[100],
      color: theme.palette.getContrastText(theme.colors.alpha.trueWhite[100]),
      fontSize: theme.typography.pxToRem(12),
      fontWeight: "bold",
      borderRadius: theme.general.borderRadiusSm,
      boxShadow:
        "0 .2rem .8rem rgba(7,9,25,.18), 0 .08rem .15rem rgba(7,9,25,.15)",
    },
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.colors.alpha.trueWhite[100],
    },
  }));

  return (
    <>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        style={{ width: "100%", backgroundColor: "white", marginTop: "-36px" }}
      >

        <Box sx={{
          width: '100%', height: '100%', my: 2,
          px: 4,
        }}>
          <Grid xs={8}>
            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => {

                const stepProps: { completed?: boolean } = {};
                const labelProps: { optional?: React.ReactNode; } = {};

                if (isStepSkipped(index)) {
                  stepProps.completed = false;
                }
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
          </Grid>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', py: 2 }}>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button variant='contained' onClick={handleReset}>Reset</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {/* step1 code */}
              {activeStep + 1 === 1 && (

                <>
                  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Grid container spacing={4}>
                      <Grid item xs={12}>
                        <Grid item xs={6}>
                          <FormControl
                            sx={{
                              width: '100%'
                            }}
                          >
                            <FormLabel
                              sx={{
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <Typography
                                variant="h3"
                                sx={{ fontWeight: "bold", color: "#090F0F" }}
                              >
                                Name a project
                              </Typography>
                            </FormLabel>
                            <TextField
                              fullWidth
                              margin="normal"
                              name="title"
                              value={title}
                              onChange={(e) => {
                                setTitle(e.target.value);
                                //   change text to small case, remove special characters and replace spaces with underscores
                                setFormattedTitle(
                                  e.target.value
                                    .toLowerCase()
                                    .replace(/[^a-zA-Z0-9 ]/g, "")
                                    .replace(/ /g, "_")
                                );
                              }}
                              variant="outlined"
                              placeholder='Project name'
                            />
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Grid container spacing={4} display="flex" alignItems="center">
                      <Grid item xs={8}>
                        <Box>
                          <Typography variant="h3" sx={{ fontWeight: "bold", color: "#090F0F" }} gutterBottom>
                            Choose data source you want to integrate
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={4}>
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
                            placeholder={t("Search app name")}
                            fullWidth
                            variant="outlined"
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>


                  {/* <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Grid container spacing={4} display="flex" alignItems="center">
                      <Grid item xs={12}>
                        <Grid style={{ background: '#D0D0D0', padding: '26px', borderRadius: '4px', gap: '16px' }}>
                          <Typography variant="h4" sx={{ fontWeight: "bold", color: "#090F0F", fontSize: '22px' }} gutterBottom>
                            Typeform - choice #1
                          </Typography>
                          <Grid className='mt-3'>
                            <Typography variant="p" gutterBottom className='text-color'>
                              Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.
                            </Typography>
                          </Grid>
                          <Grid className='mt-3'>
                            <Button
                              sx={{
                                mt: { xs: 2, sm: 0 },
                              }}
                              onClick={handleOpen}
                              variant="contained"
                            >
                              Connect
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box> */}


                  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Grid container spacing={4} display="flex">
                      <Grid item xs={12} className='grayscale-image'>
                        <Box
                          sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}
                        >
                          <Grid item xs={2} md={2} xl={2}>
                            <Tabs
                              orientation="vertical"
                              variant="scrollable"
                              value={value}
                              onChange={handleChange}
                              aria-label="Vertical tabs example"
                              sx={{ borderRight: 1, borderColor: 'divider', height: '100%' }}
                            >
                              <Tab label="Sass platforms" {...a11yProps(0)} style={{ alignItems: 'flex-start' }} />
                              <Tab label="Databases" {...a11yProps(1)} style={{ alignItems: 'flex-start' }} />
                              <Tab label="Upload a file" {...a11yProps(2)} style={{ alignItems: 'flex-start' }} />
                            </Tabs>
                          </Grid>

                          <Grid item xs={10} md={10} xl={10}>
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }} className='justify-self-center self-center text-center'>
                              <Grid container spacing={4} display="flex" alignItems="center">
                                <Grid item xs={12}>
                                  <Box style={{ background: '#E7E9E9', margin: '36px 0px 36px 36px' }}>
                                    <Grid style={{ padding: '26px', borderRadius: '4px', gap: '16px' }}>
                                      <Typography variant="h2" sx={{ fontWeight: "bold", color: "#090F0F", fontSize: '22px' }} gutterBottom>
                                        Connect tools that power your business
                                      </Typography>
                                      <Grid className='mt-3'>
                                        <Typography variant="p" gutterBottom className='text-primary'>
                                          Discover new ways to save time and expand your reach with these powerful apps & integrations.
                                        </Typography>
                                      </Grid>
                                    </Grid>
                                    <Grid item xs={10} style={{ margin: '0 auto', top: '3rem', position: 'relative' }}>

                                      <Box spacing={4} display="flex" alignItems="center" gap={3}>
                                        {selectedForm.map((item, i) => (

                                          <Grid item xs={4} key={i}>
                                            <List sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }} className='box-row-gap'>
                                              <ListItem alignItems="flex-start" style={{ padding: '0' }}>
                                                <ListItemAvatar>
                                                  <Avatar alt={item.name} src={item.img} style={{ borderRadius: '0' }} />
                                                </ListItemAvatar>
                                                <ListItemText
                                                  secondary={
                                                    <React.Fragment>
                                                      <Grid>
                                                        <Typography
                                                          style={{ fontSize: '18px', color: '#090F0F' }}
                                                          variant="h6"
                                                          className="text.primary"
                                                        >
                                                          {item.name}
                                                        </Typography>
                                                      </Grid>
                                                    </React.Fragment>
                                                  }
                                                />
                                              </ListItem>
                                              <ListItemText
                                                secondary={
                                                  <React.Fragment>
                                                    <Grid className='text-left'>
                                                      <Typography
                                                        sx={{ display: 'inline' }}
                                                        variant="p"
                                                        className='text-color'
                                                      >
                                                        {item.description}
                                                      </Typography>
                                                    </Grid>
                                                  </React.Fragment>
                                                }
                                              />
                                              <ListItemButton style={{ padding: '0px' }}>
                                                <Button
                                                  sx={{
                                                    mt: { xs: 2, sm: 0 },
                                                  }}
                                                  className='w-full'
                                                  variant="contained"
                                                  onClick={(e)=>{handleOpen (item.name)}}
                                                >
                                                  Connect
                                                </Button>
                                              </ListItemButton>
                                            </List>
                                          </Grid>
                                        ))}
                                      </Box>

                                    </Grid>
                                  </Box>
                                </Grid>
                              </Grid>
                            </Box>
                            <TabPanel value={value} index={0}>
                              <Grid item xs={12} md={12}>
                                <Box>
                                  <Typography variant="h4" sx={{ fontWeight: "bold", color: "#090F0F" }} style={{ padding: '0px 10px', lineHeight: '60px', fontSize: '22px' }} gutterBottom>
                                  SaaS Platforms
                                  </Typography>
                                </Box>
                                {sassPlatform.map((item, i) => (< Grid item xs={6} md={6} style={{ float: 'left', padding: '10px' }}>
                                  <Card key={i}>
                                    <CardContent>
                                      <List sx={{ width: '100%' }} style={{ padding: '0px' }}>
                                        <ListItem alignItems="center" style={{ padding: '0px' }}>
                                          <ListItemAvatar>
                                            <Avatar alt={item.name} src={item.img} style={{ borderRadius: '0px' }} />
                                          </ListItemAvatar>
                                          <ListItemText
                                            secondary={
                                              <React.Fragment>
                                                <Grid>
                                                  <Typography
                                                    variant="h6"
                                                    style={{ fontSize: '18px', color: '#090F0F' }}
                                                  >
                                                    {item.name}
                                                  </Typography>
                                                </Grid>
                                                <Grid>
                                                  <Typography
                                                    variant="p"
                                                    className='text-color'
                                                  >
                                                    {item.content}
                                                  </Typography>
                                                </Grid>
                                              </React.Fragment>
                                            }
                                          />
                                          <ListItemButton style={{ padding: '0px' }}>
                                            <Button
                                              sx={{
                                                mt: { xs: 2, sm: 0 },
                                              }}
                                              variant="contained"
                                              onClick={(e)=>{handleOpen (item.name)}}
                                            >
                                              Connect
                                            </Button>
                                          </ListItemButton>
                                        </ListItem>
                                      </List>
                                    </CardContent>
                                  </Card>
                                </Grid>
                                ))}
                              </Grid>
                              <Grid item xs={12} md={12}>
                                <Box mt={3}>
                                  <Typography variant="h4" sx={{ fontWeight: "bold", color: "#090F0F" }} style={{ padding: '0px 10px', lineHeight: '60px', fontSize: '22px' }} gutterBottom>
                                    Databases
                                  </Typography>
                                </Box>
                                {databases.map((item, i) => (< Grid item xs={6} md={6} style={{ float: 'left', padding: '10px' }}>
                                  <Card key={i}>
                                    <CardContent>
                                      <List sx={{ width: '100%' }} style={{ padding: '0px' }}>
                                        <ListItem alignItems="center" style={{ padding: '0px' }}>
                                          <ListItemAvatar>
                                            <Avatar alt={item.name} src={item.img} style={{ borderRadius: '0px' }} />
                                          </ListItemAvatar>
                                          <ListItemText
                                            secondary={
                                              <React.Fragment>
                                                <Grid>
                                                  <Typography
                                                    variant="h4"
                                                    style={{ fontSize: '18px', color: '#090F0F' }}
                                                  >
                                                    {item.name}
                                                  </Typography>
                                                </Grid>
                                                <Grid>
                                                  <Typography
                                                    variant="p"
                                                    className='text-color'
                                                  >
                                                    {item.content}
                                                  </Typography>
                                                </Grid>
                                              </React.Fragment>
                                            }
                                          />
                                          <ListItemButton style={{ padding: '0px' }}>
                                            <Button
                                              sx={{
                                                mt: { xs: 2, sm: 0 },
                                              }}
                                              variant="contained"
                                              onClick={(e)=>{handleOpen (item.name)}}
                                            >
                                              Connect
                                            </Button>
                                          </ListItemButton>
                                        </ListItem>
                                      </List>
                                    </CardContent>
                                  </Card>
                                </Grid>
                                ))}
                              </Grid>
                              <Grid item xs={12} md={12}>
                                <Box mt={3}>
                                  <Typography variant="h4" sx={{ fontWeight: "bold", color: "#090F0F" }} style={{ padding: '0px 10px', lineHeight: '60px', fontSize: '22px' }} gutterBottom>
                                    Upload a file
                                  </Typography>
                                </Box>
                                {uploadFile.map((item, i) => (< Grid item xs={6} md={6} style={{ float: 'left', padding: '10px' }}>
                                  <Card key={i}>
                                    <CardContent>
                                      <List sx={{ width: '100%' }} style={{ padding: '0px' }}>
                                        <ListItem alignItems="center" style={{ padding: '0px' }}>
                                          <ListItemAvatar>
                                            <Avatar alt={item.name} src={item.img} style={{ borderRadius: '0px' }} />
                                          </ListItemAvatar>
                                          <ListItemText
                                            secondary={
                                              <React.Fragment>
                                                <Grid>
                                                  <Typography
                                                    variant="h4"
                                                    style={{ fontSize: '18px', color: '#090F0F' }}
                                                  >
                                                    {item.name}
                                                  </Typography>
                                                </Grid>
                                                <Grid>
                                                  <Typography
                                                    variant="p"
                                                    className='text-color'
                                                  >
                                                    {item.content}
                                                  </Typography>
                                                </Grid>
                                              </React.Fragment>
                                            }
                                          />
                                          <ListItemButton style={{ padding: '0px' }}>
                                            <Button
                                              sx={{
                                                mt: { xs: 2, sm: 0 },
                                              }}
                                              variant="contained"
                                              onClick={(e)=>{handleOpen (item.name)}}
                                            >
                                              Connect
                                            </Button>
                                          </ListItemButton>
                                        </ListItem>
                                      </List>
                                    </CardContent>
                                  </Card>
                                </Grid>
                                ))}
                              </Grid>
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                              <Grid item xs={12} md={12}>
                                <Box>
                                  <Typography variant="h4" sx={{ fontWeight: "bold", color: "#090F0F" }} style={{ padding: '0px 10px', lineHeight: '60px', fontSize: '22px' }} gutterBottom>
                                    Databases
                                  </Typography>
                                </Box>
                                {databases.map((item, i) => (< Grid item xs={6} md={6} style={{ float: 'left', padding: '10px' }}>
                                  <Card key={i}>
                                    <CardContent>
                                      <List sx={{ width: '100%' }} style={{ padding: '0px' }}>
                                        <ListItem alignItems="center" style={{ padding: '0px' }}>
                                          <ListItemAvatar>
                                            <Avatar alt={item.name} src={item.img} style={{ borderRadius: '0px' }} />
                                          </ListItemAvatar>
                                          <ListItemText
                                            secondary={
                                              <React.Fragment>
                                                <Grid>
                                                  <Typography
                                                    style={{ fontSize: '18px', color: '#090F0F' }}
                                                    variant="h4"
                                                  >
                                                    {item.name}
                                                  </Typography>
                                                </Grid>
                                                <Grid>
                                                  <Typography
                                                    className='text-color'
                                                    variant="p"
                                                  >
                                                    {item.content}
                                                  </Typography>
                                                </Grid>
                                              </React.Fragment>
                                            }
                                          />
                                          <ListItemButton style={{ padding: '0px' }}>
                                            <Button
                                              sx={{
                                                mt: { xs: 2, sm: 0 },
                                              }}
                                              variant="contained"
                                              onClick={(e)=>{handleOpen (item.name)}}
                                            >
                                              Connect
                                            </Button>
                                          </ListItemButton>
                                        </ListItem>
                                      </List>
                                    </CardContent>
                                  </Card>
                                </Grid>
                                ))}
                              </Grid>
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                              <Grid item xs={12} md={12}>
                                <Box>
                                  <Typography variant="h4" sx={{ fontWeight: "bold", color: "#090F0F" }} style={{ padding: '0px 10px', lineHeight: '60px', fontSize: '22px' }} gutterBottom>
                                    Upload a file
                                  </Typography>
                                </Box>
                                {uploadFile.map((item, i) => (< Grid item xs={6} md={6} style={{ float: 'left', padding: '10px' }}>
                                  <Card key={i}>
                                    <CardContent>
                                      <List sx={{ width: '100%' }} style={{ padding: '0px' }}>
                                        <ListItem alignItems="center" style={{ padding: '0px' }}>
                                          <ListItemAvatar>
                                            <Avatar alt={item.name} src={item.img} style={{ borderRadius: '0px' }} />
                                          </ListItemAvatar>
                                          <ListItemText
                                            secondary={
                                              <React.Fragment>
                                                <Grid>
                                                  <Typography
                                                    style={{ fontSize: '18px', color: '#090F0F' }}
                                                    variant="p"
                                                  >
                                                    {item.name}
                                                  </Typography>
                                                </Grid>
                                                <Grid>
                                                  <Typography
                                                    className='text-color'
                                                    variant="p"
                                                  >
                                                    {item.content}
                                                  </Typography>
                                                </Grid>
                                              </React.Fragment>
                                            }
                                          />
                                          <ListItemButton style={{ padding: '0px' }}>
                                            <Button
                                              sx={{
                                                mt: { xs: 2, sm: 0 },
                                              }}
                                              variant="contained"
                                              onClick={(e)=>{handleOpen (item.name)}}
                                            >
                                              Connect
                                            </Button>
                                          </ListItemButton>
                                        </ListItem>
                                      </List>
                                    </CardContent>
                                  </Card>
                                </Grid>
                                ))}
                              </Grid>
                            </TabPanel>
                          </Grid>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </>

              )}
              {/* end */}

              {/* step2 code */}
              {activeStep + 1 === 2 && (
                <Box style={{ display: 'grid', gap: '16px' }}>

                  <Grid item container xs={12} style={{ paddingTop: '18px' }}>
                    <Typography variant="h3" sx={{ fontWeight: "bold", color: "#090F0F" }} gutterBottom>
                      Choose a modal template
                    </Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <div>
                      {gridData.map((item, j) => (

                        <Accordion style={{ border: '1px solid #ddd', borderRadius: '4px', marginBottom: '10px' }} key={j}>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header1"
                          >
                            <Grid item xs={12} style={{ display: 'flex', alignItems: 'center' }}>
                              <List sx={{ width: '100%' }} style={{ padding: '0' }}>
                                <ListItem alignItems="flex-start" style={{ padding: '0' }}>
                                  <ListItemAvatar>
                                    <Avatar alt={item.name} src='/static/images/avatar/1.jpg"' style={{ borderRadius: '0' }} />
                                  </ListItemAvatar>
                                  <ListItemText
                                    secondary={
                                      <React.Fragment>
                                        <Grid>
                                          <Typography
                                            style={{ fontSize: '18px', color: '#090F0F' }}
                                            variant="h6"
                                            className="text-primary"
                                          >
                                            {item.name}
                                          </Typography>
                                        </Grid>
                                        <Grid>
                                          <Typography
                                            variant="p"
                                            className="text-color"
                                          >
                                            {item.title}
                                          </Typography>
                                        </Grid>
                                      </React.Fragment>
                                    }
                                  />
                                </ListItem>
                              </List>
                              {j == 0 || j == 1 ? (<Stack direction="row" spacing={1} style={{ position: 'relative', right: '2rem' }}>
                                <Chip
                                  icon={<CheckCircleOutlineIcon />}
                                  label="Selected"
                                  variant="outlined"
                                />
                              </Stack>) : ''}
                            </Grid>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography style={{ display: 'grid', gap: '18px' }}>

                              <Box>
                                <Grid item xs={12}>
                                  <Typography
                                    style={{ fontSize: '18px', color: '#090F0F' }}
                                    variant="h6"
                                    className="text-primary"
                                  >
                                    Typeform
                                  </Typography>
                                </Grid>
                              </Box>

                              <Box style={{ display: 'grid', gap: '8px' }}>
                                {item.survey.surveryName.map((survey, k) => (
                                  <Grid item xs={12} key={k}>
                                    <Typography
                                      variant="p"
                                      className="text-color"
                                    >
                                      <CheckCircleOutlineIcon /> {survey.name}
                                    </Typography>
                                  </Grid>
                                ))}
                              </Box>

                              <Box>
                                <Grid item xs={12}>
                                  {item.survey.questionSurvery.map((questionSurvery, l) => (
                                    <Grid key={l} item xs={12} md={12}>
                                      <Grid item xs={10} md={5} style={{ width: '90%', float: 'left', marginBottom: '16px' }}>
                                        <FormControl fullWidth >
                                          <Autocomplete
                                            disablePortal
                                            id="combo-box-demo"
                                            options={questionSurvery.answer}
                                            sx={{ width: '100%' }}
                                            renderInput={(params) => <TextField {...params} label={questionSurvery.question} />}
                                          />
                                        </FormControl>
                                      </Grid>
                                      <Grid item xs={2} md={1} style={{ width: '10%', float: 'left', textAlign: 'center', marginBottom: '16px', lineHeight: '55px' }}>
                                        {l % 2 ? <CloseIcon className='cursor-pointer' /> : <NavigateNextIcon className='cursor-pointer' />}
                                      </Grid>
                                    </Grid>
                                  ))}
                                </Grid>
                              </Box>

                              <Box>
                                <Grid item xs={12}>
                                  <Grid item xs={7} style={{ background: '#ABABAB', padding: '16px', borderRadius: '4px' }}>
                                    <Typography
                                      style={{ fontSize: '18px', color: '#090F0F' }}
                                      variant="h6"
                                      className="text-primary"
                                    >
                                      Title of the notification message
                                    </Typography>
                                    <Typography
                                      variant="p"
                                      className="text-primary text-primary-light-font"
                                    >
                                      Lorem ipsum dolor sit amet consectetur. Egestas dapibus pellentesque ornare mattis adipiscing maecenas. Ultricies ullamcorper vel turpis eu porta et. Nulla nunc sit ut phasellus vitae sit amet aliquet pellentesque. Egestas consectetur nibh elit duis nulla in dui aliquam. Nunc mi magna ac nullam nibh tincidunt nisl.
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </Box>

                              <Box>
                                <Grid item xs={12}>
                                  <Typography
                                    style={{ fontSize: '18px', color: '#090F0F' }}
                                    variant="h6"
                                    className="text-primary"
                                  >
                                    Excel file uploaded
                                  </Typography>
                                </Grid>
                              </Box>

                              <Box style={{ display: 'grid', gap: '8px' }}>
                                {item.survey.uploadName.map((upload, m) => (
                                  <Grid item xs={12} key={m}>
                                    <Typography
                                      variant="p"
                                      className="text-primary"
                                    >
                                      <CheckCircleOutlineIcon /> {upload.name}
                                    </Typography>
                                  </Grid>
                                ))}
                              </Box>

                              <Box>
                                <Grid item xs={12}>
                                  {item.survey.uploadSurvery.map((uploadSurvery, n) => (
                                    <Grid key={n} item xs={12} md={12}>
                                      <Grid item xs={10} md={5} style={{ width: '90%', float: 'left', marginBottom: '16px' }}>
                                        <FormControl fullWidth >
                                          <Autocomplete
                                            disablePortal
                                            id="combo-box-demo"
                                            options={uploadSurvery.answer}
                                            sx={{ width: '100%' }}
                                            renderInput={(params) => <TextField {...params} label={uploadSurvery.question} />}
                                          />
                                        </FormControl>
                                      </Grid>
                                      <Grid item xs={2} md={1} style={{ width: '10%', float: 'left', textAlign: 'center', marginBottom: '16px', lineHeight: '55px' }}>
                                        {n % 2 ? <CloseIcon className='cursor-pointer' /> : <NavigateNextIcon className='cursor-pointer' />}
                                      </Grid>
                                    </Grid>
                                  ))}
                                </Grid>
                              </Box>

                              <Box sx={{ display: 'flex', flexDirection: 'row' }} style={{ padding: '36px' }}>

                                <Box sx={{ flex: '1 1 auto' }} />
                                <Button
                                  variant='outlined'
                                  onClick={handleBack}
                                  sx={{ mr: 1 }}
                                >
                                  Cancel
                                </Button>
                                <Button sx={{
                                  mt: { xs: 2, sm: 0 },
                                }}
                                  variant="contained">
                                  Confirm
                                </Button>
                              </Box>

                            </Typography>
                          </AccordionDetails>
                        </Accordion>
                      ))}
                    </div>



                  </Grid>

                </Box>
              )}
              {/* end */}

              {/* step3 code */}
              {activeStep + 1 === 3 && (
                <Typography sx={{ mt: 2, mb: 1 }}>Step 3</Typography>
              )}
              {/* end */}


              {/* back & submit button code */}
              <Box sx={{ display: 'flex', flexDirection: 'row' }} style={{ padding: '36px' }}>

                <Box sx={{ flex: '1 1 auto' }} />
                {/* {isStepOptional(activeStep) && (
                  <Button color="inherit" variant='outlined' onClick={handleSkip} sx={{ mr: 1 }}>
                    Skip
                  </Button>
                )} */}
                <Button
                  // color="inherit"
                  variant='outlined'
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Button sx={{
                  mt: { xs: 2, sm: 0 },
                }}
                  variant="contained" onClick={handleNext}>
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </Box>
              {/* end */}

            </React.Fragment >
          )
          }
        </Box >


        <ConnectDialog open={open} handleClose={handleClose} />
        <DatabasesDialog open={open} handleClose={handleClose} />
        <UploadDialog open={open} handleClose={handleClose} />


      </Box >



    </>
  );
}

export default function IntegrationNotistack() {
  return (
    <SnackbarProvider maxSnack={3}>
      <DataUpload />
    </SnackbarProvider>
  );
}
