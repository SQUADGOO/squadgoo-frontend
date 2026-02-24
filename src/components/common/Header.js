import React, { useState } from 'react';
import Button from './Button';

const Header = ({ title, onMenuToggle, onQuickAction, notificationCount = 3 }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuToggle}
          className="lg:hidden text-gray-500 hover:text-gray-700"
        >
          <i className="fas fa-bars text-xl"></i>
        </button>
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 text-sm"
            />
            <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          </div>
        </div>
        
        <button className="relative p-2 text-gray-500 hover:text-gray-700 transition">
          <i className="fas fa-bell text-xl"></i>
          {notificationCount > 0 && (
            <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
              {notificationCount}
            </span>
          )}
        </button>
        
        <Button onClick={onQuickAction} icon="fa-plus">
          Quick Action
        </Button>
      </div>
    </header>
  );
};

export default Header;
