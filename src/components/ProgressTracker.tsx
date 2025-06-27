
import React, { useState } from 'react';
import { TrendingUp, Award, Target } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ProgressTracker = () => {
  const [selectedExercise, setSelectedExercise] = useState('Bench Press');
  
  const exercises = ['Bench Press', 'Squat', 'Deadlift', 'Overhead Press', 'Pull-ups'];
  
  // Mock progress data
  const progressData = {
    'Bench Press': [
      { date: '2024-01-01', weight: 135, reps: 8 },
      { date: '2024-01-08', weight: 140, reps: 8 },
      { date: '2024-01-15', weight: 145, reps: 8 },
      { date: '2024-01-22', weight: 150, reps: 6 },
      { date: '2024-01-29', weight: 155, reps: 6 },
      { date: '2024-02-05', weight: 160, reps: 5 },
      { date: '2024-02-12', weight: 165, reps: 4 },
    ],
    'Squat': [
      { date: '2024-01-01', weight: 185, reps: 8 },
      { date: '2024-01-08', weight: 195, reps: 8 },
      { date: '2024-01-15', weight: 205, reps: 6 },
      { date: '2024-01-22', weight: 215, reps: 6 },
      { date: '2024-01-29', weight: 225, reps: 5 },
      { date: '2024-02-05', weight: 235, reps: 5 },
      { date: '2024-02-12', weight: 245, reps: 3 },
    ],
    'Deadlift': [
      { date: '2024-01-01', weight: 225, reps: 5 },
      { date: '2024-01-08', weight: 235, reps: 5 },
      { date: '2024-01-15', weight: 245, reps: 5 },
      { date: '2024-01-22', weight: 255, reps: 3 },
      { date: '2024-01-29', weight: 265, reps: 3 },
      { date: '2024-02-05', weight: 275, reps: 2 },
      { date: '2024-02-12', weight: 285, reps: 1 },
    ],
    'Overhead Press': [
      { date: '2024-01-01', weight: 95, reps: 8 },
      { date: '2024-01-08', weight: 100, reps: 8 },
      { date: '2024-01-15', weight: 105, reps: 6 },
      { date: '2024-01-22', weight: 110, reps: 6 },
      { date: '2024-01-29', weight: 115, reps: 5 },
      { date: '2024-02-05', weight: 120, reps: 4 },
      { date: '2024-02-12', weight: 125, reps: 3 },
    ],
    'Pull-ups': [
      { date: '2024-01-01', weight: 0, reps: 5 },
      { date: '2024-01-08', weight: 0, reps: 6 },
      { date: '2024-01-15', weight: 0, reps: 8 },
      { date: '2024-01-22', weight: 0, reps: 10 },
      { date: '2024-01-29', weight: 0, reps: 12 },
      { date: '2024-02-05', weight: 0, reps: 15 },
      { date: '2024-02-12', weight: 10, reps: 8 },
    ]
  };

  const currentData = progressData[selectedExercise as keyof typeof progressData] || [];
  const latestEntry = currentData[currentData.length - 1];
  const previousEntry = currentData[currentData.length - 2];
  
  const hasImproved = latestEntry && previousEntry && 
    (latestEntry.weight > previousEntry.weight || 
     (latestEntry.weight === previousEntry.weight && latestEntry.reps > previousEntry.reps));

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const calculateOneRepMax = (weight: number, reps: number) => {
    if (reps === 1) return weight;
    return Math.round(weight * (1 + reps / 30));
  };

  const currentMax = latestEntry ? calculateOneRepMax(latestEntry.weight, latestEntry.reps) : 0;
  const previousMax = previousEntry ? calculateOneRepMax(previousEntry.weight, previousEntry.reps) : 0;
  const maxImprovement = currentMax - previousMax;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <TrendingUp className="w-6 h-6 text-blue-500" />
          <h2 className="text-2xl font-bold text-gray-800">Progress Tracker</h2>
        </div>
      </div>

      {/* Exercise Selector */}
      <div className="bg-white rounded-xl p-4 shadow-lg">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Exercise
        </label>
        <select
          value={selectedExercise}
          onChange={(e) => setSelectedExercise(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {exercises.map(exercise => (
            <option key={exercise} value={exercise}>{exercise}</option>
          ))}
        </select>
      </div>

      {/* Progress Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Target className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Current Best</p>
              <p className="text-2xl font-bold text-gray-800">
                {latestEntry?.weight || 0} lbs
              </p>
              <p className="text-blue-500 text-sm font-medium">
                {latestEntry?.reps || 0} reps
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="bg-purple-100 p-3 rounded-full">
              <Award className="w-6 h-6 text-purple-500" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Est. 1RM</p>
              <p className="text-2xl font-bold text-gray-800">
                {currentMax} lbs
              </p>
              {maxImprovement > 0 && (
                <p className="text-purple-500 text-sm font-medium">
                  +{maxImprovement} lbs
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-full ${hasImproved ? 'bg-green-100' : 'bg-orange-100'}`}>
              <TrendingUp className={`w-6 h-6 ${hasImproved ? 'text-green-500' : 'text-orange-500'}`} />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Progress</p>
              <p className={`text-2xl font-bold ${hasImproved ? 'text-green-600' : 'text-orange-600'}`}>
                {hasImproved ? '↗' : '→'}
              </p>
              <p className={`text-sm font-medium ${hasImproved ? 'text-green-500' : 'text-orange-500'}`}>
                {hasImproved ? 'New PR!' : 'Keep pushing!'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Chart */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          {selectedExercise} Progress Over Time
        </h3>
        
        {hasImproved && (
          <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-lg p-4 mb-6 text-white text-center">
            <p className="font-semibold">🎉 Congratulations! New Personal Record! 🎉</p>
            <p className="text-green-100 text-sm">You've improved since your last session!</p>
          </div>
        )}
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={currentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                tickFormatter={formatDate}
                stroke="#666"
                fontSize={12}
              />
              <YAxis 
                stroke="#666"
                fontSize={12}
              />
              <Tooltip 
                labelFormatter={(value) => `Date: ${formatDate(value as string)}`}
                formatter={(value: number, name: string) => [
                  `${value} ${name === 'weight' ? 'lbs' : 'reps'}`,
                  name === 'weight' ? 'Weight' : 'Reps'
                ]}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="weight" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, stroke: '#3b82f6', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Motivational Message */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-white text-center">
        <h3 className="text-lg font-bold mb-2">Keep Going Strong! 💪</h3>
        <p className="text-purple-100">
          {hasImproved 
            ? "Amazing progress! You're getting stronger every session!" 
            : "Consistency is key. Every workout counts towards your goals!"
          }
        </p>
      </div>
    </div>
  );
};

export default ProgressTracker;
