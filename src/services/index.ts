import type { IDeal } from "../types";
import instance from "./httpClient";

export const getDealsService = async () => {
  const { data } = await instance.get<IDeal[]>("/deals");
  return data;
};

export const getClientsService = async () => {
  const { data } = await instance.get<string[]>("/clients");
  return data;
};
