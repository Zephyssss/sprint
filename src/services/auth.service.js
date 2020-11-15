import axios from "axios";

const API_URL_BASE = "https://sprintretrospective.herokuapp.com/api/v1/auth/";

//call api login
const login = (username, password) => {
  return (
    axios
      .post(API_URL_BASE + "login", {
        username,
        password,
      })
      //- Flow work: axios resolve() -> login resolve() -> login reject() *maybe
      //- or :login reject()
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data));
        return response.data;
      })
  );
  // - if we write the CODE BLOCK BELOW, the message error after catch will perform
  //   in RESOLVE when Promise call.
  // - Flow work: axios reject() -> login resolve() -> login reject() *maybe

  // .catch((error) => {
  //   return error.response.data.message;
  // });
};

// Call api register
const register = (name, username, password, repeat_password) => {
  return axios
    .post(API_URL_BASE + "register", {
      name,
      username,
      password,
      repeat_password,
    })
    .then((response) => {
      console.log(response.data);
    });
};

// i remove account in localStorage.
const logout = () => {
  localStorage.removeItem("user");
  return true;
};

export { login, register, logout };
