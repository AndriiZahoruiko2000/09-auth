import { AxiosError } from "axios";

export const logErrorResponse = (error: AxiosError) => {
  const status = error.response?.status;
  const url = error.config?.url;
  const method = error.config?.method;
  const data = error.response?.data;
};
