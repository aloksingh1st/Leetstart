import React, { useState, useRef, useEffect } from "react";
import { Code2, Timer, MemoryStick, ChevronDown, ChevronUp } from "lucide-react";

const formatJSON = (str) => {
  try {
    return JSON.parse(str);
  } catch {
    return str;
  }
};

const SubmissionDetail = ({ submissions }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  if (!submissions) {
    return (
      <div className="text-center p-6 rounded-lg border dark:border-gray-800 border-gray-200 
                    dark:bg-gray-900/50 bg-gray-50 
                    dark:text-gray-400 text-gray-600">
        Your submissions will be listed here...
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {submissions.map((submission, index) => {
        const isExpanded = expandedIndex === index;
        const contentRef = useRef(null);
        const [height, setHeight] = useState(0);

        useEffect(() => {
          if (isExpanded && contentRef.current) {
            setHeight(contentRef.current.scrollHeight);
          } else {
            setHeight(0);
          }
        }, [isExpanded]);

        return (
          <div
            key={submission.id || index}
            className="rounded-lg border dark:border-gray-800 border-gray-200 
                     dark:bg-gray-900/50 bg-white 
                     shadow-sm transition-all duration-300"
          >
            {/* Header */}
            <div
              onClick={() => toggleExpand(index)}
              className="flex justify-between items-center px-4 py-3 cursor-pointer
                       hover:bg-gray-50 dark:hover:bg-gray-800/50 
                       transition-colors duration-200"
            >
              <div className="flex items-center gap-2 text-sm">
                <span className="px-2 py-1 rounded-md 
                               dark:bg-gray-800 bg-gray-100
                               dark:text-gray-300 text-gray-700
                               dark:border-gray-700 border border-gray-200
                               font-medium">
                  {submission.language}
                </span>
                <span
                  className={`px-2 py-1 rounded-md font-medium ${
                    submission.status === "Accepted"
                      ? "dark:bg-green-500/10 bg-green-50 dark:text-green-400 text-green-600 dark:border-green-500/20 border border-green-200"
                      : "dark:bg-red-500/10 bg-red-50 dark:text-red-400 text-red-600 dark:border-red-500/20 border border-red-200"
                  }`}
                >
                  {submission.status}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs dark:text-gray-400 text-gray-500">
                {new Date(submission.createdAt).toLocaleString()}
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </div>
            </div>

            {/* Tabs */}
            <div
              className="flex gap-4 px-4 pb-2 border-b 
                       dark:border-gray-800 border-gray-200 
                       text-sm font-medium"
            >
              <button className="flex items-center gap-1 
                               dark:text-green-400 text-emerald-600 
                               transition-colors duration-200">
                <Code2 className="w-4 h-4" /> Code
              </button>
              <button className="dark:text-gray-400 text-gray-600 
                               hover:dark:text-gray-200 hover:text-gray-900 
                               transition-colors duration-200">
                Stdout
              </button>
              <button className="dark:text-gray-400 text-gray-600 
                               hover:dark:text-gray-200 hover:text-gray-900 
                               transition-colors duration-200">
                Stats
              </button>
              <button className="dark:text-gray-400 text-gray-600 
                               hover:dark:text-gray-200 hover:text-gray-900 
                               transition-colors duration-200">
                Stdin
              </button>
            </div>

            {/* Animated Expandable Content */}
            <div
              className="overflow-hidden transition-all duration-500 ease-in-out"
              style={{ maxHeight: `${height}px` }}
            >
              <div ref={contentRef} className="px-4 pb-4 space-y-4">
                <div>
                  <h4 className="text-sm font-semibold mb-2 
                               dark:text-gray-200 text-gray-700">
                    Code
                  </h4>
                  <pre className="max-h-60 overflow-auto rounded-lg p-4
                                dark:bg-gray-800/50 bg-gray-50 
                                dark:text-gray-300 text-gray-700
                                dark:border-gray-700 border border-gray-200
                                text-sm whitespace-pre-wrap">
                    <code>{submission.sourceCode}</code>
                  </pre>
                </div>

                <div>
                  <h4 className="text-sm font-semibold mb-2 
                               dark:text-gray-200 text-gray-700">
                    Stdout
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 
                               dark:text-gray-300 text-gray-600 text-sm">
                    {formatJSON(submission.stdout)?.map((line, i) => (
                      <li key={i}>{line}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-semibold mb-2 
                               dark:text-gray-200 text-gray-700">
                    Stats
                  </h4>
                  <div className="space-y-2">
                    {formatJSON(submission.memory)?.map((mem, i) => (
                      <div key={`mem-${i}`} 
                           className="flex items-center gap-2 text-sm 
                                    dark:text-gray-300 text-gray-600">
                        <MemoryStick className="w-4 h-4 dark:text-gray-400 text-gray-500" />
                        Memory {i + 1}: {mem}
                      </div>
                    ))}
                    {formatJSON(submission.time)?.map((t, i) => (
                      <div key={`time-${i}`} 
                           className="flex items-center gap-2 text-sm 
                                    dark:text-gray-300 text-gray-600">
                        <Timer className="w-4 h-4 dark:text-gray-400 text-gray-500" />
                        Time {i + 1}: {t}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold mb-2 
                               dark:text-gray-200 text-gray-700">
                    Stdin
                  </h4>
                  <pre className="max-h-40 overflow-auto rounded-lg p-4
                                dark:bg-gray-800/50 bg-gray-50 
                                dark:text-gray-300 text-gray-700
                                dark:border-gray-700 border border-gray-200
                                text-sm whitespace-pre-wrap">
                    <code>{submission.stdin}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SubmissionDetail;
