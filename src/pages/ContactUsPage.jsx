import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/molecules/Navbar";
import ContactUsBanner from "../components/atoms/ContactUsBanner";
import ContactUsForm from "../components/atoms/ContactUsForm";
import ContactUsSocialMedia from "../components/atoms/ContactUsSocialMedia";

function ContactUsPage() {
  return (
    <div>
      <Navbar />
      <ContactUsBanner />
      <ContactUsForm />
      <ContactUsSocialMedia />
      <Footer />
    </div>
  );
}

export default ContactUsPage;
