import React, { useEffect, useState } from "react";

import Hero from "../components/Hero.jsx";
import ParametersCard from "../components/ParametersCard.jsx";
import PlanningCard from "../components/PlanningCard.jsx";
import Features from "../components/Features.jsx";
import Footer from "../components/Footer";

const PlanificateurDeFormation = () => {
  return (
    <div className="">
      <main className="container mx-auto p-4 flex-grow z-10 relative w-full xl:w-10/12 max-w-7xl">
        <Hero />

        {/* Parameters card */}
        <ParametersCard />

        {/* Features section */}
        {/* <Features /> */}
      </main>

      {/* <Footer /> */}
    </div>
  );
};

export default PlanificateurDeFormation;
