import React, { useState, useCallback, useMemo } from "react";
import StateContext from "./StateContext";
import useFetch from "hooks/useFetch";
import { PAGE_SIZE } from "constant";
import { paginateArray, getResidents } from "helpers";
import { get } from "api";

export default function FlyoutDrawerProvider({ children }) {
  const [selectedPlanet, setSelectedPlanet] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [people, setPeople] = useState([]);
  const [peopleLoading, setPeopleLoading] = useState(false);

  const [planets, planetsLoading] = useFetch({
    url: "/planets",
    defaultValue: [],
  });

  const fetchPeople = useCallback(
    (planetName, pageNumber) => {
      const residents = getResidents(planetName, planets);
      const paginatedResidents = paginateArray(residents, pageNumber);
      const promises = paginatedResidents.map((url) => get(url));

      setPeopleLoading(true);
      Promise.all(promises)
        .then((ppl) => {
          setPeopleLoading(false);
          setPeople((people) => [...people, ...ppl]);
        })
        .catch((error) => {
          setPeopleLoading(false);
        });
    },
    [planets]
  );

  const getTotalPage = useMemo(() => {
    const residents = getResidents(selectedPlanet, planets);
    return Math.ceil(residents.length / PAGE_SIZE);
  }, [selectedPlanet, planets]);

  const handlePlanetChange = useCallback(
    (event) => {
      const planetName = event.target.value;
      setSelectedPlanet(planetName);
      setPeople([]);
      setCurrentPage(1);
      fetchPeople(planetName, 1);
    },
    [fetchPeople]
  );

  const handleLoadMore = useCallback(() => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchPeople(selectedPlanet, nextPage);
  }, [currentPage, selectedPlanet, fetchPeople]);

  return (
    <StateContext.Provider
      value={{
        state: {
          selectedPlanet,
          planets,
          planetsLoading,
          people,
          peopleLoading,
          getTotalPage,
          currentPage,
        },
        actions: { handlePlanetChange, handleLoadMore },
      }}
    >
      {children}
    </StateContext.Provider>
  );
}
