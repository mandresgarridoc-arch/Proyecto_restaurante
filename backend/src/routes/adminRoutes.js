import { Router } from "express";
import { getReportes, getBoletas, eliminarBoleta } from '../controllers/AdminController.js';
import { getProductos, crearProducto, actualizarProducto, eliminarProducto } from '../controllers/menuController.js';

const router = Router();

// Rutas de Reportes y Boletas
router.get('/reportes', getReportes);
router.get('/boletas', getBoletas);
router.delete('/boletas/:id', eliminarBoleta); // <-- NUEVA RUTA PARA BORRAR BOLETAS

// Rutas de Gestión de Menú
router.get('/productos', getProductos);
router.post('/productos', crearProducto);
router.put('/productos/:id', actualizarProducto);
router.delete('/productos/:id', eliminarProducto);

export default router;