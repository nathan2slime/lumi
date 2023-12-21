export type ExtractData = Record<string, Record<string, number | string>>;
export type DataField = {
  name: string;
  data: Record<string, DataParse>;
};

export type DataParse = {
  index: number;
  regex?: RegExp;
};
