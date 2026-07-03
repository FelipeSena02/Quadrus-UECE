import prisma from "../lib/prisma.js";

/**
 * Listar todos os membros de um projeto
 */
export const listarMembrosProjeto = async (req, res) => {
  try {
    const { idProjeto } = req.params;

    const membros = await prisma.membroProjeto.findMany({
      where: {
        id_projeto: idProjeto,
      },
      include: {
        usuario: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return res.status(200).json(membros);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Erro ao listar membros do projeto",
    });
  }
};

/**
 * Buscar um membro específico
 */
export const buscarMembroPorId = async (req, res) => {
  try {
    const { idProjeto, idUsuario } = req.params;

    const membro = await prisma.membroProjeto.findFirst({
      where: {
        id_projeto: idProjeto,
        id_usuario: idUsuario,
      },
      include: {
        usuario: true,
        projeto: true,
      },
    });

    if (!membro) {
      return res.status(404).json({
        error: "Membro não encontrado",
      });
    }

    return res.status(200).json(membro);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Erro ao buscar membro",
    });
  }
};

/**
 * Adicionar membro ao projeto
 */
export const adicionarMembro = async (req, res) => {
  try {
    const { idProjeto } = req.params;
    const { id_usuario, perfil } = req.body;

    if (!id_usuario || !perfil) {
      return res.status(400).json({
        error: "Usuário e perfil são obrigatórios",
      });
    }

    // Verifica se o projeto existe
    const projeto = await prisma.projeto.findUnique({
      where: {
        id_projeto: idProjeto,
      },
    });

    if (!projeto) {
      return res.status(404).json({
        error: "Projeto não encontrado",
      });
    }

    // Verifica se o usuário existe
    const usuario = await prisma.usuario.findUnique({
      where: {
        id_usuario: id_usuario,
      },
    });

    if (!usuario) {
      return res.status(404).json({
        error: "Usuário não encontrado",
      });
    }

    // Verifica se já participa do projeto
    const membroExistente = await prisma.membroProjeto.findFirst({
      where: {
        id_projeto: idProjeto,
        id_usuario: id_usuario,
      },
    });

    if (membroExistente) {
      return res.status(409).json({
        error: "Usuário já faz parte deste projeto",
      });
    }

    const membro = await prisma.membroProjeto.create({
      data: {
        id_projeto: idProjeto,
        id_usuario,
        perfil,
      },
      include: {
        usuario: true,
        projeto: true,
      },
    });

    return res.status(201).json(membro);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Erro ao adicionar membro",
    });
  }
};

/**
 * Atualizar perfil de um membro
 */
export const atualizarPerfilMembro = async (req, res) => {
  try {
    const { idMembro } = req.params;
    const { perfil } = req.body;

    if (!perfil) {
      return res.status(400).json({
        error: "Perfil é obrigatório",
      });
    }

    const membro = await prisma.membroProjeto.findUnique({
      where: {
        id_membro: idMembro,
      },
    });

    if (!membro) {
      return res.status(404).json({
        error: "Membro não encontrado",
      });
    }

    const membroAtualizado = await prisma.membroProjeto.update({
      where: {
        id_membro: idMembro,
      },
      data: {
        perfil,
      },
      include: {
        usuario: true,
        projeto: true,
      },
    });

    return res.status(200).json(membroAtualizado);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Erro ao atualizar perfil",
    });
  }
};

/**
 * Remover membro do projeto
 */
export const removerMembro = async (req, res) => {
  try {
    const { idMembro } = req.params;

    const membro = await prisma.membroProjeto.findUnique({
      where: {
        id_membro: idMembro,
      },
    });

    if (!membro) {
      return res.status(404).json({
        error: "Membro não encontrado",
      });
    }

    await prisma.membroProjeto.delete({
      where: {
        id_membro: idMembro,
      },
    });

    return res.status(200).json({
      mensagem: "Membro removido com sucesso",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Erro ao remover membro",
    });
  }
};
