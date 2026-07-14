import mongoose from "mongoose";

//Antes de guardar cualquier cosa mongose revisa el modelo schema
//si todo esta correcto guarda la info 
// Aquí defino el objeto del backend, que es basicamente lo mismo que definimos en el modelo de datos de la BD
const mesaSchema = new mongoose.Schema(
  {
    numero: {
      type: Number,
      required: true,
      unique: true 
    },
    capacidad: { //aquí agregamos la cantidad de comensales!
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