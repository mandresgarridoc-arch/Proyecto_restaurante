import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar'; 
import "../App.css"; 

const Mesas = () => {
  const navigate = useNavigate();

  const seleccionarMesa = (numero) => {
    localStorage.setItem("mesaSeleccionada", numero);
    navigate("/tomar-pedido");
  };

  return (
    <div className="layout-principal"> 
      <Navbar /> 
      
      <main className="contenido-cozy">
        <h1 style={{ color: '#334155', textAlign: 'center', marginBottom: '2rem' }}>
            Selecciona una mesa
        </h1>
        
        <div className="contenedor-mesas">
            <button className="btn-mesa" onClick={() => seleccionarMesa(1)}>
                <span className="mesa-numero">Mesa 1</span>
                <span className="mesa-estado">Disponible</span>
            </button>
            <button className="btn-mesa" onClick={() => seleccionarMesa(2)}>
                <span className="mesa-numero">Mesa 2</span>
                <span className="mesa-estado">Disponible</span>
            </button>
        </div>
      </main>
    </div>
  );
};

export default Mesas;