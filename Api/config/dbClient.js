import "dotenv";
import mongoose from "mongoose";

class dbCliente {
    constructor() {
        this.conectarBaseDatos();
    }

    async conectarBaseDatos() {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Base de datos conectada con exito.");
    }

    async cerrarConexion() {
        try {
            await mongoose.disconnect();
            console.log("Conexion de la base de datos cerrada con exito.");
        } catch (error) {
            console.log("Error al cerrar la conexion de la base de datos.");
        }
    }
}

export default new dbCliente();
