import React, { useState, useEffect } from "react";
import { LogOut, Calendar, PlusCircle, Dog, Tag, Weight, Loader2, AlertCircle } from "lucide-react";
import { Button } from "../components/Button";
import { petService } from "../services/petService";

export function Dashboard({ user, onNavigateToNovoPet, onLogout }) {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function carregarPets() {
      if (!user?.id) return;
      try {
        setLoading(true);
        setError(null);
        const dados = await petService.listarPorTutor(user.id);
        setPets(dados);
      } catch (err) {
        setError("Não foi possível carregar os animais cadastrados.");
      } finally {
        setLoading(false);
      }
    }

    carregarPets();
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
                {user?.nome || "Tutor"}
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
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 sm:p-8 text-white shadow-lg mb-8 flex flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">
              Olá, {user?.nome?.split(" ")[0] || "Tutor"}!
            </h1>
            <p className="text-blue-100 text-sm mt-1">
              Gerencie seus animais de estimação e agende novos atendimentos.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

              {loading ? (
                <div className="py-12 flex flex-col items-center justify-center text-slate-400 gap-2">
                  <Loader2 size={24} className="animate-spin text-blue-600" />
                  <span className="text-xs">Consultando base de dados...</span>
                </div>
              ) : error ? (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
                  <AlertCircle size={16} />
                  <span>{error}</span>
                </div>
              ) : pets.length === 0 ? (
                <div className="text-center py-8 text-slate-500 text-sm border-2 border-dashed border-slate-100 rounded-lg">
                  <p>Nenhum pet cadastrado no banco de dados.</p>
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

            {pets.length > 0 && (
              <div className="mt-4 pt-3 border-t border-slate-100 text-right">
                <button
                  onClick={onNavigateToNovoPet}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
                >
                  + Adicionar outro pet
                </button>
              </div>
            )}
          </div>

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