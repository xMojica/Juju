import usuariosModel from "../models/usuariosModel.js";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { generarToken } from "../helpers/autenticacion.js";

class usuariosController {
    constructor() {}

    async register(req, res) {
        try {
            const { email, nombre, telefono, clave } = req.body;

            const usuarioExistente = await usuariosModel.getOne({ email });
            if (usuarioExistente) {
                return res.status(400).json({ error: "El usuario ya existe" });
            }

            const claveEncriptada = await bcrypt.hash(clave, 10);

            const data = await usuariosModel.create(
                email,
                nombre,
                telefono,
                claveEncriptada
            );
            res.status(200).json(data);
        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    }

    async login(req, res) {
        const { email, clave } = req.body;
        const usuarioExistente = await usuariosModel.getOne({ email });
        if (!usuarioExistente) {
            return res.status(400).json({ error: "El usuario no existe" });
        }
        const claveValida = await bcrypt.compare(clave, usuarioExistente.clave);
        if (!claveValida) {
            return res.status(400).json({ error: "Clave incorrecta" });
        }
        const token = generarToken(email);
        res.status(200).json({ mensaje: "Usuario autenticado", token });
    }
}

export default new usuariosController();
