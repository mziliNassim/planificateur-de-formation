import React from "react";

const Hero = ({ title }) => {
  return (
    <div className="header-new-about mb-5 z-50">
      <div className="mx-auto">
        <div className="container mx-auto">
          <h1 className="text-white capitalize">{title}</h1>
          <div className="breadcrumb-2">
            <a href="/" className="text-white hover:underline">
              accueil
            </a>{" "}
            /{" "}
            <a
              href="/a-propos"
              className="text-white hover:underline font-bold"
            >
              {title}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
