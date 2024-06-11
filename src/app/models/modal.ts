export interface ColorOption {
  code: string;
  description: string;
  price: number;
}
export interface ConfigurationOption {
  id: number;
  description: string;
  range: number;
  speed: number;
  price: number;
}
export interface CarModel {
  code: string;
  description: string;
  configs: ConfigurationOption[];
  colors: ColorOption[];
  towHitch: boolean;
  yoke: boolean;
  price?: number;
  towHitchPrice?: number;
  yokePrice?: number;
}
export interface stepModal {
  modelSelect: string,
  colorSelect: string,
  configSelect: string,
  currentModel: CarModel,
  currentColors: ColorOption[],
  includeTow: boolean,
  includeYoke: boolean
  configSelectModel?: ConfigurationOption | null
}
export interface ConfigInformation {
  configs: ConfigurationOption[];
  towHitch: boolean;
  yoke: boolean;
}
export interface ModelsResponse {
  [key: string]: CarModel;
}
