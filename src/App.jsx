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
    <>
      <div className="  justify-center w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-600 bg-gray-500">
        <h2 className="text-white text-center">Password generator </h2>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full  py-1 px-3 mb-3"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />

          <button
            onClick={copyPasswordClipBoard}
            className="outline-none bg-blue-700 text-white ml-3 mb-3 px-3 py-0.5"
          >
            copy
          </button>
        </div>

        {/*  all the buttons for chnagement in password */}
        <div className="flex text-sm gap-x-3">
          {/* range button for collecting range */}
          <div className="flex items-center gap-x-2">
            <input
              type="range"
              min={6}
              max={28}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setlength(e.target.value);
              }}
            />
            <label className="text-white"> Length : {length}</label>
          </div>
          {/* check box for numbers allowed  */}
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              className="cursor-pointer"
              onChange={(e) => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label className="text-white">NUMBERS ALLOWED </label>
          </div>
          {/* check box for character  */}
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="charInput"
              className="cursor-pointer"
              onChange={(e) => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label className="text-white">CHARACTER ALLOWED </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
