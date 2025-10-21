import React from "react";
import { Zap, ArrowRight, BarChart, BookOpen } from "lucide-react";

const difficultyColors = {
  easy: "bg-green-500/20 text-green-400 border-green-500/30",
  medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  hard: "bg-red-500/20 text-red-400 border-red-500/30",
};

interface ProblemCardProps {
  id: number;
  title: string;
  difficulty: "easy" | "medium" | "hard";
  tags: string[];
  completion: number;
}

const ProblemCard: React.FC<ProblemCardProps> = ({
  id,
  title,
  difficulty,
  tags,
  completion,
}) => {
  return (
    <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-lg p-4 hover:bg-gray-800/80 transition-colors group cursor-pointer">
      <div className="flex justify-between items-start mb-2">
        <span className="text-gray-400 font-mono text-sm">{id}.</span>
        <span
          className={`px-2 py-0.5 text-xs rounded border ${difficultyColors[difficulty]}`}
        >
          {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
        </span>
      </div>

      <h3 className="text-white font-medium mb-2 group-hover:text-cyan-400 transition-colors">
        {title}
      </h3>

      <div className="flex flex-wrap gap-2 mb-3">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="bg-gray-700/50 text-gray-300 text-xs px-2 py-0.5 rounded"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-16 h-1.5 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-accent-100 to-accent rounded-full"
              style={{ width: `${completion}%` }}
            ></div>
          </div>
          <span className="ml-2 text-gray-400 text-xs">{completion}%</span>
        </div>

        <button className="text-cyan-400 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

const ProblemListView: React.FC = () => {
  const problems = [
    {
      id: 1,
      title: "Two Sum",
      difficulty: "easy",
      tags: ["Array", "Hash Table"],
      completion: 70,
    },
    {
      id: 2,
      title: "Add Two Numbers",
      difficulty: "medium",
      tags: ["Linked List", "Math"],
      completion: 45,
    },
    {
      id: 3,
      title: "Longest Substring Without Repeating Characters",
      difficulty: "medium",
      tags: ["String", "Sliding Window"],
      completion: 30,
    },
    {
      id: 4,
      title: "Median of Two Sorted Arrays",
      difficulty: "hard",
      tags: ["Array", "Binary Search"],
      completion: 10,
    },
    {
      id: 5,
      title: "Longest Palindromic Substring",
      difficulty: "medium",
      tags: ["String", "Dynamic Programming"],
      completion: 25,
    },
    {
      id: 6,
      title: "ZigZag Conversion",
      difficulty: "medium",
      tags: ["String"],
      completion: 20,
    },
  ] as ProblemCardProps[];

  return (
    <div className="h-full text-left p-6 overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white">Problem List</h2>
        <div className="flex space-x-2">
          <button className="bg-gray-700/70 hover:bg-gray-700 p-2 rounded transition-colors">
            <BarChart size={16} className="text-gray-300" />
          </button>
          <button className="bg-gray-700/70 hover:bg-gray-700 p-2 rounded transition-colors">
            <BookOpen size={16} className="text-gray-300" />
          </button>
          <button className="bg-gray-700/70 hover:bg-gray-700 p-2 rounded transition-colors">
            <Zap size={16} className="text-gray-300" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {problems.map((problem) => (
          <ProblemCard key={problem.id} {...problem} />
        ))}
      </div>

      <div className="mt-6 text-center">
        <button className="bg-gray-700/70 hover:bg-gray-700 text-gray-300 px-4 py-2 rounded-lg transition-colors">
          Load More Problems
        </button>
      </div>
    </div>
  );
};

export default ProblemListView;
