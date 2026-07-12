import { Router } from "express";
import { obtenerMenu } from "../controllers/menuController.js";
import { obtenerMesas, actualizarEstadoMesa, tomarPedido, crearMesa } from "../controllers/meseroController.js";

const router = Router();

// Rutas para gestionar las mesas
router.get("/mesas", obtenerMesas);             // GET: Ver todas las mesas
router.post("/mesas", crearMesa);               // POST: Crear una mesa nueva
router.put("/mesas/:id", actualizarEstadoMesa); // PUT: Actualizar estado de una mesa

// Rutas para gestionar los pedidos
router.post("/pedidos", tomarPedido);           // POST: Crear una nueva comanda
router.get("/menu", obtenerMenu);


export default router;