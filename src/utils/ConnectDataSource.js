import axios from "axios";
import { uploadFile } from "./multiPartUpload";
const API_ROUTES = {
  S3: `${process.env.REACT_APP_API_URL}/dataConnectors/s3Copy`,
  UPLOAD: `${process.env.REACT_APP_API_URL}/dataConnectors/upload`,
  DATASET_CREATE: `${process.env.REACT_APP_API_URL}/dataset/create`,
};
const ConnectDataSource = async ({
  user,
  title,
  dataType,
  dataSource,
  dataConnectorDetails,
  updateUploading,
  updateUploaded,
  updateProgress,
  updateFiles,
}) => {
  if (dataSource === "s3") {
    const res = await connectS3({
      user,
      title,
      dataType,
      dataSource,
      dataConnectorDetails,
    });
  } else if (dataSource === "upload") {
    const res = await connectUpload({
      user,
      title,
      dataType,
      dataSource,
      dataConnectorDetails,
      updateUploading,
      updateUploaded,
      updateProgress,
      updateFiles,
    });
    // console.log(res);
  }
};

const connectS3 = async ({
  user,
  title,
  dataType,
  dataSource,
  dataConnectorDetails,
}) => {
  try {
    const res = await axios.post(
      API_ROUTES.S3,
      {
        user,
        title,
        dataType,
        dataSource,
        bucket: dataConnectorDetails.data.bucket,
        filePath: dataConnectorDetails.data.filePath,
        bucketRegion: dataConnectorDetails.data.bucketRegion,
      },
      {
        headers: {
          "Content-type": "application/json",
        },
        withCredentials: true,
      }
    );
    console.log(res);
  } catch (err) {
    console.log(err);
  }
};

const connectUpload = async ({
  user,
  title,
  dataType,
  dataSource,
  dataConnectorDetails,
  updateUploading,
  updateUploaded,
  updateProgress,
  updateFiles,
}) => {
  try {
    const datasetRes = await axios.post(
      API_ROUTES.DATASET_CREATE,
      {
        user,
        title,
        dataType,
        dataSource,
      },
      {
        headers: {
          "Content-type": "application/json",
        },
        withCredentials: true,
      }
    );
    if (datasetRes.data.success == true) {
      const fileUploadRes = await uploadFile({
        user,
        file: dataConnectorDetails.data.file,
        datasetId: datasetRes.data.datasetId,
        datasetTitle: datasetRes.data.datasetTitle,
        updateUploading,
        updateUploaded,
        updateProgress,
        updateFiles,
      });
      console.log(fileUploadRes);
      return true;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export { ConnectDataSource };
