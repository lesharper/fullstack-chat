const Router = require("express");
const db = require("../db");
const multer = require("multer");
const path = require("path");
const router = new Router();


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '/posters/'));
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

router.get("/get_discussions", async (req, res) => {
  try {
    const idUser = req.session.user.id;
    const all_coincident = [];

    const info_combo = await db.query(
      `SELECT users_discussion.userid, discussion.id, discussion.title FROM users_discussion JOIN discussion ON users_discussion.discussionid = discussion.id;`
    );
    for (let i = 0; i < info_combo.rows.length; i++) {
      if (info_combo.rows[i].userid == idUser) all_coincident.push(info_combo.rows[i]);
    }
    res.json({ all_coincident });
  } catch (error) {
    console.log(error);
  }
});

router.post("/search_discussion", async (req, res) => {
  try {
    const all_found_coincident = [];
    const { search } = req.body;
    const find_discussion = await db.query(`SELECT * FROM discussion WHERE title LIKE $1`, [
      "%" + search + "%",
    ]);
    for (let i = 0; i < find_discussion.rows.length; i++) {
      all_found_coincident.push(find_discussion.rows[i]);
    }
    res.json({ all_found_coincident });
  } catch (error) {
    console.log(error);
  }
});

router.post("/create_discussion", upload.single('poster'), async (req, res) => {
  try {
    const poster = req.file
    const idUser = req.session.user.id;
    const { title } = req.body;
    const newDiscussion = await db.query(
      `INSERT INTO discussion (title,creatorid,image) values ($1,$2,$3) RETURNING id`,
      [title, idUser, poster.path]
    );
    const idDiscussion = newDiscussion.rows[0].id;
    const combined = await db.query(
      `INSERT INTO users_discussion (userid,discussionid) values ($1,$2)`,
      [idUser, idDiscussion]
    );
    res.status(200).json({ message: "Успех!" });
  } catch (error) {
    console.log(error);
  }
});

router.post("/delete_discussion", async (req, res) => {
  try {
    const { id } = req.body;
    const remove = await db.query(`DELETE FROM users_discussion WHERE discussionid = $1`, [id]);
    res.status(200).json({ message: "Успех!" });
  } catch (error) {
    console.log(error);
  }
});

router.post("/join_discussion", async(req, res) => {
  try {
    const idUser = req.session.user.id;
    const {id} = req.body
    const userCheck = await db.query("SELECT * from users_discussion WHERE userId = $1 AND discussionId = $2", [idUser, id])
    if(userCheck.rows.length == 0) await db.query("INSERT INTO users_discussion (userId, discussionId) values ($1, $2)", [idUser, id])

    res.status(200).json({message: "Успех!"})
  }
  catch(error) {
    console.log(error)
  }
})

module.exports = router;