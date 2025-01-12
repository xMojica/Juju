import librosModel from "../models/libroModel.js";

class librosController {
    constructor() {}

    async getAll(req, res) {
        try {
            const data = await librosModel.getAll();
            res.status(200).json(data);
        } catch (err) {
            res.status(500).send(err);
        }
    }
    async getOne(req, res) {
        try {
            const { id } = req.params;
            const data = await librosModel.getOne(id);
            res.status(200).json(data);
        } catch (err) {
            res.status(500).send(err);
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
    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const data = await librosModel.delete(id);
            if (!data) {
                return res.status(404).json({ error: "Libro no encontrado" });
            }
            res.status(204).send();
        } catch (err) {
            res.status(500).send(err);
        }
    }
}

export default new librosController();
