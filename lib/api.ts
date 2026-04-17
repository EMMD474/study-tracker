import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const authApi = {
  register: (data: { name: string; email: string; password: string }) =>
    api.post("/auth/register", data).then((res) => res.data),
}

export const courseApi = {
  list: () => api.get("/course").then((res) => res.data),
  create: (data: { name: string; priority: string; allocatedTime: number }) =>
    api.post("/course", data).then((res) => res.data),
  update: (id: string, data: any) =>
    api.patch(`/course/${id}`, data).then((res) => res.data),
  delete: (id: string) => api.delete(`/course/${id}`).then((res) => res.data),
};

export default api;
