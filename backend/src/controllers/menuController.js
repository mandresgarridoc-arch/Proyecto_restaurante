import Producto from "../models/Producto.js";

// 1. Obtener TODOS los productos (Para el panel de Admin - muestra activos e inactivos)
export const getProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener productos", error: error.message });
  }
};

// 2. Obtener SOLO productos activos (Para la vista del Mesero)
export const obtenerMenu = async (req, res) => {
  try {
    // Buscamos platos donde "disponible" NO sea falso (así incluye los antiguos que no tienen el campo)
    const menu = await Producto.find({ disponible: { $ne: false } });
    res.status(200).json(menu);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener el menú", error: error.message });
  }
};

// 3. Crear producto
export const crearProducto = async (req, res) => {
  try {
    const nuevoProducto = await Producto.create(req.body);
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear producto", error: error.message });
  }
};

// 4. Actualizar producto
export const actualizarProducto = async (req, res) => {
  try {
    const productoActualizado = await Producto.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(productoActualizado);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar", error: error.message });
  }
};

// 5. "Eliminar" producto (Soft Delete - Alternar disponibilidad)
export const eliminarProducto = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }

    const estadoActual = producto.disponible !== false; 
    producto.disponible = !estadoActual;
    
    await producto.save();

    res.status(200).json({ 
      mensaje: "Estado del producto actualizado",
      producto 
    });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al cambiar estado", error: error.message });
  }
};