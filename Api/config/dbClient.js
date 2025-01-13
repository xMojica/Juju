import mongoose from "mongoose";
import "dotenv/config";

class dbCliente {
    constructor() {
        this.conectarBaseDatos();
    }

    async conectarBaseDatos() {
        try {
            await mongoose.connect(process.env.MONGODB_URI);
            console.log("Base de datos conectada con éxito.");
        } catch (error) {
            console.error("Error al conectar la base de datos:", error.message);
            process.exit(1);
        }
    }

    async cerrarConexion() {
        try {
            await mongoose.disconnect();
            console.log("Conexión de la base de datos cerrada con éxito.");
        } catch (error) {
            console.error(
                "Error al cerrar la conexión de la base de datos:",
                error.message
            );
        }
    }
}

export default new dbCliente();
