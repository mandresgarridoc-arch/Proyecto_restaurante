import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  // Aquí guardaremos los platos que nos entregue el backend
  const [menu, setMenu] = useState([]);

  // useEffect hace que esta función se ejecute apenas carga la página
  useEffect(() => {
    const obtenerMenu = async () => {
      try {
        // Axios va al backend a buscar la información (¡Fíjate en el puerto 5000!)
        const respuesta = await axios.get('http://localhost:5000/api/menu');
        setMenu(respuesta.data);
        console.log("Datos recibidos del backend:", respuesta.data);
      } catch (error) {
        console.error("Error al conectar con el backend:", error);
      }
    };

    obtenerMenu();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          🍽️ SisGes - Carta del Restaurante
        </h1>
        
        {menu.length === 0 ? (
          <p className="text-center text-gray-500">Aún no hay platos en el menú. La base de datos está vacía.</p>
        ) : (
          <ul className="space-y-4">
            {menu.map((plato) => (
              <li key={plato._id} className="p-4 border-b flex justify-between">
                <span className="font-semibold">{plato.nombre} ({plato.categoria})</span>
                <span className="text-green-600 font-bold">${plato.precio}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;