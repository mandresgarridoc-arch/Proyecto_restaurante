import express from "express";
import cors from "cors";
import adminRoutes from './routes/adminRoutes.js';  //  estoy importando las funciones que cree para admin
import meseroRoutes from "./routes/meseroRoutes.js"; // <-- 1. DEBE ESTAR IMPORTADO AQUÍ


// Crear una instancia de la aplicación Express, osea instancio el objeto express, que es el backend de la aplicación, y lo guardo en la constante app
const app = express();


// Configuración de middlewares, un middleware es una función que se ejecuta antes de que la solicitud llegue a la ruta final, y puede modificar la solicitud o la respuesta, o incluso detener la solicitud si es necesario. En este caso, estamos usando dos middlewares: cors y express.json().
app.use(cors());
app.use(express.json());

// 2. DEBE ESTAR REGISTRADO AQUÍ (antes de la ruta de prueba "/")
app.use("/api/mesero", meseroRoutes); // decirle a express que ocupe el codigo que esta en meseroRoutes.js para todas las rutas que empiecen con /api/mesero
app.use('/admin', adminRoutes);  // decirle a express que ocupe el codigo que esta en adminRoutes.js para todas las rutas que empiecen con /admin

// Ruta de prueba inicial, este mensaje se suele utilizar para verificar que el backend esta en linea.
app.get("/", (req, res) => {
    res.json({ mensaje: "Backend de SisGes funcionando correctamente" });
});

// Exportar la aplicación para que pueda ser utilizada en otros archivos, como el archivo principal del servidor (server.js o index.js)
export default app;