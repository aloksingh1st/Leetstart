import React, { useEffect, useRef, useState } from "react";
import { BookOpenCheck, ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { usePlaylistStore } from "../store/usePlaylistStore";
import ProblemCard from "./ProblemCard";

const PlaylistItem = ({ playlist }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [height, setHeight] = useState(0);
    const contentRef = useRef(null);

    const { currentPlaylist, isLoading, getPlaylistDetails } = usePlaylistStore();

    // Fetch playlist details on mount
    useEffect(() => {
        getPlaylistDetails(playlist.id);
    }, [playlist.id, getPlaylistDetails]);

    // Update height for smooth transition when expanded
    useEffect(() => {
        if (isExpanded && contentRef.current) {
            setHeight(contentRef.current.scrollHeight);
        } else {
            setHeight(0);
        }
    }, [isExpanded]);

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
                {/* Show loader while fetching playlist details */}
                {isLoading ? (
                    <div className="flex justify-center items-center p-4 text-gray-500 dark:text-gray-400">
                        <Loader2 className="animate-spin mr-2" /> Loading...
                    </div>
                ) : (
                    <div ref={contentRef} className="px-4 pb-4 space-y-2 text-sm">
                        {playlist.problems.length === 0 ? (
                            <div className="text-xs text-gray-400 italic dark:text-gray-500">
                                No problems added yet
                            </div>
                        ) : (
                            playlist.problems.map((problem, index) => (
                                <div
                                    key={problem.id} // Use problem.id as the key for unique identification
                                    className="bg-white dark:bg-[#131c2c] border border-gray-200 dark:border-[#2a3344] rounded-lg shadow-sm p-4 mb-4"
                                >
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <div className="font-medium text-gray-800 dark:text-gray-200">
                                                {problem.name} {/* Display problem name */}
                                            </div>
                                            <div className="text-xs opacity-60 text-gray-600 dark:text-gray-400">
                                                {/* Display tags */}
                                                {problem.tags && problem.tags.length > 0 ? (
                                                    problem.tags.map((tag, tagIndex) => (
                                                        <span key={tagIndex} className="mr-1 text-xs text-gray-500 dark:text-gray-400">
                                                            {tag}
                                                        </span>
                                                    ))
                                                ) : (
                                                    <span className="text-xs text-gray-400 dark:text-gray-500">No tags available</span>
                                                )}
                                            </div>
                                        </div>
                                        <div>
                                            <span className="badge badge-outline badge-xs text-gray-700 dark:text-gray-400">
                                                {problem.difficulty} {/* Display problem difficulty */}
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
