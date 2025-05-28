import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { Play, Save, RefreshCw } from "lucide-react";

const defaultCode = `function lengthOfLongestSubstring(s) {
  // Initialize variables
  let maxLength = 0;
  let start = 0;
  const charMap = new Map();
  
  // Iterate through the string
  for (let end = 0; end < s.length; end++) {
    const currentChar = s[end];
    
    // If we've seen this character before and it's in our current window
    if (charMap.has(currentChar) && charMap.get(currentChar) >= start) {
      // Move the start pointer to the right of the previous occurrence
      start = charMap.get(currentChar) + 1;
    }
    
    // Update the position of the current character
    charMap.set(currentChar, end);
    
    // Update the maximum length
    maxLength = Math.max(maxLength, end - start + 1);
  }
  
  return maxLength;
}`;

const CodeEditorView: React.FC = () => {
  const [animatedText, setAnimatedText] = useState("");
  const [showEditor, setShowEditor] = useState(false);

  useEffect(() => {
    if (showEditor) return;

    const typingInterval = setInterval(() => {
      if (animatedText.length < defaultCode.length) {
        setAnimatedText(defaultCode.slice(0, animatedText.length + 1));
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setShowEditor(true);
        }, 1000);
      }
    }, 20);

    return () => clearInterval(typingInterval);
  }, [animatedText, showEditor]);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-gray-800/80 px-4 py-2 border-b border-gray-700/50 flex items-center">
        <div className="flex space-x-2">
          <button className="bg-gray-700/70 hover:bg-gray-700 p-1.5 rounded text-cyan-400 transition-colors">
            <Play size={14} />
          </button>
          <button className="bg-gray-700/70 hover:bg-gray-700 p-1.5 rounded text-gray-300 transition-colors">
            <Save size={14} />
          </button>
          <button className="bg-gray-700/70 hover:bg-gray-700 p-1.5 rounded text-gray-300 transition-colors">
            <RefreshCw size={14} />
          </button>
        </div>
        <div className="ml-4 text-xs text-gray-400">JavaScript</div>
        <div className="flex-1 flex justify-end">
          <div className="bg-green-500/20 text-green-400 px-2 py-0.5 text-xs rounded-full">
            All tests passed
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-gray-900/90 font-mono">
        {showEditor ? (
          <Editor
            height="100%"
            width="500px"
            defaultLanguage="javascript"
            defaultValue={defaultCode}
            theme="vs-dark"
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              wordWrap: "on",
              scrollBeyondLastLine: false,
              automaticLayout: true,
            }}
          />
        ) : (
          <div className="flex h-full">
            {/* Line numbers */}
            <div className="text-right pr-4 py-3 select-none bg-gray-800/50 text-gray-500 text-xs border-r border-gray-700/50">
              {defaultCode.split("\n").map((_, i) => (
                <div key={i} className="h-6">
                  {i + 1}
                </div>
              ))}
            </div>

            {/* Typing animation */}
            <div className="flex-1 p-3 text-gray-300 text-sm relative">
              <pre className="h-full whitespace-pre-wrap">
                <code>
                  {animatedText}
                  <span className="inline-block w-2 h-4 bg-cyan-400 animate-blink-fast ml-0.5 align-middle"></span>
                </code>
              </pre>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-800/80 px-4 py-2 border-t border-gray-700/50 flex justify-between items-center">
        <div className="text-xs text-gray-400">Time complexity: O(n)</div>
        <button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white text-sm font-medium py-1 px-4 rounded transition-all">
          Submit Solution
        </button>
      </div>
    </div>
  );
};

export const CodeEditorText: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 text-white shadow-lg">
      <h2 className="text-3xl font-extrabold mb-4 leading-tight tracking-wide">
        🌲 Write Code. Live
      </h2>
      <p className="text-emerald-100 text-base leading-relaxed">
        Write. Test. Iterate. All in one flow.
      </p>
    </div>
  );
};

export default CodeEditorView;
