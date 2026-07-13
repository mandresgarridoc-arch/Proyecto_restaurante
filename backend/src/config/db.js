import mongoose from "mongoose";


// funcion asincronza que se conecta a la base de datos de MongoDB Atlas, usando la URI que esta en el archivo .env
// async significa que genera un hilo para conectarse a la base de datos, mientras puede estar haciendo otras cosas, y await significa que espera a que se conecte a la base de datos antes de continuar con el resto del codigo
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Conectado a MongoDB Atlas");
    } catch (error) {
        console.error("Error de conexión:", error.message);
        process.exit(1);
    }
};

export default connectDB;