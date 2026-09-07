import { Server } from "socket.io";

let connections = {};
let messages = {};
let timeOnline = {};

export const connectToSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Something is connected..");
    socket.on("join-call", (path) => {
      if (connections[path] === undefined) {
        connections[path] = [];
      }

      connections[path].push(socket.id); //connection object:-{storing path(localhost..):(socket.id)(unique string assign to each window newly)}

      timeOnline[socket.id] = new Date();

      for (let i = 0; i < connections[path].length; i++) {
        io.to(connections[path][i]).emit(
          "user-joined",
          socket.id,
          connections[path],
        );
      }

      //messages
      if (messages[path] !== undefined) {
        for (let i = 0; i < messages[path].length; i++) {
          io.to(socket.id).emit(
            "chat-message",
            messages[path][i]["data"],
            messages[path][i]["sender"],
            messages[path][i]["socket-id-sender"],
          );
        }
      }
    });

    socket.on("signal", (toId, message) => {
      io.to(toId).emit("signal", socket.id, message);
    });

    socket.on("chat-message", (data, sender) => {
      const [matchingRoom, found] = getRoompath(socket, connections);

      if (found === true) {
        if (messages[matchingRoom] === undefined) {
          messages[matchingRoom] = [];
        }

        messages[matchingRoom].push({
          sender: sender,
          data: data,
          "socket-id-sender": socket.id,
        });
        console.log("message:-", ":", sender, data);
        connections[matchingRoom].forEach((elem) => {
          io.to(elem).emit("chat-message", data, sender, socket.id);
        });
      }
    });

    socket.on("video-toggle", (isVideoOn) => {
  const [matchingRoom, found] = getRoompath(socket, connections);
  if (found) {
    connections[matchingRoom].forEach((elem) => {
      io.to(elem).emit("video-toggle", socket.id, isVideoOn);
    });
  }
});

    socket.on("disconnect", () => {
      const [matchingRoom, found] = getRoompath(socket, connections);
      const TotalConnectionTime = Math.abs(timeOnline[socket.id] - new Date());

      if (found) {
        let index = connections[matchingRoom].indexOf(socket.id);
        connections[matchingRoom].splice(index, 1);

        // emit to remaining members individually — not to a nonexistent room
        connections[matchingRoom].forEach((elem) => {
          io.to(elem).emit("user-left", socket.id);
        });

        delete timeOnline[socket.id];
        if (connections[matchingRoom].length === 0) {
          delete connections[matchingRoom];
        }
      }
    });
  });
};

let getRoompath = (socket, connections) => {
  const matchingEntry = Object.entries(connections).find(
    ([roomKey, roomValue]) => roomValue.includes(socket.id),
  );
  const [matchingRoom, found] = matchingEntry
    ? [matchingEntry[0], true]
    : ["", false];

  return [matchingRoom, found];
};
