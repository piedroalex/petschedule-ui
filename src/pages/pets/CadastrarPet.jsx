import { useState } from "react";
import { Dog, Calendar, Weight, Tag, AlertCircle, CheckCircle2 } from "lucide-react";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Select } from "../../components/Select";

export function CadastrarPet({ tutorId, onPetCadastrado, onVoltar }) {
  const [formData, setFormData] = useState({
    nome: "",
    especie: "",
    raca: "",
    dataNascimento: "",
    peso: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const opcoesEspecie = [
    { value: "CACHORRO", label: "Cachorro" },
    { value: "GATO", label: "Gato" },
  ];

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function validate() {
    const newErrors = {};

    if (!formData.nome.trim()) {
      newErrors.nome = "O nome do pet é obrigatório.";
    }

    if (!formData.especie) {
      newErrors.especie = "A espécie é obrigatória.";
    }

    if (formData.peso && (isNaN(Number(formData.peso)) || Number(formData.peso) <= 0)) {
      newErrors.peso = "Informe um peso válido e positivo.";
    }

    if (formData.dataNascimento) {
      const hoje = new Date().toISOString().split("T")[0];
      if (formData.dataNascimento > hoje) {
        newErrors.dataNascimento = "A data de nascimento não pode estar no futuro.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);
    setSuccess(false);

    try {
      // Simulação do Encontro 2 utilizando localStorage
      const petsSalvos = JSON.parse(localStorage.getItem("@petschedule:pets") || "[]");

      const novoPet = {
        id: Date.now(),
        ...formData,
        peso: formData.peso ? parseFloat(formData.peso) : null,
        tutorId: tutorId || 1, // Associa ao tutor autenticado
        criadoEm: new Date().toISOString(),
      };

      petsSalvos.push(novoPet);
      localStorage.setItem("@petschedule:pets", JSON.stringify(petsSalvos));

      setSuccess(true);
      setFormData({
        nome: "",
        especie: "",
        raca: "",
        dataNascimento: "",
        peso: "",
      });

      if (onPetCadastrado) {
        onPetCadastrado(novoPet);
      }
    } catch (err) {
      setErrors({ general: "Falha ao gravar os dados no armazenamento local." });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
        
        <div className="bg-blue-600 p-6 text-white text-center">
          <h1 className="text-2xl font-bold tracking-tight">Cadastrar Novo Pet</h1>
          <p className="text-blue-100 text-sm mt-1">
            Cadastre os dados clínicos e biológicos do animal.
          </p>
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
              <span>Pet registado com sucesso!</span>
            </div>
          )}

          <Input
            label="Nome do Pet *"
            name="nome"
            placeholder="Ex: Thor, Mel, Luna"
            value={formData.nome}
            onChange={handleChange}
            error={errors.nome}
            icon={Dog}
            disabled={isSubmitting}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Espécie *"
              name="especie"
              value={formData.especie}
              onChange={handleChange}
              error={errors.especie}
              options={opcoesEspecie}
              disabled={isSubmitting}
            />

            <Input
              label="Raça"
              name="raca"
              placeholder="Ex: Poodle, SRD"
              value={formData.raca}
              onChange={handleChange}
              error={errors.raca}
              icon={Tag}
              disabled={isSubmitting}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Data de Nascimento"
              name="dataNascimento"
              type="date"
              value={formData.dataNascimento}
              onChange={handleChange}
              error={errors.dataNascimento}
              icon={Calendar}
              disabled={isSubmitting}
            />

            <Input
              label="Peso (kg)"
              name="peso"
              type="number"
              step="0.01"
              placeholder="Ex: 12.5"
              value={formData.peso}
              onChange={handleChange}
              error={errors.peso}
              icon={Weight}
              disabled={isSubmitting}
            />
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            {onVoltar && (
              <Button
                type="button"
                variant="secondary"
                onClick={onVoltar}
                disabled={isSubmitting}
                className="w-full sm:w-1/3"
              >
                Voltar
              </Button>
            )}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:flex-1"
            >
              {isSubmitting ? "A guardar..." : "Salvar Pet"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CadastrarPet;