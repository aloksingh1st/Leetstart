import React from "react";
import {
  ArrowLeft,
  ThumbsUp,
  ThumbsDown,
  Bookmark,
  Share2,
  Code,
} from "lucide-react";

const ProblemDetailView: React.FC = () => {
  return (
    <div className="h-full text-left p-6 overflow-y-auto">
      <div className="flex items-center mb-4">
        <button className="text-gray-400 hover:text-white p-1 transition-colors">
          <ArrowLeft size={18} />
        </button>
        <span className="text-gray-400 mx-2">Problem #3</span>
        <span className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 px-2 py-0.5 text-xs rounded">
          Medium
        </span>
      </div>

      <h2 className="text-xl font-semibold text-white mb-2">
        Longest Substring Without Repeating Characters
      </h2>

      <div className="flex space-x-3 mb-6">
        <button className="flex items-center text-gray-400 hover:text-white text-sm transition-colors">
          <ThumbsUp size={14} className="mr-1" />
          <span>5.2K</span>
        </button>
        <button className="flex items-center text-gray-400 hover:text-white text-sm transition-colors">
          <ThumbsDown size={14} className="mr-1" />
          <span>423</span>
        </button>
        <button className="flex items-center text-gray-400 hover:text-white text-sm transition-colors">
          <Bookmark size={14} className="mr-1" />
          <span>Save</span>
        </button>
        <button className="flex items-center text-gray-400 hover:text-white text-sm transition-colors">
          <Share2 size={14} className="mr-1" />
          <span>Share</span>
        </button>
      </div>

      <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-lg p-4 mb-4">
        <p className="text-gray-300 mb-4">
          Given a string{" "}
          <code className="bg-gray-700/50 px-1 py-0.5 rounded text-cyan-300 font-mono">
            s
          </code>
          , find the length of the longest substring without repeating
          characters.
        </p>

        <h3 className="text-white font-medium mb-2">Example 1:</h3>
        <div className="bg-gray-700/40 p-3 rounded mb-4 font-mono text-sm">
          <p className="text-gray-300">
            <span className="text-cyan-300">Input:</span> s = "abcabcbb"
          </p>
          <p className="text-gray-300">
            <span className="text-cyan-300">Output:</span> 3
          </p>
          <p className="text-gray-300">
            <span className="text-cyan-300">Explanation:</span> The answer is
            "abc", with the length of 3.
          </p>
        </div>

        <h3 className="text-white font-medium mb-2">Example 2:</h3>
        <div className="bg-gray-700/40 p-3 rounded mb-4 font-mono text-sm">
          <p className="text-gray-300">
            <span className="text-cyan-300">Input:</span> s = "bbbbb"
          </p>
          <p className="text-gray-300">
            <span className="text-cyan-300">Output:</span> 1
          </p>
          <p className="text-gray-300">
            <span className="text-cyan-300">Explanation:</span> The answer is
            "b", with the length of 1.
          </p>
        </div>

        <h3 className="text-white font-medium mb-2">Constraints:</h3>
        <ul className="list-disc list-inside text-gray-300 mb-4">
          <li>
            0 &lt;= s.length &lt;= 5 * 10<sup>4</sup>
          </li>
          <li>
            <code className="bg-gray-700/50 px-1 py-0.5 rounded text-cyan-300 font-mono">
              s
            </code>{" "}
            consists of English letters, digits, symbols and spaces.
          </li>
        </ul>
      </div>

      <div className="text-center">
        <button className="bg-gradient-to-r from-accent to-accent hover:from-cyan-600 hover:to-blue-700 text-white font-medium py-2 px-6 rounded-lg flex items-center mx-auto transition-all">
          <Code size={16} className="mr-2" />
          Solve this Problem
        </button>
      </div>
    </div>
  );
};

export const ProblmeDetailText: React.FC = () => {
  return (
    <div className=" rounded-2xl p-6 text-white shadow-lg">
      <h2 className="text-3xl font-extrabold mb-4 leading-tight tracking-wide">
        🌲 The Problem Forest
      </h2>
      <p className="text-emerald-100 text-base leading-relaxed">
        Enter the forest of logic. Every leaf is a pattern. Every tree, a
        constraint. Breathe in the structure. Plan your path before the first
        step—so when you solve, it's not just code. It's clarity.
      </p>
    </div>
  );
};

export default ProblemDetailView;
