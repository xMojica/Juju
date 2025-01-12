import mongoose from "mongoose";

const usuariosSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    nombre: { type: String, required: true },
    telefono: { type: String, required: true },
    clave: { type: String, required: true }
});

export default mongoose.model("Usuario", usuariosSchema);
