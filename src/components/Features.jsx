import React from "react";

import { Save, Award, Calendar } from "lucide-react";

const Features = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all border-l-4 border-[#4a277a]">
        <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
          <Calendar className="w-6 h-6 text-[#4a277a]" />
        </div>
        <h3 className="text-lg font-semibold mb-2 text-[#4a277a]">
          Planning Personnalisé
        </h3>
        <p className="text-gray-600">
          Adaptez votre planning selon votre disponibilité et vos préférences.
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all border-l-4 border-[#4a277a]">
        <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
          <Save className="w-6 h-6 text-[#4a277a]" />
        </div>
        <h3 className="text-lg font-semibold mb-2 text-[#4a277a]">
          Export Facile
        </h3>
        <p className="text-gray-600">
          Imprimez ou exportez votre planning en PDF en un seul clic.
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all border-l-4 border-[#4a277a]">
        <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
          <Award className="w-6 h-6 text-[#4a277a]" />
        </div>
        <h3 className="text-lg font-semibold mb-2 text-[#4a277a]">
          Résultats Professionnels
        </h3>
        <p className="text-gray-600">
          Des plannings bien structurés, prêts à être partagés avec les
          apprenants.
        </p>
      </div>
    </div>
  );
};

export default Features;
