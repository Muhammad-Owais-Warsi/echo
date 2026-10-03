import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Landing() {
    const navigate = useNavigate();
    const [sessionId, setSessionId] = useState("");
    const [copied1, setCopied1] = useState(false);
    const [copied2, setCopied2] = useState(false);

    const handleJoinSession = (e: React.FormEvent) => {
        e.preventDefault();
        if (sessionId.trim()) {
            navigate(`/share/${sessionId.trim()}`);
        }
    };

    const copyToClipboard = (
        text: string,
        setterFn: (val: boolean) => void,
    ) => {
        navigator.clipboard.writeText(text);
        setterFn(true);
        setTimeout(() => setterFn(false), 2000);
    };

    return (
        <>
            <style>{`
                ::-webkit-scrollbar {
                    width: 10px;
                }
                ::-webkit-scrollbar-track {
                    background: #09090b;
                }
                ::-webkit-scrollbar-thumb {
                    background: #27272a;
                    border-radius: 5px;
                }
                ::-webkit-scrollbar-thumb:hover {
                    background: #3f3f46;
                }
                * {
                    scrollbar-width: thin;
                    scrollbar-color: #27272a #09090b;
                }
            `}</style>
            <div className="min-h-screen md:h-screen md:overflow-hidden bg-zinc-950 text-zinc-100 flex flex-col">
                {/* Header */}
                <header className="shrink-0 bg-zinc-950/80 backdrop-blur-sm z-10">
                    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
                        <h1 className="text-sm font-medium text-zinc-400">
                            Echo
                        </h1>
                        <a
                            href="https://github.com/Muhammad-Owais-Warsi/echo"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub"
                            className="text-zinc-500 hover:text-zinc-200 transition-colors"
                        >
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.15c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.77 1.05.77 2.12v3.15c0 .3.21.67.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
                            </svg>
                        </a>
                    </div>
                </header>

                {/* Main Content - Blog Style Centered */}
                <main className="max-w-2xl mx-auto px-4 sm:px-6 w-full flex-1 flex flex-col justify-center py-6">
                    <article className="space-y-8 sm:space-y-10">
                        <div className="space-y-3 sm:space-y-4">
                            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
                                Echo
                            </h1>
                            <p className="text-lg sm:text-xl text-zinc-400 leading-relaxed">
                                Real-time terminal sharing for collaboration and
                                demonstrations.
                            </p>
                        </div>

                        <div className="py-0">
                            <form
                                onSubmit={handleJoinSession}
                                className="flex flex-col sm:flex-row gap-2"
                            >
                                <input
                                    type="text"
                                    className="flex-1 min-w-0 px-4 py-2 bg-zinc-900 rounded-lg text-sm font-mono focus:outline-none focus:ring-1 focus:ring-zinc-700 placeholder:text-zinc-600"
                                    placeholder="Enter session ID to join"
                                    value={sessionId}
                                    onChange={(e) =>
                                        setSessionId(e.target.value)
                                    }
                                    autoFocus
                                />
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-zinc-100 text-zinc-900 rounded-lg text-sm font-medium hover:bg-white transition-colors focus:outline-none focus:ring-1 focus:ring-zinc-700"
                                >
                                    Join
                                </button>
                            </form>
                        </div>

                        {/* Getting Started */}
                        <div className="space-y-5">
                            <h2 className="text-xl sm:text-2xl font-semibold">
                                Getting started
                            </h2>

                            <div className="space-y-5">
                                {/* Step 1 */}
                                <div className="space-y-3">
                                    <h3 className="text-lg font-medium">
                                        Install the CLI
                                    </h3>
                                    <div className="relative group">
                                        <div className="px-4 py-3 pr-20 bg-zinc-900 rounded-lg font-mono text-xs sm:text-sm text-zinc-300 overflow-x-auto whitespace-nowrap">
                                            npm install -g echo-terminal
                                        </div>
                                        <button
                                            onClick={() =>
                                                copyToClipboard(
                                                    "npm install -g echo-terminal",
                                                    setCopied1,
                                                )
                                            }
                                            className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 text-xs bg-zinc-800 text-zinc-400 rounded opacity-100 sm:opacity-0 sm:group-hover:opacity-100 hover:bg-zinc-700 hover:text-zinc-300 transition-all"
                                        >
                                            {copied1 ? "Copied!" : "Copy"}
                                        </button>
                                    </div>
                                </div>

                                {/* Step 2 */}
                                <div className="space-y-3">
                                    <h3 className="text-lg font-medium">
                                        Start sharing
                                    </h3>
                                    <div className="relative group">
                                        <div className="px-4 py-3 pr-20 bg-zinc-900 rounded-lg font-mono text-xs sm:text-sm text-zinc-300 overflow-x-auto whitespace-nowrap">
                                            echo-terminal
                                        </div>
                                        <button
                                            onClick={() =>
                                                copyToClipboard(
                                                    "echo-terminal",
                                                    setCopied2,
                                                )
                                            }
                                            className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 text-xs bg-zinc-800 text-zinc-400 rounded opacity-100 sm:opacity-0 sm:group-hover:opacity-100 hover:bg-zinc-700 hover:text-zinc-300 transition-all"
                                        >
                                            {copied2 ? "Copied!" : "Copy"}
                                        </button>
                                    </div>
                                    <p className="text-sm text-zinc-500">
                                        Add{" "}
                                        <code className="px-1.5 py-0.5 bg-zinc-800 rounded text-zinc-400">
                                            --edit
                                        </code>{" "}
                                        flag to allow viewers to type in your
                                        terminal.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </article>
                </main>

                {/* Footer */}
                <footer className="shrink-0 border-zinc-800">
                    <div className="max-w-2xl mx-auto px-6 py-4">
                        <p className="text-center text-sm text-zinc-500">
                            Built by{" "}
                            <a
                                href="https://x.com/MO_warsi786"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-zinc-400 hover:text-zinc-300 transition-colors"
                            >
                                @owais
                            </a>
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}
