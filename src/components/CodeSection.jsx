import Editor from "@monaco-editor/react";
import { useEffect, useState } from "react";

const LanguageDropDown = ({ selected, setSelected }) => {
    const languages = ["cpp", "js", "python"];

    return (
        <div className="dropdown dropdown-hover">
            <label tabIndex={0} className="btn btn-sm m-1 capitalize">
                {selected}
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </label>
            <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-40"
            >
                {languages.map((lang) => (
                    <li key={lang}>
                        <a
                            className={`capitalize ${lang === selected ? "text-orange-500 font-bold" : ""}`}
                            onClick={() => setSelected(lang)}
                        >
                            {lang}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};



const CodeSection = ({ codeSnippets }) => {
    const [theme, setTheme] = useState("vs-light");
    const [selected, setSelected] = useState("cpp");

    useEffect(() => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        setTheme(currentTheme === "dark" ? "vs-dark" : "vs-light");
    }, []);


    const defaultCodes = {
        cpp: codeSnippets.JAVA,
        js: codeSnippets.JAVASCRIPT,
        python: codeSnippets.PYTHON
    };



    console.log(codeSnippets.JAVA);
    return (
        <div className="ml-2 bg-base-200 p-4 lg:w-full rounded-lg h-fit shadow">
            <div className="flex justify-end mb-2">
                <LanguageDropDown selected={selected} setSelected={setSelected} />
            </div>
            <div className="rounded border border-base-300 overflow-hidden">
                <Editor
                    height="400px"
                    language={selected}
                    value={defaultCodes[selected]}
                    theme={theme}
                    options={{
                        readOnly: false,
                        minimap: { enabled: false },
                        fontSize: 14,
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                    }}
                />
            </div>
        </div>
    );
};

export default CodeSection;
