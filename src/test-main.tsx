import React from 'react';
import ReactDOM from 'react-dom/client';

const TestApp = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#2563eb' }}>🏟️ Sports Booking - Teste</h1>
      <p>Se você está vendo esta mensagem, o React está funcionando!</p>
      <div style={{ marginTop: '20px' }}>
        <button 
          style={{ 
            padding: '10px 20px', 
            backgroundColor: '#2563eb', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px',
            cursor: 'pointer'
          }}
          onClick={() => alert('Botão funcionando!')}
        >
          Testar Botão
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
