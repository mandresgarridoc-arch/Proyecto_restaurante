// index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Carga las variables desde el archivo .env

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conexión a MongoDB Atlas
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ Conectado a MongoDB Atlas'))
    .catch((err) => console.error('❌ Error de conexión:', err));

// Ruta de prueba inicial
app.get('/', (req, res) => {
    res.json({ mensaje: 'Backend de SisGes funcionando correctamente' });
});

// Definir el puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});