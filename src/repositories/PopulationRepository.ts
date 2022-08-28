import { useCallback, useRef } from "react";
import IRequestService from "../services/IRequestService";
import RequestService from "../services/RequestService";
import IPopulation from "../domains/population";

interface getPopulationRes {
  // eslint-disable-next-line camelcase
  data: {
    "ID Nation": string;
    Nation: string;
    "ID Year": number;
    // Year: string;
    Population: number;
    // "Slug Nation": string;
  }[];
}

const usePopulationRepositories = () => {
  const requestService: IRequestService = useRef(new RequestService()).current;
  const getAll = useCallback((): Promise<IPopulation[]> => {
    return requestService
      .get<getPopulationRes>(`/data`, {
        queryObj: { drilldowns: "Nation", measures: "Population" },
      })
      .then((res): IPopulation[] =>
        res.data.map((r) => ({
          nation: r.Nation,
          idNation: r["ID Nation"],
          population: r.Population,
          year: r["ID Year"],
        }))
      );
  }, [requestService]);

  return { getAll };
};

export default usePopulationRepositories;
