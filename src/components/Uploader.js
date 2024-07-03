import { useState } from "react";
import Uppy from "@uppy/core";
import { Dashboard } from "@uppy/react";
import AwsS3 from "@uppy/aws-s3";
import AwsS3Multipart from "@uppy/aws-s3-multipart";
import Axios from "axios";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";

const Uploader = ({ setTableName, setDatabaseName }) => {
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
      return Axios(
        `https://api.convertml.ai//s3/signurl/put/${file.name}`
      ).then((response) => {
        // Return an object in the correct shape.
        return {
          method: "PUT",
          url: response.data.url,
          fields: [],
        };
      });
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
    Axios.post(`https://api.convertml.ai//pipeline/start`, {
      bucketName: "bucketName",
      fileKey: "FileKey",
      databaseName: "databaseName",
    }).then((response) => {
      setTableName(response.data.tableName);
      setDatabaseName(response.data.databaseName);
    });
  });
  uppy.on("complete", (result) => {});
  return (
    <div>
      <Dashboard uppy={uppy} plugins={[]} showProgressDetails={true} />
    </div>
  );
};

export default Uploader;
