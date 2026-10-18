import { useState } from "react";
import { User, Mail, FileText, Phone, Lock, AlertCircle, CheckCircle2 } from "lucide-react";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { tutorService } from "../../services/tutorService";

export function CadastrarTutor({ onNavigateToLogin }) {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    cpf: "",
    telefone: "",
    senha: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name] || errors.general) {
      setErrors((prev) => ({ ...prev, [name]: undefined, general: undefined }));
    }
  }

  function validate() {
    const newErrors = {};

    if (!formData.nome.trim()) newErrors.nome = "Nome completo é obrigatório.";
    if (!formData.email.trim()) {
      newErrors.email = "E-mail é obrigatório.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Formato de e-mail inválido.";
    }
    if (!formData.cpf.trim()) newErrors.cpf = "CPF é obrigatório.";
    if (!formData.telefone.trim()) newErrors.telefone = "Telefone é obrigatório.";
    if (!formData.senha || formData.senha.length < 6) {
      newErrors.senha = "A senha deve ter no mínimo 6 caracteres.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);
    setErrors({});
    setSuccess(false);

    try {
      await tutorService.cadastrar(formData);
      setSuccess(true);
      setFormData({
        nome: "",
        email: "",
        cpf: "",
        telefone: "",
        senha: "",
      });
      setTimeout(() => {
        onNavigateToLogin();
      }, 2000);
    } catch (err) {
      if (err.response) {
        const apiError = err.response.data;
        if (apiError.fields) {
          setErrors(apiError.fields);
        } else {
          setErrors({ general: apiError.message || "Erro ao realizar cadastro do tutor." });
        }
      } else {
        setErrors({ general: "Não foi possível conectar ao servidor. Verifique se o back-end está ativo." });
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
        <div className="bg-blue-600 p-6 text-white text-center">
          <span className="inline-block bg-blue-500/60 text-blue-50 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
            PetSchedule
          </span>
          <h1 className="text-2xl font-bold tracking-tight">Criar Conta de Tutor</h1>
          <p className="text-blue-100 text-sm mt-1">Preencha seus dados para começar a agendar atendimentos.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4" noValidate>
          {errors.general && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl">
              <AlertCircle size={18} className="shrink-0 text-red-600" />
              <span>{errors.general}</span>
            </div>
          )}

          {success && (
            <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm rounded-xl">
              <CheckCircle2 size={18} className="shrink-0 text-emerald-600" />
              <span>Cadastro realizado com sucesso! Redirecionando para o login...</span>
            </div>
          )}

          <Input
            label="Nome Completo *"
            name="nome"
            placeholder="Ex: João da Silva"
            value={formData.nome}
            onChange={handleChange}
            error={errors.nome}
            icon={User}
            disabled={isSubmitting}
          />

          <Input
            label="E-mail *"
            name="email"
            type="email"
            placeholder="joao@exemplo.com"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            icon={Mail}
            disabled={isSubmitting}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="CPF *"
              name="cpf"
              placeholder="000.000.000-00"
              value={formData.cpf}
              onChange={handleChange}
              error={errors.cpf}
              icon={FileText}
              disabled={isSubmitting}
            />

            <Input
              label="Telefone *"
              name="telefone"
              placeholder="(86) 99999-9999"
              value={formData.telefone}
              onChange={handleChange}
              error={errors.telefone}
              icon={Phone}
              disabled={isSubmitting}
            />
          </div>

          <Input
            label="Senha *"
            name="senha"
            type="password"
            placeholder="Mínimo de 6 caracteres"
            value={formData.senha}
            onChange={handleChange}
            error={errors.senha}
            icon={Lock}
            disabled={isSubmitting}
          />

          <div className="pt-2 flex flex-col gap-3">
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Cadastrando..." : "Finalizar Cadastro"}
            </Button>

            <button
              type="button"
              onClick={onNavigateToLogin}
              disabled={isSubmitting}
              className="text-xs font-semibold text-center text-slate-500 hover:text-blue-600 hover:underline mt-2 cursor-pointer"
            >
              Já possui cadastro? Fazer login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CadastrarTutor;