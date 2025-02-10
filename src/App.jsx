import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  // State hooks for password options and generated password
  const [length, setLength] = useState(8); // Password length
  const [numberAllowed, setNumberAllowed] = useState(false); // Allow numbers in the password
  const [charAllowed, setCharAllowed] = useState(false); // Allow special characters in the password
  const [Password, setPassword] = useState(""); // Generated password

  //! useRef Hook for accessing the password input DOM element
  const passwordRef = useRef(null);

  // Function to generate a password based on selected options
  const PasswordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"; // Default characters

    if (numberAllowed) str += "0123456789"; // Add numbers if allowed
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`"; // Add special characters if allowed

    // Generate password by randomly selecting characters
    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass); // Update the generated password state
  }, [length, numberAllowed, charAllowed, setPassword]);

  // Function to copy the generated password to the clipboard
  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select(); // Select the password in the input field
    passwordRef.current.setSelectionRange(0, 101); // Set the selection range
    window.navigator.clipboard.writeText(Password); // Copy to clipboard
  }, [Password]);

  // Automatically generate a new password whenever options change
  useEffect(() => {
    PasswordGenerator();
  }, [length, numberAllowed, charAllowed, PasswordGenerator]);

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-gray-500'>
        {/* Header */}
        <h1 className='text-white text-center my-3'>Password Generator</h1>

        {/* Password Display and Copy Button */}
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input 
            type="text"
            value={Password}
            className='outline-none w-full py-1 px-3 bg-amber-50'
            placeholder='Password'
            readOnly
            ref={passwordRef} // Attach ref for copy functionality
          />
          <button
            onClick={copyPasswordToClipboard}
            className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>
            Copy
          </button>
        </div>

        {/* Options for password customization */}
        <div className='flex text-sm gap-x-2'>
          {/* Password Length */}
          <div className='flex items-center gap-x-1'>
            <input 
              type="range"
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setLength(e.target.value); }}
            />
            <label>Length: {length}</label>
          </div>

          {/* Include Numbers Option */}
          <div className='flex items-center gap-x-1'>
            <input 
              type="checkbox" 
              defaultValue={numberAllowed}
              id='numberInput'
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}  
            />
            <label htmlFor='numberInput'>Numbers</label>
          </div>

          {/* Include Special Characters Option */}
          <div className='flex items-center gap-x-1'>
            <input 
              type="checkbox" 
              defaultValue={charAllowed}
              id='characterInput'
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}  
            />
            <label htmlFor='characterInput'>Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
