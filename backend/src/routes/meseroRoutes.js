import { Router } from "express";
import { obtenerMenu } from "../controllers/menuController.js";
import { 
    obtenerMesas, 
    actualizarEstadoMesa, 
    tomarPedido, 
    crearMesa, 
    finalizarPedido,
    obtenerPedidoPorMesa,
    cancelarPedidoAbierto, // FIX: Importamos la función para cancelar
    editarPedidoAbierto    // NUEVO: Importamos la función para editar platos
} from "../controllers/meseroController.js";

const router = Router();

// Rutas para gestionar las mesas
router.get("/mesas", obtenerMesas);
router.post("/mesas", crearMesa);
router.put("/mesas/:id", actualizarEstadoMesa);




// Ruta para crear un pedido nuevo
router.post("/pedido", tomarPedido); 

// Nueva ruta para ver la boleta (Busca el pedido abierto)
router.get("/pedido/:numeroMesa", obtenerPedidoPorMesa); 

// NUEVA: Ruta para EDITAR un pedido ya abierto (Agregar o quitar platos)
// Usamos el método PUT por convención REST, ya que sirve para "actualizar" o "modificar" datos existentes.
router.put("/pedido/editar", editarPedidoAbierto);


// Rutas para finalizar o cancelar flujos


// Nueva ruta para finalizar y cobrar (Cierra el pedido y libera mesa)
router.post("/finalizar", finalizarPedido);

// FIX: Nueva ruta para CANCELAR la venta (Botón rojo)
router.post("/pedidos/cancelar", cancelarPedidoAbierto);





// Ruta del menú
router.get("/menu", obtenerMenu);

export default router;