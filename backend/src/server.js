import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";
import adminRoutes from "./routes/adminRoutes.js"; // Ya lo tienes importado

dotenv.config();

const PORT = process.env.PORT || 5000;

// Registrar las rutas de administración aquí
app.use("/api/admin", adminRoutes);

const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
};

startServer();