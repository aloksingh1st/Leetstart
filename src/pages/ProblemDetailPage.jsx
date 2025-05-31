import SubmissionDetail from "../components/SubmissionDetail";
import React, { useEffect, useRef, useState } from "react";
import CodeSection from "../components/CodeSection";
import Split from "react-split";
import { useProblemStore } from "../store/useProblemStore";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useExecutionStore } from "../store/useExecution";
import { Loader2, User, ChevronDown, ChevronUp, Code2, ChevronLeft, Lightbulb, Sun, Moon} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useSubmissionStore } from "../store/useSubmissionStore";

const ProblemDetail = ({ problem }) => {
    console.log(problem);

    if (!problem) return <div>Problem not found</div>;

    return (
        <motion.div
            key="problem"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
        >


            {/* Title & Description */}
            <div>
                <h2 className="text-xl font-bold mb-2">{problem.title}</h2>
                <p className="text-base-content">{problem.description}</p>
            </div>

            {/* Examples */}
            {problem.examples && Object.keys(problem.examples).length > 0 && (
                <div className="bg-base-200 p-4 rounded-lg shadow-sm border">
                    <h3 className="text-lg font-semibold mb-3 text-primary">Examples:</h3>
                    {Object.entries(problem.examples).map(([lang, data], idx) => (
                        <div key={`${lang}-${idx}`} className="mb-4">
                            <p className="font-semibold text-xl">{lang}</p>
                            <div className="space-y-2">
                                <p><strong>Input:</strong> <span className="text-info">{data.input}</span></p>
                                <p><strong>Output:</strong> <span className="text-success">{data.output}</span></p>
                                <p><strong>Explanation:</strong> {data.explanation}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Test Cases */}
            {problem.testCases && problem.testCases.length > 0 && (
                <div className="bg-base-200 p-4 rounded-lg shadow-sm border">
                    <h3 className="text-lg font-semibold mb-3 text-primary">Test Cases:</h3>
                    {problem.testCases.slice(0, 3).map((tc, idx) => (
                        <div key={idx} className="mb-4">
                            <p><strong>Input:</strong> <span className="text-info">{tc.input}</span></p>
                            <p><strong>Output:</strong> <span className="text-success">{tc.output}</span></p>
                        </div>
                    ))}
                </div>
            )}

            {/* Constraints */}
            <div className="bg-base-200 p-4 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-3 text-primary">Constraints:</h3>
                {problem.constraints && problem.constraints.length > 0 ? (
                    <ul className="list-disc pl-6 space-y-2 text-sm">
                        {problem.constraints}
                    </ul>
                ) : (
                    <p className="text-sm text-base-content">No constraints provided.</p>
                )}
            </div>
        </motion.div>
    );
};




const Editorial = ({ problem }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const contentRef = useRef(null);
    const [height, setHeight] = useState(0);

    const toggleExpand = () => {
        setIsExpanded((prev) => !prev);
    };

    useEffect(() => {
        if (isExpanded && contentRef.current) {
            setHeight(contentRef.current.scrollHeight);
        } else {
            setHeight(0);
        }
    }, [isExpanded]);

    if (!problem) return (
        <div className="text-sm dark:text-gray-400 text-gray-600">
            Problem not found
        </div>
    );

    return (
        <motion.div
            key="editorial"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3 }}
            className="rounded-lg border dark:border-gray-800 border-gray-200 
                       dark:bg-gray-900/50 bg-gray-50/50 shadow-sm 
                       transition-colors duration-200"
        >
            {/* Header */}
            <div
                onClick={toggleExpand}
                className="flex justify-between items-center px-4 py-3 cursor-pointer
                          hover:bg-gray-100 dark:hover:bg-gray-800/50 
                          transition-colors duration-200"
            >
                <div className="flex items-center gap-2 text-sm font-medium">
                    <Code2 className="w-4 h-4 dark:text-green-400 text-emerald-600" />
                    <span className="dark:text-gray-200 text-gray-700">
                        Reference Solutions
                    </span>
                </div>
                {isExpanded ? (
                    <ChevronUp className="w-4 h-4 dark:text-gray-400 text-gray-500" />
                ) : (
                    <ChevronDown className="w-4 h-4 dark:text-gray-400 text-gray-500" />
                )}
            </div>

            {/* Animated Expandable Content */}
            <div
                className="overflow-hidden transition-all duration-500 ease-in-out"
                style={{ maxHeight: `${height}px` }}
            >
                <div ref={contentRef} className="px-4 pb-4">
                    {problem.referenceSolutions &&
                        Object.entries(problem.referenceSolutions).length > 0 ? (
                        Object.entries(problem.referenceSolutions).map(([lang, code], index) => (
                            <div key={index} className="mb-4 last:mb-0">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-sm font-medium dark:text-green-400 text-emerald-600">
                                        {lang}
                                    </span>
                                    <div className="h-px flex-1 dark:bg-gray-800 bg-gray-200" />
                                </div>
                                <pre className="dark:bg-gray-800/50 bg-gray-100 p-4 rounded-lg 
                                              text-sm overflow-auto whitespace-pre-wrap
                                              dark:text-gray-300 text-gray-700
                                              dark:border-gray-700 border border-gray-200
                                              transition-colors duration-200">
                                    <code>{code}</code>
                                </pre>
                            </div>
                        ))
                    ) : (
                        <p className="text-sm dark:text-gray-400 text-gray-500">
                            No reference solutions provided.
                        </p>
                    )}
                </div>
            </div>
        </motion.div>
    );
};
z


const Submission = ({ problemId }) => {

    const { isLoading, getSubmissionForProblem, submission } = useSubmissionStore();


    useEffect(() => {
        getSubmissionForProblem(problemId);
    }, [getSubmissionForProblem]);

    if (isLoading) {
        return <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Loading...
        </>
    }

    return <>
        <SubmissionDetail submissions={submission} />
    </>
}

const Overlay = ({ submissionOverlay, setSubmissionOverlay }) => {
    const { isExecuting, submission } = useExecutionStore();
    const { authUser } = useAuthStore();

    if (isExecuting || !authUser) {
        return (
            <div className="flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                Loading...
            </div>
        );
    }

    const failedSubmission = submission.find(sub => !sub.passed);
    const numberOfTestCases = submission.length;

    const totalMemory = submission.reduce((sum, test) => {
        const mem = parseFloat(test.memory);
        return sum + (isNaN(mem) ? 0 : mem);
    }, 0);

    const totalRunTime = submission.reduce((sum, test) => {
        const time = parseFloat(test.time);
        return sum + (isNaN(time) ? 0 : time);
    }, 0);

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="relative bg-base-100 shadow-xl rounded-xl p-4 border border-base-300 w-full max-w-3xl space-y-4"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
                {/* Close Button */}
                <button
                    className="absolute top-2 left-2 text-xl text-base-content hover:text-error"
                    onClick={() => setSubmissionOverlay(false)}
                >
                    ✕
                </button>

                {/* Submission Status */}
                <div className="flex justify-between items-center pt-4 pl-8 pr-2">
                    <div className={`font-semibold ${!failedSubmission ? "text-success" : "text-error"}`}>
                        {!failedSubmission ? (
                            <>
                                Accepted{" "}
                                <span className="text-sm text-base-content">
                                    {numberOfTestCases} / {numberOfTestCases} testcases passed
                                </span>
                            </>
                        ) : (
                            <>
                                Rejected{" "}
                                <span className="text-sm text-base-content">{failedSubmission.status}</span>
                            </>
                        )}
                    </div>

                    {/* User Info */}
                    <div className="text-sm text-base-content">
                        <div className="flex items-center space-x-2">
                            <div className="avatar">
                                <div className="w-6 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    {authUser.image ? (
                                        <img src={authUser.image} alt="User Avatar" />
                                    ) : (
                                        <User />
                                    )}
                                </div>
                            </div>
                            <span className="font-medium">{authUser.name}</span>
                            <span>
                                submitted at{" "}
                                {new Date().toLocaleString("en-US", {
                                    month: "short",
                                    day: "2-digit",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: false,
                                })}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 px-4 pb-2">
                    {/* Runtime */}
                    {!failedSubmission ? (
                        <div className="card bg-base-200 p-4">
                            <h3 className="font-semibold text-base-content">⏱ Runtime</h3>
                            <p className="text-2xl font-bold text-primary">
                                {totalRunTime} s <span className="text-base-content text-sm">| Beats 76.48%</span>
                            </p>
                            <a href="#" className="link link-hover text-sm text-violet-500">
                                Analyze Complexity
                            </a>
                            <div className="mt-2 h-24 flex items-end space-x-1">
                                {Array.from({ length: 30 }, (_, i) => {
                                    const height = Math.random() * 80 + 10;
                                    const isUser = i === 9;
                                    return (
                                        <div
                                            key={i}
                                            className={`w-[3px] ${isUser ? "bg-info" : "bg-primary/70"} rounded`}
                                            style={{ height: `${height}%` }}
                                            title={`${height.toFixed(0)}ms`}
                                        />
                                    );
                                })}
                            </div>
                            <div className="text-xs text-center text-base-content mt-1">
                                Runtime Distribution
                            </div>
                        </div>
                    ) : (
                        <div className="card bg-base-200 p-4">
                            <h3 className="font-semibold text-error">❌ Failed Test Input</h3>
                            <p className="text-sm text-base-content whitespace-pre-wrap">
                                {failedSubmission.stdin}
                            </p>
                        </div>
                    )}

                    {/* Memory */}
                    {!failedSubmission ? (
                        <div className="card bg-base-200 p-4">
                            <h3 className="font-semibold text-base-content">🧠 Memory</h3>
                            <p className="text-2xl font-bold text-primary">
                                {totalMemory} KB{" "}
                                <span className="text-base-content text-sm">| Beats 45.25%</span>
                            </p>
                        </div>
                    ) : (
                        <div className="card bg-base-200 p-4">
                            <h3 className="font-semibold text-error">📤 Output</h3>
                            <p className="text-sm text-base-content whitespace-pre-wrap">
                                {failedSubmission.stdout ?? "No Output"}
                            </p>
                        </div>
                    )}
                </div>

                {/* Footer Buttons */}
                <div className="flex justify-end space-x-2 px-4 pb-2">
                    <button className="btn btn-outline btn-sm">Editorial</button>
                    <button className="btn btn-success btn-sm">Solution</button>
                </div>
            </motion.div>
        </motion.div>
    );
};

const InsertionAtHeadPage = () => {
    const { id } = useParams();
    const { isProblemsLoading, problem, getProblemById } = useProblemStore();
    const [activeTab, setActiveTab] = useState("cpp");
    const [submissionOverlay, setSubmissionOverlay] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(() =>
        document.documentElement.classList.contains("dark")
      );
    const navigate = useNavigate();
  
    useEffect(() => {
      getProblemById(id);
    }, [id, getProblemById]);


    useEffect(() => {
        const observer = new MutationObserver(() => {
          const isDark = document.documentElement.classList.contains("dark");
          setIsDarkMode(isDark);
        });
    
        observer.observe(document.documentElement, {
          attributes: true,
          attributeFilter: ["class"],
        });
    
        return () => observer.disconnect();
      }, []);
  
  
    if (isProblemsLoading) {
      return (
        <div className={`flex items-center justify-center h-screen ${isDarkMode ? 'bg-gray-950' : 'bg-gray-50'}`}>
          <div className={`w-12 h-12 border-4 rounded-full animate-spin ${
            isDarkMode 
              ? 'border-green-400 border-t-transparent' 
              : 'border-emerald-500 border-t-transparent'
          }`} />
        </div>
      );
    }
  
    const difficultyConfig = {
      Easy: {
        dark: "bg-green-500/10 text-green-400 border border-green-500/20",
        light: "bg-emerald-100 text-emerald-700 border border-emerald-200",
        text: "Easy"
      },
      Medium: {
        dark: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
        light: "bg-amber-100 text-amber-700 border border-amber-200",
        text: "Medium"
      },
      Hard: {
        dark: "bg-red-500/10 text-red-400 border border-red-500/20",
        light: "bg-red-100 text-red-700 border border-red-200",
        text: "Hard"
      }
    };
  
    const difficulty = difficultyConfig["Easy"];
  
    return (
      <div className={`min-h-screen ${
        isDarkMode 
          ? 'bg-gray-950 text-gray-100' 
          : 'bg-gray-50 text-gray-900'
      }`}>
        {/* Header */}
        <div className={`border-b sticky top-0 z-50 backdrop-blur-sm ${
          isDarkMode 
            ? 'border-gray-800 bg-gray-900/50' 
            : 'border-gray-200 bg-white/50'
        }`}>
          <div className="max-w-[1920px] mx-auto px-6 py-4 flex items-center justify-between">
            <button 
              onClick={() => navigate('/problems')}
              className={`flex items-center gap-2 transition-colors ${
                isDarkMode 
                  ? 'text-gray-400 hover:text-green-400' 
                  : 'text-gray-500 hover:text-emerald-600'
              }`}
            >
              <ChevronLeft size={20} />
              <span className="font-medium">Problem List</span>
            </button>
  
            <div className="flex items-center gap-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                isDarkMode ? difficulty.dark : difficulty.light
              }`}>
                {difficulty.text}
              </span>
              
              <button className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                isDarkMode 
                  ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20' 
                  : 'bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100'
              }`}>
                <Lightbulb size={18} />
                <span className="font-medium">Hint</span>
              </button>
  
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-lg transition-all ${
                  isDarkMode 
                    ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>
        </div>
  
        {/* Main Content */}
        <div className="max-w-[1920px] mx-auto p-6">
          <Split 
            className="flex gap-6" 
            sizes={[50, 50]} 
            minSize={400}
            gutterStyle={() => ({
              backgroundColor: isDarkMode ? '#1f2937' : '#e5e7eb',
              width: '6px',
              cursor: 'col-resize'
            })}
          >
            {/* Left Panel */}
            <div className={`rounded-xl overflow-hidden ${
              isDarkMode 
                ? 'bg-gray-900 border border-gray-800' 
                : 'bg-white border border-gray-200 shadow-sm'
            }`}>
              {submissionOverlay ? (
                <Overlay 
                  submissionOverlay={submissionOverlay} 
                  setSubmissionOverlay={setSubmissionOverlay} 
                />
              ) : (
                <>
                  <div className={`border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
                    <div className="flex" role="tablist">
                      {["cpp", "editorial", "submissions"].map((tab) => (
                        <button
                          key={tab}
                          role="tab"
                          className={`px-6 py-4 text-sm font-medium transition-colors relative ${
                            activeTab === tab 
                              ? isDarkMode 
                                ? 'text-green-400 bg-gray-800/50'
                                : 'text-emerald-600 bg-gray-50'
                              : isDarkMode
                                ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/30'
                                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                          }`}
                          onClick={() => setActiveTab(tab)}
                        >
                          {tab === "cpp" ? "Problem" : tab.charAt(0).toUpperCase() + tab.slice(1)}
                          {activeTab === tab && (
                            <motion.div 
                              className={`absolute bottom-0 left-0 right-0 h-0.5 ${
                                isDarkMode ? 'bg-green-400' : 'bg-emerald-500'
                              }`}
                              layoutId="activeTab"
                            />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
  
                  <div className="p-6">
                    <AnimatePresence mode="wait">
                      {activeTab === "cpp" && <ProblemDetail problem={problem} key="cpp" />}
                      {activeTab === "editorial" && <Editorial problem={problem} key="editorial" />}
                      {activeTab === "submissions" && (
                        <motion.div
                          key="submissions"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Submission problemId={id} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </>
              )}
            </div>
  
            {/* Right Panel */}
            <div className={`rounded-xl ${
              isDarkMode 
                ? 'bg-gray-900 border border-gray-800' 
                : 'bg-white border border-gray-200 shadow-sm'
            }`}>
              {problem && (
                <CodeSection 
                  problem={problem} 
                  setSubmissionOverlay={setSubmissionOverlay} 
                  isDarkMode={isDarkMode}
                />
              )}
            </div>
          </Split>
        </div>
      </div>
    );
  };
  
  export default InsertionAtHeadPage;