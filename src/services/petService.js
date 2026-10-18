import { api } from "./api";

export const petService = {
  cadastrar: async (dados) => {
    const payload = {
      ...dados,
      peso: dados.peso ? parseFloat(dados.peso) : null,
      dataNascimento: dados.dataNascimento || null,
      tutorId: Number(dados.tutorId),
    };
    const response = await api.post("/pets", payload);
    return response.data;
  },

  listarPorTutor: async (tutorId) => {
    const response = await api.get(`/pets?tutorId=${tutorId}`);
    return response.data;
  },
};