import jsonwebtoken from "jsonwebtoken";
import "dotenv/config.js";

export function generarToken(email) {
    return jsonwebtoken.sign({ email }, process.env.JWT_TOKEN_SECRET, {
        expiresIn: "1h"
    });
}

export function verificarToken(req, res, next) {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
        return res.status(401).json({ error: "Token requerido" });
    }

    try {
        const dataToken = jsonwebtoken.verify(
            token,
            process.env.JWT_TOKEN_SECRET
        );
        console.log(dataToken.email);
        next();
    } catch (error) {
        res.status(400).json({ error: "Token invalido" });
    }
}
