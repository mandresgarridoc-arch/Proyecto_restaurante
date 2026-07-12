import express from "express";
import cors from "cors";
import adminRoutes from './routes/adminRoutes.js';
import meseroRoutes from "./routes/meseroRoutes.js"; // <-- 1. DEBE ESTAR IMPORTADO AQUÍ

const app = express();

app.use(cors());
app.use(express.json());

// 2. DEBE ESTAR REGISTRADO AQUÍ (antes de la ruta de prueba "/")
app.use("/api/mesero", meseroRoutes);
app.use('/admin', adminRoutes); 

// Ruta de prueba inicial
app.get("/", (req, res) => {
    res.json({ mensaje: "Backend de SisGes funcionando correctamente" });
});

export default app;