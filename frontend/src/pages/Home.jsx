import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-card">
        <h1 className="home-title">Bienvenido a SisGes</h1>
        <p className="home-subtitle">Sistema de Gestión para Restaurantes</p>

        <div className="home-buttons">
          <button 
            className="btn-role btn-mesero" 
            onClick={() => navigate('/listado-mesas')}
          >
            <span className="btn-icon">📝</span>
            <span className="btn-text">Vista Mesero</span>
          </button>

          <button 
            className="btn-role btn-admin" 
            onClick={() => navigate('/admin')}
          >
            <span className="btn-icon">⚙️</span>
            <span className="btn-text">Administrador</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;