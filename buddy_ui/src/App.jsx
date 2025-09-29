
import { useState } from "react";
// import { RiChatSmile3Line } from "react-icons/ri";


// component import
import Chatbox from "./Components/ChatBox.jsx";






function App() {
  const [ShowChat, setShowChat] = useState(false);
  const chattogle = () => {
    setShowChat((prev) => !prev);
  }

  return (
    <div className="relative w-screen h-screen">
      {/* Company website as iframe */}
      <iframe
        src="https://vrnexgen1.com/"
        title="company site"
        className="absolute top-0 left-0 w-full h-full border-none"
      />


      <div className="fixed bottom-7 right-5 sm:right-9 z-50">
        <div className="relative">
          <span className="absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75 animate-ping pointer-events-none"></span>
          <div
            className="relative bg-[#840227] text-white w-[60px] h-[60px] flex items-center justify-center rounded-full shadow-lg cursor-pointer hover:opacity-90 transition"
            onClick={chattogle}
          >
            <img
              src="./chatboticon.ico"
              alt="my icon"
              className="w-10 h-10"
            />
          </div>
        </div>

        {ShowChat ? <Chatbox setShowChat={setShowChat} /> : null}
      </div>

    </div>
  )
}

export default App
