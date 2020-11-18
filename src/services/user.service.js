import axios from "axios";
import {URL} from "./url.js"

const API_URL_BASE = URL + "user";
const user = JSON.parse(localStorage.getItem("user"));

const retriveUser = () => {
  return axios.get(API_URL_BASE, {
    headers: { "auth-token": user.token },
  });
};

const updateUser = (name) => {
  return axios.put(
    API_URL_BASE,
    {
      name,
    },
    {
    headers: { "auth-token": user.token },
  });
};

export { retriveUser, updateUser};
