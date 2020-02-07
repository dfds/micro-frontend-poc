import { IPluginConfig } from "./IPluginConfig"

export interface IComponentConfig {
  name: string;
  useShadow: boolean;
  properties?: any;
  plugins?: IPluginConfig[];
}