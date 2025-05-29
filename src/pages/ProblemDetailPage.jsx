import SubmissionDetail from "../components/SubmissionDetail";
import React, { useEffect, useRef, useState } from "react";
import CodeSection from "../components/CodeSection";
import Split from "react-split";
import { useProblemStore } from "../store/useProblemStore";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useExecutionStore } from "../store/useExecution";
import { Loader2, User, ChevronDown, ChevronUp, Code2 } from "lucide-react";
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

    if (!problem) return <div>Problem not found</div>;

    return (
        <motion.div
            key="editorial"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3 }}
            className="rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-sm"
        >
            {/* Header */}
            <div
                onClick={toggleExpand}
                className="flex justify-between items-center px-4 py-3 cursor-pointer"
            >
                <div className="flex items-center gap-2 text-sm font-medium">
                    <Code2 className="w-4 h-4" />
                    Reference Solutions
                </div>
                {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-muted-foreground" />
                ) : (
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
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
                            <div key={index} className="mb-4">
                                <p className="font-semibold text-sm text-accent mb-1">{lang}</p>
                                <pre className="bg-gray-100 dark:bg-zinc-800 p-3 rounded text-sm overflow-auto whitespace-pre-wrap">
                                    <code>{code}</code>
                                </pre>
                            </div>
                        ))
                    ) : (
                        <p className="text-sm text-muted-foreground">No reference solutions provided.</p>
                    )}
                </div>
            </div>
        </motion.div>
    );
};


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

    const scrollRef = useRef(null);

    const { id } = useParams();
    const { isProblemsLoading, problem, getProblemById } = useProblemStore();
    const [activeTab, setActiveTab] = useState("cpp");
    const [submissionOverlay, setSubmissionOverlay] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        getProblemById(id);
    }, [id, getProblemById]);

    if (isProblemsLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <span className="loading loading-spinner text-primary"></span>
            </div>
        );
    }

    // Badge color logic
    const difficultyBadge = {
        Easy: "badge-success",
        Medium: "badge-warning",
        Hard: "badge-error",
    };

    return (
        <div className="p-6 bg-base-100 min-h-screen">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <button className="btn btn-ghost text-lg font-bold" onClick={() => navigate('/problems')}>← Problem List</button>
                <div className="flex items-center gap-3">
                    <span className={`badge text-white text-xs ${difficultyBadge["Easy"] || "badge-neutral"}`}>
                        Easy
                    </span>
                    <button className="btn btn-sm btn-outline btn-info">Hint</button>
                </div>
            </div>

            {/* Split Layout */}
            <Split className="flex h-[calc(100vh-7rem)] gap-2" sizes={[50, 50]} minSize={300} gutterSize={8}>
                {/* Left Panel */}
                <div className="bg-base-200 p-4 rounded-lg border border-base-300 shadow overflow-y-auto">

                    {submissionOverlay ? <Overlay submissionOverlay={submissionOverlay} setSubmissionOverlay={setSubmissionOverlay} /> :

                        <>

                            <div role="tablist" className="tabs tabs-bordered mb-4">
                                {["cpp", "editorial", "submissions"].map((tab) => (
                                    <a
                                        key={tab}
                                        role="tab"
                                        className={`tab tab-lifted transition-all duration-200 ease-in-out ${activeTab === tab ? "tab-active font-bold text-base-content" : ""
                                            }`}
                                        onClick={() => setActiveTab(tab)}
                                    >
                                        {tab === "cpp" ? "Problem" : tab.charAt(0).toUpperCase() + tab.slice(1)}
                                    </a>
                                ))}
                            </div>


                            <AnimatePresence mode="wait">
                                {activeTab === "cpp" && <ProblemDetail problem={problem} key="cpp" />}
                                {activeTab === "editorial" && <Editorial problem={problem} key="editorial" />}
                                {activeTab === "submissions" && (
                                    <motion.div
                                        key="python"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                        transition={{ duration: 0.3 }}
                                        className="bg-base-100 p-4 rounded border border-base-300"
                                    >
                                        <Submission problemId={id} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </>

                    }
                </div>

                {/* Right Panel */}
                <div className="bg-base-200 p-4 rounded-lg border border-base-300 shadow overflow-y-auto">
                    {problem && <CodeSection problem={problem} setSubmissionOverlay={setSubmissionOverlay} />}
                </div>
            </Split>
        </div>
    );
};

export default InsertionAtHeadPage;
