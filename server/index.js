const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const cors = require("cors");

const PORT = 3000;
const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

app.use(cors("*"));

io.on("connection", (socket) => {
    socket.on("create-session", () => {
        const roomId = Math.random().toString(36).substring(7);
        socket.join(roomId);
        console.log(roomId);
        socket.emit("session-created", roomId);
    });

    socket.on("join-session", (roomId) => {
        socket.join(roomId);

        const participants = io.sockets.adapter.rooms.get(roomId);
        const count = participants ? participants.size - 1 : 0;

        // Send the updated count to everyone in the room
        io.to(roomId).emit("stats", count);
        // socket.emit("joined");
        // socket.to(roomId).emit("init-render");
    });

    socket.on("web-input", ({ roomId, data }) => {
        socket.to(roomId).emit("remote-input", data);
    });

    socket.on("disconnecting", () => {
        for (const roomId of socket.rooms) {
            const participants = io.sockets.adapter.rooms.get(roomId);
            if (participants) {
                const count = Math.max(0, participants.size - 2);
                io.to(roomId).emit("stats", count);
            }
        }
    });

    socket.on("terminal-data", ({ roomId, data }) => {
        socket.to(roomId).emit("render-data", data);
    });
});

app.get("/", (req, res) => {
    console.log("Root route accessed");

    // Send a response to the user so the browser doesn't hang
    res.status(200).send("Server is live!");
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
