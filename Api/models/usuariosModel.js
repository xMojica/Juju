import Usuario from "../schemas/usuariosSchema.js";
import mongoose from "mongoose";

class usuarioModel {
    async getAll() {
        return await Usuario.find();
    }

    async getOne(filtro) {
        return await Usuario.findOne(filtro);
    }

    async getOneById(id) {
        return await Usuario.findById(id);
    }

    async create(email, nombre, telefono, claveEncriptada) {
        const nuevoUsuario = new Usuario({
            email,
            nombre,
            telefono,
            clave: claveEncriptada
        });
        return await nuevoUsuario.save();
    }

    async update(id, usuario) {
        try {
            return await Usuario.findByIdAndUpdate(
                { _id: new mongoose.Types.ObjectId(id) },
                usuario,
                { new: true, runValidators: true }
            );
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async delete(id) {
        try {
            return await Usuario.findByIdAndDelete({
                _id: new mongoose.Types.ObjectId(id)
            });
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export default new usuarioModel();
