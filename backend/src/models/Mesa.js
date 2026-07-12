import mongoose from "mongoose";

const mesaSchema = new mongoose.Schema(
  {
    numero: {
      type: Number,
      required: true,
      unique: true 
    },
    capacidad: { // <-- ¡Aquí agregamos la cantidad de comensales!
      type: Number,
      required: true,
      min: 1 // Una mesa debe ser para al menos 1 persona
    },
    estado: {
      type: String,
      required: true,
      default: "disponible", 
      enum: ["disponible", "reservada", "ocupada"]
    }
  },
  {
    timestamps: true 
  }
);

const Mesa = mongoose.model("Mesa", mesaSchema);
export default Mesa;