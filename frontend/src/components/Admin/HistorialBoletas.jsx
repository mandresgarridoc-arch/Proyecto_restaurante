import { useState, useEffect } from 'react';
import api from '../../api/axios.js';

const HistorialBoletas = () => {
  const [boletas, setBoletas] = useState([]);
  const [filtros, setFiltros] = useState({ id: '', fecha: '' });

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
            </tr>
          </thead>
          <tbody>
            {boletas.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', color: '#6b7280', padding: '20px' }}>
                  No se encontraron boletas con esos parámetros.
                </td>
              </tr>
            ) : (
              boletas.map((boleta) => (
                <tr key={boleta._id}>
                  <td style={{ fontFamily: 'monospace', color: '#6b7280' }}>{boleta._id}</td>
                  <td>{new Date(boleta.createdAt).toLocaleString('es-CL')}</td>
                  <td>Mesa {boleta.mesa?.numero || boleta.mesa}</td>
                  <td style={{ fontWeight: 'bold', color: '#166534' }}>${boleta.total?.toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistorialBoletas;