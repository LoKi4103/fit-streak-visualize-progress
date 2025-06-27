
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Calendar, Dumbbell, BookOpen, Activity, TrendingUp } from 'lucide-react';

const Navigation = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Calendar, path: '/' },
    { id: 'splits', label: 'Splits', icon: Dumbbell, path: '/splits' },
    { id: 'exercises', label: 'Exercises', icon: BookOpen, path: '/exercises' },
    { id: 'workout', label: 'Workout', icon: Activity, path: '/workout' },
    { id: 'progress', label: 'Progress', icon: TrendingUp, path: '/progress' },
  ];

  return (
    <nav className="bg-white rounded-2xl shadow-lg p-2">
      <div className="flex flex-wrap justify-center gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg transform scale-105'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                }`
              }
              onClick={() => setActiveTab(item.id)}
            >
              <Icon className="w-5 h-5" />
              <span className="hidden sm:inline">{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;
