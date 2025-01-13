import swaggerJsdoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Libros",
            version: "1.0.0",
            description:
                "Una API para gestionar libros y usuarios, con autenticación mediante JWT."
        },
        servers: [
            {
                url: "http://localhost:3001",
                description: "Servidor de desarrollo"
            },
            {
                url: "https://juju-2ygz.onrender.com",
                description: "Servidor de producción"
            }
        ]
    },
    apis: ["./docs/swagger.yml"]
};

const specs = swaggerJsdoc(options);
export default specs;
