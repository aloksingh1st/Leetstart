import React from 'react';
import { Flame } from 'lucide-react';

const StreakCalendar = ({ currentStreak, longestStreak, streakDays }) => {
  // Generate last 30 days for the calendar
  const generateCalendarDays = () => {
    const days = [];
    const today = new Date();
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateString = date.toISOString().split('T')[0]; // YYYY-MM-DD
      
      const isActive = streakDays.includes(dateString);
      const isToday = i === 0;
      
      days.push({ date: dateString, isActive, isToday });
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays();
  
  // Group days by week
  const weeks = [];
  for (let i = 0; i < calendarDays.length; i += 7) {
    weeks.push(calendarDays.slice(i, i + 7));
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Coding Streak</h3>
        <div className="flex items-center space-x-1">
          <Flame className="w-5 h-5 text-orange-500" />
          <span className="font-semibold text-gray-900 dark:text-white">{currentStreak}</span>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
        <div className="flex justify-between mb-2">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Current Streak</p>
            <div className="flex items-center">
              <Flame className="w-4 h-4 text-orange-500 mr-1" />
              <span className="font-bold text-gray-900 dark:text-white">{currentStreak} days</span>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Longest Streak</p>
            <div className="flex items-center">
              <Flame className="w-4 h-4 text-purple-500 mr-1" />
              <span className="font-bold text-gray-900 dark:text-white">{longestStreak} days</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="grid grid-cols-7 gap-1">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
              <div key={index} className="text-xs text-center text-gray-500 dark:text-gray-400">
                {day}
              </div>
            ))}

            {weeks.map((week, weekIndex) => (
              <React.Fragment key={weekIndex}>
                {week.map((day, dayIndex) => (
                  <div 
                    key={`${weekIndex}-${dayIndex}`} 
                    className={`
                      aspect-square rounded-sm flex items-center justify-center
                      ${day.isActive ? 'bg-green-500 dark:bg-[#00DFA2]' : 'bg-gray-100 dark:bg-gray-700'}
                      ${day.isToday ? 'ring-2 ring-blue-500 dark:ring-blue-400' : ''}
                    `}
                    title={day.date}
                  >
                    <span className={`
                      text-xs font-medium
                      ${day.isActive ? 'text-white' : 'text-gray-400 dark:text-gray-500'}
                    `}>
                      {new Date(day.date).getDate()}
                    </span>
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreakCalendar;
