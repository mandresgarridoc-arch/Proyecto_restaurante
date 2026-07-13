import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Boleta = () => {
  const [pedido, setPedido] = useState(null);
  const mesa = localStorage.getItem("mesaSeleccionada");
  const navigate = useNavigate();

  useEffect(() => {
    // Mantenemos tu ruta original que ya funciona
    axios.get(`http://localhost:3000/api/mesero/pedido/${mesa}`)
      .then(res => setPedido(res.data))
      .catch(err => console.error("Error al traer pedido:", err));
  }, [mesa]);

  // FUNCIÓN EXISTENTE PARA FINALIZAR Y COBRAR
  const finalizarYLiberar = async () => {
    try {
      await axios.post("http://localhost:3000/api/mesero/finalizar", { numeroMesa: mesa });
      alert("Pedido finalizado. Mesa liberada y cobrada.");
      navigate("/listado-mesas");
    } catch (err) {
      console.error("Error al finalizar:", err);
      alert("No se pudo liberar la mesa.");
    }
  };

  // NUEVA FUNCIÓN: CANCELAR LA VENTA COMPLETAMENTE
  const cancelarVenta = async () => {
    if (window.confirm("⚠️ ¿Estás seguro de CANCELAR esta venta? La mesa quedará libre y el dinero NO se sumará a los reportes.")) {
      try {
        // Llamamos a la ruta que configuramos en el backend para cancelar
        await axios.post("http://localhost:3000/api/mesero/pedidos/cancelar", { numeroMesa: mesa });
        alert("Venta cancelada exitosamente. La mesa vuelve a estar disponible.");
        navigate("/listado-mesas");
      } catch (err) {
        console.error("Error al cancelar la venta:", err);
        alert("No se pudo cancelar la venta.");
      }
    }
  };

  if (!pedido) return <p style={{textAlign: 'center', marginTop: '50px', color: '#64748b'}}>Cargando detalle de la mesa...</p>;

  return (
    <div style={{ padding: '40px 20px', textAlign: 'center', fontFamily: 'Arial' }}>
      <h1 style={{ color: '#2c3e50', marginBottom: '5px' }}>Boleta Mesa {mesa}</h1>
      <p style={{ color: '#64748b', marginTop: '0' }}>Revisa el pedido antes de cobrar</p>
      
      <div style={{ border: '2px solid #8c9e6c', padding: '25px', maxWidth: '400px', margin: '20px auto', borderRadius: '12px', backgroundColor: '#fff', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        {pedido.items.map((i, idx) => (
          <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', borderBottom: '1px dashed #e2e8f0', paddingBottom: '8px' }}>
            <span style={{ color: '#334155' }}><strong>{i.cantidad}x</strong> {i.nombre_plato}</span>
            <span style={{ fontWeight: 'bold', color: '#475569' }}>${(i.precio_unitario * i.cantidad).toLocaleString('es-CL')}</span>
          </div>
        ))}
        <hr style={{ border: '0', borderTop: '2px solid #8c9e6c', margin: '20px 0' }} />
        <h2 style={{ color: '#16a34a', textAlign: 'right', margin: '0', fontSize: '1.8rem' }}>
          Total: ${pedido.total?.toLocaleString('es-CL')}
        </h2>
      </div>

      <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '30px' }}>
        {/* Botón para Cobrar (Verde) */}
        <button 
          onClick={finalizarYLiberar} 
          style={{ padding: '12px 24px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem', boxShadow: '0 2px 4px rgba(16, 185, 129, 0.3)' }}
        >
          ✅ Finalizar y Cobrar
        </button>
        
        {/* NUEVO: Botón para Cancelar Venta (Rojo) */}
        <button 
          onClick={cancelarVenta} 
          style={{ padding: '12px 24px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem', boxShadow: '0 2px 4px rgba(239, 68, 68, 0.3)' }}
        >
          🗑️ Cancelar Venta
        </button>

        {/* Botón para Volver (Gris) */}
        <button 
          onClick={() => navigate("/listado-mesas")} 
          style={{ padding: '12px 24px', backgroundColor: '#64748b', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }}
        >
          ⬅️ Volver
        </button>
      </div>
    </div>
  );
};

export default Boleta;