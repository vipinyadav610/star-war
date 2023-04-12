import React from "react";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import { useStateContext } from "context/StateContext";

function PlanetSelect() {
  const {
    actions: { handlePlanetChange },
    state: { selectedPlanet, planets, planetsLoading },
  } = useStateContext();

  if (planetsLoading) return <span>Loading planets ....</span>;
  return (
    <Form>
      <Form.Group controlId="planet">
        <Form.Label>Choose a planet:</Form.Label>
        <FormControl
          as="select"
          value={selectedPlanet}
          onChange={handlePlanetChange}
        >
          <option value=""></option>
          {planets.map((planet) => (
            <option key={planet.name} value={planet.name}>
              {planet.name}
            </option>
          ))}
        </FormControl>
      </Form.Group>
    </Form>
  );
}

export default PlanetSelect;
