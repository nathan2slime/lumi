export type ExtractedData = Record<string, Record<string, number | string>>;
export type DataField = {
  name: string;
  data: Record<string, ConfigDataParser>;
};

export type ConfigDataParser = {
  index: number;
  regex?: RegExp;
};
