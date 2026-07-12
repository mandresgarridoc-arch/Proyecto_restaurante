import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ListadoMesas from "./pages/ListadoMesas";
import AdminEnConstruccion from "./pages/AdminEnConstruccion";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mesero" element={<ListadoMesas />} />
        <Route path="/admin" element={<AdminEnConstruccion />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;