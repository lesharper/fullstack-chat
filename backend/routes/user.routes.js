const Router = require("express");
const db = require("../db");
const router = new Router();
const bcrypt = require("bcryptjs");
const multer = require("multer");
const path = require("path")

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./avatars");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const types = ["image/png", "image/jpeg", "image/jpg"];

const fileFilter = (req, file, cb) => {
  if (types.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({storage, fileFilter})

router.post("/registr",upload.single('avatar'), async (req, res) => {
  try {
    const avatar = req.file
    const { username, email, password } = req.body;
    const hashPassword = bcrypt.hashSync(password, 2);
    const newUser = await db.query(
      `INSERT INTO users (username,email,password,image) values ($1,$2,$3,$4)`,
      [username, email, hashPassword, avatar.path]
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
    const { username, email, password } = req.body;
    const user = await db.query(
      `SELECT * FROM users WHERE username = $1 AND email = $2`,
      [username, email]
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

router.get('/unload', async (req, res) => {
  const idUser = req.session.user.id;
  const avatar = await db.query("SELECT image FROM users WHERE id = $1", [idUser])
  const avatarPath = path.relative(__dirname, avatar.rows[0].image)

  res.sendFile(path.join(`${__dirname}`,`${avatarPath}`))
});

module.exports = router;