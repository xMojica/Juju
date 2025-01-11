import express from "express";
const router = express.Router();
import usuariosController from "../controllers/usuariosController.js";

router.post("/register", usuariosController.register);
router.post("/login", usuariosController.login);

export default router;
