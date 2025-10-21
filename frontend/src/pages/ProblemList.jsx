import React, { useEffect } from 'react'
import ProblemCard from '../components/ProblemCard'
import Sidebar from '../components/Sidebar'
import Calendar from '../components/Calendar'
import { useProblemStore } from '../store/useProblemStore'
import { Loader } from 'lucide-react'


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

        <div className='scrollable-div overflow-y-auto h-[100vh] lg:h-full flex-grow px-4'>
          {problems && problems.map((problem, index) => (
            <ProblemCard
              firstRender={index == 0}
              key={problem.id}
              problemId={problem.id}
              title={problem.title}
              tags={problem.tags}
              difficulty={problem.difficulty}
              completion={problem.completion || 0} // default to 0% if undefined
            />
          ))}
        </div>

        <Calendar />
      </div>
    </>
  )
}

export default ProblemList