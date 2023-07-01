import { AppContextType } from "components/containers/FeatherModel";

export type BaseProps = {
  index: number;
  step: number;
  name: string;
  title?: string;
  description?: string;
  masterStateCopy: AppContextType[][];
  setMasterState: React.Dispatch<React.SetStateAction<AppContextType[][]>>;
};

export type ComponentInputSchema = {
  componentType: string;
  name: string;
  type: string;
  payload: Record<string, unknown>;
  props: Record<string, unknown>;
  schema: Record<string, unknown>;
  version: string;
};

export type SystemSchema = {
  finalOutputs: any[];
  steps: {
    name: string;
    description: string;
    title: string;
    staticData: any[];
    inputs: ComponentInputSchema[];
    outputs: any[];
  }[];
  version: string;
};
