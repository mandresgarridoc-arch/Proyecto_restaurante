import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../App.css';
import axios from 'axios';

const ListadoMesas = () => {
  const [mesas, setMesas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3000/api/mesero/mesas")
      .then(res => {
        console.log("Datos recibidos:", res.data);
        setMesas(res.data);
      })
      .catch(err => {
        console.error("Error al cargar mesas:", err);
      });
  }, []);

  const seleccionarMesa = (numeroMesa) => {
    localStorage.setItem("mesaSeleccionada", numeroMesa);
    navigate("/pedido");
  };

  return (
    <div className="contenedor-mesero">
      <Navbar />
      <h1 className="titulo-seccion">Vista Mesero</h1>
      <p className="subtitulo">Selecciona una mesa para gestionar el pedido</p>
      
      <div className="grid-mesas">
        {mesas.map((m) => (
          <button 
            key={m._id} 
            onClick={() => seleccionarMesa(m.numero)} 
            className={`btn-mesa ${m.estado === 'disponible' ? 'disponible' : 'ocupada'}`}
          >
            <strong>Mesa {m.numero}</strong>
            <small>{m.estado === 'disponible' ? "Disponible" : "Ocupada"}</small>
            <span>Capacidad: {m.capacidad}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ListadoMesas;