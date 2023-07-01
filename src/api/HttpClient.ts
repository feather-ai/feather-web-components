import axios, { AxiosInstance, AxiosResponse } from "axios";
import camelcaseKeys from "camelcase-keys";

declare module "axios" {
  interface AxiosResponse<T = any> extends Promise<T> {}
}

export abstract class HttpClient {
  protected readonly instance: AxiosInstance;

  public constructor(baseURL: string, headers: Record<string, unknown>) {
    this.instance = axios.create({
      baseURL,
      headers,
    });

    // Create Axios interceptor for responses
    this.instance.interceptors.response.use(
      this._handleResponse,
      this._handleError
    );
  }

  private _handleResponse = ({ data }: AxiosResponse) =>
    camelcaseKeys(data, { deep: true });

  private _handleError = (error: any) => Promise.reject(error);
}
