import Axios, { AxiosError, AxiosRequestConfig } from "axios";

console.log("process.env.NEXT_API_URL ", process.env.NEXT_API_URL);
export const axiosInstance = Axios.create({
  baseURL: process.env.NEXT_API_URL,
  timeout: 15 * 1000,
});
type CustomAxiosProps = AxiosRequestConfig & {
  Authentication?: string;
};

export const customAxios = <T>(config: CustomAxiosProps): Promise<T> => {
  const headers = config?.Authentication
    ? {
        ...config?.headers,
        Cookie: `Authentication=${config?.Authentication}`,
      }
    : config?.headers;

  return axiosInstance({
    url: "http://localhost:3001",
    ...config,
    headers,
    withCredentials: true,
  }).then((response) => response.data as T);
};

export class DeveloggerError<T> extends AxiosError<T> {}

export interface ErrorType<Error> extends DeveloggerError<Error> {}
