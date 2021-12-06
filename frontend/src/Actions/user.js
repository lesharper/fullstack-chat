import axios from "axios";

axios.defaults.withCredentials = true;

export const registration = async (
  e,
  setAnswer,
  setIsRegister,
  username,
  email,
  password,
  avatar
) => {
  e.preventDefault();
  try {
    const data = new FormData()
    data.append("username",username)
    data.append("email",email)
    data.append("password",password)
    data.append("avatar",avatar)

    await axios.post(`/api/registr`, data)
      .then(res => {
        setAnswer(res.data.message);
        setIsRegister(res.data.message === "Успех! Аккаунт создан");
      });
  } catch (e) {
    console.log(e);
  }
};

export const authorization = async (e, setAnswer, setIsLogin, username, email, password) => {
  try {
    e.preventDefault();
    await axios
      .post(`/api/login`, {
        username,
        email,
        password
      })
      .then(res => {
        setAnswer(res.data.message);
        setIsLogin(res.data.message === "Успех!");
      });
  } catch (e) {
    alert(e);
  }
  window.location.reload()
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
  window.location.reload()
};

export const unload = async  setAvatar => {
  await axios.get("/api/unload").then(res => {
    setAvatar("/api/unload")
  })
}
