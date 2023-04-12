import { PAGE_SIZE } from "constant";

export const paginateArray = (array, pageNumber) => {
  return array.slice((pageNumber - 1) * PAGE_SIZE, pageNumber * PAGE_SIZE);
};

export const getResidents = (selectedPlanet, planets = []) => {
  if (!selectedPlanet) {
    return [];
  } else {
    const planet = planets.find(({ name }) => name === selectedPlanet);
    return planet?.residents || [];
  }
};
