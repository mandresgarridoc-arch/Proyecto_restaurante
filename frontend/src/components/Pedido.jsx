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

  const agregar = (producto) => {
    setItems(prev => {
      const existe = prev.find(i => i.nombre_plato === producto.nombre);
      return existe 
        ? prev.map(i => i.nombre_plato === producto.nombre ? {...i, cantidad: i.cantidad + 1} : i)
        : [...prev, { nombre_plato: producto.nombre, precio_unitario: producto.precio, cantidad: 1 }];
    });
  };

  return (
    <div>
      <Navbar />
      <h1>Tomar Pedido - Mesa {mesa}</h1>
      <div className="menu">
        {menu.map(p => (
          <button key={p._id} onClick={() => agregar(p)}>{p.nombre} (${p.precio})</button>
        ))}
      </div>
      
      <div className="resumen">
        <h3>Tu Comanda</h3>
        {items.map((i, idx) => (
          <p key={idx}>{i.nombre_plato} x{i.cantidad} = ${i.precio_unitario * i.cantidad}</p>
        ))}
      </div>
    </div>
  );
};
export default Pedido;