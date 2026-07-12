// Archivo: src/controllers/adminController.js
import Producto from "../models/Producto.js";

export const crearProducto = async (req, res) => {
  try {
    const nuevoProducto = new Producto(req.body);
    await nuevoProducto.save();
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(500).json({ error: "Error al crear producto" });
  }
};

export const eliminarProducto = async (req, res) => {
  try {
    await Producto.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Producto eliminado" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar" });
  }
};