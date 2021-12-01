const Router = require("express");
const db = require("../db");
const router = new Router();
const bcrypt = require("bcryptjs");

router.post("/registr", async (req, res) => {
  try {
    const { username, email, login, password } = req.body;
    const hashPassword = bcrypt.hashSync(password, 2);
    const newUser = await db.query(
      `INSERT INTO users (username,email,login,password) values ($1,$2,$3,$4)`,
      [username, email, login, hashPassword]
    );
    res.status(200).json({ message: "Успех! Аккаунт создан" });
  } catch (err) {
    console.log(err);
    res.json({
      message: "Неудача! Пользователь с таким именем/почтой, уже существует",
    });
  }
});

router.get("/login", async (req, res) => {
  if (req.session.user) {
    res.json({ isAuth: true, user: req.session.user });
  } else {
    res.json({ isAuth: false });
  }
});

router.get("/logout", async (req, res) => {
  if (req.session.user) {
    res.clearCookie("username");
    res.status(200).json({ isAuth: false });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, email, login, password } = req.body;
    const user = await db.query(
      `SELECT * FROM users WHERE username = $1 AND email = $2 AND login = $3`,
      [username, email, login]
    );
    if (bcrypt.compareSync(password, user.rows[0].password)) {
      req.session.user = user.rows[0];
      return res.json({ message: "Успех!" });
    } else return res.json({ message: "Неудача! Пользователя не существует." });
  } catch (err) {
    res.json({ message: "Неккоректные данные" });
    console.log(err);
  }
});

module.exports = router;
