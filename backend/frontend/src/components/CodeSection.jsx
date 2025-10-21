import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Editor from "@monaco-editor/react";
import { Loader2 } from "lucide-react";

import { useExecutionStore } from "../store/useExecution";

const LanguageDropDown = ({ selected, setSelected }) => {
    const languages = {
        63: "javascript",
        71: "python",
        62: "java",
        76: "cpp",
    };

    return (
        <div className="dropdown dropdown-hover">
            <label tabIndex={0} className="btn btn-sm btn-outline capitalize cursor-pointer">
                {selected[1]}
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </label>

            <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow-md bg-base-100 rounded-box w-40"
            >
                {Object.entries(languages).map(([id, name]) => (
                    <li key={id}>
                        <button
                            className={`capitalize text-left w-full transition-colors duration-200 hover:bg-base-200 ${Number(id) === selected[0] ? "text-primary font-semibold" : "text-base-content"
                                }`}
                            onClick={() => setSelected([Number(id), name])}
                        >
                            {name}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const CodeSection = ({ problem, setSubmissionOverlay }) => {
    const editorRef = useRef(null);
    const { isExecuting, submission, executeCode } = useExecutionStore();

    const codeSnippets = problem.codeSnippets;
    const [theme, setTheme] = useState("vs-light");
    const [selected, setSelected] = useState([76, 'cpp']); // Default to C++
    const [code, setCode] = useState("");

    useEffect(() => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        setTheme(currentTheme === "dark" ? "vs-dark" : "vs-light");
    }, []);

    useEffect(() => {
        // Load code snippet when language changes
        const defaultCodes = {
            java: codeSnippets.JAVA,
            cpp: codeSnippets.cpp ?? "// Code snippet not available.",
            javascript: codeSnippets.JAVASCRIPT,
            python: codeSnippets.PYTHON
        };
        setCode(defaultCodes[selected[1]] || "");
    }, [selected, codeSnippets]);

    const handleEditorDidMount = (editor) => {
        editorRef.current = editor;
    };

    const handleRunClick = async () => {
        if (editorRef.current) {
            const source_code = editorRef.current.getValue();
            const language_id = selected[0];
            const stdin = problem.testCases.map(tc => tc.input);
            const expected_outputs = problem.testCases.map(tc => tc.output);
            const problemId = problem.id;
            const isSubmission = 0;

            await executeCode(source_code, language_id, stdin, expected_outputs, problemId, isSubmission);

            setSubmissionOverlay(true);
        }
    };


    const handleSubmission = async () => {
        if (editorRef.current) {
            const source_code = editorRef.current.getValue();
            const language_id = selected[0];
            const stdin = problem.testCases.map(tc => tc.input);
            const expected_outputs = problem.testCases.map(tc => tc.output);
            const problemId = problem.id;
            const isSubmission = 1; // for entry in database

            await executeCode(source_code, language_id, stdin, expected_outputs, problemId, isSubmission);

            setSubmissionOverlay(true);
        }
    };

    return (
        <div className="ml-2 bg-base-100 p-1 w-full rounded-xl shadow-lg border border-base-300">
            <div className="flex justify-end mb-3">
                <LanguageDropDown selected={selected} setSelected={setSelected} />
            </div>

            <motion.div
                key={selected[1]} // Trigger remount on language change
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="rounded-xl overflow-hidden ring-1 ring-base-300 mb-4"
            >
                <Editor
                    height="400px"
                    language={selected[1]}
                    value={code}
                    onMount={handleEditorDidMount}
                    onChange={(val) => setCode(val)}
                    theme={theme}
                    options={{
                        readOnly: false,
                        minimap: { enabled: false },
                        fontSize: 14,
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                    }}
                />
            </motion.div>

            <div className="flex justify-end space-x-2">
                <button
                    className="btn btn-success btn-sm rounded-md shadow-lg transition-all duration-300 hover:brightness-110"
                    onClick={handleRunClick}
                    disabled={isExecuting}
                >
                    {isExecuting ? (
                        <>
                            <Loader2 className="h-5 w-5 animate-spin" />
                            Loading...
                        </>
                    ) : (
                        "Run"
                    )}
                </button>

                <button
                    className="btn btn-primary btn-sm rounded-md shadow-lg transition-all duration-300 hover:brightness-110"
                    onClick={handleSubmission}
                    disabled={isExecuting}
                >
                    {isExecuting ? (
                        <>
                            <Loader2 className="h-5 w-5 animate-spin" />
                            Loading...
                        </>
                    ) : (
                        "Submit"
                    )}

                </button>
            </div>
        </div>
    );
};

export default CodeSection;
