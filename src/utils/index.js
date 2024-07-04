import axios from "axios";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";




const API_ROUTES = {
  LOGIN: process.env.REACT_APP_API_URL + "/auth/login",
  LOGOUT: process.env.REACT_APP_API_URL + "/auth/logout",
  VERIFY: process.env.REACT_APP_API_URL + "/auth/verify",
};

const utils = {
  login: async function ({ email, password }) {
    try {
    const response = await axios.post(API_ROUTES.LOGIN, {
      email,
      password,
    });

    return response.data;
  }catch (err) {
    return err.response.data;
  }
  },

  logout: async function (domain) {
    localStorage.clear();
    Cookies.remove("token", { path: "", domain: domain });
  },
  getCookie: function (name) {
    return Cookies.get(name);
  },
  decodeToken: function (token) {
    try {
 
      const decodedVal = jwt_decode(token);
      return decodedVal ? decodedVal.user : null;
    } catch (err) {
      return null;
    }
  },
  verifyToken: async function (token) {
    return axios
      .post(API_ROUTES.VERIFY, {
        token,
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
        return { isLoggedIn: false };
      });
  },
};

export default utils;
