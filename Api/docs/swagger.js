import swaggerJsdoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API de Libros",
            version: "1.0.0",
            description: "Una API para gestion de libros y usuarios con JWT",
            contact: {
                name: "Santiago Mojica"
            },
            servers: [
                {
                    url: "http://localhost:3001",
                    description: "Servidor de desarrollo"
                }
            ]
        }
    },
    apis: ["./swagger/*.yml"]
};

const specs = swaggerJsdoc(options);
export default specs;
