
import React, { useState } from 'react';
import { Activity, Plus, Minus, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

interface Set {
  id: string;
  reps: number;
  weight: number;
  completed: boolean;
}

interface WorkoutExercise {
  id: string;
  name: string;
  sets: Set[];
  targetSets: number;
}

const WorkoutTracker = () => {
  const [todaysWorkout] = useState("Push Day");
  const [workoutStarted, setWorkoutStarted] = useState(false);
  const [workoutCompleted, setWorkoutCompleted] = useState(false);
  const [exercises, setExercises] = useState<WorkoutExercise[]>([
    {
      id: '1',
      name: 'Bench Press',
      targetSets: 4,
      sets: [
        { id: '1', reps: 8, weight: 135, completed: false },
        { id: '2', reps: 8, weight: 145, completed: false },
        { id: '3', reps: 6, weight: 155, completed: false },
        { id: '4', reps: 4, weight: 165, completed: false },
      ]
    },
    {
      id: '2',
      name: 'Overhead Press',
      targetSets: 3,
      sets: [
        { id: '5', reps: 10, weight: 95, completed: false },
        { id: '6', reps: 8, weight: 105, completed: false },
        { id: '7', reps: 6, weight: 115, completed: false },
      ]
    },
    {
      id: '3',
      name: 'Push-ups',
      targetSets: 3,
      sets: [
        { id: '8', reps: 15, weight: 0, completed: false },
        { id: '9', reps: 12, weight: 0, completed: false },
        { id: '10', reps: 10, weight: 0, completed: false },
      ]
    }
  ]);

  const updateSet = (exerciseId: string, setId: string, field: 'reps' | 'weight' | 'completed', value: number | boolean) => {
    setExercises(exercises.map(exercise => 
      exercise.id === exerciseId
        ? {
            ...exercise,
            sets: exercise.sets.map(set =>
              set.id === setId ? { ...set, [field]: value } : set
            )
          }
        : exercise
    ));
  };

  const addSet = (exerciseId: string) => {
    setExercises(exercises.map(exercise =>
      exercise.id === exerciseId
        ? {
            ...exercise,
            sets: [...exercise.sets, {
              id: Date.now().toString(),
              reps: 0,
              weight: 0,
              completed: false
            }]
          }
        : exercise
    ));
  };

  const removeSet = (exerciseId: string, setId: string) => {
    setExercises(exercises.map(exercise =>
      exercise.id === exerciseId
        ? {
            ...exercise,
            sets: exercise.sets.filter(set => set.id !== setId)
          }
        : exercise
    ));
  };

  const completeWorkout = () => {
    setWorkoutCompleted(true);
    toast({
      title: "Workout Completed! 🏆",
      description: "Great job! You've completed your workout for today.",
    });
  };

  const totalSets = exercises.reduce((total, exercise) => total + exercise.sets.length, 0);
  const completedSets = exercises.reduce((total, exercise) => 
    total + exercise.sets.filter(set => set.completed).length, 0
  );

  const progressPercentage = totalSets > 0 ? (completedSets / totalSets) * 100 : 0;

  if (workoutCompleted) {
    return (
      <div className="text-center space-y-6">
        <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl p-8 text-white">
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="text-3xl font-bold mb-2">Workout Complete!</h2>
          <p className="text-green-100">You've crushed your {todaysWorkout} workout!</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Today's Stats</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-blue-500">{exercises.length}</p>
              <p className="text-sm text-gray-600">Exercises</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-500">{totalSets}</p>
              <p className="text-sm text-gray-600">Total Sets</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-500">
                {exercises.reduce((total, ex) => total + ex.sets.reduce((sum, set) => sum + (set.weight * set.reps), 0), 0).toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">Total Volume</p>
            </div>
          </div>
        </div>
        
        <Button 
          onClick={() => {
            setWorkoutCompleted(false);
            setWorkoutStarted(false);
            // Reset all sets
            setExercises(exercises.map(ex => ({
              ...ex,
              sets: ex.sets.map(set => ({ ...set, completed: false }))
            })));
          }}
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
        >
          Start New Workout
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Activity className="w-6 h-6 text-blue-500" />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Today's Workout</h2>
            <p className="text-gray-600">{todaysWorkout}</p>
          </div>
        </div>
        {!workoutStarted && (
          <Button 
            onClick={() => setWorkoutStarted(true)}
            className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
          >
            Start Workout
          </Button>
        )}
      </div>

      {workoutStarted && (
        <>
          {/* Progress Bar */}
          <div className="bg-white rounded-xl p-4 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Progress</span>
              <span className="text-sm font-medium text-gray-700">{completedSets}/{totalSets} sets</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Exercises */}
          <div className="space-y-4">
            {exercises.map((exercise, exerciseIndex) => (
              <Card key={exercise.id} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">{exercise.name}</h3>
                  <Button
                    onClick={() => addSet(exercise.id)}
                    variant="outline"
                    size="sm"
                    className="text-blue-500 border-blue-500 hover:bg-blue-50"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Set
                  </Button>
                </div>

                <div className="space-y-3">
                  {exercise.sets.map((set, setIndex) => (
                    <div key={set.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-600 w-12">
                        Set {setIndex + 1}
                      </span>
                      
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={set.reps || ''}
                          onChange={(e) => updateSet(exercise.id, set.id, 'reps', parseInt(e.target.value) || 0)}
                          placeholder="Reps"
                          className="w-16 px-2 py-1 border border-gray-300 rounded text-center text-sm focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="text-xs text-gray-500">reps</span>
                      </div>

                      {exercise.name !== 'Push-ups' && (
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            value={set.weight || ''}
                            onChange={(e) => updateSet(exercise.id, set.id, 'weight', parseInt(e.target.value) || 0)}
                            placeholder="Weight"
                            className="w-20 px-2 py-1 border border-gray-300 rounded text-center text-sm focus:ring-2 focus:ring-blue-500"
                          />
                          <span className="text-xs text-gray-500">lbs</span>
                        </div>
                      )}

                      <button
                        onClick={() => updateSet(exercise.id, set.id, 'completed', !set.completed)}
                        className={`p-2 rounded-full transition-colors ${
                          set.completed
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                        }`}
                      >
                        <Check className="w-4 h-4" />
                      </button>

                      {exercise.sets.length > 1 && (
                        <button
                          onClick={() => removeSet(exercise.id, set.id)}
                          className="p-2 rounded-full bg-red-100 text-red-500 hover:bg-red-200 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>

          {/* Complete Workout Button */}
          <div className="text-center pt-6">
            <Button 
              onClick={completeWorkout}
              disabled={completedSets === 0}
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 px-8 py-3 text-lg"
            >
              Complete Workout 🏆
            </Button>
          </div>
        </>
      )}

      {!workoutStarted && (
        <div className="text-center py-12">
          <Activity className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">Ready for your {todaysWorkout}?</h3>
          <p className="text-gray-500">Hit "Start Workout" when you're ready to begin!</p>
        </div>
      )}
    </div>
  );
};

export default WorkoutTracker;
