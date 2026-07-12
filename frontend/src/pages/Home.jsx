import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ 
      height: "100vh", backgroundColor: "#fdfbf7", display: "flex", 
      flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "20px" 
    }}>
      <h1>Bienvenido a SisGes</h1>
      <div style={{ display: "flex", gap: "10px" }}>
        <Link to="/mesero" style={{ padding: "15px 30px", backgroundColor: "#a8c69f", borderRadius: "10px", textDecoration: "none", color: "white" }}>Mesero</Link>
        <Link to="/admin" style={{ padding: "15px 30px", backgroundColor: "#d4a373", borderRadius: "10px", textDecoration: "none", color: "white" }}>Administrador</Link>
      </div>
    </div>
  );
}