import React, { useEffect, useState } from "react";
import PlanningCard from "./PlanningCard";

import {
  Clipboard,
  BookOpen,
  CheckCircle,
  X,
  Calendar,
  Edit,
} from "lucide-react";

const ParametersCard = () => {
  const [moduleCount, setModuleCount] = useState(1);
  const [availableDays, setAvailableDays] = useState({
    lundi: true,
    mardi: true,
    mercredi: true,
    jeudi: true,
    vendredi: true,
    samedi: false,
    dimanche: false,
  });

  const [moduleThemes, setModuleThemes] = useState([]);
  const [moduleDays, setModuleDays] = useState({});
  const [planning, setPlanning] = useState([]);

  // Fonction pour gérer les changements de jours disponibles
  const handleDayChange = (day) => {
    setAvailableDays({
      ...availableDays,
      [day]: !availableDays[day],
    });
  };

  // Fonction pour générer le planning
  const generatePlanning = () => {
    const selectedDays = Object.keys(availableDays).filter(
      (day) => availableDays[day]
    );

    if (selectedDays.length === 0) {
      setPlanning([]);
      return;
    }

    let newPlanning = [];

    // Créer un planning vide pour chaque jour disponible
    selectedDays.forEach((day) => {
      newPlanning.push({
        jour: day,
        modules: {},
        heures: 0,
        debut: "09:00",
        fin: "09:00",
      });
    });

    // Assigner chaque module à son jour sélectionné
    for (let moduleIndex = 1; moduleIndex <= moduleCount; moduleIndex++) {
      const moduleKey = `module${moduleIndex}`;
      const selectedDay = moduleDays[moduleKey] || selectedDays[0];
      const themeIndex = (moduleIndex - 1) % Math.max(1, moduleThemes.length);
      const moduleName = moduleThemes[themeIndex] || `Module ${moduleIndex}`;

      const dayIndex = newPlanning.findIndex(
        (item) => item.jour === selectedDay
      );

      if (dayIndex !== -1) {
        // Store the module with proper time information
        newPlanning[dayIndex].modules[moduleKey] = {
          name: moduleName,
          debut: "09:00",
          fin: "11:00",
        };

        // Update day totals
        const modules = Object.keys(newPlanning[dayIndex].modules).length;
        newPlanning[dayIndex].heures = modules * 2;
        newPlanning[dayIndex].fin = `${
          parseInt(newPlanning[dayIndex].debut) + newPlanning[dayIndex].heures
        }:00`;
      }
    }

    setPlanning(newPlanning);
  };

  // Fonction pour mettre à jour un thème de module
  const handleThemeChange = (index, value) => {
    const newThemes = [...moduleThemes];
    newThemes[index] = value;
    setModuleThemes(newThemes);
  };

  // Fonction pour mettre à jour le jour d'un module
  const handleModuleDayChange = (moduleIndex, day) => {
    setModuleDays({
      ...moduleDays,
      [`module${moduleIndex}`]: day,
    });
  };

  // Fonction pour mettre à jour les heures d'un module
  const handleTimeUpdate = (dayIndex, moduleKey, field, value) => {
    if (dayIndex < 0 || dayIndex >= planning.length) return;

    const newPlanning = [...planning];

    // Ensure the module structure is correct
    if (!newPlanning[dayIndex].modules[moduleKey]) {
      newPlanning[dayIndex].modules[moduleKey] = {
        name: `Module ${moduleKey.replace("module", "")}`,
        debut: "09:00",
        fin: "11:00",
      };
    } else if (typeof newPlanning[dayIndex].modules[moduleKey] === "string") {
      // If module is just a string (name), convert to object with time properties
      const moduleName = newPlanning[dayIndex].modules[moduleKey];
      newPlanning[dayIndex].modules[moduleKey] = {
        name: moduleName,
        debut: "09:00",
        fin: "11:00",
      };
    }

    // Now update the specific field
    newPlanning[dayIndex].modules[moduleKey][field] = value;

    // Recalculate day totals if needed
    if (field === "debut" || field === "fin") {
      let totalMinutes = 0;

      Object.values(newPlanning[dayIndex].modules).forEach((module) => {
        if (
          module &&
          typeof module === "object" &&
          module.debut &&
          module.fin
        ) {
          const [startHour, startMin] = module.debut.split(":").map(Number);
          const [endHour, endMin] = module.fin.split(":").map(Number);

          const startMinutes = startHour * 60 + startMin;
          const endMinutes = endHour * 60 + endMin;

          if (endMinutes > startMinutes) {
            totalMinutes += endMinutes - startMinutes;
          }
        }
      });

      newPlanning[dayIndex].heures = Math.floor(totalMinutes / 60);
    }

    setPlanning(newPlanning);
  };

  // Générer le planning quand les paramètres changent
  useEffect(() => {
    generatePlanning();
  }, [moduleCount, availableDays, moduleThemes, moduleDays]);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 relative z-10 border-t-4 border-[#4a277a] transform transition-all hover:shadow-2xl">
      <div className="flex items-center mb-6">
        <div className="bg-[#4a277a] p-3 rounded-lg text-white mr-4">
          <Clipboard className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">
          Paramètres de formation
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
        {/* modules */}
        <div className="bg-purple-50 p-4 rounded-xl">
          <label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
            <BookOpen className="w-4 h-4 mr-2 text-[#4a277a]" />
            Nombre de modules
          </label>
          <div className="relative">
            <input
              type="number"
              min="1"
              value={moduleCount}
              onChange={(e) =>
                setModuleCount(Math.max(1, parseInt(e.target.value) || 1))
              }
              className="w-full px-4 py-3 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4a277a] transition-all text-lg"
            />
            <div className="absolute right-0 top-0 h-full flex items-center pr-3 pointer-events-none">
              <span className="text-[#4a277a] font-medium">modules</span>
            </div>
          </div>
        </div>
      </div>

      {/* Module Themes and Days */}
      <div className="mb-6">
        <label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
          <Edit className="w-4 h-4 mr-2 text-[#4a277a]" />
          Thèmes et jours des modules
        </label>
        <div className="space-y-4">
          {Array.from({ length: moduleCount }).map((_, index) => (
            <div key={index} className="bg-purple-50 p-4 rounded-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Module {index + 1}
                  </label>
                  <input
                    type="text"
                    value={moduleThemes[index] || ""}
                    onChange={(e) => handleThemeChange(index, e.target.value)}
                    placeholder={`Thème du module ${index + 1}`}
                    className="w-full px-4 py-3 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4a277a] transition-all"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Jour
                  </label>
                  <select
                    value={moduleDays[`module${index + 1}`] || ""}
                    onChange={(e) =>
                      handleModuleDayChange(index + 1, e.target.value)
                    }
                    className="w-full px-4 py-3 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4a277a] transition-all bg-white"
                  >
                    {/* <option value="">Sélectionner un jour</option> */}
                    {Object.entries(availableDays)
                      .filter(([_, isAvailable]) => isAvailable)
                      .map(([day], i) => (
                        <option key={day} value={day} selected={day == "lundi"}>
                          {day.charAt(0).toUpperCase() + day.slice(1)}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Jours */}
      <div className="mb-6">
        <label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
          <Calendar className="w-4 h-4 mr-2 text-[#4a277a]" />
          Jours disponibles
        </label>
        <div className="flex flex-wrap gap-2">
          {Object.keys(availableDays).map((day) => (
            <button
              key={day}
              onClick={() => handleDayChange(day)}
              className={`px-5 cursor-pointer py-3 rounded-lg text-sm font-medium transition-all flex items-center ${
                availableDays[day]
                  ? "bg-[#4a277a] text-white shadow-md"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {availableDays[day] ? (
                <CheckCircle className="w-4 h-4 mr-2" />
              ) : (
                <X className="w-4 h-4 mr-2" />
              )}
              {day.charAt(0).toUpperCase() + day.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Planning result card */}
      <PlanningCard planning={planning} onTimeUpdate={handleTimeUpdate} />
    </div>
  );
};

export default ParametersCard;
