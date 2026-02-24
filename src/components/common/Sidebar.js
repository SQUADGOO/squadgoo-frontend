import React, { useState } from 'react';
import { sidebarStructure } from '../../config/navigation';
import { roleConfig } from '../../config/roles';
import { hasPermission } from '../../utils/helpers';
import { getAvatarUrl } from '../../utils/helpers';

const Sidebar = ({ currentRole, currentSection, onNavigate, onLogout }) => {
  const [openMenus, setOpenMenus] = useState(() => {
    // Auto-open menu containing current section
    const initial = {};
    sidebarStructure.forEach(item => {
      if (item.submenus.some(sub => sub.id === currentSection)) {
        initial[item.id] = true;
      }
    });
    return initial;
  });
  
  const config = roleConfig[currentRole];
  
  const toggleSubmenu = (menuId) => {
    setOpenMenus(prev => ({
      ...prev,
      [menuId]: !prev[menuId]
    }));
  };
  
  const filteredStructure = sidebarStructure.filter(item => {
    if (config.permissions[0] === 'all') return true;
    return hasPermission(currentRole, item.id, config.permissions);
  });
  
  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-full overflow-y-auto">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
         <img src="/"C:\Users\OPTIPLEX 3050\Downloads\fulllogo.png" alt="SquadGoo" className="h-10 w-auto" />
          <div>
            <h1 className="font-bold text-xl text-gray-900">SQUADGOO</h1>
            <p className="text-xs text-gray-500">Admin Panel</p>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 py-4">
        <ul className="space-y-1">
          {filteredStructure.map(item => (
            <li key={item.id}>
              <button
                onClick={() => toggleSubmenu(item.id)}
                className={`sidebar-item w-full flex items-center justify-between px-6 py-3 text-sm font-medium text-gray-700 hover:text-indigo-600 ${
                  openMenus[item.id] ? 'bg-indigo-50 text-indigo-600' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <i className={`fas ${item.icon} w-5`}></i>
                  <span>{item.title}</span>
                  {item.badge && (
                    <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5 animate-pulse">
                      {item.badge}
                    </span>
                  )}
                </div>
                <i className={`fas fa-chevron-down text-xs transition-transform duration-300 ${
                  openMenus[item.id] ? 'rotate-180' : ''
                }`}></i>
              </button>
              
              <ul className={`submenu bg-gray-50 overflow-hidden transition-all duration-300 ${
                openMenus[item.id] ? 'max-h-96' : 'max-h-0'
              }`}>
                {item.submenus.map(sub => (
                  <li key={sub.id}>
                    <button
                      onClick={() => onNavigate(sub.id)}
                      className={`w-full text-left px-12 py-2 text-sm transition ${
                        sub.danger 
                          ? 'text-red-600 hover:text-red-700' 
                          : currentSection === sub.id
                            ? 'text-indigo-600 font-medium bg-indigo-50'
                            : 'text-gray-600 hover:text-indigo-600'
                      }`}
                    >
                      {sub.title}
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </nav>
      
      {/* User Profile */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center gap-3">
          <img 
            src={getAvatarUrl(config.name)} 
            alt={config.name}
            className="w-10 h-10 rounded-full"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{config.name}</p>
            <p className="text-xs text-gray-500 truncate">{config.email}</p>
          </div>
          <button 
            onClick={onLogout}
            className="text-gray-400 hover:text-red-600 transition"
            title="Logout"
          >
            <i className="fas fa-sign-out-alt"></i>
          </button>
        </div>
        <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>Online • Clocked In</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
