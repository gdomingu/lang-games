const next = require("next");
const {createServer} = require("node:http");
const {Server} = require("socket.io");

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({dev, hostname, port});
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", socket => {
    socket.on("join-room", roomCode => {
      socket.join(roomCode);
    });

    socket.on("draw", (roomCode, msg) => {
      io.to(roomCode).emit("draw", msg);
    });
    socket.on("draw-start", (roomCode, msg) => {
      io.to(roomCode).emit("draw-start", msg);
    });
    socket.on("draw-stop", (roomCode, msg) => {
      io.to(roomCode).emit("draw-stop", msg);
    });
    socket.on("style-change", (roomCode, msg) => {
      io.to(roomCode).emit("style-change", msg);
    });
  });

  httpServer
    .once("error", err => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
