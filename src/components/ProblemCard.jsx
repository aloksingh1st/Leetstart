import { CodeSquareIcon } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { usePlaylistStore } from "../store/usePlaylistStore";

const ProblemCard = ({ firstRender = false, title, tags, difficulty, problemId }) => {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const { addProblemToPlaylist, playlists, getAllPlaylists } = usePlaylistStore();

  useEffect(() => {
    getAllPlaylists();
  }, [getAllPlaylists]);

  const handleCardClick = () => {
    navigate(`/problem/${problemId}`);
  };

  const handlePlaylistClick = (playlistId) => {
    addProblemToPlaylist(playlistId, [problemId]);
    setIsDropdownVisible(false);
  };

  const handleDropdownToggle = (e) => {
    e.stopPropagation();
    setIsDropdownVisible((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <ul
      className={`list bg-base-100 rounded-box shadow-md mb-2 ${firstRender ? "mt-10" : ""}`}
      onClick={handleCardClick}
    >
      {firstRender && (
        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
          Most Solved Question of this week
        </li>
      )}

      <li className="list-row flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-2">
          <CodeSquareIcon />
          <div>
            <div className="font-medium">{title}</div>
            <div className="text-xs uppercase font-semibold opacity-60">
              {tags?.map((tag) => (
                <span key={tag} className="mr-1">{tag}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="relative flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          <button className="btn btn-xs btn-outline">{difficulty}</button>

          <div ref={dropdownRef}>
            <button
              onClick={handleDropdownToggle}
              className="btn btn-square btn-ghost"
              title="More actions"
            >
              <svg xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M6 12h.01M12 12h.01M18 12h.01"
                />
              </svg>
            </button>

            {isDropdownVisible && (
              <div className="absolute right-0 z-10 mt-2 w-48 bg-white dark:bg-[#131c2c] border border-gray-200 dark:border-[#2a3344] rounded-lg shadow-md overflow-hidden">
                {playlists.length > 0 ? (
                  playlists.map((playlist) => (
                    <div
                      key={playlist.id}
                      onClick={() => handlePlaylistClick(playlist.id)}
                      className="px-4 py-2 text-sm cursor-pointer text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      {playlist.name}
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-2 text-sm text-gray-400 dark:text-gray-500 italic">
                    No playlists available
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </li>
    </ul>
  );
};

export default ProblemCard;
