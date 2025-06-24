import React, { useEffect, useState } from "react";
import "prismjs/themes/prism-tomorrow.css";
import prism from "prismjs";
import Editor from 'react-simple-code-editor'

const App = () => {
  const [code, setcode] = useState(`function sum(){
    return a+b
}`)

  useEffect(() => {
    prism.highlightAll();
  });

  return (
    <div className="w-full h-screen bg-zinc-900">
      <main className="h-[98%] w-full p-[1.5rem] flex gap-[1rem] items-center justify-center">
        <div className="left relative h-full basis-1/2 bg-black rounded-[0.7rem]">
          <div className="code  ">
            
          <Editor
              value={code}
              onValueChange={code => setcode(code)}
              highlight={code => prism.highlight(code, prism.languages.javascript)}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                color: 'white',
                overflow: 'auto'
              }}
            />
            
          </div>
          <div className="review absolute bottom-[1rem] right-[1rem] bg-[rgb(219,219,255)] text-black px-[2rem] py-[0.5rem] rounded-[0.7rem] cursor-pointer font-bold select-none hover:scale-102">
            Review
          </div>
        </div>
        <div className="right h-full basis-1/2 bg-zinc-800 rounded-[0.7rem]"></div>
      </main>
    </div>
  );
};

export default App;
