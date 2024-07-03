import axios from "axios";
const API_ROUTES = {
  ABORT_MULTIPART_UPLOAD: `${process.env.REACT_APP_API_URL}/s3/abortMultipartUpload`,
  S3_PRESIGNED_URL: `${process.env.REACT_APP_API_URL}/s3/presignedUrl`,
  S3_CREATE_MULTIPART_UPLOAD: `${process.env.REACT_APP_API_URL}/s3/createMultipartUpload`,
  S3_GET_UPLOAD_PART: `${process.env.REACT_APP_API_URL}/s3/getUploadPart`,
  S3_COMPLETE_MULTIPART_UPLOAD: `${process.env.REACT_APP_API_URL}/s3/completeMultipartUpload`,
};

const abortUpload = async (fileName, user) => {
  try {
    const uploadId = sessionStorage.getItem("uploadId");
    const abortUploadRes = await axios.post(API_ROUTES.ABORT_MULTIPART_UPLOAD, {
      fileName: fileName,
      bucketName: user._id,
      uploadId: uploadId,
    });
  } catch (err) {
    console.log(err);
  }
};

const uploadFile = async ({
  file,
  user,
  datasetId,
  datasetTitle,
  objectId,
  //   updateUploading,
  //   updateUploaded,
  //   updateProgress,
}) => {
  try {
    const fileName = file.name;
    const fileSize = file.size;

    if (datasetId) {
      const fileKey = `email_campaigns/${objectId}/config.json`;
      const uploadIdRes = await axios.post(
        API_ROUTES.S3_CREATE_MULTIPART_UPLOAD,
        {
          fileName: fileKey,
          bucketName: user._id,
        }
      );
      // console.log(uploadIdRes);
      if (uploadIdRes.data.success) {
        const uploadId = uploadIdRes.data.uploadId;
        sessionStorage.setItem("uploadId", uploadId);
        const chunkSize = 10 * 1024 * 1024; // 10MB
        const chunkCount = Math.floor(fileSize / chunkSize) + 1;

        let multiUploadArray = [];
        // updateUploading(true);
        for (let i = 0; i < chunkCount; i++) {
          const start = i * chunkSize;
          const end = Math.min((i + 1) * chunkSize, fileSize);
          const fileChunk = file.slice(start, end);

          const getSignedUrlRes = await axios.post(
            API_ROUTES.S3_GET_UPLOAD_PART,
            {
              fileName: fileKey,
              bucketName: user._id,
              partNumber: i + 1,
              uploadId: uploadId,
            }
          );
          const preSignedUrl = getSignedUrlRes.data.preSignedUrl;
          const uploadChunk = await fetch(preSignedUrl, {
            method: "PUT",
            body: fileChunk,
          });

          const EtagHeader = uploadChunk.headers.get("ETag");
          const uploadPartDetails = {
            PartNumber: i + 1,
            ETag: EtagHeader,
          };
          multiUploadArray.push(uploadPartDetails);
          //   updateProgress(((i + 1) / chunkCount) * 100);
        }
        const completeUploadRes = await axios.post(
          API_ROUTES.S3_COMPLETE_MULTIPART_UPLOAD,
          {
            fileName: fileKey,
            bucketName: user._id,
            uploadId: uploadId,
            parts: multiUploadArray,
            datasetId: datasetId,
          }
        );
        const pipelineTrigger = await axios.post(
          `${process.env.REACT_APP_API_URL}/dataConnectors/localUpload`,
          {
            user: user,
            datasetId: datasetId,
            datasetTitle: datasetTitle,
          }
        );
        // updateUploading(false);
        // updateUploaded(true);
        // updateProgress(0);
      }
    }
  } catch (err) {
    const fileName = file.name;
    const res = await abortUpload(fileName, user);
    console.log(err);
  }
};

export { uploadFile, abortUpload };
