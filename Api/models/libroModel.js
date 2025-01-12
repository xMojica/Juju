import Libro from "../schemas/librosSchema.js";
import mongoose from "mongoose";

class libroModel {
    async getAll() {
        return await Libro.find();
    }

    async getOne(id) {
        try {
            return await Libro.findById(id);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async create(libro) {
        try {
            return await Libro.create(libro);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async update(id, libro) {
        try {
            return await Libro.findByIdAndUpdate(
                { _id: new mongoose.Types.ObjectId(id) },
                libro,
                { new: true, runValidators: true }
            );
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async delete(id) {
        try {
            return await Libro.findByIdAndDelete({
                _id: new mongoose.Types.ObjectId(id)
            });
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export default new libroModel();
