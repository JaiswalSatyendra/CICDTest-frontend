import Team from "../components/atoms/Team/index";
import Journey from "./../components/atoms/Journey/index";
import Navbar from "../components/molecules/Navbar";
import AboutUsBanner from "../components/atoms/AboutUsBanner";
import Footer from "../components/Footer";
import Learn from "../components/atoms/Learn";

const Aboutus = () => {
  return (
    <div>
      <Navbar />
      <AboutUsBanner />
      <Journey />
      <Team />
      <Learn />
      <Footer />
    </div>
  );
};

export default Aboutus;
