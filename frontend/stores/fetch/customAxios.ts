import Axios, { AxiosError, AxiosRequestConfig } from 'axios';

export const axiosInstance = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // NEXT_API_URL 로 세팅시 발동이 안됨
  timeout: 15 * 1000,
});
type CustomAxiosProps = AxiosRequestConfig & {
  Authentication?: string;
};

export const customAxios = <T>(config: CustomAxiosProps): Promise<T> => {
  const headers = config?.Authentication
    ? {
        ...config?.headers,
      }
    : config?.headers;

  return axiosInstance({
    ...config,
    headers,
    withCredentials: true,
  }).then((response) => response.data as T);
};

export class DeveloggerError<T> extends AxiosError<T> {}

export interface ErrorType<Error> extends DeveloggerError<Error> {}
