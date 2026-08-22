import React, { useState } from "react";
import { User, Mail, Lock, Phone, CreditCard, CheckCircle2, AlertCircle } from "lucide-react";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { maskCPF, maskTelefone } from "../../utils/masks";

export function CadastrarTutor() {
  
  const [formData, setFormData] = useState({
    nomeCompleto: "",
    email: "",
    cpf: "",
    telefone: "",
    senha: "",
    confirmarSenha: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  function handleChange(e) {
    const { id, value } = e.target;
    let formattedValue = value;

    if (id === "cpf") 
      formattedValue = maskCPF(value);
    if (id === "telefone") 
      formattedValue = maskTelefone(value);

    setFormData((prev) => ({ ...prev, [id]: formattedValue }));

    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: null }));
    }
  }

  function validate() {
    const errors = {};

    if (!formData.nomeCompleto.trim()) {
      errors.nomeCompleto = "O nome completo é obrigatório.";
    }

    if (!formData.email.trim()) {
      errors.email = "O e-mail é obrigatório.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Insira um formato de e-mail válido.";
    }

    if (!formData.cpf.trim() || formData.cpf.length < 14) {
      errors.cpf = "CPF inválido (deve conter 11 dígitos).";
    }

    if (!formData.telefone.trim() || formData.telefone.length < 14) {
      errors.telefone = "Telefone inválido com DDD.";
    }

    if (!formData.senha) {
      errors.senha = "A senha é obrigatória.";
    } else if (formData.senha.length < 6) {
      errors.senha = "A senha deve ter no mínimo 6 caracteres.";
    }

    if (formData.senha !== formData.confirmarSenha) {
      errors.confirmarSenha = "As senhas não coincidem.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!validate()) 
      return;

    setIsSubmitting(true);

    setTimeout(() => {
      const tutoresCadastrados = JSON.parse(localStorage.getItem("@petschedule:tutors") || "[]");

      const emailExists = tutoresCadastrados.some((t) => t.email === formData.email);
      const cpfExists = tutoresCadastrados.some((t) => t.cpf === formData.cpf);

      if (emailExists || cpfExists) {
        setErrors({
          general: emailExists
            ? "Este e-mail já está cadastrado."
            : "Este CPF já está cadastrado.",
        });
        setIsSubmitting(false);
        return;
      }

      const novoTutor = {
        id: crypto.randomUUID(),
        nomeCompleto: formData.nomeCompleto,
        email: formData.email,
        cpf: formData.cpf,
        telefone: formData.telefone,
        createdAt: new Date().toISOString(),
      };

      localStorage.setItem(
        "@petschedule:tutors",
        JSON.stringify([...tutoresCadastrados, novoTutor])
      );

      setIsSubmitting(false);
      setSuccessMessage(true);

      setFormData({
        nomeCompleto: "",
        email: "",
        cpf: "",
        telefone: "",
        senha: "",
        confirmarSenha: "",
      });
    }, 800);
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
               
        <div className="bg-blue-600 p-6 sm:p-8 text-white text-center">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Cadastro do Tutor</h1>
        </div>

        <div className="p-6 sm:p-8">
          {successMessage ? (
            <div className="text-center py-6">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-green-100 rounded-full text-green-600 mb-4">
                <CheckCircle2 size={32} />
              </div>
              <h2 className="text-xl font-bold text-slate-800 mb-2">
                Conta criada com sucesso!
              </h2>
              <p className="text-sm text-slate-600 mb-6">
                Seu cadastro foi realizado. Você já pode acessar a plataforma.
              </p>
              <Button onClick={() => setSuccessMessage(false)}>
                Realizar Login
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {errors.general && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-sm text-red-700">
                  <AlertCircle size={18} />
                  <span>{errors.general}</span>
                </div>
              )}

              <Input
                id="nomeCompleto"
                label="Nome Completo"
                placeholder="Ex: Pedro Alex"
                icon={User}
                value={formData.nomeCompleto}
                onChange={handleChange}
                error={errors.nomeCompleto}
              />

              <Input
                id="email"
                type="email"
                label="E-mail de Acesso"
                placeholder="seu.email@exemplo.com"
                icon={Mail}
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  id="cpf"
                  label="CPF"
                  placeholder="000.000.000-00"
                  icon={CreditCard}
                  value={formData.cpf}
                  onChange={handleChange}
                  error={errors.cpf}
                />

                <Input
                  id="telefone"
                  label="Celular"
                  placeholder="(00) 00000-0000"
                  icon={Phone}
                  value={formData.telefone}
                  onChange={handleChange}
                  error={errors.telefone}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  id="senha"
                  type="password"
                  label="Senha"
                  placeholder="Mínimo 6 caracteres"
                  icon={Lock}
                  value={formData.senha}
                  onChange={handleChange}
                  error={errors.senha}
                />

                <Input
                  id="confirmarSenha"
                  type="password"
                  label="Confirmar Senha"
                  placeholder="Repita a senha"
                  icon={Lock}
                  value={formData.confirmarSenha}
                  onChange={handleChange}
                  error={errors.confirmarSenha}
                />
              </div>

              <div className="pt-2">
                <Button type="submit" isLoading={isSubmitting}>
                  Finalizar Cadastro
                </Button>
              </div>

              <p className="text-xs text-center text-slate-500 mt-2">
                Ao se cadastrar, você concorda com os termos de agendamento da clínica.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default CadastrarTutor;