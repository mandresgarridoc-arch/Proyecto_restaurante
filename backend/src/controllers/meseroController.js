import Mesa from "../models/Mesa.js";
import Pedido from "../models/Pedido.js";
import Producto from "../models/Producto.js";

// 1. Acción: Ver todas las mesas
export const obtenerMesas = async (req, res) => {
  try {
    const mesas = await Mesa.find();
    res.status(200).json(mesas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 2. Acción: Cambiar el estado de la mesa
export const actualizarEstadoMesa = async (req, res) => {
  try {
    const mesa = await Mesa.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!mesa) return res.status(404).json({ mensaje: "Mesa no encontrada" });
    res.status(200).json(mesa);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 3. Acción: Tomar un nuevo pedido
export const tomarPedido = async (req, res) => {
  try {
    const { numero_mesa, items } = req.body;
    const totalCalculado = items.reduce((acc, item) => acc + (item.precio_unitario * item.cantidad), 0);

    const nuevoPedido = await Pedido.create({
      numero_mesa,
      items,
      total: totalCalculado,
      estado: "abierto"
    });

    await Mesa.findOneAndUpdate({ numero: numero_mesa }, { estado: "ocupada" });
    res.status(201).json(nuevoPedido);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 4. Acción: Crear mesa
export const crearMesa = async (req, res) => {
  try {
    const mesa = await Mesa.create(req.body);
    res.status(201).json(mesa);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};