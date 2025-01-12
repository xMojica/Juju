import mongoose from "mongoose";

const librosSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    autor: { type: String, required: true },
    ano_publicacion: { type: Date, required: true, max: "2025-01-13" },
    estado: { type: String, required: true, enum: ["disponible", "reservado"] }
});

export default mongoose.model("Libro", librosSchema);
