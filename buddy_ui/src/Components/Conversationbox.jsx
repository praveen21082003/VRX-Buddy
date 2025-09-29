import { useRef, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function Conversationbox({ Messages }) {
    const bottomref = useRef(null);

    useEffect(() => {
        bottomref.current?.scrollIntoView({ behavior: "smooth" });
    }, [Messages]);

    return (
        <div className="h-full w-full">
            {Messages.map((msg, index) => {
                if (msg.role === "user") {
                    return (
                        <div key={index} className="flex justify-end gap-2">
                            <div
                                className="mt-4 p-2 max-w-[70%] rounded-lg text-white bg-[#840227] 
                                text-sm sm:text-base break-words overflow-hidden"
                            >
                                {msg.content}
                            </div>
                            <FaUser className="mt-6 text-[#840227]" />
                        </div>
                    );
                } else {
                    return (
                        <div key={index} className="mt-4 flex">
                            <div className="relative flex items-center justify-center w-10 h-10">
                                {msg.loading && (
                                    <div
                                        className="absolute w-8 h-8 border-4 border-t-transparent rounded-full animate-spin"
                                        style={{
                                            borderRightColor: "#f87171", // red
                                            borderBottomColor: "#34d399", // green
                                            borderLeftColor: "#60a5fa", // blue
                                        }}
                                    ></div>
                                )}
                                <img
                                    src="./logo.png"
                                    alt="bot"
                                    className={`h-6 z-auto transition-transform duration-300 ${msg.loading ? "scale-50" : "scale-100"
                                        }`}
                                />
                            </div>
                            {msg.content === "" ? (
                                <div
                                    className="flex items-center space-x-1 p-2"
                                    aria-label="Bot is typing..."
                                >
                                    <span
                                        className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                                        style={{ animationDelay: "0ms" }}
                                    ></span>
                                    <span
                                        className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                                        style={{ animationDelay: "150ms" }}
                                    ></span>
                                    <span
                                        className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                                        style={{ animationDelay: "300ms" }}
                                    ></span>
                                </div>
                            ) : (
                                <div
                                    className="p-2 max-w-[70%] bg-white text-sm sm:text-base 
                                            border border-black/5 shadow-md rounded-xl 
                                            break-words overflow-hidden"
                                >
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                        {msg.content}
                                    </ReactMarkdown>
                                </div>
                            )}

                            <div ref={bottomref} />
                        </div>
                    );
                }
            })}
        </div>
    );
}

export default Conversationbox;
