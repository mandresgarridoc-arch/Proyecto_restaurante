import dotenv from "dotenv";
import cors from "cors"; // 1. Importa cors
import app from "./app.js";
import connectDB from "./config/db.js";
import adminRoutes from "./routes/adminRoutes.js";

//Aqui llega la peticion del front y aqui esta el servidor (express) escuchando

dotenv.config();

const PORT = process.env.PORT || 5000;

// 2. Permite peticiones desde cualquier origen (Frontend)
//Cors es como el guardia de seguridad solo permite pasar peticiones de nuestro front

app.use(cors()); 

// Registrar las rutas de administracion
app.use("/api/admin", adminRoutes);

//aqui levantamos el backend
//Le digo a express que funcione de forma asincrona y que este escuchando en el puerto 5000, y que cuando se levante me muestre un mensaje en la consola
const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            // Render usa variables de entorno, este log es solo para ti
            console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
        });
    } catch (error) {
        console.error("Error al conectar a la base de datos:", error);
    }
};

startServer();