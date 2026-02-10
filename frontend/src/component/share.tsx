import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import "xterm/css/xterm.css";
import { socket } from "../socket";

export default function Share() {
    const { id } = useParams();
    const terminalRef = useRef<HTMLDivElement>(null);
    const term = useRef<Terminal | null>(null);
    const fitAddon = useRef(new FitAddon());
    const [connected, setConnected] = useState(0);
    const [copied, setCopied] = useState(false);

    // 1. Initialize Terminal
    useEffect(() => {
        if (!terminalRef.current) return;

        term.current = new Terminal({
            cursorBlink: true,
            fontSize: 14,
            lineHeight: 1.4,
            fontFamily:
                '"Fira Code", "Cascadia Code", "JetBrains Mono", monospace',
            theme: {
                background: "#09090b",
                foreground: "#fafafa",
                cursor: "#fafafa",
                black: "#27272a",
                red: "#ef4444",
                green: "#22c55e",
                yellow: "#eab308",
                blue: "#3b82f6",
                magenta: "#a855f7",
                cyan: "#06b6d4",
                white: "#d4d4d8",
                brightBlack: "#52525b",
                brightRed: "#f87171",
                brightGreen: "#4ade80",
                brightYellow: "#facc15",
                brightBlue: "#60a5fa",
                brightMagenta: "#c084fc",
                brightCyan: "#22d3ee",
                brightWhite: "#fafafa",
            },
            scrollback: 10000,
            cursorStyle: "block",
            cursorInactiveStyle: "outline",
        });

        term.current.loadAddon(fitAddon.current);
        term.current.open(terminalRef.current);

        // Initial fit with proper timing
        setTimeout(() => {
            fitAddon.current.fit();
            term.current?.refresh(0, term.current.rows - 1);
        }, 0);

        const handleResize = () => {
            fitAddon.current.fit();
            term.current?.refresh(0, term.current.rows - 1);
            // Notify server of new terminal size
            if (term.current && id) {
                socket.emit("resize", {
                    roomId: id,
                    cols: term.current.cols,
                    rows: term.current.rows,
                });
            }
        };

        window.addEventListener("resize", handleResize);

        // Add custom scrollbar styles
        const styleSheet = document.createElement("style");
        styleSheet.textContent = `
            .xterm-viewport::-webkit-scrollbar {
                width: 10px;
            }
            .xterm-viewport::-webkit-scrollbar-track {
                background: #09090b;
            }
            .xterm-viewport::-webkit-scrollbar-thumb {
                background: #27272a;
                border-radius: 5px;
            }
            .xterm-viewport::-webkit-scrollbar-thumb:hover {
                background: #3f3f46;
            }
            .xterm-viewport {
                scrollbar-width: thin;
                scrollbar-color: #27272a #09090b;
            }
        `;
        document.head.appendChild(styleSheet);

        return () => {
            window.removeEventListener("resize", handleResize);
            document.head.removeChild(styleSheet);
            term.current?.dispose();
            term.current = null;
        };
    }, []);

    // 2. Handle Socket Communication
    useEffect(() => {
        if (!id || !term.current) return;

        // Tell server we joined
        socket.emit("join-session", id);

        // Send terminal dimensions to server for proper PTY sizing
        const sendSize = () => {
            if (term.current) {
                socket.emit("resize", {
                    roomId: id,
                    cols: term.current.cols,
                    rows: term.current.rows,
                });
            }
        };

        // Send initial size
        setTimeout(sendSize, 100);

        // Listen for existing data/buffer (Optional: depends on your backend)
        // socket.on("initial-buffer", (data) => term.current?.write(data));

        socket.on("stats", (count) => {
            setConnected(count);
        });

        socket.on("render-data", (data) => {
            if (term.current) {
                term.current.write(data);
                // Ensure cursor is visible after data is written
                if (
                    term.current.buffer.active.cursorY === 0 &&
                    term.current.buffer.active.cursorX === 0
                ) {
                    fitAddon.current.fit();
                }
            }
        });

        const disposable = term.current.onData((data: string) => {
            socket.emit("web-input", { roomId: id, data });
        });

        return () => {
            socket.off("stats");
            socket.off("render-data");
            disposable.dispose();
        };
    }, [id]);

    const copySessionId = () => {
        if (!id) return;
        navigator.clipboard.writeText(id);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="h-screen bg-zinc-950 flex flex-col">
            <header className="border-b border-zinc-800">
                <div className="flex items-center justify-between px-6 py-3">
                    <div className="flex items-center gap-6">
                        <h1 className="text-sm font-medium text-zinc-100">
                            Echo
                        </h1>
                        <button
                            onClick={copySessionId}
                            className="px-3 py-1.5 text-xs font-mono bg-zinc-900 border border-zinc-800 rounded-md text-zinc-400 hover:text-zinc-300 hover:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-700"
                        >
                            {copied ? "Copied!" : id}
                        </button>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-zinc-400">
                        <span
                            className={`w-2 h-2 rounded-full ${
                                connected > 0 ? "bg-emerald-500" : "bg-zinc-700"
                            }`}
                        ></span>
                        <span className="text-xs">
                            {connected} {connected === 1 ? "viewer" : "viewers"}
                        </span>
                    </div>
                </div>
            </header>

            <main className="flex-1 p-6 overflow-hidden">
                <div
                    ref={terminalRef}
                    className="h-full w-full border border-zinc-800 rounded-md overflow-hidden bg-[#09090b]"
                />
            </main>
        </div>
    );
}
