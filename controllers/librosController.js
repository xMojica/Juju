import librosModel from "../models/libroModel.js";

class libroController {
    constructor() {}

    async getAll(req, res, next) {
        try {
            const data = await librosModel.getAll();
            res.status(200).json(data);
        } catch (err) {
            res.status(500).send(err);
        }
    }
    async getOne(req, res, next) {
        try {
            const { id } = req.params;
            const data = await librosModel.getOne(id);
            res.status(200).json(data);
        } catch (err) {
            res.status(500).send(err);
        }
    }
    async create(req, res, next) {
        try {
            const data = await librosModel.create(req.body);
            res.status(200).json(data);
        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    }
    async update(req, res, next) {
        try {
            const { id } = req.params;
            const data = await librosModel.update(id, req.body);
            res.status(200).json(data);
        } catch (err) {
            res.status(500).send(err);
        }
    }
    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const data = await librosModel.delete(id);
            res.status(206).json(data);
        } catch (err) {
            res.status(500).send(err);
        }
    }
}

export default new libroController();
