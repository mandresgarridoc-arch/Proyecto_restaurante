import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ListadoMesas from './pages/ListadoMesas';
import Admin from './pages/Admin';
import Pedido from './components/Pedido';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listado-mesas" element={<ListadoMesas />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/pedido" element={<Pedido />} />
      </Routes>
    </Router>
  );
}
export default App;