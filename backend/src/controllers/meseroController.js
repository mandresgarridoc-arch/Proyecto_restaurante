import Mesa from "../models/Mesa.js";
import Pedido from "../models/Pedido.js";

// 1. Ver todas las mesas
export const obtenerMesas = async (req, res) => {
  try {
    const mesas = await Mesa.find();
    res.status(200).json(mesas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 2. Cambiar el estado de la mesa
export const actualizarEstadoMesa = async (req, res) => {
  try {
    const mesa = await Mesa.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!mesa) return res.status(404).json({ mensaje: "Mesa no encontrada" });
    res.status(200).json(mesa);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 3. Tomar un nuevo pedido
export const tomarPedido = async (req, res) => {
  try {
    const { numeroMesa, items, total } = req.body;
    if (!numeroMesa || !items || items.length === 0) {
      return res.status(400).json({ error: "Datos del pedido incompletos" });
    }

    const itemsFormateados = items.map(item => ({
      nombre_plato: item.nombre,
      precio_unitario: item.precio,
      cantidad: item.cantidad
    }));

    const nuevoPedido = await Pedido.create({
      numero_mesa: numeroMesa,
      numero_boleta: Math.floor(100000 + Math.random() * 900000),
      items: itemsFormateados,
      total: total,
      estado: "abierto"
    });

    await Mesa.findOneAndUpdate({ numero: numeroMesa }, { estado: "ocupada" });
    res.status(201).json(nuevoPedido);
  } catch (error) {
    console.error("ERROR EN TOMAR PEDIDO:", error);
    res.status(500).json({ error: error.message });
  }
};

// 4. Obtener el pedido abierto de una mesa específica (Para la Boleta)
export const obtenerPedidoPorMesa = async (req, res) => {
  try {
    const { numeroMesa } = req.params;
    const pedido = await Pedido.findOne({ numero_mesa: numeroMesa, estado: "abierto" });
    
    if (!pedido) {
      return res.status(404).json({ error: "No se encontró un pedido activo para esta mesa" });
    }
    res.status(200).json(pedido);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 5. Finalizar pedido
export const finalizarPedido = async (req, res) => {
  try {
    const { numeroMesa } = req.body;
    await Mesa.findOneAndUpdate({ numero: numeroMesa }, { estado: "disponible" });
    await Pedido.findOneAndUpdate({ numero_mesa: numeroMesa, estado: "abierto" }, { estado: "cerrado" });
    
    res.status(200).json({ mensaje: "Pedido finalizado y mesa liberada" });
  } catch (error) {
    console.error("ERROR AL FINALIZAR:", error);
    res.status(500).json({ error: error.message });
  }
};

// 6. Crear mesa
export const crearMesa = async (req, res) => {
  try {
    const mesa = await Mesa.create(req.body);
    res.status(201).json(mesa);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 7. NUEVA: Cancelar venta (liberar mesa y marcar pedido como cancelado)
export const cancelarPedidoAbierto = async (req, res) => {
  try {
    const { numeroMesa } = req.body;

    // 1. Liberamos la mesa para que vuelva a estar verde
    await Mesa.findOneAndUpdate({ numero: numeroMesa }, { estado: "disponible" });

    // 2. Marcamos el pedido como "cancelado" para que no sume dinero en el Dashboard Admin
    const pedidoCancelado = await Pedido.findOneAndUpdate(
      { numero_mesa: numeroMesa, estado: "abierto" },
      { estado: "cancelado" }, 
      { new: true }
    );

    res.status(200).json({ mensaje: "Venta cancelada exitosamente y mesa liberada" });
  } catch (error) {
    console.error("ERROR AL CANCELAR VENTA:", error);
    res.status(500).json({ error: error.message });
  }
};