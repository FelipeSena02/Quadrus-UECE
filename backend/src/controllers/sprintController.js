import prisma from "../lib/prisma.js";

/* =========================
   CRIAR SPRINT EM UM PROJETO
========================= */
export const criarSprint = async (req, res) => {
  const { id } = req.params; // id do projeto
  const { nome, data_inicio, data_fim } = req.body;

  try {
    if (!nome) {
      return res.status(400).json({
        error: "Nome da sprint é obrigatório",
      });
    }

    const projeto = await prisma.projeto.findUnique({
      where: {
        id_projeto: id,
      },
    });

    if (!projeto) {
      return res.status(404).json({
        error: "Projeto não encontrado",
      });
    }

    const sprint = await prisma.sprint.create({
      data: {
        id_projeto: id,
        nome,
        data_inicio: data_inicio || null,
        data_fim: data_fim || null,
      },
    });

    return res.status(201).json(sprint);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Erro ao criar sprint",
    });
  }
};

/* =========================
   LISTAR SPRINTS DE UM PROJETO
========================= */
export const listarSprints = async (req, res) => {
  const { id } = req.params;

  try {
    const projeto = await prisma.projeto.findUnique({
      where: {
        id_projeto: id,
      },
    });

    if (!projeto) {
      return res.status(404).json({
        error: "Projeto não encontrado",
      });
    }

    const sprints = await prisma.sprint.findMany({
      where: {
        id_projeto: id,
      },
      include: {
        cards: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return res.json(sprints);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Erro ao listar sprints",
    });
  }
};

/* =========================
   BUSCAR SPRINT
========================= */
export const buscarSprint = async (req, res) => {
  const { id } = req.params;

  try {
    const sprint = await prisma.sprint.findUnique({
      where: {
        id_sprint: id,
      },
      include: {
        projeto: true,
        cards: {
          include: {
            responsavel: true,
          },
        },
      },
    });

    if (!sprint) {
      return res.status(404).json({
        error: "Sprint não encontrada",
      });
    }

    return res.json(sprint);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Erro ao buscar sprint",
    });
  }
};

/* =========================
   ATUALIZAR SPRINT
========================= */
export const atualizarSprint = async (req, res) => {
  const { id } = req.params;
  const { nome, data_inicio, data_fim, status } = req.body;

  try {
    const sprint = await prisma.sprint.findUnique({
      where: {
        id_sprint: id,
      },
    });

    if (!sprint) {
      return res.status(404).json({
        error: "Sprint não encontrada",
      });
    }

    const sprintAtualizada = await prisma.sprint.update({
      where: {
        id_sprint: id,
      },
      data: {
        nome,
        data_inicio,
        data_fim,
        status,
      },
    });

    return res.json(sprintAtualizada);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Erro ao atualizar sprint",
    });
  }
};

/* =========================
   EXCLUIR SPRINT
========================= */
export const excluirSprint = async (req, res) => {
  const { id } = req.params;

  try {
    const sprint = await prisma.sprint.findUnique({
      where: {
        id_sprint: id,
      },
    });

    if (!sprint) {
      return res.status(404).json({
        error: "Sprint não encontrada",
      });
    }

    await prisma.sprint.delete({
      where: {
        id_sprint: id,
      },
    });

    return res.json({
      message: "Sprint excluída com sucesso",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Erro ao excluir sprint",
    });
  }
};

/* =========================
   INICIAR SPRINT
========================= */
export const iniciarSprint = async (req, res) => {
  const { id } = req.params;

  try {
    const sprint = await prisma.sprint.findUnique({
      where: {
        id_sprint: id,
      },
    });

    if (!sprint) {
      return res.status(404).json({
        error: "Sprint não encontrada",
      });
    }

    const sprintAtualizada = await prisma.sprint.update({
      where: {
        id_sprint: id,
      },
      data: {
        status: "ATIVA",
        data_inicio: new Date(),
      },
    });

    return res.json(sprintAtualizada);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Erro ao iniciar sprint",
    });
  }
};

/* =========================
   FINALIZAR SPRINT
========================= */
export const finalizarSprint = async (req, res) => {
  const { id } = req.params;

  try {
    const sprint = await prisma.sprint.findUnique({
      where: {
        id_sprint: id,
      },
    });

    if (!sprint) {
      return res.status(404).json({
        error: "Sprint não encontrada",
      });
    }

    const sprintAtualizada = await prisma.sprint.update({
      where: {
        id_sprint: id,
      },
      data: {
        status: "CONCLUIDA",
        data_fim: new Date(),
      },
    });

    return res.json(sprintAtualizada);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Erro ao finalizar sprint",
    });
  }
};