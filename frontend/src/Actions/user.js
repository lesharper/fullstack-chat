import axios from "axios";

axios.defaults.withCredentials = true;

export const registration = async (
  e,
  setAnswer,
  setIsRegister,
  username,
  email,
  login,
  password
) => {
  e.preventDefault();
  try {
    await axios
      .post(`/api/registr`, {
        username,
        email,
        login,
        password,
      })
      .then(res => {
        setAnswer(res.data.message);
        setIsRegister(res.data.message === "Успех! Аккаунт создан");
      });
  } catch (e) {
    console.log(e);
  }
};

export const authorization = async (e, setAnswer, setIsLogin, username, email, login, password) => {
  try {
    e.preventDefault();
    await axios
      .post(`/api/login`, {
        username,
        email,
        login,
        password,
      })
      .then(res => {
        setAnswer(res.data.message);
        setIsLogin(res.data.message === "Успех!");
      });
  } catch (e) {
    alert(e);
  }
};

export const authentication = async (setIsAuth, setUsernameData, setEmail, setId) => {
  await axios.get("/api/login").then(res => {
    const { isAuth, user } = res.data;
    setIsAuth(isAuth);
    if (user) {
      setUsernameData(user.username);
      setEmail(user.email);
      setId(user.id);
    }
  });
};

export const logout = async setIsAuth => {
  await axios.get("/api/logout").then(res => {
    const { isAuth } = res.data;
    setIsAuth(isAuth);
  });
};
