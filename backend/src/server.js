import dotenv from "dotenv";
import cors from "cors"; // 1. Importa cors
import app from "./app.js";
import connectDB from "./config/db.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

// 2. AGREGA ESTA LÍNEA AQUÍ: Permite peticiones desde cualquier origen (Frontend)
app.use(cors()); 

// Registrar las rutas
app.use("/api/admin", adminRoutes);

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