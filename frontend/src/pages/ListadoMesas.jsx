// Archivo: src/pages/ListadoMesas.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function ListadoMesas() {
  const [mesas, setMesas] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/mesero/mesas")
      .then(res => setMesas(res.data));
  }, []);

  return (
    <div style={{ backgroundColor: "#fdfbf7", minHeight: "100vh" }}>
      <Navbar />
      
      {/* Título de sección */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <h2 style={{ color: "#8fa36b", margin: 0 }}>Panel de Trabajo</h2>
        <h1 style={{ color: "#4a5d23", marginTop: "5px" }}>Mesas Disponibles</h1>
      </div>
      
      <div style={{ 
        display: "grid", gridTemplateColumns: "repeat(3, 200px)", 
        gap: "20px", justifyContent: "center", marginTop: "30px" 
      }}>
        {mesas.map((m) => (
          <div key={m._id} style={{ 
            backgroundColor: "#e3eac5", padding: "20px", borderRadius: "20px", 
            textAlign: "center", border: "2px solid #8fa36b"
          }}>
            <h3 style={{ color: "#4a5d23" }}>Mesa {m.numero}</h3>
            <p>Capacidad: {m.capacidad}</p>
            <button style={{ backgroundColor: "#8fa36b", color: "white", border: "none", padding: "10px", borderRadius: "10px", cursor: "pointer" }}>
              Tomar Pedido
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}