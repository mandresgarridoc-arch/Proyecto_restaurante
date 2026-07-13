import Pedido from '../models/Pedido.js';

// --- 1. REPORTES Y MÉTRICAS ---

// trae los reportes de la base datos
export const getReportes = async (req, res) => {
  try {

    // en el frotned le pasamos los parametros de fechaInicio y fechaFin, que son opcionales, y si no se pasan, se traen todos los pedidos
    const { fechaInicio, fechaFin } = req.query;
    let matchStage = { estado: 'cerrado' }; 

    if (fechaInicio && fechaFin) {
      matchStage.createdAt = {
        $gte: new Date(fechaInicio),
        $lte: new Date(fechaFin + 'T23:59:59.999Z')
      };
    }

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

    const topPlatos = await Pedido.aggregate([
      { $match: matchStage },
      { $unwind: "$items" }, 
      { 
        $group: { 
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
    // recibe el id y la fecha como parametros de entrada para los filtros.
    const { id, fecha } = req.query;
    let query = { estado: 'cerrado' };

    if (id) query._id = id;
    
    if (fecha) {
      query.createdAt = {
        $gte: new Date(fecha),
        $lte: new Date(fecha + 'T23:59:59.999Z')
      };
    }

    const boletas = await Pedido.find(query).sort({ createdAt: -1 }).lean(); 

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

// --- 3. NUEVA: ELIMINAR BOLETA ---
export const eliminarBoleta = async (req, res) => {
  try {
    const { id } = req.params;
    const boletaEliminada = await Pedido.findByIdAndDelete(id);
    
    if (!boletaEliminada) {
      return res.status(404).json({ mensaje: "Boleta no encontrada" });
    }
    res.status(200).json({ mensaje: "Boleta eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar boleta:", error);
    res.status(500).json({ mensaje: "Error al eliminar", error: error.message });
  }
};