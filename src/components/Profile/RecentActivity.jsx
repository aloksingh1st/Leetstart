import React from 'react';
import { Calendar, Clock } from 'lucide-react';

const RecentActivity = ({ recentProblems }) => {
  // Format the date to a more readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);
  };

  // Return difficulty badge color
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'Hard':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Recent Activity</h3>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        {recentProblems.length > 0 ? (
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {recentProblems.map((problem) => (
              <li 
                key={problem.id}
                className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors duration-150"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                      {problem.title}
                    </h4>
                    <div className="flex items-center mt-1 text-xs text-gray-500 dark:text-gray-400">
                      <Clock className="w-3 h-3 mr-1" />
                      <span>{formatDate(problem.solvedAt)}</span>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getDifficultyColor(problem.difficulty)}`}>
                    {problem.difficulty}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="py-6 px-4 text-center">
            <Calendar className="w-8 h-8 mx-auto text-gray-400 dark:text-gray-500 mb-2" />
            <p className="text-gray-500 dark:text-gray-400">No recent activity</p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
              Start solving problems to track your progress
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentActivity;
