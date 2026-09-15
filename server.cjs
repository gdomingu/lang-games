const {createServer} = require("node:http");
const {Server} = require("socket.io");

const hostname = "localhost";
const port = Number(process.env.SOCKET_PORT || 3001);

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: process.env.APP_ORIGIN || "http://localhost:3000",
  },
});

io.on("connection", socket => {
  socket.on("join-room", roomCode => {
    socket.join(roomCode);
  });

  for (const event of ["draw", "draw-start", "draw-stop", "style-change", "clear-canvas"]) {
    socket.on(event, (roomCode, message) => {
      socket.to(roomCode).emit(event, message);
    });
  }
});

httpServer
  .once("error", error => {
    console.error(error);
    process.exit(1);
  })
  .listen(port, hostname, () => {
    console.log(`> Socket server ready on http://${hostname}:${port}`);
  });
