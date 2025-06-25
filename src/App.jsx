import React, { useEffect, useState } from "react";
import "prismjs/themes/prism-tomorrow.css";
import prism from "prismjs";
import Editor from "react-simple-code-editor";
import axios from "axios";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
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
      const response = await axios.post("https://ai-code-reviewer-server.onrender.com/ai/get-response", { code });
      setReview(response.data);
    } catch (err) {
      setReview("Error fetching review. Check server.");
    }
  }

  return (
    <div className="w-full min-h-screen bg-zinc-900 text-white font-sans">
      {/* Header */}
      <header className="py-6 px-4 border-b border-zinc-700 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-indigo-300 mb-1">AI Code Reviewer</h1>
        <p className="text-zinc-400 text-sm">Write JavaScript code and get instant AI feedback.</p>
      </header>

      {/* Main Content */}
      <main className="flex flex-col md:flex-row gap-6 p-6">
        {/* Code Editor */}
        <div className="flex-1 relative bg-zinc-950 rounded-2xl p-4 shadow-lg overflow-auto">
          <h2 className="text-lg font-semibold text-indigo-400 mb-2">Your Code</h2>
          <Editor
            value={code}
            onValueChange={(code) => setCode(code)}
            highlight={(code) =>
              prism.highlight(code, prism.languages.javascript, "javascript")
            }
            padding={16}
            className="focus:outline-none min-h-[300px]"
            style={{
              fontFamily: "Fira Code, monospace",
              fontSize: 14,
            }}
          />
          <button
            onClick={reviewCode}
            className="absolute bottom-4 right-4 bg-indigo-500 text-white px-4 py-2 rounded-md font-medium hover:bg-indigo-600 transition-all"
          >
            Review
          </button>
        </div>

        {/* Review Output */}
        <div className="flex-1 bg-zinc-800 rounded-2xl p-4 shadow-lg overflow-auto min-h-[300px]">
          <h2 className="text-lg font-semibold text-green-400 mb-2">AI Review</h2>
          <Markdown rehypePlugins={[rehypeHighlight]}>
            {review || "Code review will appear here..."}
          </Markdown>
        </div>
      </main>
    </div>
  );
};

export default App;
