import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ 
      backgroundColor: "#b2ac88", padding: "15px", display: "flex", 
      gap: "20px", justifyContent: "center", color: "white" 
    }}>
      <Link to="/mesero" style={{ color: "white", textDecoration: "none" }}>🍽️ Vista Mesero</Link>
      <Link to="/admin" style={{ color: "white", textDecoration: "none" }}>⚙️ Vista Admin</Link>
    </nav>
  );
}