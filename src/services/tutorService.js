import { api } from "./api";

export const tutorService = {
  cadastrar: async (dados) => {
    const payload = {
      ...dados,
      cpf: dados.cpf.replace(/\D/g, ""),
      telefone: dados.telefone.replace(/\D/g, ""),
    };
    const response = await api.post("/tutores", payload);
    return response.data;
  },

  login: async (credenciais) => {
    const response = await api.post("/tutores/login", credenciais);
    return response.data;
  },

  buscarPorId: async (id) => {
    const response = await api.get(`/tutores/${id}`);
    return response.data;
  },
};