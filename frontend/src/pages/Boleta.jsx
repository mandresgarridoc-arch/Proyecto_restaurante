import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Boleta = () => {
  const [pedido, setPedido] = useState(null);
  const mesa = localStorage.getItem("mesaSeleccionada");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3000/api/mesero/pedido/${mesa}`)
      .then(res => setPedido(res.data))
      .catch(err => console.error("Error al traer pedido:", err));
  }, [mesa]);

  if (!pedido) return <p style={{textAlign: 'center', marginTop: '50px'}}>Cargando boleta...</p>;

  // Estilos mejorados
  const containerStyle = { padding: '40px 20px', textAlign: 'center', fontFamily: 'Arial, sans-serif' };
  const cardStyle = { 
    border: '2px solid #8A9A5B', // Color verde que usas en otras partes
    padding: '20px', 
    maxWidth: '400px', 
    margin: '20px auto', 
    borderRadius: '8px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ color: '#2c3e50', marginBottom: '20px' }}>Boleta Mesa {mesa}</h1>
      
      <div style={cardStyle}>
        {pedido.items.map((i, idx) => (
          <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '1.1rem' }}>
            <span>{i.nombre_plato} x{i.cantidad}</span>
            <span>${i.precio_unitario * i.cantidad}</span>
          </div>
        ))}
        <hr style={{ border: '0', borderTop: '2px dashed #ccc', margin: '15px 0' }} />
        <h2 style={{ color: '#8A9A5B', textAlign: 'right' }}>Total: ${pedido.total}</h2>
      </div>

      <button 
        onClick={() => navigate("/listado-mesas")} 
        style={{ 
          marginTop: '20px', 
          padding: '10px 25px', 
          backgroundColor: '#8A9A5B', 
          color: 'white', 
          border: 'none', 
          borderRadius: '5px', 
          cursor: 'pointer',
          fontSize: '1rem'
        }}
      >
        Volver a Mesas
      </button>
    </div>
  );
};

export default Boleta;