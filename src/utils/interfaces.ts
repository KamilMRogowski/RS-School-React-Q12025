export interface Country {
  name: {
    common: string;
    official: string;
  };
  capital: string[];
  region: string;
  population: number;
  flags: {
    png: string;
    svg: string;
  };
}

export type SortOrder =
  | "populationAsc"
  | "populationDesc"
  | "nameAsc"
  | "nameDesc"
  | "none";
