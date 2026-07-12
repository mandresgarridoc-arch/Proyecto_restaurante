import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Boleta = () => {
  const [pedido, setPedido] = useState(null);
  const mesa = localStorage.getItem("mesaSeleccionada");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3000/api/mesero/pedido/${mesa}`)
      .then(res => setPedido(res.data));
  }, []);

  if (!pedido) return <p>Cargando boleta...</p>;

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Boleta Mesa {mesa}</h1>
      <div style={{ border: '1px solid #ccc', padding: '10px', maxWidth: '300px', margin: 'auto' }}>
        {pedido.items.map((i, idx) => (
          <p key={idx}>{i.nombre} x{i.cantidad} = ${i.precio * i.cantidad}</p>
        ))}
        <hr />
        <h3>Total: ${pedido.total}</h3>
      </div>
      <button onClick={() => navigate("/listado-mesas")} style={{ marginTop: '20px' }}>Volver</button>
    </div>
  );
};
export default Boleta;