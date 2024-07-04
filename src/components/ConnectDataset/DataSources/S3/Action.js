import { useState, useContext } from "react";
import {
  Card,
  CardHeader,
  Divider,
  Button,
  Tab,
  Box,
  FormControl,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import axios from "axios";
import { SessionContext } from "../../../../contexts/SessionContext";

function Action({ loadingResponse, updateConnectorDetails, updateBucketName }) {
  const [bucketName, setBucketName] = useState("");
  const [S3FilePath, setS3FilePath] = useState("");
  const [bucketRegion, setBucketRegion] = useState("");
  const [value, setValue] = useState("1");
  const [session, ,] = useContext(SessionContext);
  const { user } = session;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleGeneralSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/dataConnectors/s3Copy/verify`,
        {
          bucket: bucketName,
          filePath: S3FilePath,
          bucketRegion: bucketRegion,
          user: user._id,
        }
      );
      if (res.data.success === true) {
        loadingResponse({
          data: {
            success: true,
          },
        });
        updateConnectorDetails("s3", {
          bucket: bucketName,
          filePath: S3FilePath,
          bucketRegion: bucketRegion,
        });
      } else {
        loadingResponse({
          data: {
            success: false,
          },
        });
      }
    } catch (err) {
      loadingResponse({
        data: {
          success: false,
        },
      });
    }
  };

  return (
    <Box>
      <Card
        sx={{
          m: 1,
        }}
      >
        <CardHeader title={"Data Source > S3 Bucket"} />
        <Divider />
        <Box sx={{ width: "100%", typography: "body1" }} p={2} mt={2}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList onChange={handleChange}>
                <Tab label="General" value="1" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <Box
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={handleGeneralSubmit}
              >
                <FormControl
                  sx={{
                    width: 1,
                    my: 1,
                  }}
                >
                  <FormLabel
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{ ml: 1, fontWeight: "bold", color: "black" }}
                    >
                      Bucket Name*
                    </Typography>
                  </FormLabel>
                  <TextField
                    fullWidth
                    margin="normal"
                    name="bucketName"
                    value={bucketName}
                    onChange={(e) => {
                      setBucketName(e.target.value);
                      updateBucketName(e.target.value);
                    }}
                    variant="outlined"
                    required
                    autoFocus
                  />
                </FormControl>
                <FormControl
                  sx={{
                    width: 1,
                    my: 1,
                  }}
                >
                  <FormLabel
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{ ml: 1, fontWeight: "bold", color: "black" }}
                    >
                      S3 File Path* (i.e BUCKET_NAME/[FOLDER_NAME]/)
                    </Typography>
                  </FormLabel>
                  <TextField
                    fullWidth
                    margin="normal"
                    name="s3FilePath"
                    value={S3FilePath}
                    onChange={(e) => {
                      setS3FilePath(e.target.value);
                    }}
                    variant="outlined"
                    required
                    autoFocus
                  />
                </FormControl>
                <FormControl
                  sx={{
                    width: 1,
                    my: 1,
                  }}
                >
                  <FormLabel
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{ ml: 1, fontWeight: "bold", color: "black" }}
                    >
                      Bucket Region*
                    </Typography>
                  </FormLabel>
                  <TextField
                    fullWidth
                    margin="normal"
                    name="bucketRegion"
                    value={bucketRegion}
                    onChange={(e) => setBucketRegion(e.target.value)}
                    variant="outlined"
                    required
                    autoFocus
                  />
                </FormControl>
                <Button
                  sx={{
                    mt: 3,
                  }}
                  color="primary"
                  size="medium"
                  variant="contained"
                  type="submit"
                >
                  Connect
                </Button>
              </Box>
            </TabPanel>
          </TabContext>
        </Box>
      </Card>
    </Box>
  );
}

export default Action;
