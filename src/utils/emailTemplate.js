import axios from "axios";
const API_ROUTES = {
  ABORT_MULTIPART_UPLOAD: `${process.env.REACT_APP_API_URL}/s3/abortMultipartUpload`,
  S3_PRESIGNED_URL: `${process.env.REACT_APP_API_URL}/s3/presignedUrl`,
  S3_CREATE_MULTIPART_UPLOAD: `${process.env.REACT_APP_API_URL}/s3/createMultipartUpload`,
  S3_GET_UPLOAD_PART: `${process.env.REACT_APP_API_URL}/s3/getUploadPart`,
  S3_COMPLETE_MULTIPART_UPLOAD: `${process.env.REACT_APP_API_URL}/s3/completeMultipartUpload`,
};

const abortUpload = async (fileKey, bucketName) => {
  try {
    const uploadId = sessionStorage.getItem("uploadId");
    const abortUploadRes = await axios.post(API_ROUTES.ABORT_MULTIPART_UPLOAD, {
      fileName: fileKey,
      bucketName: bucketName,
      uploadId: uploadId,
    });
  } catch (err) {
    console.log(err);
  }
};

const uploadFile = async ({ file, bucketName, fileKey }) => {
  try {
    const fileName = file.name;
    const fileSize = file.size;

    if (bucketName) {
      const uploadIdRes = await axios.post(
        API_ROUTES.S3_CREATE_MULTIPART_UPLOAD,
        {
          fileName: fileKey,
          bucketName: bucketName,
        }
      );
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
              bucketName: bucketName,
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
          // updateProgress(((i + 1) / chunkCount) * 100);
        }
        const completeUploadRes = await axios.post(
          API_ROUTES.S3_COMPLETE_MULTIPART_UPLOAD,
          {
            fileName: fileKey,
            bucketName: bucketName,
            uploadId: uploadId,
            parts: multiUploadArray,
          }
        );
      }
    }
  } catch (err) {
    const res = await abortUpload(fileKey, bucketName);
    console.log(err);
  }
};

export { uploadFile, abortUpload };
