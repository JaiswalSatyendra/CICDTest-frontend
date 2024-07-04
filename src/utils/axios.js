import axios from 'axios';
import Cookies from "js-cookie";
import AxiosMockAdapter from 'axios-mock-adapter';

const axiosInt = axios.create();

// axios.defaults.headers.common['Authorization'] = Cookies.get("token");
axiosInt.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || 'There is an error!'
    )
);

export const mock = new AxiosMockAdapter(axiosInt, { delayResponse: 0 });

export default axiosInt;
