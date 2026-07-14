import mongoose from "mongoose";

//Antes de guardar cualquier cosa mongose revisa el modelo schema
//si todo esta correcto guarda la info 

const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  precio: { type: Number, required: true },
  categoria: { type: String, required: true },
  
  // NUEVO: Este es el campo mágico que permite el Soft Delete
  disponible: { type: Boolean, default: true } 

}, { timestamps: true });

export default mongoose.model("Producto", productoSchema);