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

  // NUEVA FUNCIÓN PARA LIBERAR LA MESA
  const finalizarYLiberar = async () => {
    try {
      await axios.post("http://localhost:3000/api/mesero/finalizar", { numeroMesa: mesa });
      alert("Pedido finalizado. Mesa liberada.");
      navigate("/listado-mesas");
    } catch (err) {
      console.error("Error al finalizar:", err);
      alert("No se pudo liberar la mesa.");
    }
  };

  if (!pedido) return <p style={{textAlign: 'center', marginTop: '50px'}}>Cargando boleta...</p>;

  return (
    <div style={{ padding: '40px 20px', textAlign: 'center', fontFamily: 'Arial' }}>
      <h1 style={{ color: '#2c3e50' }}>Boleta Mesa {mesa}</h1>
      
      <div style={{ border: '2px solid #8A9A5B', padding: '20px', maxWidth: '400px', margin: '20px auto', borderRadius: '8px', backgroundColor: '#fff' }}>
        {pedido.items.map((i, idx) => (
          <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span>{i.nombre_plato} x{i.cantidad}</span>
            <span>${i.precio_unitario * i.cantidad}</span>
          </div>
        ))}
        <hr />
        <h2 style={{ color: '#8A9A5B', textAlign: 'right' }}>Total: ${pedido.total}</h2>
      </div>

      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        {/* Botón para liberar */}
        <button 
          onClick={finalizarYLiberar} 
          style={{ padding: '10px 20px', backgroundColor: '#27ae60', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          Finalizar y Cobrar
        </button>
        
        {/* Botón solo para volver sin cerrar */}
        <button 
          onClick={() => navigate("/listado-mesas")} 
          style={{ padding: '10px 20px', backgroundColor: '#95a5a6', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          Volver
        </button>
      </div>
    </div>
  );
};

export default Boleta;