import React from "react";
import DoneIcon from "@mui/icons-material/Done";
function PrivacySection() {
  return (
    <div className="privacySection">
      <div className="container max-w-screen-xl mx-auto min-h-full  py-20 flex flex-col lg:flex-row justify-between items-center gap-20">
        <div className="imageContainer w-full lg:w-1/2 flex flex-wrap justify-center items-center gap-10">
          <img
            src={"/images/privacy/one.png"}
            className=""
            alt='convertml' 
            width="160px"
          />

          <img
            src={"/images/privacyImage1.jpeg"}
            className=""
            alt='convertml' 
            width="160px"
          />
          <img
            src={"/images/privacy/two.png"}
            className=""
            alt='convertml' 
            width="160px"
          />
          <img
            src={"/images/privacyImage2.jpeg"}
            className=""
            alt='convertml' 
            width="160px"
          />
          <img
            src={"/images/privacyImage3.jpeg"}
            className=""
            alt='convertml' 
            width="160px"
          />
          <img src={"/images/privacyImage4.jpeg"} className=""  alt='convertml' />
        </div>
        <div className="textContainer w-full lg:w-1/2 flex flex-col gap-8">
          <h2 className="text-4xl font-bold leading-snug">
            Keep user privacy intact in your experiments
          </h2>
          <div className="text-xl font-semibold">
            You focus on experiments, we focus on ensuring user privacy is
            respected.
          </div>
          <div className="text-lg">
            <div className="flex gap-4 items-center">
              <DoneIcon color="success" fontSize="large" />
              <div>
                Automatic removal of PII (email address and IP addresses)
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <DoneIcon color="success" fontSize="large" />
              <div>GDPR, CCPA, HIPPA compliant</div>
            </div>
            <div className="flex gap-4 items-center">
              <DoneIcon color="success" fontSize="large" />
              <div>PCI-DSS certifications</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrivacySection;
