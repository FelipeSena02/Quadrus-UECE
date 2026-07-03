import express from "express";

import { verifyFirebaseToken } from "../middlewares/auth.middleware.js";

import {
    listarMembrosProjeto,
    buscarMembroPorId,
    adicionarMembro,
    atualizarPerfilMembro,
    removerMembro
} from "../controllers/membroProjetoController.js";

const router = express.Router();

router.get(
    "/projetos/:idProjeto/membros",
    verifyFirebaseToken,
    listarMembrosProjeto
);

router.get(
    "/projetos/:idProjeto/membros/:idUsuario",
    verifyFirebaseToken,
    buscarMembroPorId
);

router.post(
    "/projetos/:idProjeto/membros",
    verifyFirebaseToken,
    adicionarMembro
);

router.patch(
    "/membros/:idMembro",
    verifyFirebaseToken,
    atualizarPerfilMembro
);

router.delete(
    "/membros/:idMembro",
    verifyFirebaseToken,
    removerMembro
);

export default router;
