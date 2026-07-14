import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


//aqui es pages es donde ocurren nuestras peticiones al backend

const Boleta = () => {
  const [pedidoItems, setPedidoItems] = useState([]);
  const [menu, setMenu] = useState([]);
  const [hayCambios, setHayCambios] = useState(false);
  const mesa = localStorage.getItem("mesaSeleccionada");
  const navigate = useNavigate();

//useEffect es un hook de react que hace que traiga los datos del backend

  useEffect(() => {
    // 1. Cargar el pedido actual de la mesa
    axios.get(`https://proyecto-restaurante-owmo.onrender.com/api/mesero/pedido/${mesa}`)
      .then(res => {
        // Formateamos los datos para poder editarlos fácilmente
        const itemsAdaptados = res.data.items.map(item => ({
          nombre: item.nombre_plato,
          precio: item.precio_unitario,
          cantidad: item.cantidad
        }));
        setPedidoItems(itemsAdaptados);
      })
      .catch(err => console.error("Error al traer pedido:", err));

    // 2. Cargar el menú para poder agregar productos nuevos
    //axios.get() trae los datos del backend
    axios.get("https://proyecto-restaurante-owmo.onrender.com/api/mesero/menu")
      .then(res => setMenu(res.data))
      .catch(err => console.error("Error al cargar menú:", err));
  }, [mesa]);

  // --- FUNCIONES DE EDICIÓN EN LA MISMA PANTALLA ---

  const agregarPlato = (plato) => {
    setHayCambios(true); // Registramos que hubo un cambio
    setPedidoItems(prev => {
      const existe = prev.find(item => item.nombre === plato.nombre);
      if (existe) {
        return prev.map(item => 
          item.nombre === plato.nombre ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [...prev, { nombre: plato.nombre, precio: plato.precio, cantidad: 1 }];
    });
  };

  const quitarPlato = (nombrePlato) => {
    setHayCambios(true); // Registramos que hubo un cambio
    setPedidoItems(prev => {
      const existe = prev.find(item => item.nombre === nombrePlato);
      if (existe.cantidad === 1) {
        return prev.filter(item => item.nombre !== nombrePlato);
      }
      return prev.map(item => 
        item.nombre === nombrePlato ? { ...item, cantidad: item.cantidad - 1 } : item
      );
    });
  };

  const calcularTotal = () => {
    return pedidoItems.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
  };

  // --- FUNCIONES DE CONEXIÓN AL BACKEND ---

  const guardarCambios = async () => {
    if (pedidoItems.length === 0) {
      alert("El pedido está vacío. Si quieres anular todo, usa 'Cancelar Venta'.");
      return;
    }
    try {
      await axios.put("https://proyecto-restaurante-owmo.onrender.com/api/mesero/pedido/editar", {
        numeroMesa: mesa,
        items: pedidoItems,
        total: calcularTotal()
      });
      alert("✅ Cambios guardados correctamente.");
      setHayCambios(false); // Volvemos a habilitar el botón de cobrar
    } catch (error) {
      console.error("Error al actualizar el pedido:", error);
      alert("Hubo un error al guardar los cambios.");
    }
  };

  const finalizarYLiberar = async () => {
    try {
      await axios.post("https://proyecto-restaurante-owmo.onrender.com/api/mesero/finalizar", { numeroMesa: mesa });
      alert("✅ Pedido finalizado. Mesa liberada y cobrada.");
      navigate("/listado-mesas");
    } catch (err) {
      console.error("Error al finalizar:", err);
      alert("No se pudo liberar la mesa.");
    }
  };

  const cancelarVenta = async () => {
    if (window.confirm("⚠️ ¿Estás seguro de CANCELAR esta venta? La mesa quedará libre.")) {
      try {
        await axios.post("https://proyecto-restaurante-owmo.onrender.com/api/mesero/pedidos/cancelar", { numeroMesa: mesa });
        alert("Venta cancelada exitosamente.");
        navigate("/listado-mesas");
      } catch (err) {
        console.error("Error al cancelar la venta:", err);
      }
    }
  };

  if (!pedidoItems) return <p style={{textAlign: 'center', marginTop: '50px'}}>Cargando boleta...</p>;

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial', maxWidth: '900px', margin: '0 auto' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: '#2c3e50', marginBottom: '5px' }}>Boleta Mesa {mesa}</h1>
        <p style={{ color: '#64748b', marginTop: '0' }}>Edita el pedido o procede a cobrar</p>
      </div>
      
      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', justifyContent: 'center' }}>
        
        {/* IZQUIERDA: LA BOLETA (Editable) */}
        <div style={{ flex: '1 1 400px', border: '2px solid #8c9e6c', padding: '25px', borderRadius: '12px', backgroundColor: '#fff', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          {pedidoItems.length === 0 ? (
            <p style={{ color: '#ef4444', textAlign: 'center' }}>No hay productos en la boleta.</p>
          ) : (
            pedidoItems.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '15px', borderBottom: '1px dashed #e2e8f0', paddingBottom: '10px' }}>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {/* Botones para ajustar cantidad */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <button onClick={() => agregarPlato(item)} style={{ cursor: 'pointer', background: '#e2e8f0', border: 'none', borderRadius: '3px', fontSize: '10px', padding: '2px 5px' }}>➕</button>
                    <button onClick={() => quitarPlato(item.nombre)} style={{ cursor: 'pointer', background: '#e2e8f0', border: 'none', borderRadius: '3px', fontSize: '10px', padding: '2px 5px' }}>➖</button>
                  </div>
                  <span style={{ color: '#334155' }}><strong>{item.cantidad}x</strong> {item.nombre}</span>
                </div>

                <span style={{ fontWeight: 'bold', color: '#475569' }}>${(item.precio * item.cantidad).toLocaleString('es-CL')}</span>
              </div>
            ))
          )}
          
          <hr style={{ border: '0', borderTop: '2px solid #8c9e6c', margin: '20px 0' }} />
          <h2 style={{ color: '#16a34a', textAlign: 'right', margin: '0', fontSize: '1.8rem' }}>
            Total: ${calcularTotal().toLocaleString('es-CL')}
          </h2>
        </div>

        {/* DERECHA: EL MENÚ PARA AGREGAR NUEVOS */}
        <div style={{ flex: '1 1 300px', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '15px', backgroundColor: '#f8fafc', maxHeight: '400px', overflowY: 'auto' }}>
          <h3 style={{ color: '#475569', marginTop: 0, textAlign: 'center' }}>+ Agregar Productos</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {menu.map((plato) => (
              <div key={plato._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '0.9rem', color: '#334155' }}>{plato.nombre}</span>
                <button 
                  onClick={() => agregarPlato(plato)}
                  style={{ padding: '6px 12px', backgroundColor: '#8c9e6c', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '0.8rem' }}
                >
                  Agregar
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* BOTONERA INFERIOR */}
      <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '40px' }}>
        
        {/* Lógica condicional: Si hay cambios sin guardar, obliga a guardar primero */}
        {hayCambios ? (
          <button 
            onClick={guardarCambios} 
            style={{ padding: '12px 24px', backgroundColor: '#f59e0b', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem', boxShadow: '0 2px 4px rgba(245, 158, 11, 0.3)' }}
          >
            💾 Guardar Cambios
          </button>
        ) : (
          <button 
            onClick={finalizarYLiberar} 
            style={{ padding: '12px 24px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem', boxShadow: '0 2px 4px rgba(16, 185, 129, 0.3)' }}
          >
            ✅ Finalizar y Cobrar
          </button>
        )}
        
        <button 
          onClick={cancelarVenta} 
          style={{ padding: '12px 24px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem', boxShadow: '0 2px 4px rgba(239, 68, 68, 0.3)' }}
        >
          🗑️ Cancelar Venta
        </button>

        <button 
          onClick={() => navigate("/listado-mesas")} 
          style={{ padding: '12px 24px', backgroundColor: '#64748b', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }}
        >
          ⬅️ Volver
        </button>
      </div>

    </div>
  );
};

export default Boleta;