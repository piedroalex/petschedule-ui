import { useState } from "react";
import { Mail, Lock, LogIn, AlertCircle, Loader2 } from "lucide-react";
import { tutorService } from "../services/tutorService";

export function Login({ onLoginSuccess, onNavigateToRegister }) {
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name] || errors.general) {
      setErrors((prev) => ({ ...prev, [name]: undefined, general: undefined }));
    }
  }

  function validate() {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "O e-mail é obrigatório.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Formato de e-mail inválido.";
    }

    if (!formData.senha) {
      newErrors.senha = "A senha é obrigatória.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      const tutorAutenticado = await tutorService.login(formData);

      localStorage.setItem("@petschedule:session", JSON.stringify(tutorAutenticado));

      if (onLoginSuccess) {
        onLoginSuccess(tutorAutenticado);
      }
    } catch (err) {
      if (err.response) {
        const apiError = err.response.data;
        setErrors({
          general: apiError?.message || "E-mail ou senha inválidos. Tente novamente.",
        });
      } else {
        setErrors({
          general: "Não foi possível conectar ao servidor. Verifique se o back-end está em execução.",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
        
        <div className="bg-blue-600 p-8 text-white text-center">
          <span className="inline-block bg-blue-500/60 text-blue-50 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
            PetSchedule
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Acessar Conta
          </h1>
          <p className="text-blue-100 text-sm mt-1">
            Entre com suas credenciais para gerenciar seus agendamentos.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5" noValidate>
          
          {errors.general && (
            <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl">
              <AlertCircle size={18} className="shrink-0 mt-0.5 text-red-600" />
              <span>{errors.general}</span>
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-xs font-semibold uppercase text-slate-600 mb-1.5"
            >
              E-mail
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                <Mail size={18} />
              </span>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="seu.email@exemplo.com"
                value={formData.email}
                onChange={handleChange}
                disabled={isSubmitting}
                className={`w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                  errors.email
                    ? "border-red-400 focus:ring-red-200 bg-red-50/30"
                    : "border-slate-200 focus:border-blue-500 focus:ring-blue-100 focus:bg-white"
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-600 mt-1.5 font-medium">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="senha"
              className="block text-xs font-semibold uppercase text-slate-600 mb-1.5"
            >
              Senha
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                <Lock size={18} />
              </span>
              <input
                id="senha"
                name="senha"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                value={formData.senha}
                onChange={handleChange}
                disabled={isSubmitting}
                className={`w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                  errors.senha
                    ? "border-red-400 focus:ring-red-200 bg-red-50/30"
                    : "border-slate-200 focus:border-blue-500 focus:ring-blue-100 focus:bg-white"
                }`}
              />
            </div>
            {errors.senha && (
              <p className="text-xs text-red-600 mt-1.5 font-medium">
                {errors.senha}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-xl transition-all shadow-md shadow-blue-500/20 disabled:opacity-70 disabled:cursor-not-allowed mt-2 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Entrando...</span>
              </>
            ) : (
              <>
                <LogIn size={18} />
                <span>Entrar no Sistema</span>
              </>
            )}
          </button>

          <div className="mt-6 pt-6 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-600">
              Ainda não possui uma conta?{" "}
              <button
                type="button"
                onClick={onNavigateToRegister}
                disabled={isSubmitting}
                className="font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors focus:outline-none cursor-pointer"
              >
                Criar conta de tutor
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;