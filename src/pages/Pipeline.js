import { useState } from "react";
import { Grid, Button } from "@mui/material";
import Review from "../components/Review";
import { Link } from "react-router-dom";
import Uppy from "@uppy/core";
import { Dashboard } from "@uppy/react";
import AwsS3 from "@uppy/aws-s3";
import Axios from "axios";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";

function Pipeline() {
  const [bucketName] = useState("jasbir");
  const [databaseName] = useState("jasbir");
  const [disabled, setDisabled] = useState(true);
  const uppy = new Uppy({
    id: "uppy",
    restrictions: {
      // maxFileSize: 10000000, //10MB
      allowedFileTypes: null,
      maxNumberOfFiles: 100,
      minNumberOfFiles: 1,
    },
    // autoProceed: true,
    debug: false,
    allowMultipleUploads: true,
    proudlyDisplayPoweredByUppy: false,
  });

  uppy.use(AwsS3, {
    limit: 5,
    getUploadParameters(file) {
      // replace special characters in file name with underscore except for last dot
      const fileName = file.name
        .replace(/[^a-zA-Z0-9.]/g, "_")
        .replace(/\.$/, "");
      return Axios(`https://api.convertml.ai/s3/signurl/put/${fileName}`).then(
        (response) => {
          // Return an object in the correct shape.
          localStorage.setItem("fileKey", response.data.fileKey);
          localStorage.setItem(
            "tableName",
            response.data.fileKey.split(".")[0].split("/").pop()
          );
          return {
            method: "PUT",
            url: response.data.url,
            fields: [],
          };
        }
      );
    },
  });
  // uppy.use(AwsS3Multipart, {
  // 	// upload file in multiple parts uppy/aws-s3-multipart
  // 	limit: 5,

  // 	createMultipartUpload(file) {
  // 		return Axios(`/api/createMultipartUpload/${file.name}`).then(
  // 			(response) => {
  // 				return {
  // 					method: 'POST',
  // 					uploadId: response.data.UploadId,
  // 					key: response.data.Key,
  // 					fields: [],
  // 				};
  // 			}
  // 		);
  // 	},
  // 	listParts(file, { uploadId, key }) {},
  // 	prepareUploadPart(file, partData) {
  // 		return Axios(`/api/prepareUploadPart/${file.name}`, {
  // 			method: 'POST',
  // 			data: partData,
  // 		}).then((response) => {
  // 			console.log('response: ', response);
  // 			return {
  // 				method: 'PUT',
  // 				url: response.data.url,
  // 				fields: [],
  // 			};
  // 		});
  // 	},
  // 	abortMultipartUpload(file, { uploadId, key }) {},
  // 	completeMultipartUpload(file, { uploadId, key, parts }) {},
  // });
  uppy.on("upload-success", (file, response) => {
    Axios.post(`https://api.convertml.ai/pipeline/start`, {
      bucketName: bucketName,
      fileKey: localStorage.getItem("fileKey"),
      databaseName: databaseName,
    }).then((response) => {
      setTimeout(() => {
        setDisabled(false);
      }, 5000);
    });
  });
  uppy.on("complete", (result) => {});

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh", backgroundColor: "#eceff1" }}
    >
      <Grid item xs={12} sx={{ my: 2 }}>
        <Dashboard uppy={uppy} plugins={[]} showProgressDetails={true} />
        <Button
          component={Link}
          to={`/sql-editor/${databaseName}/${localStorage.getItem(
            "tableName"
          )}`}
          variant="contained"
          sx={{ my: 2 }}
          disabled={disabled}
        >
          SQL Editor
        </Button>
      </Grid>
      <Grid item xs={12} sx={{ my: 2 }}>
        <Review />
      </Grid>
    </Grid>
  );
}

export default Pipeline;
