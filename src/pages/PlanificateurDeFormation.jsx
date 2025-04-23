import React from "react";

import Hero from "../components/Hero.jsx";
import ParametersCard from "../components/ParametersCard.jsx";

const PlanificateurDeFormation = () => {
  return (
    <div className="">
      <main className="container mx-auto p-4 flex-grow z-10 relative w-full xl:w-10/12 max-w-7xl">
        <Hero />

        {/* Parameters card */}
        <ParametersCard />
      </main>
    </div>
  );
};

export default PlanificateurDeFormation;
