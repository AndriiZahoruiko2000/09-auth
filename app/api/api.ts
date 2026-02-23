import axios from "axios";

export const globalServerAPI = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
});
