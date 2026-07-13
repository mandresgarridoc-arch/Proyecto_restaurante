import mongoose from "mongoose";

// Sub-esquema para los platos individuales
const itemPedidoSchema = new mongoose.Schema({
  nombre_plato: { 
    type: String, 
    required: true 
  },
  cantidad: { 
    type: Number, 
    required: true,
    min: 1
  },
  precio_unitario: { 
    type: Number, 
    required: true 
  }
});

// Esquema principal del Pedido
const pedidoSchema = new mongoose.Schema(
  {
    numero_mesa: {
      type: Number,
      required: true
    },
    // CAMPO: Guardará el número de 6 dígitos para la boleta
    numero_boleta: { 
      type: Number 
    },
    items: [itemPedidoSchema], // Lista de platos
    total: {
      type: Number,
      required: true,
      default: 0
    },
    estado: {
      type: String,
      required: true,
      default: "abierto",
      // FIX: Agregamos "cancelado" a la lista de estados permitidos
      enum: ["abierto", "cerrado", "cancelado"] 
    }
  },
  {
    timestamps: true 
  }
);

const Pedido = mongoose.model("Pedido", pedidoSchema);
export default Pedido;