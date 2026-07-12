import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">Inicio</Link>
      <Link to="/listado-mesas">Vista Mesero</Link>
      <Link to="/admin">Vista Admin</Link>
    </nav>
  );
};

export default Navbar;