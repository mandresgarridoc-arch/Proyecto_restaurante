import Producto from '../models/Producto.js';

export const getProductos = async (req, res, next) => {
  try {
    const productos = await Producto.find();
    res.status(200).json(productos);
  } catch (error) {
    next(error); // Pasamos el error al middleware global si lo tienes
  }
};

export const crearProducto = async (req, res, next) => {
  try {
    const nuevoProducto = await Producto.create(req.body);
    res.status(201).json(nuevoProducto);
  } catch (error) {
    next(error);
  }
};

export const actualizarProducto = async (req, res, next) => {
  try {
    const productoActualizado = await Producto.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true } 
    );
    if (!productoActualizado) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }
    res.status(200).json(productoActualizado);
  } catch (error) {
    next(error);
  }
};

export const eliminarProducto = async (req, res, next) => {
  try {
    const productoEliminado = await Producto.findByIdAndDelete(req.params.id);
    if (!productoEliminado) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }
    res.status(200).json({ mensaje: "Producto eliminado exitosamente" });
  } catch (error) {
    next(error);
  }
};

export const obtenerMenu = getProductos;