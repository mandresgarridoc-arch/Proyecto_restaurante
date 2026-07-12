import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ListadoMesas from './pages/ListadoMesas';
import Admin from './pages/Admin';
import Pedido from './components/Pedido';
import Boleta from './pages/Boleta';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listado-mesas" element={<ListadoMesas />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/pedido" element={<Pedido />} />
        <Route path="/boleta" element={<Boleta />} />
      </Routes>
    </Router>
  );
}
export default App;