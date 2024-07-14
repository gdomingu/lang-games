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
    console.log("Client connected");
    socket.join("my-room");
    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
    socket.on("draw", msg => {
      io.to("my-room").emit("draw", msg);
    });
    socket.on("draw-start", msg => {
      io.to("my-room").emit("draw-start", msg);
    });
    socket.on("draw-stop", msg => {
      io.to("my-room").emit("draw-stop", msg);
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
