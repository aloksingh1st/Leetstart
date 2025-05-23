import React, { useEffect } from 'react'
import ProblemCard from '../components/ProblemCard'
import Sidebar from '../components/Sidebar'
import PlaylistCard from '../components/PlaylistCard'
import Calendar from '../components/Calendar'
import { useProblemStore } from '../store/useProblemStore'
import { Loader } from 'lucide-react'
import { useNavigate } from 'react-router-dom'


const ProblemList = () => {

  const { getAllProblems, problems, isProblemsLoading } = useProblemStore();

  useEffect(() => {
    getAllProblems();
  }, [getAllProblems]);


  if (isProblemsLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }


  return (
    <>
      <div className='flex flex-col lg:flex-row lg:h-screen'>

        <Sidebar />

        <div className='scrollable-div overflow-y-auto h-[100vh] lg:h-full flex-grow'>
          <div className='flex  flex-col lg:flex-row justify-center'>
            <PlaylistCard />
            <PlaylistCard />
            <PlaylistCard />
          </div>
          {
            problems && problems.map((problem, index) => {
              return (
                <>
                  <ProblemCard key={problem.id} firstRender={index === 0} title={problem.title} tags={problem.tags} difficulty={problem.difficulty} problemId={problem.id} />
                </>
              )
            })
          }
        </div>

        <Calendar />
      </div>
    </>
  )
}

export default ProblemList