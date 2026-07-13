import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  precio: { type: Number, required: true },
  categoria: { type: String, required: true },
  
  // NUEVO: Este es el campo mágico que permite el Soft Delete
  disponible: { type: Boolean, default: true } 

}, { timestamps: true });

export default mongoose.model("Producto", productoSchema);