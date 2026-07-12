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
    items: [itemPedidoSchema], // Lista de platos (como el List[ItemPedidoDTO] de Python)
    total: {
      type: Number,
      required: true,
      default: 0
    },
    estado: {
      type: String,
      required: true,
      default: "abierto",
      enum: ["abierto", "cerrado"]
    }
  },
  {
    timestamps: true 
  }
);

const Pedido = mongoose.model("Pedido", pedidoSchema);
export default Pedido;