import librosModel from "../models/libroModel.js";

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
            res.status(500).send(err);
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
        try {
            const data = await librosModel.create(req.body);
            res.status(201).json(data);
        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    }
    async update(req, res) {
        try {
            const { id } = req.params;
            const data = await librosModel.update(id, req.body);
            if (!data) {
                return res.status(404).json({ error: "Libro no encontrado" });
            }
            res.status(200).json(data);
        } catch (err) {
            res.status(500).send(err);
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
