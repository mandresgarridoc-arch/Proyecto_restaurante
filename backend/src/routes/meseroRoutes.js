import { Router } from "express";
import { obtenerMenu } from "../controllers/menuController.js";
import { 
    obtenerMesas, 
    actualizarEstadoMesa, 
    tomarPedido, 
    crearMesa, 
    finalizarPedido // Asegúrate de exportar esta función desde tu controlador
} from "../controllers/meseroController.js";

const router = Router();

// Rutas para gestionar las mesas
router.get("/mesas", obtenerMesas);
router.post("/mesas", crearMesa);
router.put("/mesas/:id", actualizarEstadoMesa);

// Rutas para gestionar los pedidos
// Corregido: cambiamos /pedidos a /pedido para que coincida con el frontend
router.post("/pedido", tomarPedido); 

// Nueva ruta para finalizar y cobrar
router.post("/finalizar", finalizarPedido);

// Ruta del menú
router.get("/menu", obtenerMenu);

export default router;