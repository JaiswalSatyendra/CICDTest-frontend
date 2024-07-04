import React, { useState, forwardRef, useCallback, useContext, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid, Card, Divider, Avatar, CardHeader, useTheme, ListItem, ListItemText, Alert, List, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { SessionContext } from '../../../contexts/SessionContext';
import { useDropzone } from "react-dropzone";
import CloudUploadTwoToneIcon from "@mui/icons-material/CloudUploadTwoTone";
import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";
import CheckTwoToneIcon from "@mui/icons-material/CheckTwoTone";
import { uploadFile } from "../../../../src/utils/emailTemplate";
import { useTranslation } from 'react-i18next';
import ToastMessage from '../../organisms/UnlayerEmailEditor/ToastMessage';

import {categoriesData_cs,categoriesData_brand,categoriesData_nps, templateData} from "../../../assets/data/result";


const BoxUploadWrapper = styled(Box)(
  ({ theme }) => `
    border-radius: ${theme.general.borderRadius};
    padding: ${theme.spacing(2)};
    background: ${theme.colors.alpha.black[5]};
    border: 1px dashed ${theme.colors.alpha.black[30]};
    outline: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: ${theme.transitions.create(["border", "background"])};
    height: 300px;

    &:hover {
      background: ${theme.colors.alpha.white[50]};
      border-color: ${theme.colors.primary.main};
    }
`
);

const AvatarWrapper = styled(Avatar)(
  ({ theme }) => `
    background: transparent;
    color: ${theme.colors.primary.main};
    width: ${theme.spacing(7)};
    height: ${theme.spacing(7)};
`
);

const AvatarSuccess = styled(Avatar)(
  ({ theme }) => `
    background: ${theme.colors.success.light};
    width: ${theme.spacing(7)};
    height: ${theme.spacing(7)};
`
);

const AvatarDanger = styled(Avatar)(
  ({ theme }) => `
    background: ${theme.colors.error.light};
    width: ${theme.spacing(7)};
    height: ${theme.spacing(7)};
`
);



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  // border: '1px solid #ddd',
  boxShadow: 24,
  // p: 4
};




function UploadDialog({ open, handleClose, checkedMappingForFile }) {

  const [session, ,] = useContext(SessionContext);
  const { user } = session;
  const theme = useTheme();

  // const [listOfColumn, setListOfColumn] = useState([null]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showLoder, setLoaderShow] = useState(false);
  const [toastObject, setToastObject] = useState({});
  const { t } = useTranslation();

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    setSelectedFile(file);
  }, []);

  const {
    acceptedFiles,
    isDragActive,
    isDragAccept,
    isDragReject,
    getRootProps,
    getInputProps,
  } = useDropzone({
    onDrop,
    multiple: false,
    accept:
      "text/csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, text/plain",
    maxSize: 5 * 1073741824,
  });

  const files = acceptedFiles.map((file, index) => (
    <ListItem disableGutters component="div" key={index}>
      <ListItemText primary={file.name} />
      <b>{file.size} bytes</b>
      <Divider />
    </ListItem>
  ));

  const isModalClose = () => {
    handleClose();
  }

  const isModalClose1 = async () => {
    const formData = new FormData();
    formData.append('title', selectedFile.name);
    formData.append('userId', user._id);
    formData.append('file', selectedFile);
    let cloneContactMap = []
    setLoaderShow(true);
    await axios.post(
      `${process.env.REACT_APP_API_URL}/survey/createMultipartUpload`, formData, { "Content-Type": "multipart/form-data" },)
      .then(async (response) => {
        if (response.data.success!=false&&response.data.listOfcolumns.length != 0) {
          const typeformDataQuestmap = {
            question_list: response.data.listOfcolumns,
            category_list: categoriesData_cs,
          };
          let newFormFiled = await getMapCategary(typeformDataQuestmap);
          let addNewFieldList = newFormFiled.map((ele1, indx) => ({ ...ele1, "displayName": (ele1.item.split("_").join(" ")), "item": ele1.item }))
          setLoaderShow(false);

          cloneContactMap.push({
            list: { displayName: selectedFile.name, value: selectedFile.name }, colList: addNewFieldList
          })
          checkedMappingForFile(cloneContactMap);
          handleClose();
          setToastObject({
            message: t(response.data.message),
            severity: "success",
            open: true,
          });
          // setlistContactMapping(cloneContactMap);//For mapping selecte list id with selectedColumn
          // setSelectionModelForHubspot([1, 2, 3, 4, 5, 6, 7, 8])//For selectedColumn id
        }else{
          setToastObject({
            message: t(response.data.message),
            severity: "success",
            open: true,
          });
      
        }


        // console.log(response)
      })
      .catch((err) => {
        console.log(err);
      });


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

  return (
    <>

      {/* typeform agree code */}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Box sx={style} className='panel'>

          <Box sx={{ display: 'flex', flexDirection: 'row', pb: 2 }} className='flex panel-header' >
            <Typography id="modal-modal-title" variant="h4" component="h4" className='flex'>
              Upload File
            </Typography>
            <Typography id="modal-modal-title" variant="p" component="p" className='panel-close-icon'>
              <CloseIcon onClick={isModalClose} className='cursor-pointer' style={{ color: '#212121' }} />
            </Typography>
          </Box>

          <Box className='panel-body'>
            <Box width={'100%'}>

              <React.Fragment>


                <Box>

                  <Box>
                    <Card
                      sx={{
                        m: 0,
                      }} style={{ boxShadow: 'none' }}
                    >

                      <Box p={2}>
                        <BoxUploadWrapper {...getRootProps()}>
                          <input {...getInputProps()} />
                          {isDragAccept && (
                            <>
                              <AvatarSuccess variant="rounded">
                                <CheckTwoToneIcon />
                              </AvatarSuccess>
                              <Typography
                                sx={{
                                  mt: 2,
                                }}
                              >
                                {"Drop the files to start uploading"}
                              </Typography>
                            </>
                          )}
                          {isDragReject && (
                            <>
                              <AvatarDanger variant="rounded">
                                <CloseTwoToneIcon />
                              </AvatarDanger>
                              <Typography
                                sx={{
                                  mt: 2,
                                }}
                              >
                                {"You cannot upload these file types"}
                              </Typography>
                            </>
                          )}
                          {!isDragActive && (
                            <>
                              <AvatarWrapper variant="rounded">
                                <CloudUploadTwoToneIcon />
                              </AvatarWrapper>
                              <Typography
                                sx={{
                                  mt: 2,
                                }}
                              >
                                {"Drag & drop files here"}
                              </Typography>
                            </>
                          )}
                        </BoxUploadWrapper>
                      </Box>

                      <>
                        <Divider />
                        <Box p={2}>
                          <Alert
                            sx={{
                              py: 0,
                            }}
                            severity="success"
                          >
                            {"You have connected"} <b>{files.length}</b> {"files"}!
                          </Alert>
                          <List
                            disablePadding
                            sx={{
                              mt: 2,
                            }}
                            component="div"
                          >
                            {files}
                          </List>
                        </Box>
                      </>

                    </Card>
                  </Box>


                </Box>







              </React.Fragment>

            </Box>



          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'row' }} className='panel-footer'>
            <Grid container item>
              <Grid item xs={12}>
                <Button variant='outlined' size="small" style={{ float: 'left' }} onClick={isModalClose}>Cancel</Button>
                <Button variant='outlined' size="small" style={{ float: 'right' }} onClick={isModalClose1}>Upload</Button> {showLoder && <CircularProgress style={{ float: 'right' , marginRight:15}} />}
              </Grid>
            </Grid>
          </Box>

        </Box>

      </Modal>

      {/* end */}

      <ToastMessage toastObject={toastObject} setToastObject={setToastObject} />

    </ >
  );
}



export default UploadDialog;