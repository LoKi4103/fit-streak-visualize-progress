
import React, { useState } from 'react';
import { Search, Filter, Plus, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface Exercise {
  id: string;
  name: string;
  muscleGroup: string;
  equipment: string;
  description: string;
}

const ExerciseLibrary = () => {
  const [exercises, setExercises] = useState<Exercise[]>([
    { id: '1', name: 'Bench Press', muscleGroup: 'Chest', equipment: 'Barbell', description: 'Classic chest exercise' },
    { id: '2', name: 'Squat', muscleGroup: 'Legs', equipment: 'Barbell', description: 'King of all exercises' },
    { id: '3', name: 'Deadlift', muscleGroup: 'Back', equipment: 'Barbell', description: 'Full body strength' },
    { id: '4', name: 'Pull-ups', muscleGroup: 'Back', equipment: 'Bodyweight', description: 'Upper body pull' },
    { id: '5', name: 'Overhead Press', muscleGroup: 'Shoulders', equipment: 'Barbell', description: 'Shoulder strength' },
    { id: '6', name: 'Bicep Curls', muscleGroup: 'Arms', equipment: 'Dumbbell', description: 'Isolated bicep work' },
    { id: '7', name: 'Leg Press', muscleGroup: 'Legs', equipment: 'Machine', description: 'Quad focused movement' },
    { id: '8', name: 'Lat Pulldown', muscleGroup: 'Back', equipment: 'Machine', description: 'Lat development' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [muscleFilter, setMuscleFilter] = useState('All');
  const [equipmentFilter, setEquipmentFilter] = useState('All');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newExercise, setNewExercise] = useState({
    name: '',
    muscleGroup: '',
    equipment: '',
    description: ''
  });

  const muscleGroups = ['All', 'Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core'];
  const equipmentTypes = ['All', 'Barbell', 'Dumbbell', 'Machine', 'Bodyweight', 'Cable'];

  const filteredExercises = exercises.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMuscle = muscleFilter === 'All' || exercise.muscleGroup === muscleFilter;
    const matchesEquipment = equipmentFilter === 'All' || exercise.equipment === equipmentFilter;
    return matchesSearch && matchesMuscle && matchesEquipment;
  });

  const handleAddExercise = (e: React.FormEvent) => {
    e.preventDefault();
    const exercise: Exercise = {
      id: Date.now().toString(),
      ...newExercise
    };
    setExercises([...exercises, exercise]);
    setNewExercise({ name: '', muscleGroup: '', equipment: '', description: '' });
    setShowAddForm(false);
  };

  const getMuscleGroupColor = (muscleGroup: string) => {
    const colors = {
      'Chest': 'bg-red-100 text-red-600',
      'Back': 'bg-green-100 text-green-600',
      'Legs': 'bg-blue-100 text-blue-600',
      'Shoulders': 'bg-yellow-100 text-yellow-600',
      'Arms': 'bg-purple-100 text-purple-600',
      'Core': 'bg-orange-100 text-orange-600'
    };
    return colors[muscleGroup as keyof typeof colors] || 'bg-gray-100 text-gray-600';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BookOpen className="w-6 h-6 text-blue-500" />
          <h2 className="text-2xl font-bold text-gray-800">Exercise Library</h2>
        </div>
        <Button 
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Exercise
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-4 shadow-lg space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search exercises..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={muscleFilter}
              onChange={(e) => setMuscleFilter(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
            >
              {muscleGroups.map(group => (
                <option key={group} value={group}>{group}</option>
              ))}
            </select>
          </div>
          
          <div>
            <select
              value={equipmentFilter}
              onChange={(e) => setEquipmentFilter(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
            >
              {equipmentTypes.map(equipment => (
                <option key={equipment} value={equipment}>{equipment}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Exercise Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredExercises.map((exercise) => (
          <Card key={exercise.id} className="p-4 hover:shadow-lg transition-shadow">
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-800">{exercise.name}</h3>
              
              <div className="flex flex-wrap gap-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMuscleGroupColor(exercise.muscleGroup)}`}>
                  {exercise.muscleGroup}
                </span>
                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium">
                  {exercise.equipment}
                </span>
              </div>
              
              <p className="text-sm text-gray-600">{exercise.description}</p>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300"
              >
                Add to Split
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {filteredExercises.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No exercises found matching your criteria.</p>
        </div>
      )}

      {/* Add Exercise Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Add New Exercise</h3>
            
            <form onSubmit={handleAddExercise} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Exercise Name
                </label>
                <input
                  type="text"
                  value={newExercise.name}
                  onChange={(e) => setNewExercise({ ...newExercise, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Bulgarian Split Squat"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Muscle Group
                </label>
                <select
                  value={newExercise.muscleGroup}
                  onChange={(e) => setNewExercise({ ...newExercise, muscleGroup: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select muscle group</option>
                  {muscleGroups.slice(1).map(group => (
                    <option key={group} value={group}>{group}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Equipment
                </label>
                <select
                  value={newExercise.equipment}
                  onChange={(e) => setNewExercise({ ...newExercise, equipment: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select equipment</option>
                  {equipmentTypes.slice(1).map(equipment => (
                    <option key={equipment} value={equipment}>{equipment}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={newExercise.description}
                  onChange={(e) => setNewExercise({ ...newExercise, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Brief description of the exercise"
                  rows={3}
                  required
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1 bg-green-500 hover:bg-green-600">
                  Add Exercise
                </Button>
                <Button 
                  type="button" 
                  onClick={() => setShowAddForm(false)}
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

export default ExerciseLibrary;
