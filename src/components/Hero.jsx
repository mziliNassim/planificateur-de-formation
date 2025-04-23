import React from "react";

const Hero = () => {
  return (
    <div className="header-new-about mb-5 z-50">
      <div className="mx-auto">
        <div className="container mx-auto">
          <h1 className="text-white">Planificateur de Formation</h1>
          <div className="breadcrumb-2">
            <a href="/" className="text-white hover:underline">
              accueil
            </a>
            /{" "}
            <a href="/a-propos" className="text-white hover:underline">
              Planificateur de Formation
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
