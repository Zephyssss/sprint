import axios from "axios";

const API_URL_BASE = "https://sprintretrospective.herokuapp.com/api/v1/tag/";
const user = JSON.parse(localStorage.getItem("user"));

const retriveTags = (idboard) => {
  return axios.get(API_URL_BASE + idboard, {
    headers: { "auth-token": user.token },
  });
};

const addTag = (tagname, information, idboard, type) => {
  return axios.post(
    API_URL_BASE,
    {
      tagname,
      information,
      idboard,
      type,
    },
    {
      headers: { "auth-token": user.token },
    }
  );
};

const deleteTag = (id) => {
  return axios.delete(API_URL_BASE + "/" + id, {
    headers: { "auth-token": user.token },
  });
};

const updateTag = (id, tagname, information) => {
  return axios.put(
    API_URL_BASE + "/" + id,
    {
      tagname,
      information
    },
    {
      headers: { "auth-token": user.token },
    }
  );
};

export { retriveTags, addTag, deleteTag, updateTag };
