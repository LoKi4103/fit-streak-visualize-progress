
import React, { useState, useEffect } from 'react';
import { Calendar, Fire, Target, Trophy } from 'lucide-react';
import WorkoutCalendar from './WorkoutCalendar';

const Dashboard = () => {
  const [streak, setStreak] = useState(4);
  const [weeklyWorkouts, setWeeklyWorkouts] = useState(5);
  const [totalWorkouts, setTotalWorkouts] = useState(28);

  const motivationalMessages = [
    "Great job, keep the streak alive! 🔥",
    "You're crushing your fitness goals! 💪",
    "Consistency is key - you've got this! ⭐",
    "Your dedication is inspiring! 🏆"
  ];

  const [currentMessage, setCurrentMessage] = useState(motivationalMessages[0]);

  useEffect(() => {
    const messageIndex = Math.floor(Math.random() * motivationalMessages.length);
    setCurrentMessage(motivationalMessages[messageIndex]);
  }, []);

  return (
    <div className="space-y-6">
      {/* Motivational Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white text-center">
        <h2 className="text-2xl font-bold mb-2">Welcome Back, Champion!</h2>
        <p className="text-blue-100">{currentMessage}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="bg-orange-100 p-3 rounded-full">
              <Fire className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Current Streak</p>
              <p className="text-3xl font-bold text-gray-800">{streak}</p>
              <p className="text-orange-500 text-sm font-medium">days in a row!</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-full">
              <Target className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">This Week</p>
              <p className="text-3xl font-bold text-gray-800">{weeklyWorkouts}</p>
              <p className="text-green-500 text-sm font-medium">workouts completed</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="bg-purple-100 p-3 rounded-full">
              <Trophy className="w-6 h-6 text-purple-500" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Total Workouts</p>
              <p className="text-3xl font-bold text-gray-800">{totalWorkouts}</p>
              <p className="text-purple-500 text-sm font-medium">all time</p>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar Section */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <Calendar className="w-6 h-6 text-blue-500" />
          <h3 className="text-xl font-bold text-gray-800">Workout Calendar</h3>
        </div>
        <WorkoutCalendar />
      </div>

      {/* Today's Motivation */}
      <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-xl p-6 text-white text-center">
        <h3 className="text-lg font-bold mb-2">Today's Mission</h3>
        <p className="text-green-100">Ready to continue your amazing streak? Let's make today count!</p>
      </div>
    </div>
  );
};

export default Dashboard;
