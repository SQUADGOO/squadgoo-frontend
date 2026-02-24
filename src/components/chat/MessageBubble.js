import React from 'react';

const MessageBubble = ({ message, timestamp, isUser }) => {
  return (
    <div className={`chat-message ${isUser ? 'user' : 'agent'}`}>
      <p className="text-sm">{message}</p>
      <span className="text-xs opacity-75 mt-1 block">{timestamp}</span>
    </div>
  );
};

export default MessageBubble;
