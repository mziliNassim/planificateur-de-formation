import React from "react";
import { Calendar } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#4a277a] text-white py-8 px-4">
      <div className="container mx-auto w-10/12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center mb-2">
              <Calendar className="w-5 h-5 mr-2" />
              <span className="font-bold text-lg">
                Planificateur de Formation
              </span>
            </div>
            <p className="text-purple-200 text-sm">
              Organisez vos formations efficacement
            </p>
          </div>

          <div className="flex space-x-4">
            <button className="hover:text-purple-200 transition-colors">
              À propos
            </button>
            <button className="hover:text-purple-200 transition-colors">
              Aide
            </button>
            <button className="hover:text-purple-200 transition-colors">
              Contact
            </button>
          </div>
        </div>
        <div className="border-t border-purple-400 mt-6 pt-6 text-center text-purple-200 text-sm">
          © 2025 Générateur de Planning de Formation - Tous droits réservés
        </div>
      </div>
    </footer>
  );
};

export default Footer;
