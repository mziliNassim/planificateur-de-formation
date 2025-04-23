import React, { useState } from "react";
import NavigationBar from "./components/NavigationBar.jsx";
import PlanificateurDeFormation from "./pages/PlanificateurDeFormation.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  const [theme] = useState("light");

  return (
    <div className={theme}>
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<PlanificateurDeFormation />} />
          <Route
            path="/planificateur-de-Formation"
            element={<PlanificateurDeFormation />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
