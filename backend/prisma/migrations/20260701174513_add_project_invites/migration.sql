-- AlterTable
ALTER TABLE "notificacoes" ADD COLUMN     "convite_perfil" "Perfil",
ADD COLUMN     "id_projeto_origem" UUID,
ALTER COLUMN "id_card_origem" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "notificacoes" ADD CONSTRAINT "notificacoes_id_projeto_origem_fkey" FOREIGN KEY ("id_projeto_origem") REFERENCES "projetos"("id_projeto") ON DELETE CASCADE ON UPDATE CASCADE;
