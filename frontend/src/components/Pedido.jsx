import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../App.css';

const Pedido = () => {
  const [menu, setMenu] = useState([]);
  const [items, setItems] = useState([]);
  const mesa = localStorage.getItem("mesaSeleccionada");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3000/api/mesero/menu")
      .then(res => setMenu(res.data))
      .catch(err => console.error("Error al cargar menú:", err));
  }, []);

  const modificarCantidad = (prod, delta) => {
    setItems(prev => {
      const existe = prev.find(i => i.nombre === prod.nombre);
      if (!existe && delta > 0) return [...prev, { ...prod, cantidad: 1 }];
      return prev.map(i => i.nombre === prod.nombre 
        ? { ...i, cantidad: i.cantidad + delta } 
        : i
      ).filter(i => i.cantidad > 0);
    });
  };

  const eliminar = (nombreProducto) => {
    setItems(prev => prev.filter(item => item.nombre !== nombreProducto));
  };

  // NUEVA FUNCIÓN PARA ENVIAR AL BACKEND
  const enviarPedido = async () => {
    if (items.length === 0) return alert("La comanda está vacía");

    try {
      const total = items.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
      
      await axios.post("http://localhost:3000/api/mesero/pedido", {
        numeroMesa: mesa,
        items: items,
        total: total
      });

      alert("Pedido enviado correctamente");
      navigate("/listado-mesas"); // Vuelve a la vista de mesas
    } catch (err) {
      console.error("Error al enviar pedido:", err);
      alert("No se pudo enviar el pedido. Revisa el servidor.");
    }
  };

  const categorias = [...new Set(menu.map(p => p.categoria))];

  return (
    <div className="contenedor-pedido">
      <Navbar />
      <h1 className="titulo-pedido">Tomar Pedido - Mesa {mesa}</h1>

      <div className="menu-container">
        {categorias.map(cat => (
          <div key={cat} className="categoria-seccion">
            <h2 style={{ textAlign: 'center', color: '#8A9A5B' }}>{cat}</h2>
            <div className="grid-productos">
              {menu.filter(p => p.categoria === cat).map(p => {
                const enComanda = items.find(i => i.nombre === p.nombre);
                const cantidad = enComanda ? enComanda.cantidad : 0;
                
                return (
                  <div key={p._id} className="card-producto" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px' }}>
                    <span>{p.nombre} - ${p.precio}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <button onClick={() => modificarCantidad(p, -1)} style={{ padding: '2px 8px' }}>-</button>
                      <span>{cantidad}</span>
                      <button onClick={() => modificarCantidad(p, 1)} style={{ padding: '2px 8px' }}>+</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="resumen">
        <h2>Tu Comanda</h2>
        {items.length === 0 ? <p>No has agregado productos.</p> : (
          items.map((i, idx) => (
            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', maxWidth: '400px', margin: '0 auto' }}>
              <span>{i.nombre} x{i.cantidad} = ${i.precio * i.cantidad}</span>
              <button onClick={() => eliminar(i.nombre)} style={{ background: '#e74c3c', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', padding: '0 8px' }}>X</button>
            </div>
          ))
        )}
        
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px' }}>
          
          <button onClick={enviarPedido} className="btn-accion">Enviar Pedido</button>
          <button onClick={() => navigate("/listado-mesas")} className="btn-accion" style={{backgroundColor: '#95a5a6'}}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pedido;