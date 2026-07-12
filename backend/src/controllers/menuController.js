import Producto from "../models/Producto.js";

export const obtenerMenu = async (req, res) => {
  try {
    const menu = await Producto.find();
    res.json(menu);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


