// src/pages/Login.jsx
import React, { useState } from "react";
import { Mail, Lock, AlertCircle, LogIn, ArrowRight } from "lucide-react";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

export function Login({ onNavigateToRegister, onLoginSuccess }) {
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(e) {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    if (errors[id] || errors.general) {
      setErrors((prev) => ({ ...prev, [id]: null, general: null }));
    }
  }

  function validate() {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Informe o seu e-mail.";
    }

    if (!formData.senha) {
      newErrors.senha = "Informe a sua senha.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const tutoresCadastrados = JSON.parse(
        localStorage.getItem("@petschedule:tutors") || "[]"
      );

      const usuario = tutoresCadastrados.find(
        (user) =>
          user.email.toLowerCase() === formData.email.trim().toLowerCase() &&
          user.senha === formData.senha
      );

      if (!usuario) {
        setErrors({
          general: "E-mail ou senha inválidos.",
        });
        setIsSubmitting(false);
        return;
      }

      const sessionData = {
        id: usuario.id,
        nomeCompleto: usuario.nomeCompleto,
        email: usuario.email,
        loggedAt: new Date().toISOString(),
      };

      localStorage.setItem("@petschedule:session", JSON.stringify(sessionData));

      setIsSubmitting(false);

      if (onLoginSuccess) {
        onLoginSuccess(sessionData);
      }
    }, 800);
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        
        <div className="bg-blue-600 p-6 sm:p-8 text-white text-center">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Seja bem-vindo(a)</h1>
        </div>

        <div className="p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {errors.general && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-sm text-red-700">
                <AlertCircle size={18} className="shrink-0" />
                <span>{errors.general}</span>
              </div>
            )}

            <Input
              id="email"
              type="email"
              label="E-mail"
              placeholder="seu.email@exemplo.com"
              icon={Mail}
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />

            <Input
              id="senha"
              type="password"
              label="Senha"
              placeholder="Digite sua senha"
              icon={Lock}
              value={formData.senha}
              onChange={handleChange}
              error={errors.senha}
            />

            <div className="pt-2">
              <Button type="submit" isLoading={isSubmitting}>
                Entrar
              </Button>
            </div>
          </form>
            <div className="mt-6 pt-6 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-600">
                Ainda não possui uma conta?{" "}
                <button
                type="button"
                onClick={onNavigateToRegister}
                className="font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors focus:outline-none focus:underline"
                >
                Criar conta de tutor
                </button>
            </p>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Login;