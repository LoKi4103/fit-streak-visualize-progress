
import React, { useState } from 'react';
import { Plus, Edit, Trash, Dumbbell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface Split {
  id: string;
  name: string;
  days: string[];
  exercises: string[];
}

const SplitManager = () => {
  const [splits, setSplits] = useState<Split[]>([
    {
      id: '1',
      name: 'Push Pull Legs',
      days: ['Monday', 'Wednesday', 'Friday'],
      exercises: ['Bench Press', 'Squat', 'Deadlift', 'Pull-ups']
    },
    {
      id: '2',
      name: 'Upper Lower',
      days: ['Tuesday', 'Thursday', 'Saturday'],
      exercises: ['Overhead Press', 'Rows', 'Leg Press', 'Curls']
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingSplit, setEditingSplit] = useState<Split | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    days: [] as string[],
    exercises: [] as string[]
  });

  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const availableExercises = [
    'Bench Press', 'Squat', 'Deadlift', 'Pull-ups', 'Overhead Press', 
    'Rows', 'Leg Press', 'Curls', 'Tricep Dips', 'Lunges'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingSplit) {
      setSplits(splits.map(split => 
        split.id === editingSplit.id 
          ? { ...split, ...formData }
          : split
      ));
    } else {
      const newSplit: Split = {
        id: Date.now().toString(),
        ...formData
      };
      setSplits([...splits, newSplit]);
    }
    
    resetForm();
  };

  const resetForm = () => {
    setFormData({ name: '', days: [], exercises: [] });
    setEditingSplit(null);
    setShowForm(false);
  };

  const editSplit = (split: Split) => {
    setFormData({
      name: split.name,
      days: split.days,
      exercises: split.exercises
    });
    setEditingSplit(split);
    setShowForm(true);
  };

  const deleteSplit = (id: string) => {
    setSplits(splits.filter(split => split.id !== id));
  };

  const toggleDay = (day: string) => {
    setFormData(prev => ({
      ...prev,
      days: prev.days.includes(day)
        ? prev.days.filter(d => d !== day)
        : [...prev.days, day]
    }));
  };

  const toggleExercise = (exercise: string) => {
    setFormData(prev => ({
      ...prev,
      exercises: prev.exercises.includes(exercise)
        ? prev.exercises.filter(e => e !== exercise)
        : [...prev.exercises, exercise]
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Dumbbell className="w-6 h-6 text-blue-500" />
          <h2 className="text-2xl font-bold text-gray-800">Workout Splits</h2>
        </div>
        <Button 
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Split
        </Button>
      </div>

      {/* Splits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {splits.map((split) => (
          <Card key={split.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">{split.name}</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => editSplit(split)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <Edit className="w-4 h-4 text-gray-500" />
                </button>
                <button
                  onClick={() => deleteSplit(split.id)}
                  className="p-1 hover:bg-red-100 rounded"
                >
                  <Trash className="w-4 h-4 text-red-500" />
                </button>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Days:</p>
              <div className="flex flex-wrap gap-1">
                {split.days.map((day) => (
                  <span key={day} className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs">
                    {day.slice(0, 3)}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <p className="text-sm text-gray-600 mb-2">Exercises ({split.exercises.length}):</p>
              <div className="flex flex-wrap gap-1">
                {split.exercises.slice(0, 3).map((exercise) => (
                  <span key={exercise} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                    {exercise}
                  </span>
                ))}
                {split.exercises.length > 3 && (
                  <span className="text-xs text-gray-500">+{split.exercises.length - 3} more</span>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Split Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">
              {editingSplit ? 'Edit Split' : 'Create New Split'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Split Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Push Pull Legs"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Workout Days
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {weekdays.map((day) => (
                    <label key={day} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.days.includes(day)}
                        onChange={() => toggleDay(day)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm">{day}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Exercises
                </label>
                <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto">
                  {availableExercises.map((exercise) => (
                    <label key={exercise} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.exercises.includes(exercise)}
                        onChange={() => toggleExercise(exercise)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm">{exercise}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1 bg-blue-500 hover:bg-blue-600">
                  {editingSplit ? 'Update Split' : 'Create Split'}
                </Button>
                <Button 
                  type="button" 
                  onClick={resetForm}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SplitManager;
