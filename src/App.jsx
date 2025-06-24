import React, { useEffect, useState } from "react";
import "prismjs/themes/prism-tomorrow.css";
import prism from "prismjs";
import Editor from "react-simple-code-editor";
import axios from "axios";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight"
import "highlight.js/styles/github-dark.css"; 

const App = () => {
  const [code, setCode] = useState(`function sum(a, b) {
  return a + b;
}`);
  const [review, setReview] = useState("");

  useEffect(() => {
    prism.highlightAll();
  }, [code]);

  async function reviewCode() {
    try {
      const response = await axios.post("http://localhost:3000/ai/get-response", { code });
      setReview(response.data);
    } catch (err) {
      setReview("Error fetching review. Check server.");
    }
  }

  return (
    <div className="w-full min-h-screen bg-zinc-900 text-white">
      <main className="flex flex-col md:flex-row gap-4 p-4 h-full">
        {/* Code Editor */}
        <div className="flex-1 relative bg-black rounded-2xl p-4 shadow-lg overflow-auto scrollbar-hide">
          <Editor
            value={code}
            onValueChange={(code) => setCode(code)}
            highlight={(code) => prism.highlight(code, prism.languages.javascript, 'javascript')}
            padding={16}
            className="focus:outline-none min-h-[300px]"
            style={{
              fontFamily: 'Fira Code, monospace',
              fontSize: 14,
            }}
          />
          <button
            onClick={reviewCode}
            className="absolute bottom-4 right-4 bg-indigo-400 text-black px-4 py-2 rounded-lg font-semibold hover:scale-105 transition-all"
          >
            Review
          </button>
        </div>


        <div className="flex-1 bg-zinc-800 rounded-2xl p-4 shadow-lg overflow-auto scrollbar-hide min-h-[300px] text-lg">
          <Markdown rehypePlugins={[rehypeHighlight]}>
            {review || "Code review will appear here..."}
          </Markdown>
        </div>
      </main>
    </div>
  );
};

export default App;
