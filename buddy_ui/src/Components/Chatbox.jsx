// icons imports
import { RxCross2 } from "react-icons/rx"; // cross (close open chatbox)
import { BiSolidSend } from "react-icons/bi";  // send icon for button 



import { useState } from "react";
import Cookies from "js-cookie";
import Conversationbox from "./Conversationbox";
import Form from "./Form";
import Welcome from "./Welcome";

function Chatbox({ setShowChat }) {
    const [question, setuser_question] = useState("");
    const [Messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    // Load count cookie
    const [count, setCount] = useState(() => {
        const savedCount = Cookies.get("count");
        return savedCount ? parseInt(savedCount, 10) : 0;
    });
    const sendQuestion = async () => {
        if (loading) return;
        if (!question.trim()) return;

        setLoading(true);
        setuser_question(""); // clear input

        setMessages((prev) => [
            ...prev,
            { role: "user", content: question },
            { role: "bot", content: "", loading: true }
        ]);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URI}/bot`, {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ question }),
            });


            if (!response.ok) {
                throw new Error(`Server responded with status: ${response.status}`);
            }

            if (response.headers.get("content-type")?.includes("text/event-stream") ||
                response.headers.get("content-type")?.includes("text/plain")) {
                if (count < 4) {
                    const newCount = count + 1;
                    setCount(newCount);
                    Cookies.set("count", newCount, { expires: 7, path: "/" });
                }

                const reader = response.body.getReader();
                const decoder = new TextDecoder();
                let done = false;

                while (!done) {
                    const { value, done: doneReading } = await reader.read();
                    done = doneReading;

                    if (value) {
                        const chunk = decoder.decode(value, { stream: true });

                        setMessages((prev) => {
                            const updated = [...prev];
                            updated[updated.length - 1] = {
                                ...updated[updated.length - 1],
                                content: updated[updated.length - 1].content + chunk,
                                loading: false,
                            };
                            return updated;
                        });
                    }
                }
            } else {
                throw new Error("Unexpected response type");
            }
        } catch (err) {
            setLoading(false); // This correctly sets the top-level loading state
            setMessages((prev) => {


                const updated = [...prev];
                updated[updated.length - 1] = {
                    role: "bot",
                    content: "Something went wrong. Please try again.",
                    loading: false
                };
                return updated;
            });
        } finally {
            // This is a good practice but is now redundant with the catch block's setLoading
            setLoading(false);
        }
    };


    const userid = Cookies.get("userid");

    let content;
    if (count === 4 && userid !== "VRXUSER-123456") {
        content = <Form Messages={Messages} setMessages={setMessages} />;
    } else if (Messages.length === 0) {
        content = <Welcome />
    }
    else {

        content = <Conversationbox Messages={Messages} loading={loading} />;
    }




    return (



        // ------------------------------------- main chat box container -----------------------------------------------


        <div className="fixed bottom-24 right-2 sm:right-10 
            w-[90%] sm:w-[400px] lg:w-[550px] 
            h-[600px] sm:h-[80vh]
            bg-gray-200 shadow-lg rounded-xl flex flex-col">



            {/* --------------------------------- header of the chat box-------------------------------------- */}

            <header className="h-[10%] bg-[#840227] text-white rounded-t-xl flex justify-between p-2 text-xl items-center">VRNeXGen Buddy
                <div className="flex items-center justify-between gap-2">
                    <button className="h-7 px-3 bg-[#f5f5f5] rounded-xl text-xs text-black delay-150 duration-300 ease-in-out hover:hover:scale-110"
                        onClick={() => {
                            setMessages([])
                        }}
                    >
                        New Chat
                    </button>
                    <button className="text-lg" onClick={() => setShowChat(false)}>
                        <RxCross2 />
                    </button>
                </div>
            </header>


            {/*----------------------------------- Body of the chat box --------------------------------------------- */}





            <div className="h-[80%] p-2 overflow-y-scroll overflow-x-hidden flex flex-col justify-center">
                {content}
            </div>





            {/* ---------------------------------footer of the chat box ---------------------------------------------*/}

            <footer className="h-[10%] flex p-2 sm:p-3 items-center gap-2 rounded-b-xl">
                <input placeholder="How can I help you today?"
                    value={question}
                    onChange={(e) => { setuser_question(e.target.value) }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            sendQuestion();
                        }
                    }}
                    className="flex-1 p-2 h-9 sm:h-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#840227] text-sm sm:text-base bg-gray-100"></input>
                <button className="bg-[#840227] text-white px-3 py-2 sm:px-4 rounded-lg hover:opacity-90 flex items-center justify-center disabled:opacity-50" onClick={sendQuestion}><BiSolidSend /></button>
            </footer>

        </div >
    )
}

export default Chatbox;