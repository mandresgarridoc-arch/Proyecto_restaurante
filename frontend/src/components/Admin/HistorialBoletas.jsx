import { useState, useEffect } from 'react';
import api from '../../api/axios.js';

const HistorialBoletas = () => {
  const [boletas, setBoletas] = useState([]);
  const [filtros, setFiltros] = useState({ id: '', fecha: '' });
  // NUEVO: Estado para controlar qué boleta se está viendo en el modal
  const [boletaSeleccionada, setBoletaSeleccionada] = useState(null);

  const cargarBoletas = async () => {
    try {
      let url = '/admin/boletas?';
      if (filtros.id) url += `id=${filtros.id}&`;
      if (filtros.fecha) url += `fecha=${filtros.fecha}`;
      
      const respuesta = await api.get(url);
      setBoletas(respuesta.data);
    } catch (error) {
      console.error("Error al buscar boletas", error);
    }
  };


  
  useEffect(() => {
    cargarBoletas();
  }, []);

  const buscar = (e) => {
    e.preventDefault();
    cargarBoletas();
  };

  // NUEVO: Función para eliminar boletas
  const eliminarBoleta = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar esta boleta? Esta acción no se puede deshacer.")) {
      try {
        await api.delete(`/admin/boletas/${id}`);
        // Recargamos la tabla para que desaparezca
        cargarBoletas(); 
      } catch (error) {
        console.error("Error al eliminar boleta:", error);
        alert("Hubo un error al intentar eliminar la boleta.");
      }
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center', color: '#4b5563', marginBottom: '20px' }}>
        Historial de Boletas
      </h2>

      {/* Buscador */}
      <form onSubmit={buscar} className="admin-form">
        <div className="input-group">
          <label>Buscar por ID de Boleta</label>
          <input 
            type="text" 
            placeholder="Ej: 6512f1a2b3..." 
            value={filtros.id} 
            onChange={(e) => setFiltros({ ...filtros, id: e.target.value })} 
            className="admin-input" 
          />
        </div>
        <div className="input-group" style={{ maxWidth: '200px' }}>
          <label>Filtrar por Fecha</label>
          <input 
            type="date" 
            value={filtros.fecha} 
            onChange={(e) => setFiltros({ ...filtros, fecha: e.target.value })} 
            className="admin-input" 
          />
        </div>
        <button type="submit" className="btn-submit">
          Buscar
        </button>
      </form>

      {/* Tabla de Resultados */}
      <div style={{ overflowX: 'auto' }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID Boleta</th>
              <th>Fecha y Hora</th>
              <th>Mesa</th>
              <th>Total</th>
              <th style={{ textAlign: 'center' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {boletas.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', color: '#6b7280', padding: '20px' }}>
                  No se encontraron boletas con esos parámetros.
                </td>
              </tr>
            ) : (
              boletas.map((boleta) => (
                <tr key={boleta._id}>
                  {/* FIX: Mostramos el número real generado o los últimos 6 dígitos del ID antiguo */}
                  <td style={{ fontFamily: 'monospace', fontWeight: 'bold', color: '#4b5563' }}>
                    #{boleta.numero_boleta || boleta._id.slice(-6).toUpperCase()}
                  </td>
                  <td>{new Date(boleta.createdAt).toLocaleString('es-CL')}</td>
                  <td>Mesa {boleta.mesa?.numero || boleta.mesa}</td>
                  <td style={{ fontWeight: 'bold', color: '#166534' }}>${boleta.total?.toLocaleString()}</td>
                  
                  {/* NUEVO: Botones de acción */}
                  <td style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                    <button 
                      onClick={() => setBoletaSeleccionada(boleta)}
                      style={{ backgroundColor: '#8c9e6c', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}
                    >
                      👁️ Ver
                    </button>
                    <button 
                      onClick={() => eliminarBoleta(boleta._id)}
                      style={{ backgroundColor: '#ef4444', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}
                    >
                      🗑️ Borrar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* NUEVO: MODAL DE DETALLES DE LA BOLETA */}
      {boletaSeleccionada && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', 
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
        }}>
          <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '15px', width: '400px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
            <h2 style={{ color: '#8c9e6c', marginTop: 0 }}>Detalle de Boleta</h2>
            <p><strong>Boleta N°:</strong> #{boletaSeleccionada.numero_boleta || boletaSeleccionada._id.slice(-6).toUpperCase()}</p>
            <p><strong>Mesa:</strong> {boletaSeleccionada.mesa?.numero || boletaSeleccionada.mesa}</p>
            <p><strong>Fecha:</strong> {new Date(boletaSeleccionada.createdAt).toLocaleString('es-CL')}</p>
            <hr style={{ border: '1px solid #eee' }} />
            
            <ul style={{ paddingLeft: '20px', listStyleType: 'none', margin: '15px 0' }}>
              {boletaSeleccionada.items?.map((item, index) => (
                <li key={index} style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
                  <span><strong>{item.cantidad}x</strong> {item.nombre_plato}</span>
                  <span>${(item.precio_unitario * item.cantidad).toLocaleString('es-CL')}</span>
                </li>
              ))}
            </ul>
            
            <hr style={{ border: '1px solid #eee' }} />
            <h3 style={{ textAlign: 'right', color: '#166534' }}>Total: ${boletaSeleccionada.total?.toLocaleString('es-CL')}</h3>
            
            <button 
              style={{ width: '100%', padding: '10px', backgroundColor: '#334155', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', marginTop: '15px' }}
              onClick={() => setBoletaSeleccionada(null)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistorialBoletas;