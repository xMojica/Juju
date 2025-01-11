import Libro from "../schemas/librosSchema.js";
import mongoose from "mongoose";

class libroModel {
    async getAll() {
        return await Libro.find();
    }

    async getOne(id) {
        return await Libro.findById(id);
    }

    async create(libro) {
        return await Libro.create(libro);
    }

    async update(id, libro) {
        return await Libro.findByIdAndUpdate(
            { _id: new mongoose.Types.ObjectId(id) },
            libro,
            { new: true }
        );
    }

    async delete(id) {
        return await Libro.findByIdAndDelete({
            _id: new mongoose.Types.ObjectId(id)
        });
    }
}

export default new libroModel();
