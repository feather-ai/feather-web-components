import { HttpClient } from "./HttpClient";
import { SystemSchema } from "utils/typeUtils";
import snakecaseKeys from "snakecase-keys";

type FeatherApiHeaders = {
  "X-FEATHER-TOKEN"?: string;
  "X-FEATHER-API-KEY"?: string;
};

export interface ISystemInfo {
  systemId: string;
  name?: string;
  description?: string;
  numSteps: number;
  schema?: SystemSchema;
}

export interface IStepInfo {
  name: string;
  inputs: any[];
  staticData?: any[]; //exists only on init/first getStepInfo
  outputs: any[];
  isValid: boolean;
  title: string;
  description: string;
}

export interface IPublishStatus {
  currFile: number;
  currFileDone: number;
  currFileSize: number;
  totalFiles: number;
}

export interface IPublishResponse {
  system: string;
  user: string;
}

export class FeatherApi extends HttpClient {
  private static apiInstance?: FeatherApi;
  private isLocal: boolean;

  private constructor(
    baseURL: string,
    headers: FeatherApiHeaders,
    isLocal: boolean
  ) {
    super(baseURL, headers);

    this.isLocal = isLocal;
  }

  // Get instance of FeatherApi (Singleton pattern)
  public static instance({ isLocal = true }): FeatherApi {
    if (!this.apiInstance) {
      const baseURL = isLocal
        ? "http://127.0.0.1:5000"
        : "https://dev.feather-works.net/";
      const headers = isLocal ? {} : {};
      this.apiInstance = new FeatherApi(baseURL, headers, isLocal);
    }

    return this.apiInstance;
  }

  /* Public API calls */

  public getSysInfo = async () =>
    await this.instance.get<ISystemInfo>("/v1/system/info");

  public getPublicSysInfo = async (systemId: string) =>
    await this.instance.get<ISystemInfo>(`/v1/public/system/${systemId}`);

  public getStepInfo = async (systemId: string, step: number) =>
    await this.instance.get<IStepInfo>(
      `/v1/system/${systemId}/step/${step}/info`
    );

  public runStep = async (
    systemId: string,
    step: number,
    stepName: string,
    inputData: any[]
  ) => {
    const body = {
      [stepName]: snakecaseKeys(inputData),
    };

    console.log("runStep body:", body);

    const path = this.isLocal
      ? `/v1/system/${systemId}/step/${step}`
      : `/v1/public/system/${systemId}/step/${step}`;

    return await this.instance.put(path, body);
  };

  public publish = async (systemId: string, apiKey: string) => {
    const body = {
      apiKey,
    };
    return await this.instance.put<IPublishResponse>(
      `/v1/system/${systemId}/publish`,
      body
    );
  };

  public pollPublish = async (systemId: string) =>
    await this.instance.get<IPublishStatus>(`/v1/system/${systemId}/poll`);
}
