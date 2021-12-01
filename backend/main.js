const config = require("./config/default.json");
const secret = config.secret;

const http = require("http")
const express = require("express");
const app = express();

const corsMiddleware = require("./middleware/cors.middleware");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const personRouter = require("./routes/person.routes");
const discussionRouter = require("./routes/discussion.routes");
const {Server} = require("socket.io")

app.use(corsMiddleware);


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(secret));
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
app.use("/api", personRouter);
app.use("/api", discussionRouter);

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    }
})

io.on("connection", (socket) => {
    console.log("User Connected: ", socket.id)

    socket.on("join_room", (room) => {
        socket.join(room)
        console.log(`User with id: ${socket.id} join room ${room}`)
    })

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data)
    })

    socket.on("disconnect", () => {
        console.log("User disconnected: ", socket.id)
    })
})

server.listen(config.serverPort, () => {
  console.log(`SERVER HAS BEEN STARTED ${config.serverPort}`);
});
