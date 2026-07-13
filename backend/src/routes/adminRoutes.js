import { Router } from "express";
import { getReportes, getBoletas } from '../controllers/AdminController.js';
import { getProductos, crearProducto, actualizarProducto, eliminarProducto } from '../controllers/menuController.js';

const router = Router();

//metodos html son get, post, put, delete
// Rutas de Reportes y Boletas
router.get('/reportes', getReportes);
router.get('/boletas', getBoletas);

// Rutas de Gestión de Menú
router.get('/productos', getProductos);
router.post('/productos', crearProducto);
router.put('/productos/:id', actualizarProducto);
router.delete('/productos/:id', eliminarProducto);

export default router;