import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { SessionContext } from "../contexts/SessionContext";
import Cookies from "js-cookie";
import utils from "../utils/index";

function RequireAuth({ children }) {
  const [session] = useContext(SessionContext);
  if (!session.token) {
    return <Navigate to="/login" />;
  }
  const hostname = window.location.hostname;
  let domain = "";
  if (hostname.includes("localhost")) {
    domain = "localhost";
  }else if (
    hostname.includes(
      "test.convertml.ai"
    )
  ) {
    domain = "test.convertml.ai";
  }
  else if (hostname.includes("cml-test.convertml.ai")) 
    {
    domain = "cml-test.convertml.ai";
  }
  else {
    domain = "convertml.ai";
  }
  domain="cml-test.convertml.ai"
  const token = Cookies.get("token", { domain: domain });
  utils
    .verifyToken(token)
    .then((res) => {
      if (!res.isLoggedIn) {
        Cookies.remove("token", { path: "", domain: domain });
        return <Navigate to="/login" />;
      } else {
        return <>{children}</>;
      }
    })
    .catch((err) => {
      return <Navigate to="/login" />;
    });

  return <>{children}</>;
}

export default RequireAuth;
