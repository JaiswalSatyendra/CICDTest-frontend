import axios from "axios";
import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import "./style.scss";
import ToastMessage from "./ToastMessage";
import { S3LocationContext } from "../../../contexts/S3LocationContext";

function RecipientsInfo() {
  console.log("data---");
  const { register, handleSubmit, reset } = useForm();
  const { s3Location } = useContext(S3LocationContext);

  const [toastObject, setToastObject] = useState({
    message: "",
    severity: "",
    open: false,
  });

  const sendMail = async (data) => {
  
    if (data) {
      console.log(data.senderEmail, data.recipientEmail, data.subject, data.CC);
      await axios
        .post(
          `${process.env.REACT_APP_API_URL}/emailCampaign/test`,
          {
            sender: data.senderEmail,
            recipient: data.recipientEmail,
            subject: data.subject,
            s3Location: s3Location + "/index.html",
            cc_recipient: data.CC,
          },
          {
            headers: {
              "Content-type": "application/json",
            },
            withCredentials: true,
          }
        )
        .then((response) => {
          console.log(response);
          if (response.data.data?.errorMessage) {
            setToastObject((prevState) => ({
              ...prevState,
              message: "Error while sending email",
              severity: "error",
              open: true,
            }));
          } else {
            setToastObject((prevState) => ({
              ...prevState,
              message: "Mail has been sent successfully",
              severity: "success",
              open: true,
            }));
          }
        })
        .catch((error) => {
          console.log(error);
          setToastObject((prevState) => ({
            ...prevState,
            message: "Error while sending email",
            severity: "error",
            open: true,
          }));
        });
    }
  };

  const onSubmit = (data) => {
    if (s3Location) {
      sendMail(data);
      reset();
    } else {
      setToastObject((prevState) => ({
        ...prevState,
        message: "Please select email template from Saved Tempaltes",
        severity: "error",
        open: true,
      }));
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <div className="box-1">
          <input
            className="senderEmail"
            {...register("senderEmail")}
            required
            type="email"
            name="senderEmail"
            placeholder="Sender's email address"
          />
          <input
            className="recipientEmail"
            {...register("recipientEmail")}
            required
            type="email"
            name="recipientEmail"
            placeholder="Recipient's email address"
          />
        </div>

        <br />

        <div className="box-2">
          <input {...register("CC")} type="email" placeholder="CC" name="CC" />
        </div>

        <br />
        <div className="box-3">
          <input
            {...register("subject")}
            required
            type="text"
            placeholder="Subject"
            name="subject"
          />
          <button type="submit">Send Test Email</button>
        </div>
      </form>
      <ToastMessage toastObject={toastObject} setToastObject={setToastObject} />
    </>
  );
}

export default RecipientsInfo;
