// Archivo: src/pages/Home.jsx
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ 
      height: "100vh", backgroundColor: "#fdfbf7", display: "flex", 
      flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "30px" 
    }}>
      {/* Título con color oscuro para que se vea bien */}
      <h1 style={{ color: "#4a5d23", fontSize: "3rem", margin: 0 }}>Bienvenido a SisGes</h1>
      
      <div style={{ display: "flex", gap: "20px" }}>
        <Link to="/mesero" style={{ padding: "15px 30px", backgroundColor: "#a8c69f", borderRadius: "10px", textDecoration: "none", color: "white", fontWeight: "bold" }}>Mesero</Link>
        <Link to="/admin" style={{ padding: "15px 30px", backgroundColor: "#d4a373", borderRadius: "10px", textDecoration: "none", color: "white", fontWeight: "bold" }}>Administrador</Link>
      </div>
    </div>
  );
}