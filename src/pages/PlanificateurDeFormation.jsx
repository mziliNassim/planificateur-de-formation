import React from "react";

import Hero from "../components/UI/Hero.jsx";
import ParametersCard from "../components/PlanificateurComponents/ParametersCard.jsx";

const PlanificateurDeFormation = () => {
  return (
    <div className="">
      <main className="container mx-auto p-4 flex-grow z-10 relative w-full xl:w-10/12 max-w-7xl">
        <Hero title="planificateur de formation" />

        {/* Parameters card */}
        <ParametersCard />
      </main>
    </div>
  );
};

export default PlanificateurDeFormation;
