import React, { useState } from 'react';
import {
    Users,
    CheckSquare,
    Plus,
    Search,
    ArrowRight,
    Clock,
    Briefcase
} from 'lucide-react';

export default function ProjectList({ projects, onSelectProject }) {
    const [searchTerm, setSearchTerm] = useState('');

    const getDaysRemaining = (dateString) => {
        const deadline = new Date(dateString);
        const today = new Date();
        const diffTime = deadline - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    const filteredProjects = projects.filter(project =>
        project.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.descricao.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="w-full max-w-4xl mx-auto px-4 py-6">

            {/* Barra de Busca */}
            <div className="relative mb-6 text-left">
                <Search className="absolute left-4 top-3.5 text-slate-400" size={18} />
                <input
                    type="text"
                    placeholder="Pesquisar projeto..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all placeholder-slate-400 shadow-sm"
                />
            </div>

            {/* Lista de Projetos */}
            {filteredProjects.length > 0 ? (
                <div className="space-y-4">
                    {filteredProjects.map((project) => {
                        const totalCards = project.cards.length;
                        const completedCards = project.cards.filter(c => c.status === 'CONCLUIDO').length;
                        const progressPercentage = totalCards > 0 ? Math.round((completedCards / totalCards) * 100) : 0;
                        const daysLeft = getDaysRemaining(project.data_prazo);

                        return (
                            <div
                                key={project.id_projeto}
                                className="group relative flex flex-col bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-brand-500/40 transition-all duration-300 cursor-pointer text-left overflow-hidden"
                                onClick={() => onSelectProject(project)}
                            >
                                {/* Linha decorativa na lateral esquerda no hover */}
                                <div className="absolute top-0 bottom-0 left-0 w-[4px] bg-gradient-to-b from-brand-600 to-indigo-500 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 rounded-l-2xl" />

                                {/* Bloco Superior: Ícone, Nome do Projeto (Lilás) e Descrição Completa */}
                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-xl bg-brand-50 text-brand-600 shrink-0">
                                        <Briefcase size={22} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-extrabold text-lg text-brand-600 group-hover:text-brand-700 transition-colors">
                                            {project.nome}
                                        </h3>
                                        <p className="text-sm text-slate-500 mt-2 whitespace-pre-line leading-relaxed">
                                            {project.descricao}
                                        </p>
                                    </div>
                                </div>

                                {/* Bloco Inferior: Alinhado abaixo da descrição com os metadados */}
                                <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">

                                    {/* Informações: Membros, Tarefas e Prazo */}
                                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                                        {/* Badge Membros */}
                                        <span className="flex items-center gap-1 font-medium bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-lg">
                                            <Users size={14} className="text-slate-400" />
                                            {project.membros.length} membros
                                        </span>

                                        {/* Badge Tarefas */}
                                        <span className="flex items-center gap-1 font-medium bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-lg">
                                            <CheckSquare size={14} className="text-slate-400" />
                                            {totalCards} tarefas
                                        </span>

                                        {/* Badge Prazo */}
                                        <span className={`px-2.5 py-1 rounded-lg border text-[11px] font-bold flex items-center gap-1 ${daysLeft < 20
                                            ? 'bg-rose-50 border-rose-100 text-rose-700'
                                            : 'bg-emerald-50 border-emerald-100 text-emerald-700'
                                            }`}>
                                            <Clock size={12} />
                                            {daysLeft > 0 ? `${daysLeft} dias restantes` : 'Atrasado'}
                                        </span>
                                    </div>

                                    {/* Lado Direito: Barra de Progresso e Link de Abertura */}
                                    <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto">

                                        {/* Barra de Progresso */}
                                        <div className="w-full md:w-36">
                                            <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 mb-1">
                                                <span>PROGRESSO</span>
                                                <span>{progressPercentage}%</span>
                                            </div>
                                            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-brand-600 to-indigo-500 rounded-full"
                                                    style={{ width: `${progressPercentage}%` }}
                                                />
                                            </div>
                                        </div>

                                        {/* Ação de Abrir */}
                                        <span className="text-brand-600 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1 text-sm shrink-0">
                                            Abrir <ArrowRight size={16} />
                                        </span>
                                    </div>

                                </div>

                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="text-center py-16 bg-slate-50 border border-dashed border-slate-200 rounded-2xl">
                    <Briefcase className="mx-auto text-slate-400 mb-3" size={40} />
                    <h3 className="font-bold text-lg text-slate-800">Nenhum projeto encontrado</h3>
                </div>
            )}

            {/* Botão Novo Projeto na parte inferior */}
            <div className="mt-12 flex justify-center">
                <button
                    onClick={() => alert("Função de criar projeto será conectada à API nas próximas etapas!")}
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white font-bold text-sm px-6 py-3 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-brand-500/20 active:scale-95 shadow-md shadow-brand-500/10"
                >
                    <Plus size={18} />
                    Novo Projeto
                </button>
            </div>

        </div>
    );
}