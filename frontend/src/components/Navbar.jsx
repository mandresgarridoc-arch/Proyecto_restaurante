// Archivo: src/components/Navbar.jsx
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ 
      backgroundColor: "#4a5d23", padding: "15px", display: "flex", 
      gap: "30px", justifyContent: "center" 
    }}>
      <Link to="/mesero" style={{ color: "#e3eac5", textDecoration: "none", fontWeight: "bold" }}>🍽️ Vista Mesero</Link>
      <Link to="/" style={{ color: "white", textDecoration: "none" }}>🏠 Inicio</Link>
      <Link to="/admin" style={{ color: "#e3eac5", textDecoration: "none", fontWeight: "bold" }}>⚙️ Vista Admin</Link>
    </nav>
  );
}