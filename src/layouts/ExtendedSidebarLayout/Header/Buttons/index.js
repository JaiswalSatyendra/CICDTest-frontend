import { Box } from "@mui/material";
import LanguageSwitcher from "./LanguageSwitcher";
import "./index.scss";
//import { useNavigate } from "react-router-dom";

function HeaderButtons() {
  //let navigate = useNavigate();
  return (
    <Box>
      {/* <button
        onClick={() => {
          navigate("/dashboard/upgardeacc");
        }}
        className="btnUpgradeAcc"
      >
        Upgrade Account
      </button> */}
      <LanguageSwitcher />
    </Box>
  );
}

export default HeaderButtons;
