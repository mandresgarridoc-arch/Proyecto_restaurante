import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../App.css';
import axios from 'axios';

const ListadoMesas = () => {
  const [mesas, setMesas] = useState([]);
  const navigate = useNavigate();

  //useEffect es un hook de react que hace que traiga los datos del backend
  
  useEffect(() => {
    axios.get("https://proyecto-restaurante-owmo.onrender.com/api/mesero/mesas")
      .then(res => {
        console.log("Datos recibidos:", res.data);
        setMesas(res.data);
      })
      .catch(err => {
        console.error("Error al cargar mesas:", err);
      });
  }, []);

  // Función lógica para decidir a dónde ir
  const manejarClickMesa = (mesa) => {
    localStorage.setItem("mesaSeleccionada", mesa.numero);
    
    if (mesa.estado === 'disponible') {
      navigate("/pedido");
    } else {
      // Si está ocupada, vamos a la vista de boleta/finalización
      navigate("/boleta");
    }
  };

  return (
    // FIX: Envolvemos todo en un contenedor sin márgenes (Fragmento de React)
    <> 
      {/* El Navbar ahora está libre arriba del todo, pegado a los bordes */}
      <Navbar />
      
      {/* El resto de tu vista mesero sigue conservando sus estilos en su propia caja */}
      <div className="contenedor-mesero">
        <h1 className="titulo-seccion">Vista Mesero</h1>
        <p className="subtitulo">Selecciona una mesa para gestionar el pedido</p>
        
        <div className="grid-mesas">
          {mesas.map((m) => (
            <button 
              key={m._id} 
              onClick={() => manejarClickMesa(m)} 
              className={`btn-mesa ${m.estado === 'disponible' ? 'disponible' : 'ocupada'}`}
            >
              <strong>Mesa {m.numero}</strong>
              <small>{m.estado === 'disponible' ? "Disponible" : "Ocupada"}</small>
              <span>Capacidad: {m.capacidad}</span>
              
              {/* Indicador extra si está ocupada */}
              {m.estado !== 'disponible' && (
                <span style={{ fontSize: '0.75rem', marginTop: '5px', textDecoration: 'underline' }}>
                  Ver Pedido
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default ListadoMesas;