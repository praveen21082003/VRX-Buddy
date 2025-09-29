function Welcome() {
  return (
    <div className="flex flex-col justify-center items-center text-center text-gray-600 p-4 gap-4">
      <img src="./VRNEXGEN-03.png" alt="company name" className="h-auto w-[70%] opacity-73"/>
      <h2 className="text-xl font-semibold mb-2">Welcome!</h2>
      <p className="text-sm">
        I’m your assistant. Ask me anything or type your first message to get started.
      </p>
    </div>
  );
}

export default Welcome;
