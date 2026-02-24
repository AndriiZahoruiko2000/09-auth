import axios from "axios";

export const globalServerAPI = axios.create({
  baseURL: "https://notehub-api.goit.study",
});
