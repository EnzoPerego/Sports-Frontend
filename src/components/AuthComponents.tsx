import React from 'react';

export const LoginButton: React.FC = () => {
  return (
    <button
      onClick={() => alert('Auth0 será configurado posteriormente')}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
    >
      Entrar
    </button>
  );
};

export const LogoutButton: React.FC = () => {
  return (
    <button
      onClick={() => alert('Logout - Auth0 será configurado posteriormente')}
      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
    >
      Sair
    </button>
  );
};

export const UserProfile: React.FC = () => {
  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
          <span className="text-gray-600 text-sm">👤</span>
        </div>
        <span className="text-gray-700 font-medium">Usuário</span>
      </div>
      <LoginButton />
    </div>
  );
};
