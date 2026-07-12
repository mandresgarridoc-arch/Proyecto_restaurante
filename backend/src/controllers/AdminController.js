import Pedido from '../models/Pedido.js';

// --- 1. REPORTES Y MÉTRICAS ---
export const getReportes = async (req, res) => {
  try {
    const { fechaInicio, fechaFin } = req.query;

    // FIX 1: Filtramos por la palabra exacta que usa tu meseroController
    let matchStage = { estado: 'cerrado' }; 

    if (fechaInicio && fechaFin) {
      matchStage.createdAt = {
        $gte: new Date(fechaInicio),
        $lte: new Date(fechaFin + 'T23:59:59.999Z')
      };
    }

    // Pipeline 1: Ingresos Totales y Cantidad de Pedidos
    const ventasTotales = await Pedido.aggregate([
      { $match: matchStage },
      { 
        $group: { 
          _id: null, 
          totalIngresos: { $sum: "$total" }, 
          cantidadPedidos: { $sum: 1 } 
        } 
      }
    ]);

    // Pipeline 2: Top 5 de Platos Más Vendidos
    const topPlatos = await Pedido.aggregate([
      { $match: matchStage },
      // FIX 2: Tu modelo guarda los platos en "items"
      { $unwind: "$items" }, 
      { 
        $group: { 
          // FIX 3: Agrupamos y buscamos por "nombre_plato"
          _id: "$items.nombre_plato", 
          nombre: { $first: "$items.nombre_plato" }, 
          cantidadVendida: { $sum: "$items.cantidad" } 
        } 
      },
      { $sort: { cantidadVendida: -1 } }, 
      { $limit: 5 } 
    ]);

    res.status(200).json({
      ventas: ventasTotales.length > 0 ? ventasTotales[0] : { totalIngresos: 0, cantidadPedidos: 0 },
      topPlatos
    });

  } catch (error) {
    console.error("Error en getReportes:", error);
    res.status(500).json({ mensaje: "Error al generar reportes", error: error.message });
  }
};

// --- 2. HISTORIAL DE BOLETAS ---
export const getBoletas = async (req, res) => {
  try {
    const { id, fecha } = req.query;
    
    // FIX 1: Filtramos por 'cerrado'
    let query = { estado: 'cerrado' };

    if (id) query._id = id;
    
    if (fecha) {
      query.createdAt = {
        $gte: new Date(fecha),
        $lte: new Date(fecha + 'T23:59:59.999Z')
      };
    }

    // Usamos lean() para poder modificar el objeto antes de enviarlo
    const boletas = await Pedido.find(query).sort({ createdAt: -1 }).lean(); 

    // FIX 4: Como tu modelo guarda "numero_mesa" directo, lo adaptamos 
    // para que el frontend lo lea sin problemas en su tabla
    const boletasMapeadas = boletas.map(boleta => ({
      ...boleta,
      mesa: boleta.numero_mesa 
    }));

    res.status(200).json(boletasMapeadas);

  } catch (error) {
    console.error("Error en getBoletas:", error);
    res.status(500).json({ mensaje: "Error al buscar boletas", error: error.message });
  }
};