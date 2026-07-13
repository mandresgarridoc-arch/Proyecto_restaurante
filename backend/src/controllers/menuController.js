import Producto from '../models/Producto.js';


//metodos html son get,push,put,delete
// trae los productos
export const getProductos = async (req, res, next) => {
  try {

    // no recibe parametros de entrada, simplemente trae todos los productos de la base de datos
    const productos = await Producto.find();
    // el codigo 200 signifca que la peticion fue exitosa y se devuelve el resultado en formato JSON
    res.status(200).json(productos);
  } catch (error) {
    next(error); // Pasamos el error al middleware global si lo tienes
  }
};


export const crearProducto = async (req, res, next) => {
  try {
    const nuevoProducto = await Producto.create(req.body);
    // el codigo 201 significa que el recurso fue creado exitosamente y se devuelve el resultado en formato JSON
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
      
      // el codigo 404 significa que el recurso no fue encontrado y se devuelve un mensaje de error en formato JSON
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