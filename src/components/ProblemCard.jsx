import { CodeSquareIcon } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom';

const ProblemCard = ({ firstRender = false, title, tags, difficulty, problemId }) => {

  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/problem/${id}`);
  };


  console.log(problemId);

  return (
    <>
      <ul
        className={`list bg-base-100 rounded-box shadow-md mb-2 ${firstRender ? "mt-10" : ""}`}
        onClick={() => handleClick(problemId)}
      >
        {firstRender && (
          <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
            Most Solved Question of this week
          </li>
        )}

        <li className="list-row flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CodeSquareIcon />
            <div>
              <div>{title}</div>
              <div className="text-xs uppercase font-semibold opacity-60">
                {tags &&
                  tags.map((tag) => (
                    <span key={tag} className="mr-1">
                      {tag}
                    </span>
                  ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button className="btn btn-square btn-ghost text-xs">{difficulty}</button>

            {/* Dropdown for playlist options */}
            <div
              className="dropdown dropdown-end"
              onClick={(e) => e.stopPropagation()} // Prevents click from bubbling to parent
            >
              <button tabIndex={0} className="btn btn-square btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 12h.01M12 12h.01M18 12h.01"
                  />
                </svg>
              </button>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a>Add to Playlist</a>
                </li>
                <li>
                  <a>Remove from Playlist</a>
                </li>
              </ul>
            </div>
          </div>
        </li>
      </ul>

    </>
  )
}

export default ProblemCard