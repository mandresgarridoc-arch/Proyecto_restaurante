import { useState, useEffect } from 'react';
import axios from 'axios';
import gato from './assets/gato-exito.png'; // 1. Importa tu gato

function App() {
  const [datos, setDatos] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/')
      .then(response => setDatos(response.data.mensaje))
      .catch(err => console.error("Error:", err));
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>¡Bienvenido a SisGes!</h1>
      
      {/* Texto de estado */}
      <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
        Estado del Backend: {datos ? datos : "Cargando..."}
      </p>

      {/* 2. El gato que confirma que todo funciona */}
      {datos && (
        <img 
          src={gato} 
          alt="Gato celebrando conexión" 
          style={{ width: '200px', marginTop: '20px', display: 'block', margin: '0 auto' }} 
        />
      )}
    </div>
  );
}

export default App;