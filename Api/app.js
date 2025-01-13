import express from "express";
import "dotenv/config";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import routerLibro from "./routes/librosRoutes.js";
import routerUsuario from "./routes/usuariosRoutes.js";
import bodyParser from "body-parser";
import dbClient from "./config/dbClient.js";
import swaggerUI from "swagger-ui-express";
import specs from "./docs/swagger.js";

const app = express();

app.use(helmet());

app.use(morgan("combined"));

app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"]
    })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/libros", routerLibro);
app.use("/api", routerUsuario);
app.use("/docs", swaggerUI.serve, swaggerUI.setup(specs));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en: http://localhost:${PORT}`);
});

process.on("SIGINT", async () => {
    await dbClient.cerrarConexion();
    process.exit(0);
});
