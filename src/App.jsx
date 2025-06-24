import React, { useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
import prism from "prismjs";

const App = () => {
  useEffect(() => {
    prism.highlightAll();
  });

  return (
    <div className="w-full h-screen bg-zinc-900">
      <main className="h-[98%] w-full p-[1.5rem] flex gap-[1rem] items-center justify-center">
        <div className="left relative h-full basis-1/2 bg-black rounded-[0.7rem]">
          <div className="code  ">
            <pre className="">
              <code className="language-javascript">
                {}
              </code>
            </pre>
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
