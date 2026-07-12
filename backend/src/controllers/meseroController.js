import Mesa from "../models/Mesa.js";
import Pedido from "../models/Pedido.js";

// 1. Acción: Ver todas las mesas
export const obtenerMesas = async (req, res) => {
  try {
    const mesas = await Mesa.find();
    res.status(200).json(mesas);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener las mesas",
      error: error.message
    });
  }
};

// 2. Acción: Cambiar el estado de la mesa (Ej: de "disponible" a "ocupada")
export const actualizarEstadoMesa = async (req, res) => {
  try {
    // Usamos el ID de la mesa para buscarla y actualizarla
    const mesa = await Mesa.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } 
    );

    if (!mesa) {
      return res.status(404).json({
        mensaje: "Mesa no encontrada"
      });
    }

    res.status(200).json(mesa);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al actualizar el estado de la mesa",
      error: error.message
    });
  }
};

// 3. Acción: Tomar un nuevo pedido (Abrir una comanda)
export const tomarPedido = async (req, res) => {
  try {
    const pedido = await Pedido.create(req.body);
    res.status(201).json(pedido);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al crear el pedido",
      error: error.message
    });
  }
};

export const crearMesa = async (req, res) => {
  try {
    const mesa = await Mesa.create(req.body);
    res.status(201).json(mesa);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};