import axios from "axios";

const API_URL_BASE = "https://sprintretrospective.herokuapp.com/api/v1/board";
const user = JSON.parse(localStorage.getItem("user"));

const retriveBoards = () => {
  return axios.get(API_URL_BASE, {
    headers: { "auth-token": user.token },
  });
};

const addBoard = (boardname) => {
  return axios.post(
    API_URL_BASE,
    {
      boardname,
    },
    {
      headers: { "auth-token": user.token },
    }
  );
};

const deleteBoard = (id) => {
  return axios.delete(
    API_URL_BASE + "/" + id, {
    headers: { "auth-token": user.token },
  });
};

const updateBoard = (id, boardname) => {
  return axios.put(
    API_URL_BASE + "/" + id,
    {
      boardname,
    },
    {
    headers: { "auth-token": user.token },
  });
};

export { retriveBoards, addBoard, deleteBoard, updateBoard};
