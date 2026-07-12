// Archivo: src/routes/adminRoutes.js
import express from "express";
import { crearProducto, eliminarProducto } from "../controllers/adminController.js";

const router = express.Router();

router.post("/productos", crearProducto);
router.delete("/productos/:id", eliminarProducto);

export default router;