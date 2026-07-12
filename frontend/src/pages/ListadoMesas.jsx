import { useEffect, useState } from "react";
import axios from "axios";

export default function ListadoMesas() {
  const [mesas, setMesas] = useState([]);

  useEffect(() => {
    // Aquí le pedimos al backend la lista que guardamos en MongoDB
    axios.get("http://localhost:3000/api/mesero/mesas")
      .then(res => setMesas(res.data))
      .catch(err => console.error("Error al traer mesas:", err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>🍽️ Mesas del Restaurante</h1>
      <div style={{ display: "grid", gap: "10px", gridTemplateColumns: "repeat(3, 1fr)" }}>
        {mesas.map((mesa) => (
          <div key={mesa._id} style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "10px" }}>
            <h3>Mesa {mesa.numero}</h3>
            <p>Capacidad: {mesa.capacidad} personas</p>
            <p>Estado: <strong>{mesa.estado}</strong></p>
            <button>Tomar Pedido</button>
          </div>
        ))}
      </div>
    </div>
  );
}