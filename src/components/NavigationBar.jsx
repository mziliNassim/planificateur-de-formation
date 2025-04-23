import React from "react";
import { Link } from "react-router-dom";

const NavigationBar = () => {
  return (
    <nav className=" bg-white py-2 shadow-sm">
      <div className="container flex items-center justify-between mx-auto px-4 w-full lg:w-10/12">
        <a className="inline-block" href="https://w4j.yool.education/">
          <img
            src="https://w4j.yool.education/assets/web4jobs/images/logo.png"
            alt="logo"
            className="h-16"
          />
        </a>

        <ul className="flex gap-8 text-gray-700 hover:text-black capitalize">
          <li>
            <Link to="/">Accueil</Link>
          </li>
          <li>
            <Link to="/planificateur-de-Formation">
              planificateur de Formation
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavigationBar;
