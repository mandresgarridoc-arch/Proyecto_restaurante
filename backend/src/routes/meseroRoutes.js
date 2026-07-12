import { Router } from "express";
import { obtenerMenu } from "../controllers/menuController.js";
import { 
    obtenerMesas, 
    actualizarEstadoMesa, 
    tomarPedido, 
    crearMesa, 
    finalizarPedido,
    obtenerPedidoPorMesa // Importamos la nueva función
} from "../controllers/meseroController.js";

const router = Router();

// Rutas para gestionar las mesas
router.get("/mesas", obtenerMesas);
router.post("/mesas", crearMesa);
router.put("/mesas/:id", actualizarEstadoMesa);

// Rutas para gestionar los pedidos
router.post("/pedido", tomarPedido); 
router.get("/pedido/:numeroMesa", obtenerPedidoPorMesa); // Nueva ruta para ver la boleta

// Nueva ruta para finalizar y cobrar
router.post("/finalizar", finalizarPedido);

// Ruta del menú
router.get("/menu", obtenerMenu);

export default router;