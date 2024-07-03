import React from "react";
import { Link } from "react-router-dom";

function ActionSection() {
  return (
    <div className="actionSection py-10 bg-black mb-10 text-white">
      <div className="container max-w-screen-xl mx-auto min-h-full px-5">
        <div className="text-5xl font-bold text-center">
          Bring your customer data to life starting with Free Sign-up!!
        </div>
        <div className="buttons flex gap-12 items-center justify-center text-xl font-semibold py-10">
          <a
            href="https://calendly.com/convertml"
            target="_blank"   rel="noopener noreferrer" 
            className="bg-pink py-3 px-10 rounded-full cursor-pointer text-white"
          >
            Get a Demo
          </a>
          <Link
            to="/signup"
            className="border-2 border-pink py-3 px-10 rounded-full cursor-pointer"
          >
            Free Account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ActionSection;
