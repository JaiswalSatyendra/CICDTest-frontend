import React from "react";
import HomeFooter from "../../components/home-footer";
import { Link } from "react-router-dom";
import Navbar from "../../components/molecules/Navbar";

function ErrorPage() {
  return  <> 
   <Navbar />
   {/* ------------------- banner   ------------------- */}
   <div className="banner-onlyheading">
   
   </div>
   {/* ------------------- banner   ------------------- */}
   <br />
   <div className="container-home text-center" >
   <h1>Oops!</h1>
   <h2>404 - Page Not Found</h2> 
   <br /> <br /> <br /> <br />
   </div>
   <HomeFooter />
 </>;
}

export default ErrorPage;
