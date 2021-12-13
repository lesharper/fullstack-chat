const config = require("./config/default.json");
const secret = config.secret;


const express = require("express");
const app = express();

const corsMiddleware = require("./middleware/cors.middleware");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const userRouter = require("./routes/user.routes");
const discussionRouter = require("./routes/discussion.routes");

const path = require("path");

const server = require('http').createServer(app)
app.use(corsMiddleware);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(secret));

app.use(express.static(path.join(`${__dirname}/routes/avatars`)));
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

const io = require('socket.io')(server, {
    cors: {
        origin: '*'
    }
})

io.on('connection', socket => {
    socket.on('message', ({ name, message }) => {
        io.emit('message', { name, message })
    })
})

app.use("/api", userRouter);
app.use("/api", discussionRouter);


server.listen(config.serverPort, () => {
  console.log(`SERVER HAS BEEN STARTED ${config.serverPort}`);
});
