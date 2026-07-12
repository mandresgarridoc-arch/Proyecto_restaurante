import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const Pedido = () => {
  const [menu, setMenu] = useState([]);
  const [items, setItems] = useState([]);
  const mesa = localStorage.getItem("mesaSeleccionada");

  useEffect(() => {
    axios.get("http://localhost:3000/api/mesero/menu")
      .then(res => setMenu(res.data));
  }, []);

  // Agrupar productos por categoría
  const categorias = [...new Set(menu.map(p => p.categoria))];

  const modificarCantidad = (prod, delta) => {
    setItems(prev => {
      const existe = prev.find(i => i.nombre === prod.nombre);
      if (!existe && delta > 0) return [...prev, { ...prod, cantidad: 1 }];
      return prev.map(i => i.nombre === prod.nombre 
        ? { ...i, cantidad: Math.max(0, i.cantidad + delta) } 
        : i).filter(i => i.cantidad > 0);
    });
  };

  return (
    <div className="contenedor-pedido">
      <Navbar />
      <h1 className="titulo-pedido">Tomar Pedido - Mesa {mesa}</h1>

      {categorias.map(cat => (
        <div key={cat} className="categoria-seccion">
          <h2>{cat}</h2>
          <div className="grid-productos">
            {menu.filter(p => p.categoria === cat).map(p => (
              <div key={p._id} className="card-producto">
                <span>{p.nombre} - ${p.precio}</span>
                <button onClick={() => modificarCantidad(p, 1)}>+</button>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="resumen">
        <h2>Tu Comanda</h2>
        {items.map((i, idx) => (
          <p key={idx}>{i.nombre} x{i.cantidad} = ${i.precio * i.cantidad}</p>
        ))}
      </div>
    </div>
  );
};
export default Pedido;