import axios from "axios";
const API_ROUTES = {
  ABORT_MULTIPART_UPLOAD: `${process.env.REACT_APP_API_URL}/s3/abortMultipartUpload`,
  S3_PRESIGNED_URL: `${process.env.REACT_APP_API_URL}/s3/presignedUrl`,
  S3_CREATE_MULTIPART_UPLOAD: `${process.env.REACT_APP_API_URL}/s3/createMultipartUpload`,
  S3_GET_UPLOAD_PART: `${process.env.REACT_APP_API_URL}/s3/getUploadPart`,
  S3_COMPLETE_MULTIPART_UPLOAD: `${process.env.REACT_APP_API_URL}/s3/completeMultipartUpload`,
  CREATE_EMAIL_CAMPAIGN: `${process.env.REACT_APP_API_URL}/emailCampaigns/create`,
};


const abortUpload = async (fileName, user) => {
  try {
    const uploadId = sessionStorage.getItem("uploadId");
    const abortUploadRes = await axios.post(API_ROUTES.ABORT_MULTIPART_UPLOAD, {
      fileName: fileName,
      bucketName: user,
      uploadId: uploadId,
    });
  } catch (err) {
    console.log(err);
  }
};

const uploadFile = async (fileType, file, emailCampaign, user) => {
  try {
    if (!emailCampaign || !user) {
      return;
    }
    const fileName = file.name;
    const fileSize = file.size;

    let fileKey = "";
    if (fileType === "image") {
      fileKey = `emailCampaigns/${emailCampaign._id}/images/${fileName}`;
    } else {
      fileKey = `emailCampaigns/${emailCampaign._id}/${fileName}`;
    }

    const bucketName = user._id;

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
      updateUploading(true);
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
        updateProgress(((i + 1) / chunkCount) * 100);
      }
      const completeUploadRes = await axios.post(
        API_ROUTES.S3_COMPLETE_MULTIPART_UPLOAD,
        {
          fileName: fileKey,
          bucketName: bucketName,
          uploadId: uploadId,
          parts: multiUploadArray,
          datasetId: datasetId,
        }
      );
    }
  } catch (err) {
    const fileName = file.name;
    const res = await abortUpload(fileName, user);
    console.log(err);
  }
};

const createEmailCampaign = async (user, title, htmlFile, images) => {
  fetch(API_ROUTES.CREATE_EMAIL_CAMPAIGN, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      title: title,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.data.success === true) {
        const emailCampaign = res.data.emailCampaign;
        images.forEach((image) => {
          uploadFile("image", image, emailCampaign, user);
        });
        uploadFile("html", htmlFile, emailCampaign, user);
      } else {
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export { createEmailCampaign };
