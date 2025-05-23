import React, { useEffect, useState } from "react";
import CodeSection from "../components/CodeSection";
import Split from "react-split";
import { useProblemStore } from "../store/useProblemStore";
import { useParams } from "react-router-dom";

const ProblemDetail = ({ problem }) => {
    if (!problem) {
        return <div>Problem not found</div>;
    }

    return (
        <>
            <h2 className="text-xl font-bold mb-2">{problem.title}</h2>
            <p className="mb-2">
                {problem.description}
            </p>
            <div className="bg-base-100 p-4 rounded border mt-4">
                <h3 className="text-md font-semibold mb-2">Examples:</h3>
                {Object.entries(problem.examples).map(([lang, data], index) => (
                    <div key={lang + index} className="mb-4">
                        <p className="font-semibold text-sm mb-1 text-primary">{lang}</p>
                        <p><strong>Input:</strong> {data.input}</p>
                        <p><strong>Output:</strong> {data.output}</p>
                        <p><strong>Explanation:</strong> {data.explanation}</p>
                    </div>
                ))}
            </div>

            {problem.testcases && problem.testcases.length > 0 && (
                <div className="bg-base-100 p-4 rounded border mt-4">
                    <h3 className="text-md font-semibold mb-2">Test Cases:</h3>
                    {problem.testcases.slice(0, 3).map((tc, idx) => (
                        <div key={idx} className="mb-3">
                            <p><strong>Input:</strong> {tc.input}</p>
                            <p><strong>Output:</strong> {tc.output}</p>
                        </div>
                    ))}
                </div>
            )}

            <div className="bg-base-100 p-4 rounded border mt-4">
                <div className="mt-4">
                    <p><strong>Constraints:</strong></p>
                    <p>-10<sup>9</sup> ≤ a, b ≤ 10<sup>9</sup></p>
                </div>
            </div>
        </>
    );
};

const InsertionAtHeadPage = () => {
    const { id } = useParams();
    const { isProblemsLoading, problem, getProblemById } = useProblemStore();
    const [activeTab, setActiveTab] = useState("cpp");

    useEffect(() => {
        getProblemById(id);
        console.log(id);
    }, [id, getProblemById]);

    if (isProblemsLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader className="size-10 animate-spin" />
            </div>
        );
    }

    return (
        <div className="p-6 bg-base-100 min-h-screen">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <button className="btn btn-ghost text-lg font-bold">Problem List</button>
                <div className="flex gap-4">
                    <span className="badge badge-warning text-white">100</span>
                    <span className="badge badge-success">Easy</span>
                    <button className="btn btn-sm btn-outline">Hint</button>
                </div>
            </div>

            {/* Draggable Split Pane Layout */}
            <Split
                className="flex h-[calc(100vh-6rem)]"
                sizes={[50, 50]}
                minSize={300}
                gutterSize={6}
                direction="horizontal"
            >
                {/* Left Panel: Problem Section */}
                <div className="bg-base-200 p-4 rounded-lg shadow overflow-y-auto">
                    <div role="tablist" className="tabs tabs-lift tabs-lg mb-4">
                        <a
                            role="tab"
                            className={`tab ${activeTab === "cpp" ? "tab-active" : ""}`}
                            onClick={() => setActiveTab("cpp")}
                        >
                            Problem
                        </a>
                        <a
                            role="tab"
                            className={`tab ${activeTab === "java" ? "tab-active" : ""}`}
                            onClick={() => setActiveTab("java")}
                        >
                            Editorial
                        </a>
                        <a
                            role="tab"
                            className={`tab ${activeTab === "python" ? "tab-active" : ""}`}
                            onClick={() => setActiveTab("python")}
                        >
                            Submissions
                        </a>
                    </div>

                    {/* Tab Content */}
                    {activeTab === "cpp" && <ProblemDetail problem={problem} />}
                    {activeTab === "java" && (
                        <p className="text-sm">Java version of problem will be displayed here.</p>
                    )}
                    {activeTab === "python" && (
                        <p className="text-sm">Python version of problem will be displayed here.</p>
                    )}
                </div>

                {/* Right Panel: Code Editor */}
                <div className="bg-base-200 p-4 rounded-lg shadow overflow-y-auto">
                    {problem &&
                        <CodeSection codeSnippets={problem.codeSnippets} />
                    }
                </div>
            </Split>
        </div>
    );
};

export default InsertionAtHeadPage;
