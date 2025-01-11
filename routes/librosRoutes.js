import express from "express";
const router = express.Router();
import libroController from "../controllers/librosController.js";
import { verificarToken } from "../helpers/autenticacion.js";

router.get("/", libroController.getAll);
router.get("/:id", libroController.getOne);
router.post("/", verificarToken, libroController.create);
router.put("/:id", verificarToken, libroController.update);
router.delete("/:id", verificarToken, libroController.delete);

export default router;
