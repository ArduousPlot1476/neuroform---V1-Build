import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Brain, BookOpen, CheckSquare, Users, FileText } from 'lucide-react';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: 'Dashboard', icon: <Brain className="w-5 h-5" />, path: '/' },
    { label: 'Journal', icon: <BookOpen className="w-5 h-5" />, path: '/journal' },
    { label: 'Tasks', icon: <CheckSquare className="w-5 h-5" />, path: '/tasks' },
    { label: 'Mentors', icon: <Users className="w-5 h-5" />, path: '/mentors' },
    { label: 'Summary', icon: <FileText className="w-5 h-5" />, path: '/summary' },
  ];

  return (
    <nav className="bg-gray-200 p-2 rounded-lg overflow-x-auto scrollbar-hide">
      <div className="flex md:justify-between min-w-max md:min-w-0">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center px-6 md:px-4 py-2 text-gray-700 hover:bg-gray-300 rounded-lg transition-colors whitespace-nowrap ${
              location.pathname === item.path ? 'bg-gray-300' : ''
            }`}
          >
            {item.icon}
            <span className="text-sm mt-1">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;