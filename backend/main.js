const config = require("./config/default.json");
const secret = config.secret;

const http = require("http")
const express = require("express");
const app = express();

const corsMiddleware = require("./middleware/cors.middleware");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const userRouter = require("./routes/user.routes");
const discussionRouter = require("./routes/discussion.routes");
const {Server} = require("socket.io")

app.use(corsMiddleware);
app.use(express.json());
app.use("./avatars",express.static(`${__dirname}` + "/avatars"))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(secret));

app.use(express.static(`${__dirname}/avatars`));
app.use(
  session({
    key: "username",
    secret: secret,
    resave: false,
    saveUninitialized: false,
    domain: "http://localhost",
    path: "/",
    cookie: { maxAge: 86400000, httpOnly: true },
  })
);


app.use("/api", userRouter);
app.use("/api", discussionRouter);


app.listen(config.serverPort, () => {
  console.log(`SERVER HAS BEEN STARTED ${config.serverPort}`);
});
