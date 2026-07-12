// Archivo: src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListadoMesas from "./pages/ListadoMesas";
import AdminEnConstruccion from "./pages/AdminEnConstruccion.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta principal: Carga el listado de mesas desde MongoDB */}
        <Route path="/" element={<ListadoMesas />} />
        
        {/* Ruta aislada para el Administrador (área en construcción) */}
        <Route path="/admin/*" element={<AdminEnConstruccion />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;