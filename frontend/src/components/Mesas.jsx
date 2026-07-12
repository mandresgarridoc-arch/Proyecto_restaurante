import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar'; // Asegúrate de importar el componente Navbar que tenías
import "../App.css"; // Importa el archivo de estilos que tenía tus colores

const Mesas = () => {
  const navigate = useNavigate();

  const seleccionarMesa = (numero) => {
    localStorage.setItem("mesaSeleccionada", numero);
    navigate("/tomar-pedido");
  };

  return (
    <div className="layout-principal"> 
      <Navbar /> {/* Aquí vuelve tu barra de navegación */}
      
      <main className="contenido-cozy">
        <h1>Selecciona una mesa</h1>
        <div className="contenedor-mesas">
            <button className="btn-mesa" onClick={() => seleccionarMesa(1)}>Mesa 1</button>
            <button className="btn-mesa" onClick={() => seleccionarMesa(2)}>Mesa 2</button>
        </div>
      </main>
    </div>
  );
};

export default Mesas;