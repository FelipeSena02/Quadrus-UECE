import express from "express";

import { verifyFirebaseToken } from "../middlewares/auth.middleware.js";

import {

    listarVotosCard,
    buscarVoto,
    criarVoto,
    atualizarVoto,
    deletarVoto,
    reiniciarVotacao

} from "../controllers/votoPokerController.js";

const router = express.Router();

/**
 * Listar votos de um card
 */
router.get(
    "/cards/:idCard/votos",
    verifyFirebaseToken,
    listarVotosCard
);

/**
 * Buscar voto de um usuário
 */
router.get(
    "/cards/:idCard/votos/:idUsuario",
    verifyFirebaseToken,
    buscarVoto
);

/**
 * Registrar voto
 */
router.post(
    "/cards/:idCard/votos",
    verifyFirebaseToken,
    criarVoto
);

/**
 * Atualizar voto
 */
router.patch(
    "/votos/:id",
    verifyFirebaseToken,
    atualizarVoto
);

/**
 * Remover voto
 */
router.delete(
    "/votos/:id",
    verifyFirebaseToken,
    deletarVoto
);

/**
 * Reiniciar votação
 */
router.delete(
    "/cards/:idCard/votos",
    verifyFirebaseToken,
    reiniciarVotacao
);

export default router;
