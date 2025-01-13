import librosModel from "../models/libroModel.js";
import mongoose from "mongoose";

class librosController {
    constructor() {}

    validateMongoId(id) {
        return mongoose.Types.ObjectId.isValid(id);
    }

    async getAll(req, res) {
        try {
            const data = await librosModel.getAll();
            res.status(200).json(data);
        } catch (err) {
            res.status(500).json({ error: "Error al obtener los libros" });
        }
    }

    async getOne(req, res) {
        const { id } = req.params;
        if (!this.validateMongoId(id)) {
            return res.status(400).json({ error: "ID no válido" });
        }

        try {
            const data = await librosModel.getOne(id);
            if (!data) {
                return res.status(404).json({ error: "Libro no encontrado" });
            }
            res.status(200).json(data);
        } catch (err) {
            res.status(500).json({ error: "Error al obtener el libro" });
        }
    }

    async create(req, res) {
        const { titulo, autor, ano_publicacion, estado } = req.body;

        if (!titulo || !autor || !ano_publicacion || !estado) {
            return res
                .status(400)
                .json({ error: "Todos los campos son obligatorios" });
        }

        if (
            typeof titulo !== "string" ||
            typeof autor !== "string" ||
            typeof estado !== "string"
        ) {
            return res
                .status(400)
                .json({
                    error: "Título, autor y estado deben ser cadenas de texto"
                });
        }

        if (
            !Number.isInteger(ano_publicacion) ||
            ano_publicacion < 1000 ||
            ano_publicacion > new Date().getFullYear()
        ) {
            return res
                .status(400)
                .json({ error: "Año de publicación no válido" });
        }

        if (!["disponible", "reservado"].includes(estado)) {
            return res.status(400).json({ error: "Estado no válido" });
        }

        try {
            const data = await librosModel.create(req.body);
            res.status(201).json(data);
        } catch (err) {
            console.error("Error al crear libro:", err);
            res.status(500).json({ error: "Error al crear el libro" });
        }
    }

    async update(req, res) {
        const { id } = req.params;
        const { titulo, autor, ano_publicacion, estado } = req.body;

        if (!this.validateMongoId(id)) {
            return res.status(400).json({ error: "ID no válido" });
        }

        if (!titulo || !autor || !ano_publicacion || !estado) {
            return res
                .status(400)
                .json({ error: "Todos los campos son obligatorios" });
        }

        if (
            typeof titulo !== "string" ||
            typeof autor !== "string" ||
            typeof estado !== "string"
        ) {
            return res
                .status(400)
                .json({
                    error: "Título, autor y estado deben ser cadenas de texto"
                });
        }

        if (
            !Number.isInteger(ano_publicacion) ||
            ano_publicacion < 1000 ||
            ano_publicacion > new Date().getFullYear()
        ) {
            return res
                .status(400)
                .json({ error: "Año de publicación no válido" });
        }

        if (!["disponible", "reservado"].includes(estado)) {
            return res.status(400).json({ error: "Estado no válido" });
        }

        try {
            const data = await librosModel.update(id, req.body);
            if (!data) {
                return res.status(404).json({ error: "Libro no encontrado" });
            }
            res.status(200).json(data);
        } catch (err) {
            console.error("Error al actualizar libro:", err);
            res.status(500).json({ error: "Error al actualizar el libro" });
        }
    }

    async delete(req, res) {
        const { id } = req.params;
        if (!this.validateMongoId(id)) {
            return res.status(400).json({ error: "ID no válido" });
        }
        try {
            const data = await librosModel.delete(id);
            if (!data) {
                return res.status(404).json({ error: "Libro no encontrado" });
            }
            res.status(204).send();
        } catch (err) {
            console.error("Error al eliminar libro:", err);
            res.status(500).json({ error: "Error al eliminar el libro" });
        }
    }
}

export default new librosController();
