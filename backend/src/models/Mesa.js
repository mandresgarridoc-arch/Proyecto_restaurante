import mongoose from "mongoose";


// Aquí defino el objeto del backend, que es basicamente lo mismo que definimos en el modelo de datos de la BD
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