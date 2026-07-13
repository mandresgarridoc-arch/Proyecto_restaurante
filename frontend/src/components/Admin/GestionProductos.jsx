import { useState, useEffect } from 'react';
import api from '../../api/axios.js'; // Asegúrate de que esta ruta coincida con tu proyecto

const GestionProductos = () => {
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState({ nombre: '', precio: '', categoria: '' });
  const [editandoId, setEditandoId] = useState(null);

  const cargarProductos = async () => {
    try {
      // Ajusta la ruta '/admin/productos' según cómo la tengas en tu router de Express
      const respuesta = await api.get('/admin/productos');
      setProductos(respuesta.data);
    } catch (error) {
      console.error("Error al cargar productos", error);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editandoId) {
        await api.put(`/admin/productos/${editandoId}`, form);
      } else {
        await api.post('/admin/productos', form);
      }
      setForm({ nombre: '', precio: '', categoria: '' });
      setEditandoId(null);
      cargarProductos();
    } catch (error) {
      console.error("Error al guardar producto", error);
    }
  };

  // NUEVA FUNCIÓN: En lugar de borrar, enviamos la orden de deshabilitar/habilitar
  const toggleDisponibilidad = async (id, nombre, actualDisponible) => {
    const accion = actualDisponible === false ? 'habilitar' : 'deshabilitar';
    
    if (window.confirm(`¿Estás seguro de ${accion} el plato "${nombre}"?`)) {
      try {
        // Asumiendo que tu backend usa la ruta DELETE para hacer el cambio de estado (Soft Delete)
        await api.delete(`/admin/productos/${id}`);
        cargarProductos();
      } catch (error) {
        console.error(`Error al ${accion} el producto:`, error);
        alert("Hubo un error al intentar cambiar el estado del plato.");
      }
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center', color: '#4b5563', marginBottom: '20px' }}>
        Gestión de Menú
      </h2>

      {/* Formulario de Agregar/Editar */}
      <form onSubmit={handleSubmit} style={{
        backgroundColor: '#f8fafc', padding: '20px', borderRadius: '12px',
        marginBottom: '30px', display: 'flex', gap: '15px', flexWrap: 'wrap',
        alignItems: 'flex-end', border: '1px solid #e2e8f0'
      }}>
        <div style={{ flex: '1', minWidth: '200px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#475569' }}>Nombre</label>
          <input 
            type="text" 
            required 
            value={form.nombre} 
            onChange={(e) => setForm({ ...form, nombre: e.target.value })} 
            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
          />
        </div>
        <div style={{ flex: '1', minWidth: '100px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#475569' }}>Precio ($)</label>
          <input 
            type="number" 
            required 
            value={form.precio} 
            onChange={(e) => setForm({ ...form, precio: e.target.value })} 
            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
          />
        </div>
        <div style={{ flex: '1', minWidth: '150px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#475569' }}>Categoría</label>
          <select 
            required 
            value={form.categoria} 
            onChange={(e) => setForm({ ...form, categoria: e.target.value })}
            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', backgroundColor: 'white' }}
          >
            <option value="">Seleccione...</option>
            <option value="Plato de fondo">Plato de fondo</option>
            <option value="Bebida">Bebida</option>
            <option value="Postre">Postre</option>
          </select>
        </div>
        <button type="submit" style={{
          backgroundColor: editandoId ? '#c89f7a' : '#8c9e6c', color: 'white', border: 'none',
          padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', height: '42px'
        }}>
          {editandoId ? 'Actualizar' : 'Agregar'}
        </button>
        {editandoId && (
          <button type="button" onClick={() => { setForm({ nombre: '', precio: '', categoria: '' }); setEditandoId(null); }} style={{
            backgroundColor: '#e2e8f0', color: '#475569', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', height: '42px'
          }}>
            Cancelar
          </button>
        )}
      </form>

      {/* Tabla de Productos */}
      <div style={{ overflowX: 'auto', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
          <thead>
            <tr style={{ backgroundColor: '#f1f5f9', borderBottom: '2px solid #e2e8f0', color: '#475569' }}>
              <th style={{ padding: '15px' }}>Nombre</th>
              <th style={{ padding: '15px' }}>Categoría</th>
              <th style={{ padding: '15px' }}>Precio</th>
              <th style={{ padding: '15px' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((prod) => (
              <tr 
                key={prod._id} 
                style={{ 
                  borderBottom: '1px solid #f1f5f9', 
                  // FIX: Si está deshabilitado, lo ponemos un poco transparente
                  opacity: prod.disponible === false ? 0.5 : 1,
                  backgroundColor: prod.disponible === false ? '#f8fafc' : 'white'
                }}
              >
                <td style={{ padding: '15px', fontWeight: 'bold', color: '#334155' }}>
                  {prod.nombre} {prod.disponible === false && <span style={{ color: '#ef4444', fontSize: '0.8rem', marginLeft: '5px' }}>(Inactivo)</span>}
                </td>
                <td style={{ padding: '15px', color: '#64748b' }}>{prod.categoria}</td>
                <td style={{ padding: '15px', fontWeight: 'bold', color: '#334155' }}>${prod.precio?.toLocaleString('es-CL')}</td>
                <td style={{ padding: '15px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
                  <button 
                    onClick={() => { setForm(prod); setEditandoId(prod._id); }}
                    style={{
                      backgroundColor: 'transparent', color: '#3b82f6', border: '1px solid #3b82f6',
                      padding: '5px 15px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold'
                    }}
                  >
                    Editar
                  </button>
                  {/* FIX: El botón cambia de color y texto dinámicamente */}
                  <button 
                    onClick={() => toggleDisponibilidad(prod._id, prod.nombre, prod.disponible)}
                    style={{
                      backgroundColor: 'transparent', 
                      color: prod.disponible === false ? '#16a34a' : '#ef4444', 
                      border: `1px solid ${prod.disponible === false ? '#16a34a' : '#ef4444'}`,
                      padding: '5px 15px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold'
                    }}
                  >
                    {prod.disponible === false ? 'Habilitar' : 'Deshabilitar'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GestionProductos;