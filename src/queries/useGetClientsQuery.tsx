import { useQuery } from "@tanstack/react-query";
import { getClientsService } from "../services";

export const useGetClientsQuery = () => {
  return useQuery({ queryKey: ["getClients"], queryFn: getClientsService });
};
