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

// 3. Tomar un nuevo pedido (ARREGLADO CON TRADUCCIÓN DE CAMPOS)
export const tomarPedido = async (req, res) => {
  console.log("¡Pedido recibido en el servidor!", req.body);
  try {
    const { numeroMesa, items, total } = req.body;

    // Validación básica
    if (!numeroMesa || !items || items.length === 0) {
      return res.status(400).json({ error: "Datos del pedido incompletos" });
    }

    // TRADUCCIÓN: Convertimos los campos del Frontend al formato que exige el Modelo
    const itemsFormateados = items.map(item => ({
      nombre_plato: item.nombre,
      precio_unitario: item.precio,
      cantidad: item.cantidad
    }));

    // Creamos el pedido con los campos traducidos
    const nuevoPedido = await Pedido.create({
      numero_mesa: numeroMesa,
      items: itemsFormateados,
      total: total,
      estado: "abierto"
    });
    console.log("Pedido guardado con éxito:", nuevoPedido._id);

    // Actualizamos la mesa a ocupada
    const mesaActualizada = await Mesa.findOneAndUpdate(
      { numero: numeroMesa }, 
      { estado: "ocupada" },
      { new: true }
    );

    if (!mesaActualizada) {
      return res.status(404).json({ error: "No se encontró la mesa para actualizar su estado" });
    }

    res.status(201).json(nuevoPedido);
  } catch (error) {
    console.error("ERROR DETALLADO EN TOMAR PEDIDO:", error);
    res.status(500).json({ error: error.message });
  }
};

// 4. Finalizar pedido
export const finalizarPedido = async (req, res) => {
  try {
    const { numeroMesa } = req.body;
    await Mesa.findOneAndUpdate({ numero: numeroMesa }, { estado: "disponible" });
    res.status(200).json({ mensaje: "Pedido finalizado y mesa liberada" });
  } catch (error) {
    console.error("ERROR AL FINALIZAR:", error);
    res.status(500).json({ error: error.message });
  }
};

// 5. Crear mesa
export const crearMesa = async (req, res) => {
  try {
    const mesa = await Mesa.create(req.body);
    res.status(201).json(mesa);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};