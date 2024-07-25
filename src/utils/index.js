import axios from "axios";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";

const API_ROUTES = {
  LOGIN: process.env.REACT_APP_API_URL + "/auth/login",
  LOGOUT: process.env.REACT_APP_API_URL + "/auth/logout",
  VERIFY: process.env.REACT_APP_API_URL + "/auth/verify",
};

async function encryptString(text, password) {
  const encoder = new TextEncoder();
  const encodedText = encoder.encode(text);

  const passwordBuffer = encoder.encode(password);
  const passwordHash = await crypto.subtle.digest('SHA-256', passwordBuffer);

  const iv = crypto.getRandomValues(new Uint8Array(16));

  const aesKey = await crypto.subtle.importKey(
    'raw',
    passwordHash,
    { name: 'AES-CBC' },
    false,
    ['encrypt']
  );

  const encrypted = await crypto.subtle.encrypt(
    {
      name: 'AES-CBC',
      iv: iv,
    },
    aesKey,
    encodedText
  );

  // Combine IV and encrypted data into a single array
  const combinedArray = new Uint8Array(iv.byteLength + encrypted.byteLength);
  combinedArray.set(iv, 0);
  combinedArray.set(new Uint8Array(encrypted), iv.byteLength);

  // Convert to base64
  const encryptedBase64 = btoa(String.fromCharCode.apply(null, combinedArray));
  return encryptedBase64;
}

const utils = {
  login: async function ({ email, password }) {
    // let password = await encryptString(password1, password1)
    try {
      const response = await axios.post(API_ROUTES.LOGIN, {
        email,
        password,
      });

      return response.data;
    } catch (err) {
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
