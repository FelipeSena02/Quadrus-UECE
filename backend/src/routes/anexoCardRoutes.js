import express from "express";

import { verifyFirebaseToken } from "../middlewares/auth.middleware.js";

import {

    listarAnexosCard,
    buscarAnexoPorId,
    criarAnexo,
    atualizarAnexo,
    deletarAnexo

} from "../controllers/anexoCardController.js";

const router = express.Router();

router.get(
    "/cards/:idCard/anexos",
    verifyFirebaseToken,
    listarAnexosCard
);

router.get(
    "/anexos/:id",
    verifyFirebaseToken,
    buscarAnexoPorId
);

router.post(
    "/cards/:idCard/anexos",
    verifyFirebaseToken,
    criarAnexo
);

router.patch(
    "/anexos/:id",
    verifyFirebaseToken,
    atualizarAnexo
);

router.delete(
    "/anexos/:id",
    verifyFirebaseToken,
    deletarAnexo
);

export default router;
