import React from "react";
import { LogOut, Calendar, PlusCircle, Dog } from "lucide-react";
import { Button } from "../components/Button";

export function Dashboard({ user, onLogout }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
              <Dog size={20} />
            </div>
            <span className="font-bold text-lg text-slate-800 tracking-tight">PetSchedule</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-slate-800">{user?.nomeCompleto || "Tutor"}</p>
              <p className="text-xs text-slate-500">{user?.email}</p>
            </div>
            <button
              onClick={onLogout}
              className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Sair da Conta">
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 sm:p-8 text-white shadow-lg mb-8 flex flex-row items-center justify-between gap-4">
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold">
                Olá, {user?.nomeCompleto?.split(" ")[0] || "Tutor"}!
                </h1>
                <p className="text-blue-100 text-sm mt-1">
                Gerencie seus animais de estimação e agende novos atendimentos.
                </p>
            </div>
            <Button variant="secondary" className="!w-auto shrink-0 px-3.5 py-2 text-xs sm:text-sm bg-white text-blue-700 hover:bg-blue-50 shadow-sm">
                <PlusCircle size={16} /> Cadastrar Novo Pet
            </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                <Dog className="text-blue-600" size={20} /> Meus Pets
              </h2>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
                0 cadastrados
              </span>
            </div>
            <div className="text-center py-8 text-slate-500 text-sm border-2 border-dashed border-slate-100 rounded-lg">
              Nenhum pet cadastrado ainda.
            </div>
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