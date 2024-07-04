import React, { useState } from "react";
import "./index.scss";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { InputLabel, MenuItem, Select, TextField } from "@mui/material";
import ReactHookFormSelect from "./ReactHookFormSelect ";

const schema = yup.object({
  firstName: yup.string().required("First Name Required"),
  workEmail: yup.string().email().required("Work Email Required"),
  hearFrom: yup.string(),
  phoneNumber: yup
    .number()
    .positive()
    .integer()
    .required("Phone Number Required"),
  companyName: yup.string().required("Company Name Required"),
});

function ContactUsForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const hearFrom = useState("");
  const socialChannels = [
    { value: "LinkedIn", text: "LinkedIn" },
    { value: "Google Search", text: "Google Search" },
    { value: "Instagram", text: "Instagram" },
    { value: "Other", text: "Other" },
  ];

  const handleHearFrom = (val) => {
    console.log(val);
  };

  const onSubmit = (data) => console.log(data);
  return (
    <div className="contact">
      <h6>
        Contact us using the form below to learn more about ConvertML. We're
        excited to hear from you!
      </h6>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="field">
          <div className="left">
            <label htmlFor="firstName">Name</label>
          </div>
          <div className="right userName">
            <Controller
              name="firstName"
              control={control}
              defaultValue={""}
              render={({ field }) => (
                <TextField
                  error={!!errors.firstName?.message}
                  id="firstName"
                  label="First Name"
                  variant="outlined"
                  {...field}
                />
              )}
            />
            <Controller
              name="lastName"
              control={control}
              defaultValue={""}
              render={({ field }) => (
                <TextField
                  id="outlined-basic"
                  label="Last Name"
                  variant="outlined"
                  {...field}
                />
              )}
            />
          </div>
        </div>
        <hr></hr>
        <div className="field">
          <div className="left">
            <label htmlFor="workemail">Work Email</label>
          </div>
          <div className="right">
            <Controller
              name="workEmail"
              control={control}
              defaultValue={""}
              render={({ field }) => (
                <TextField
                  id="workemail"
                  label="Email"
                  variant="outlined"
                  error={!!errors.workEmail?.message}
                  {...field}
                />
              )}
            />
          </div>
        </div>
        <hr></hr>
        <div className="field">
          <div className="left">
            <label htmlFor="companyName">Company Name</label>
          </div>
          <div className="right">
            <Controller
              name="companyName"
              control={control}
              defaultValue={""}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  id="companyName"
                  {...field}
                  error={!!errors.companyName?.message}
                  label="Company Name"
                />
              )}
            />
          </div>
        </div>
        <hr></hr>
        <div className="field">
          <div className="left">
            <label htmlFor="phoneNumber">Phone Number</label>
          </div>
          <div className="right">
            <Controller
              name="phoneNumber"
              control={control}
              defaultValue={""}
              render={({ field }) => (
                <TextField
                  label="Phone Number"
                  variant="outlined"
                  id="phoneNumber"
                  error={!!errors.phoneNumber?.message}
                  {...field}
                />
              )}
            />
          </div>
        </div>
        <hr></hr>
        <div className="field">
          <div className="left">
            <label htmlFor="enquiry">How did you hear about ConvertML?</label>
          </div>

          <div className="right">
            <ReactHookFormSelect
              name="hearFrom"
              label="Select an inquiry"
              control={control}
              defaultValue=""
            >
              {socialChannels.map((channel) => (
                <MenuItem key={channel.text} value={channel.value}>
                  {channel.text}
                </MenuItem>
              ))}
            </ReactHookFormSelect>
          </div>
        </div>
        <hr></hr>
        <div className="field">
          <div className="left">
            <label htmlFor="message">Message</label>
          </div>
          <div className="right">
            <Controller
              name="message"
              control={control}
              render={({ field }) => (
                <TextField id="message" label="Message" multiline rows={6} />
              )}
            />
          </div>
        </div>
        <p>
          By submitting this form you agree to ConvertML <a> Privacy Policy </a>
          and you consent to ConvertML contacting you through the provided email
          about products and services.
        </p>
        <hr></hr>
        <div className="submit">
          <input
            className="btn btn-primary bg-pink py-3 my-10 px-5 rounded-full text-white"
            type="submit"
          />
        </div>
      </form>
    </div>
  );
}

export default ContactUsForm;
