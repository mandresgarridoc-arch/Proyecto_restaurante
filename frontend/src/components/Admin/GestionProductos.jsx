import { useState, useEffect } from 'react';
import api from '../../api/axios.js';

const GestionProductos = () => {
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState({ nombre: '', precio: '', categoria: '' });
  const [editandoId, setEditandoId] = useState(null);

  const cargarProductos = async () => {
    try {
      const respuesta = await api.get('/admin/productos');
      setProductos(respuesta.data);
    } catch (error) {
      console.error("Error al cargar productos", error);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const manejarCambio = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const guardarProducto = async (e) => {
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

  const eliminarProducto = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este producto?")) return;
    try {
      await api.delete(`/admin/productos/${id}`);
      cargarProductos();
    } catch (error) {
      console.error("Error al eliminar producto", error);
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center', color: '#4b5563', marginBottom: '20px' }}>
        Gestión de Menú
      </h2>
      
      {/* Formulario */}
      <form onSubmit={guardarProducto} className="admin-form">
        <div className="input-group">
          <label>Nombre</label>
          <input 
            type="text" name="nombre" value={form.nombre} 
            onChange={manejarCambio} required className="admin-input" 
          />
        </div>
        <div className="input-group" style={{ maxWidth: '120px' }}>
          <label>Precio ($)</label>
          <input 
            type="number" name="precio" value={form.precio} 
            onChange={manejarCambio} required className="admin-input" 
          />
        </div>
        <div className="input-group">
          <label>Categoría</label>
          <select 
            name="categoria" value={form.categoria} 
            onChange={manejarCambio} required className="admin-input"
          >
            <option value="">Seleccione...</option>
            <option value="Fondo">Plato de fondo</option>
            <option value="Bebida">Bebida</option>
            <option value="Postre">Postre</option>
          </select>
        </div>
        <button type="submit" className="btn-submit">
          {editandoId ? 'Actualizar' : 'Agregar'}
        </button>
      </form>

      {/* Lista de Productos */}
      <table className="admin-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((prod) => (
            <tr key={prod._id}>
              <td style={{ fontWeight: 'bold' }}>{prod.nombre}</td>
              <td>{prod.categoria}</td>
              <td>${prod.precio}</td>
              <td>
                <button 
                  onClick={() => { setForm(prod); setEditandoId(prod._id); }} 
                  className="btn-edit"
                >
                  Editar
                </button>
                <button 
                  onClick={() => eliminarProducto(prod._id)} 
                  className="btn-delete"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GestionProductos;