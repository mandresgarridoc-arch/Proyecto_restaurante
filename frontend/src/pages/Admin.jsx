import { useState } from 'react';
import Navbar from '../components/Navbar'; // Importamos tu Navbar existente
import GestionProductos from '../components/Admin/GestionProductos';
import DashboardReportes from '../components/Admin/DashboardReportes';
import HistorialBoletas from '../components/Admin/HistorialBoletas';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('productos');

  return (
    <>
      <Navbar /> {/* Aquí agregamos la barra de navegación arriba */}
      
      <div style={{ padding: '20px', marginTop: '20px' }}>
        <h1 className="admin-title">Panel de Administración Integral</h1>
        
        {/* Sistema de Pestañas */}
        <div className="admin-tabs">
          <button 
            className={`btn-tab ${activeTab === 'productos' ? 'active' : ''}`}
            onClick={() => setActiveTab('productos')}
          >
            📦 Gestión de Menú
          </button>
          <button 
            className={`btn-tab ${activeTab === 'reportes' ? 'active' : ''}`}
            onClick={() => setActiveTab('reportes')}
          >
            📊 Reportes
          </button>
          <button 
            className={`btn-tab ${activeTab === 'boletas' ? 'active' : ''}`}
            onClick={() => setActiveTab('boletas')}
          >
            🧾 Historial de Boletas
          </button>
        </div>

        {/* Contenido Dinámico */}
        <div className="admin-content">
          {activeTab === 'productos' && <GestionProductos />}
          {activeTab === 'reportes' && <DashboardReportes />}
          {activeTab === 'boletas' && <HistorialBoletas />}
        </div>
      </div>
    </>
  );
};

export default Admin;