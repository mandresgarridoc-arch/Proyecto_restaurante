import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [datos, setDatos] = useState(null);

  useEffect(() => {
    // Axios consulta a tu API de Node.js en el puerto 5000
    axios.get('http://localhost:5000/')
      .then(response => {
        setDatos(response.data.mensaje);
      })
      .catch(error => {
        console.error("Error al conectar con el backend:", error);
      });
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>¡Bienvenido a SisGes!</h1>
      <p>Estado del Backend: {datos ? datos : "Si aparece esto es por que el fron y el back estan conectados"}</p>
    </div>
  );
}

export default App;