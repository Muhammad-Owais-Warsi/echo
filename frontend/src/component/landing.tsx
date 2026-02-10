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
            <div className="min-h-screen bg-zinc-950 text-zinc-100">
                {/* Header */}
                <header className="sticky top-0 bg-zinc-950/80 backdrop-blur-sm z-10">
                    <div className="max-w-2xl mx-auto px-6 py-4">
                        <h1 className="text-sm font-medium text-zinc-400">
                            Echo
                        </h1>
                    </div>
                </header>

                {/* Main Content - Blog Style Centered */}
                <main className="max-w-2xl mx-auto px-6 py-16 pb-24">
                    <article className="space-y-12">
                        <div className="space-y-6">
                            <h1 className="text-5xl font-bold tracking-tight">
                                Echo
                            </h1>
                            <p className="text-xl text-zinc-400 leading-relaxed">
                                Real-time terminal sharing for collaboration and
                                demonstrations.
                            </p>
                        </div>

                        <div className="py-8">
                            <form
                                onSubmit={handleJoinSession}
                                className="flex gap-2"
                            >
                                <input
                                    type="text"
                                    className="flex-1 px-4 py-2 bg-zinc-900 rounded-lg text-sm font-mono focus:outline-none focus:ring-1 focus:ring-zinc-700 placeholder:text-zinc-600"
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
                        <div className="space-y-8">
                            <h2 className="text-2xl font-semibold">
                                Getting started
                            </h2>

                            <div className="space-y-8">
                                {/* Step 1 */}
                                <div className="space-y-3">
                                    <h3 className="text-lg font-medium">
                                        Install the CLI
                                    </h3>
                                    <div className="relative group">
                                        <div className="px-4 py-3 bg-zinc-900 rounded-lg font-mono text-sm text-zinc-300">
                                            npm install -g echo-terminal
                                        </div>
                                        <button
                                            onClick={() =>
                                                copyToClipboard(
                                                    "npm install -g echo-terminal",
                                                    setCopied1,
                                                )
                                            }
                                            className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 text-xs bg-zinc-800 text-zinc-400 rounded opacity-0 group-hover:opacity-100 hover:bg-zinc-700 hover:text-zinc-300 transition-all"
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
                                        <div className="px-4 py-3 bg-zinc-900 rounded-lg font-mono text-sm text-zinc-300">
                                            echo start
                                        </div>
                                        <button
                                            onClick={() =>
                                                copyToClipboard(
                                                    "echo start",
                                                    setCopied2,
                                                )
                                            }
                                            className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 text-xs bg-zinc-800 text-zinc-400 rounded opacity-0 group-hover:opacity-100 hover:bg-zinc-700 hover:text-zinc-300 transition-all"
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
                <footer className=" border-zinc-800 mt-24">
                    <div className="max-w-2xl mx-auto px-6 py-8">
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
