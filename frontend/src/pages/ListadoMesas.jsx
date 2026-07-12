import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../App.css'; // <--- ESTA LÍNEA DEBE EXISTIR
import axios from 'axios';

const ListadoMesas = () => {
  const [mesas, setMesas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3000/api/mesero/mesas")
      .then(res => setMesas(res.data));
  }, []);

  const seleccionarMesa = (numero) => {
    localStorage.setItem("mesaSeleccionada", numero);
    navigate("/pedido");
  };

  return (
    <div className="contenedor-mesero">
      <Navbar />
      <h1>Vista Mesero</h1>
      <div className="grid-mesas">
        {mesas.map((m) => (
          <button key={m._id} onClick={() => seleccionarMesa(m.numero)} className="btn-mesa">
            Mesa {m.numero}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ListadoMesas;