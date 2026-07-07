// Archivo: backend/test_conection.js
require('dotenv').config(); // 1. Carga las variables del archivo .env
const mongoose = require('mongoose'); // 2. Importa mongoose

const uri = process.env.MONGO_URI; // 3. Lee la URI desde el archivo .env

async function probarConexion() {
    try {
        console.log("Intentando conectar a MongoDB...");
        await mongoose.connect(uri); // 4. Intenta conectar
        console.log("¡Conexión exitosa! MongoDB Atlas está funcionando.");
    } catch (error) {
        console.error("Error al conectar:", error.message);
    } finally {
        process.exit(); // 5. Cierra el script
    }
}

probarConexion();