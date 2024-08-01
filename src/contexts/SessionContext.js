import { useState, createContext, useEffect } from "react";
import Cookies from "js-cookie";
import utils from "../utils/index";
// import { useNavigate } from "react-router";

export const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const token = utils.getCookie("token");
  const user = utils.decodeToken(token);
  const [tablesData, setTablesData] = useState({});

  

  const [session, setSession] = useState({
    token,
    user,
  });

  const [userImg, setProfileImg] = useState({});


  const hostname = window.location.hostname;
  let domain = "";
  if (hostname.includes("localhost")) {
    domain = "localhost";
  } else if (
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

  domain = "convertml.ai";

  async function login({ email, password }) {
    const response = await utils.login({
      email,
      password,
    });

    if (response.isLoggedIn === true) {
      Cookies.set("token", response.token, {
        expires: 2,
        domain: domain,
      });
      setSession({
        token: response.token,
        user: utils.decodeToken(response.token),
      });

    } else {
      Cookies.remove("tokedecodeTokenn", { path: "", domain: domain });
    }
    return response;
  }

  async function logout() {
    const response = await utils.logout(domain);
    setSession({
      token: "",
      user: {},
    });
    // return response;
  }

  // (async function () {
  //   let data = await fetch(`${process.env.REACT_APP_API_URL}/user/getUserImages`, {
  //     method: "GET",
  //     headers: {
  //       "Content-type": "application/json",
  //     },
  //     credentials: "include",
  //   });
  //   const res = await data.json();
  //   setProfileImg(res.user)
  // })()

  async function updateSession() {
    let data = await fetch(`${process.env.REACT_APP_API_URL}/user/getUser1`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
        "token": Cookies.get("token")
      },
     
    })
      .then((res) => res.json())
      .then((res) => {
        if(res.status=="success"){
          setSession((prevState) => {
            return {
                ...prevState,
                user: res.user,
            };
        });
        }


      })
  }

  const updateImg =  async() => {
    let data = await fetch(`${process.env.REACT_APP_API_URL}/user/getUserImages`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ "userId": session.user._id })
    })
      .then((res) => res.json())
      .then((res) => {
        if(res.status=="success"){
          setProfileImg({user: res.user})
        }
      })
  }



  return (
    <SessionContext.Provider
      value={[session, login, logout, updateSession, tablesData, setTablesData, userImg, updateImg]}
    >
      {children}
    </SessionContext.Provider>
  );
};
