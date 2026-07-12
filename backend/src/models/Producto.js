import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({
  nombre: String,
  precio: Number,
  categoria: String
});

// Forzamos a que se guarde en la colección "productos"
export default mongoose.model("Producto", productoSchema, "productos");