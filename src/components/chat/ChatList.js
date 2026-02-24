import React from 'react';

const ChatList = ({ chats, activeChat, onSelect }) => {
  return (
    <div className="flex-1 overflow-y-auto">
      {chats.map((chat) => (
        <div 
          key={chat.id}
          onClick={() => onSelect(chat.id)}
          className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
            activeChat === chat.id ? 'bg-indigo-50 border-l-4 border-l-indigo-600' : ''
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold">
              {chat.name.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm text-gray-900">{chat.name}</span>
                <span className="text-xs text-gray-400">{chat.time}</span>
              </div>
              <p className="text-xs text-gray-500 truncate">{chat.preview}</p>
            </div>
            {chat.unread && <span className="w-2 h-2 bg-red-500 rounded-full"></span>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
