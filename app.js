import express from "express";
import "dotenv/config";
import routerLibro from "./routes/librosRoutes.js";
import routerUsuario from "./routes/usuariosRoutes.js";
import bodyParser from "body-parser";
import dbClient from "./config/dbClient.js";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/libros", routerLibro);
app.use("/api/usuarios", routerUsuario);

try {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log("Servidor corriendo en: http://localhost:" + PORT);
    });
} catch (err) {
    console.log(err);
}

process.on("SIGINT", async () => {
    await dbClient.cerrarConexion();
    process.exit(0);
});
