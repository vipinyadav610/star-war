import React from "react";
import People from "components/People/People";
import PlanetSelect from "components/PlanetSelect/PlanetSelect";
import "./App.css";

const App = () => {
  return (
    <div className="page-container">
      <PlanetSelect />
      <People />
    </div>
  );
};

export default App;
