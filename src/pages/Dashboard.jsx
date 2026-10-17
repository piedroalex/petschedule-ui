import React, { useState, useEffect } from "react";
import { LogOut, Calendar, PlusCircle, Dog, Tag, Weight } from "lucide-react";
import { Button } from "../components/Button";

export function Dashboard({ user, onNavigateToNovoPet, onLogout }) {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    // Carrega os pets persistidos no localStorage vinculados ao tutor logado
    const petsSalvos = JSON.parse(localStorage.getItem("@petschedule:pets") || "[]");
    const petsDoTutor = petsSalvos.filter((p) => p.tutorId === user?.id);
    setPets(petsDoTutor);
  }, [user]);

  function formatarData(dataIso) {
    if (!dataIso) return "Não informada";
    const [ano, mes, dia] = dataIso.split("-");
    return `${dia}/${mes}/${ano}`;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
              <Dog size={20} />
            </div>
            <span className="font-bold text-lg text-slate-800 tracking-tight">
              PetSchedule
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-slate-800">
                {user?.nomeCompleto || "Tutor"}
              </p>
              <p className="text-xs text-slate-500">{user?.email}</p>
            </div>
            <button
              onClick={onLogout}
              className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
              title="Sair da Conta"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Banner de Boas-Vindas */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 sm:p-8 text-white shadow-lg mb-8 flex flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">
              Olá, {user?.nomeCompleto?.split(" ")[0] || "Tutor"}!
            </h1>
            <p className="text-blue-100 text-sm mt-1">
              Gerencie seus animais de estimação e agende novos atendimentos.
            </p>
          </div>
          <Button
            type="button"
            variant="secondary"
            onClick={onNavigateToNovoPet}
            className="!w-auto shrink-0 px-3.5 py-2 text-xs sm:text-sm bg-white text-blue-700 hover:bg-blue-50 shadow-sm cursor-pointer"
          >
            <PlusCircle size={16} /> Cadastrar Novo Pet
          </Button>
        </div>

        {/* Grid de Seções */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card: Meus Pets */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                  <Dog className="text-blue-600" size={20} /> Meus Pets
                </h2>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
                  {pets.length} cadastrado{pets.length === 1 ? "" : "s"}
                </span>
              </div>

              {pets.length === 0 ? (
                <div className="text-center py-8 text-slate-500 text-sm border-2 border-dashed border-slate-100 rounded-lg">
                  <p>Nenhum pet cadastrado ainda.</p>
                  <button
                    onClick={onNavigateToNovoPet}
                    className="mt-2 text-xs text-blue-600 font-semibold hover:underline cursor-pointer"
                  >
                    Clique aqui para adicionar seu primeiro pet
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {pets.map((pet) => (
                    <div
                      key={pet.id}
                      className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-slate-50 transition-colors flex items-center justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-800 text-sm">
                            {pet.nome}
                          </span>
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                            {pet.especie}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                          <span className="flex items-center gap-1">
                            <Tag size={12} className="text-slate-400" />
                            {pet.raca || "SRD"}
                          </span>
                          {pet.peso && (
                            <span className="flex items-center gap-1">
                              <Weight size={12} className="text-slate-400" />
                              {pet.peso} kg
                            </span>
                          )}
                          {pet.dataNascimento && (
                            <span className="flex items-center gap-1">
                              <Calendar size={12} className="text-slate-400" />
                              {formatarData(pet.dataNascimento)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Card: Próximos Agendamentos */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                <Calendar className="text-blue-600" size={20} /> Próximos Agendamentos
              </h2>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                Nenhum ativo
              </span>
            </div>
            <div className="text-center py-8 text-slate-500 text-sm border-2 border-dashed border-slate-100 rounded-lg">
              Você não possui consultas ou banhos agendados.
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;