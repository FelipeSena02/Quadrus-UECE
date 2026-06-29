import express from "express";
import { verifyFirebaseToken } from "../middlewares/auth.middleware.js";
import {
  criarSprint,
  listarSprints,
  buscarSprint,
  atualizarSprint,
  excluirSprint,
  iniciarSprint,
  finalizarSprint,
  migrarCards,
} from "../controllers/sprintController.js";

const router = express.Router();

// Criar sprint dentro de um projeto
router.post("/projetos/:id/sprints", verifyFirebaseToken, criarSprint);

// Listar todas as sprints de um projeto
router.get("/projetos/:id/sprints", verifyFirebaseToken, listarSprints);

// Buscar uma sprint pelo ID
router.get("/sprints/:id", verifyFirebaseToken, buscarSprint);

// Atualizar uma sprint
router.put("/sprints/:id", verifyFirebaseToken, atualizarSprint);

// Excluir uma sprint
router.delete("/sprints/:id", verifyFirebaseToken, excluirSprint);

// Iniciar sprint
router.patch("/sprints/:id/iniciar", verifyFirebaseToken, iniciarSprint);

// Finalizar sprint
router.patch("/sprints/:id/finalizar", verifyFirebaseToken, finalizarSprint);

// Migrar cards para uma sprint
router.post("/sprints/:id/migrar-cards", verifyFirebaseToken, migrarCards);

export default router;