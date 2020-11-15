import axios from "axios";

const API_URL_BASE = "https://sprintretrospective.herokuapp.com/api/v1/user";
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
