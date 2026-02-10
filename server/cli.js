#!/usr/bin/env node

const io = require("socket.io-client");
const pty = require("node-pty");

const FRONTEND = "https://echo-dsbr.onrender.com";

const socket = io("https://echo-backend-aj96.onrender.com");
const args = process.argv.slice(2);
const isEditable = args.includes("--edit");

socket.on("connect", () => {
    socket.emit("create-session");
});

socket.on("session-created", (roomId) => {
    const roomStr = String(roomId);
    console.log(`\n SHARING ACTIVE | ROOM: ${FRONTEND}/share/${roomStr}\n`);
    console.log(
        `MODE: ${isEditable ? "Writable (Editing Enabled)" : "Read-Only"}`,
    );

    const shell = process.env.SHELL || "bash";
    const ptyProcess = pty.spawn(shell, [], {
        name: "xterm-color",
        cols: process.stdout.columns,
        rows: process.stdout.rows,
        cwd: process.cwd(),
        env: process.env,
    });

    // // 1. Prevent "Rapid Fire" Enters
    // let isRefreshing = false;
    // socket.on("init-render", () => {
    //     if (isRefreshing) return;
    //     isRefreshing = true;
    //     ptyProcess.write("\r"); // Nudge the shell to show prompt
    //     setTimeout(() => {
    //         isRefreshing = false;
    //     }, 500);
    // });

    if (isEditable) {
        socket.on("remote-input", (data) => {
            ptyProcess.write(data);
        });
    }
    ptyProcess.onData((data) => {
        process.stdout.write(data);
        socket.emit("terminal-data", { roomId: roomStr, data });
    });

    // 3. Handle Input (Keyboard -> Shell)
    process.stdin.on("data", (data) => {
        ptyProcess.write(data);
    });

    process.stdin.setRawMode(true);

    ptyProcess.onExit(() => {
        process.exit();
    });
});
