import React, { useEffect, useRef, useState } from "react";
import { BookOpenCheck, ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { usePlaylistStore } from "../store/usePlaylistStore";
import ProblemCard from "./ProblemCard";
import { useNavigate } from "react-router-dom";

const PlaylistItem = ({ playlist }) => {
    const navigate = useNavigate();

    const [isExpanded, setIsExpanded] = useState(false);
    const [height, setHeight] = useState(0);
    const contentRef = useRef(null);

    const [problems, setProblems] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const { getPlaylistDetails, currentPlaylist } = usePlaylistStore();


    useEffect(() => {
        if (isExpanded) {
            getPlaylistDetails(playlist.id);
        }
        setProblems(currentPlaylist?.problems);
    }, [isExpanded, getPlaylistDetails]);


    useEffect(() => {
        if (isExpanded && contentRef.current) {
            setHeight(contentRef.current.scrollHeight);
        } else {
            setHeight(0);
        }
    }, [isExpanded, problems]);

    const handleCardClick = (problemId) => {
        navigate(`/problem/${problemId}`);
    };

    return (
        <div className="bg-white dark:bg-[#131c2c] border border-gray-200 dark:border-[#2a3344] rounded-lg shadow-sm transition-all duration-300">
            <div
                onClick={() => setIsExpanded((prev) => !prev)}
                className="flex justify-between items-center p-4 cursor-pointer"
            >
                <div className="flex items-center">
                    <BookOpenCheck className="w-5 h-5 text-emerald-500" />
                    <div className="ml-4">
                        <div className="font-medium text-gray-800 dark:text-gray-200">
                            {playlist.name}
                        </div>
                        {playlist.description && (
                            <div className="text-xs opacity-60 text-gray-600 dark:text-gray-400">
                                {playlist.description}
                            </div>
                        )}
                    </div>
                </div>
                {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                ) : (
                    <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                )}
            </div>

            <div
                className="overflow-hidden transition-all duration-500 ease-in-out"
                style={{ maxHeight: `${height}px` }}
            >
                {isFetching ? (
                    <div className="flex justify-center items-center p-4 text-gray-500 dark:text-gray-400">
                        <Loader2 className="animate-spin mr-2" /> Loading...
                    </div>
                ) : (
                    <div ref={contentRef} className="px-4 pb-4 space-y-2 text-sm">
                        {problems?.length === 0 ? (
                            <div className="text-xs text-gray-400 italic dark:text-gray-500">
                                No problems added yet
                            </div>
                        ) : (
                            problems?.map((problemWrapper, index) => (
                                <div
                                    key={problemWrapper.id || index}
                                    className="bg-white dark:bg-[#131c2c] border border-gray-200 dark:border-[#2a3344] rounded-lg shadow-sm p-4 mb-2 cursor-pointer"
                                    onClick={() => handleCardClick(problemWrapper.problem.id)}
                                >
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <div className="font-medium text-gray-800 dark:text-gray-200">
                                                {problemWrapper.problem.title}
                                            </div>
                                        </div>
                                        <div>
                                            <span className="badge badge-outline badge-xs text-gray-700 dark:text-gray-400">
                                                {problemWrapper.problem.difficulty}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PlaylistItem;
