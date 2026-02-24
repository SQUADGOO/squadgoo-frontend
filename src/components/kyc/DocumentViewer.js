import React from 'react';

const DocumentViewer = ({ documents }) => {
  const getStatusClass = (status) => {
    switch(status) {
      case 'provided':
        return 'bg-green-100 border-green-300 text-green-800';
      case 'missing':
        return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 border-red-300 text-red-800';
      default:
        return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'provided': return 'fa-check';
      case 'missing': return 'fa-exclamation';
      case 'rejected': return 'fa-times';
      default: return 'fa-question';
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {documents.map((doc, idx) => (
        <span 
          key={idx}
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs border ${getStatusClass(doc.status)}`}
        >
          <i className={`fas ${getStatusIcon(doc.status)}`}></i>
          {doc.name}
        </span>
      ))}
    </div>
  );
};

export default DocumentViewer;
