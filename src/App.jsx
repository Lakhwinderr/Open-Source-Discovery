// src/App.js
import React, { useState } from "react";
import Search from "./components/Search.jsx";

function App() {
  const [toggleAccount, setToggleAccount] = useState(true);
  return (
  
      <div>
        <div className="container mx-auto p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold">
              Open Source Project Discovery
            </h1>
            <button
              onClick={() => {
                setToggleAccount(!toggleAccount);
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              {toggleAccount ? "My Account" : "Go Back"}
            </button>
          </div>
        </div>
        <Search toggleAccount ={toggleAccount}/>
      </div>
    
  );
}

export default App;
