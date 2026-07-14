import { useState, useEffect } from 'react';
import api from '../../api/axios.js';

const DashboardReportes = () => {
  const [reportes, setReportes] = useState({ ventas: { totalIngresos: 0, cantidadPedidos: 0 }, topPlatos: [] });
  const [fechas, setFechas] = useState({ inicio: '', fin: '' });

  const cargarReportes = async () => {
    try {
      let url = '/admin/reportes';
      if (fechas.inicio && fechas.fin) {
        url += `?fechaInicio=${fechas.inicio}&fechaFin=${fechas.fin}`;
      }
      const respuesta = await api.get(url);
      setReportes(respuesta.data);
    } catch (error) {
      console.error("Error al cargar reportes", error);
    }
  };

  //useEffect es un hook de react que hace que traiga los datos del backend
  
  useEffect(() => {
    cargarReportes();
  }, [fechas]); 

  const manejarCambioFecha = (e) => {
    setFechas({ ...fechas, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center', color: '#4b5563', marginBottom: '20px' }}>
        Métricas del Restaurante
      </h2>

      {/* Filtro de Fechas */}
      <div className="admin-form" style={{ justifyContent: 'center', alignItems: 'center' }}>
        <div className="input-group" style={{ maxWidth: '180px' }}>
          <label>Desde:</label>
          <input 
            type="date" name="inicio" value={fechas.inicio} 
            onChange={manejarCambioFecha} className="admin-input" 
          />
        </div>
        <div className="input-group" style={{ maxWidth: '180px' }}>
          <label>Hasta:</label>
          <input 
            type="date" name="fin" value={fechas.fin} 
            onChange={manejarCambioFecha} className="admin-input" 
          />
        </div>
        <button 
          onClick={() => setFechas({ inicio: '', fin: '' })} 
          style={{ background: 'none', border: 'none', color: '#6b7280', textDecoration: 'underline', cursor: 'pointer', height: '40px', marginTop: '20px' }}
        >
          Limpiar filtros
        </button>
      </div>

      {/* Tarjetas de Resumen */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '200px', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
          <h3 style={{ color: '#166534', margin: '0 0 10px 0' }}>Total Ingresos</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#14532d', margin: 0 }}>
            ${reportes.ventas.totalIngresos.toLocaleString()}
          </p>
        </div>
        <div style={{ flex: 1, minWidth: '200px', backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
          <h3 style={{ color: '#1e40af', margin: '0 0 10px 0' }}>Pedidos Completados</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1e3a8a', margin: 0 }}>
            {reportes.ventas.cantidadPedidos}
          </p>
        </div>
      </div>

      {/* Top 5 Platos */}
      <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px', backgroundColor: '#f9fafb' }}>
        <h3 style={{ textAlign: 'center', color: '#4b5563', margin: '0 0 15px 0' }}>
          🏆 Top 5 Platos Más Vendidos
        </h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {reportes.topPlatos.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#6b7280', margin: 0 }}>No hay datos suficientes para este período.</p>
          ) : (
            reportes.topPlatos.map((plato, index) => (
              <li key={plato._id} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #e5e7eb' }}>
                <span style={{ fontWeight: 'bold', color: '#374151' }}>{index + 1}. {plato.nombre}</span>
                <span style={{ backgroundColor: '#fef3c7', color: '#92400e', padding: '4px 12px', borderRadius: '20px', fontWeight: 'bold', fontSize: '0.9rem' }}>
                  {plato.cantidadVendida} unid.
                </span>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashboardReportes;