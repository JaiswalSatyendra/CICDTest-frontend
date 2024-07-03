import { Box } from "@mui/material";
import PageTitleWrapper from "../../../../components/PageTitleWrapper";
import PageHeader from "./PageHeader";

function ImageEditor() {
  return (
    <>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Box>
        <iframe
          style={{
            width: "100%",
            height: "100vh",
            border: "none",
            margin: 0,
            padding: 0,
            marginTop: "-34px",
            overflow: "auto",
            zIndex: 999999,
          }}
          allowFullScreen
          frameBorder={"0"}
          src="https://studio.pixelixe.com/#api?apiKey=VsTeG8xVKpZVc7AaLTWB1CktUYC3&width=500&height=500"
        ></iframe>
      </Box>
    </>
  );
}

export default ImageEditor;
