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



  if(!submissions){
    return (
        <>
        <div>Your Submission will be listed here..</div>
        </>
    )
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
            className="bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700 rounded-lg shadow-sm transition-all duration-300"
          >
            {/* Header */}
            <div
              onClick={() => toggleExpand(index)}
              className="flex justify-between items-center px-4 py-3 cursor-pointer"
            >
              <div className="flex items-center gap-2 text-sm">
                <span className="px-2 py-0.5 rounded bg-gray-200 dark:bg-zinc-700 text-gray-800 dark:text-gray-200">
                  {submission.language}
                </span>
                <span
                  className={`px-2 py-0.5 rounded text-white ${
                    submission.status === "Accepted"
                      ? "bg-green-600"
                      : "bg-red-500"
                  }`}
                >
                  {submission.status}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
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
              onClick={() => toggleExpand(index)}
              className="flex gap-4 px-4 pb-2 border-b border-gray-200 dark:border-zinc-700 text-sm font-medium cursor-pointer"
            >
              <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400">
                <Code2 className="w-4 h-4" /> Code
              </span>
              <span>Stdout</span>
              <span>Stats</span>
              <span>Stdin</span>
            </div>

            {/* Animated Expandable Content */}
            <div
              className="overflow-hidden transition-all duration-500 ease-in-out"
              style={{ maxHeight: `${height}px` }}
            >
              <div ref={contentRef} className="px-4 pb-4 space-y-4 text-sm">
                <div>
                  <h4 className="font-semibold">Code</h4>
                  <pre className="max-h-60 overflow-auto bg-gray-100 dark:bg-zinc-800 p-3 rounded whitespace-pre-wrap">
                    <code>{submission.sourceCode}</code>
                  </pre>
                </div>

                <div>
                  <h4 className="font-semibold">Stdout</h4>
                  <ul className="list-disc pl-5">
                    {formatJSON(submission.stdout)?.map((line, i) => (
                      <li key={i}>{line}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold">Stats</h4>
                  <div className="space-y-1">
                    {formatJSON(submission.memory)?.map((mem, i) => (
                      <div key={`mem-${i}`} className="flex items-center gap-2">
                        <MemoryStick className="w-4 h-4 text-gray-500" />
                        Memory {i + 1}: {mem}
                      </div>
                    ))}
                    {formatJSON(submission.time)?.map((t, i) => (
                      <div key={`time-${i}`} className="flex items-center gap-2">
                        <Timer className="w-4 h-4 text-gray-500" />
                        Time {i + 1}: {t}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold">Stdin</h4>
                  <pre className="max-h-40 overflow-auto bg-gray-100 dark:bg-zinc-800 p-3 rounded whitespace-pre-wrap">
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
