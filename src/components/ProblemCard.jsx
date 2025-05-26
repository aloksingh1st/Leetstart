import { CodeSquareIcon } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom';

const ProblemCard = ({ firstRender = false, title, tags, difficulty, problemId }) => {

  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/problem/${id}`);
  };
  
  return (
    <>
      <ul className="list bg-base-100 rounded-box shadow-md mb-2" onClick={() => handleClick(problemId)}>

        {firstRender &&
          <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Most Solved Question of this week</li>
        }

        <li className="list-row">
          <div>
            {/* <img className="size-10 rounded-box" src="https://img.daisyui.com/images/profile/demo/1@94.webp" /> */}
            <CodeSquareIcon />
          </div>
          <div>
            <div>{title}</div>
            <div className="text-xs uppercase font-semibold opacity-60">
              {
                tags && tags.map((tag) => {
                  return <span className='mr-1'>{tag}</span>

                })
              }
            </div>
          </div>
          <button className="btn btn-square btn-ghost">
            {difficulty}
          </button>
        </li>

      </ul>

    </>
  )
}

export default ProblemCard