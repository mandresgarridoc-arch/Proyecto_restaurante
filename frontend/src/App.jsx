// Archivo: src/App.jsx
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from 'axios';
import gato from './assets/gato-exito.png';
import AdminEnConstruccion from "./pages/AdminEnConstruccion";

// Componente para la Interfaz del Mesero
function VistaMesero() {
  const [datos, setDatos] = useState(null);

  useEffect(() => {
    // Asegúrate de que el puerto coincida con tu backend (3000 o 5000)
    axios.get('http://localhost:3000/')
      .then(response => setDatos(response.data.mensaje))
      .catch(err => console.error("Error:", err));
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>🍽️ Interfaz del Mesero</h1>
      <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#4a5d23' }}>
        Estado del Backend: {datos ? datos : "Cargando..."}
      </p>
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

// Componente principal con el Enrutador
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta principal para el Mesero */}
        <Route path="/" element={<VistaMesero />} />
        
        {/* Ruta aislada para el Administrador (área en construcción) */}
        <Route path="/admin/*" element={<AdminEnConstruccion />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;