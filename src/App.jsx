import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import NavigationBar from "./components/UI/NavigationBar.jsx";

import Home from "./pages/Home.jsx";
import PlanificateurDeFormation from "./pages/PlanificateurDeFormation.jsx";
import GenerateurDeCertificats from "./pages/GenerateurDeCertificats.jsx";

const App = () => {
  const [theme] = useState("light");

  return (
    <div className={theme}>
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/planificateur-de-Formation"
            element={<PlanificateurDeFormation />}
          />
          <Route
            path="/generateur-de-certificats"
            element={<GenerateurDeCertificats />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
