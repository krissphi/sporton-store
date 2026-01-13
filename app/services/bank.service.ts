import { fetchAPI } from "../lib/api";
import { Bank } from "../types";

export const getAllBank = async (): Promise<Bank[]> => {
  return await fetchAPI<Bank[]>("/banks");
};
