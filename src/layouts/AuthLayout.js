import React from 'react';

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
            S
          </div>
          <h2 className="text-3xl font-bold text-gray-900">SQUADGOO</h2>
          <p className="mt-2 text-sm text-gray-600">Admin Panel</p>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
