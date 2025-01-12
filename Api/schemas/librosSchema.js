import mongoose from "mongoose";

const librosSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    autor: { type: String, required: true },
    ano_publicacion: { type: Date, required: true, max: "2025-01-11" }, // tambien se puede manejar como String debido a que solo se pide el año
    estado: { type: String, required: true, enum: ["disponible", "reservado"] }
});

export default mongoose.model("Libro", librosSchema);
