import { useCallback, useState, useEffect, useRef } from "react";

function App() {
  const [length, setlength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  // use ref hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "123456789";
    if (charAllowed) str += "!@#$%^&*+=_-/{}[]~";

    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, password]);

  const copyPasswordClipBoard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 20);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-6 rounded-lg shadow-md w-screen mr-10 ml-10">
        <h2 className="text-white text-2xl text-center mb-4">
          Password Generator
        </h2>

        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-2 px-3"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordClipBoard}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2"
          >
            Copy
          </button>
        </div>

        <div className="flex flex-col gap-y-4 text-sm">
          <div className="flex items-center gap-x-2">
            <input
              type="range"
              min={6}
              max={28}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setlength(e.target.value)}
            />
            <label className="text-white">Length: {length}</label>
          </div>

          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              checked={numberAllowed}
              onChange={() => setNumberAllowed((prev) => !prev)}
              className="cursor-pointer"
            />
            <label className="text-white">Numbers Allowed</label>
          </div>

          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              checked={charAllowed}
              onChange={() => setCharAllowed((prev) => !prev)}
              className="cursor-pointer"
            />
            <label className="text-white">Characters Allowed</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
