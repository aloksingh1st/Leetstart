// Get current date for streak calculation
const today = new Date();
const formatDateString = (date) => {
  return date.toISOString().split('T')[0];
};

// Generate streak days (last 30 days with some random gaps)
const generateStreakDays = () => {
  const days = [];
  const randomSkip = () => Math.random() > 0.7; // 30% chance to skip a day

  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);

    // Add consecutive days for current streak (last 5 days)
    if (i < 5 || !randomSkip()) {
      days.push(formatDateString(date));
    }
  }

  return days;
};

const streakDays = generateStreakDays();

// Calculate current streak
const calculateCurrentStreak = (days) => {
  let streak = 0;
  const todayStr = formatDateString(today);

  // Check if today is in the streak
  if (!days.includes(todayStr)) return 0;

  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dateStr = formatDateString(date);

    if (days.includes(dateStr)) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
};

// Mock data for the user profile
export const mockUserProfile = {
  name: "Jane Smith",
  email: "jane.smith@example.com",
  profilePicture: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  currentStreak: calculateCurrentStreak(streakDays),
  longestStreak: 14,
  streakDays: streakDays,
  recentProblems: [
    {
      id: "1",
      title: "Two Sum",
      difficulty: "Easy",
      solvedAt: new Date(today.getTime() - 2 * 60 * 60 * 1000).toISOString() // 2 hours ago
    },
    {
      id: "2",
      title: "Valid Parentheses",
      difficulty: "Easy",
      solvedAt: new Date(today.getTime() - 5 * 60 * 60 * 1000).toISOString() // 5 hours ago
    },
    {
      id: "3",
      title: "LRU Cache",
      difficulty: "Medium",
      solvedAt: new Date(today.getTime() - 24 * 60 * 60 * 1000).toISOString() // 1 day ago
    },
    {
      id: "4",
      title: "Merge K Sorted Lists",
      difficulty: "Hard",
      solvedAt: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString() // 2 days ago
    },
    {
      id: "5",
      title: "Number of Islands",
      difficulty: "Medium",
      solvedAt: new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString() // 3 days ago
    }
  ]
};
