// Archivo: src/pages/AdminEnConstruccion.jsx
export default function AdminEnConstruccion() {
  const estilos = {
    contenedor: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      backgroundColor: "#fdfbf7", // Crema suave
      color: "#4a5d23", // Verde salvia oscuro
      fontFamily: "sans-serif",
      textAlign: "center"
    },
    tarjeta: {
      backgroundColor: "#e3eac5", // Verde matcha clarito
      padding: "40px",
      borderRadius: "15px",
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      border: "2px dashed #8fa36b" // Verde salvia medio
    },
    titulo: {
      margin: "0 0 10px 0",
      fontSize: "2rem"
    }
  };

  return (
    <div style={estilos.contenedor}>
      <div style={estilos.tarjeta}>
        <h1 style={estilos.titulo}>👷 Panel de Administrador</h1>
        <p>Esta sección está actualmente en construcción.</p>
        <p><strong>Próximamente:</strong> Gestión de personal, finanzas y reportes.</p>
      </div>
    </div>
  );
}