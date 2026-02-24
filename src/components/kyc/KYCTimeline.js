import React from 'react';

const KYCTimeline = ({ iterations, currentIteration }) => {
  return (
    <div className="space-y-0">
      {Array.from({ length: iterations }, (_, i) => (
        <div 
          key={i} 
          className={`timeline-item relative pl-7 pb-6 border-l-2 ${
            i === iterations - 1 ? 'border-transparent' : 'border-gray-200'
          }`}
        >
          <div 
            className={`absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full border-2 border-white shadow-sm ${
              i < currentIteration ? 'bg-indigo-600' : 'bg-gray-300'
            }`}
          ></div>
          <p className="text-sm text-gray-600">Submission {i + 1}</p>
          <p className="text-xs text-gray-400">
            {i === iterations - 1 ? '2 days ago' : `${(iterations - i) * 2} days ago`}
          </p>
        </div>
      ))}
    </div>
  );
};

export default KYCTimeline;
