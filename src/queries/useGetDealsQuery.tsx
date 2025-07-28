import { useQuery } from "@tanstack/react-query";
import { getDealsService } from "../services";

export const useGetDealsQuery = () => {
  return useQuery({ queryKey: ["getDeals"], queryFn: getDealsService });
};
