import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const TestApp = () => {
  return (
    <div className="min-h-screen bg-red-500 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Teste Tailwind CSS
        </h1>
        <p className="text-gray-600 text-lg">
          Se você vê este texto com cores e estilos, o Tailwind está funcionando!
        </p>
        <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Botão de Teste
        </button>
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TestApp />
  </React.StrictMode>,
);
