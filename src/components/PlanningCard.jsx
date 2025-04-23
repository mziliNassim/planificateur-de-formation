import React from "react";
import { Printer, Calendar } from "lucide-react";

// Fonction pour calculer la durée entre deux heures
const calculateDuration = (startTime, endTime) => {
  if (!startTime || !endTime) return 0;

  const [startHours, startMinutes] = startTime.split(":").map(Number);
  const [endHours, endMinutes] = endTime.split(":").map(Number);

  const startTotalMinutes = startHours * 60 + startMinutes;
  const endTotalMinutes = endHours * 60 + endMinutes;

  const durationMinutes = endTotalMinutes - startTotalMinutes;
  return Math.max(0, Math.floor(durationMinutes / 60)); // Retourne la durée en heures
};

const PlanningCard = ({ planning = [], onTimeUpdate }) => {
  // Obtenir la couleur d'arrière-plan pour un jour spécifique
  const getDayColor = (index) => {
    const colors = ["bg-purple-50", "bg-indigo-50", "bg-violet-50"];
    return colors[index % colors.length];
  };

  // Fonction pour mettre à jour les heures
  const handleTimeUpdate = (dayIndex, moduleKey, field, value) => {
    if (onTimeUpdate) {
      onTimeUpdate(dayIndex, moduleKey, field, value);
    }
  };

  // Helper function to safely get module time values
  const getModuleTime = (day, moduleKey, field) => {
    if (!day || !day.modules) return field === "debut" ? "09:00" : "11:00";

    const module = day.modules[moduleKey];

    // Module can be a string (just the name) or an object with time properties
    if (typeof module === "string") {
      return field === "debut" ? day.debut : day.fin;
    }

    // If module is an object with time properties
    if (module && typeof module === "object") {
      if (module[field]) {
        return module[field];
      }
    }

    // Default fallback to day level times
    return field === "debut" ? day.debut || "09:00" : day.fin || "11:00";
  };

  // Helper function to get module name
  const getModuleName = (day, moduleKey) => {
    if (!day || !day.modules) return moduleKey;

    const module = day.modules[moduleKey];

    if (typeof module === "string") {
      return module;
    }

    if (module && typeof module === "object" && module.name) {
      return module.name;
    }

    return moduleKey.replace("module", "Module ");
  };

  // Fonction pour générer un PDF à partir du planning
  const generatePDF = () => {
    const tableToPrint = document.querySelector(".printed-part");
    if (!tableToPrint) {
      console.error("Could not find table to print");
      return;
    }

    // Get only the table content
    const printContent = tableToPrint.innerHTML;

    // Replace the page with only the table content
    document.body.innerHTML = `
      <div style="padding: 20px; font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;">
        <style>
          @media print {
            body { margin: 0; padding: 0; }
            table { width: 100%; border-collapse: collapse; }
            th {
              background-color: #4a277a !important;
              color: white !important;
              print-color-adjust: exact;
              -webkit-print-color-adjust: exact;
            }
            tr, td, th { page-break-inside: avoid; }
            input { border: none; }
            @page {
              size: landscape;
              margin: 10mm;
            }
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        </style>

        <div style="
          background: white;
          border-radius: 16px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
          padding: 24px;
          margin-bottom: 24px;
          position: relative;
          z-index: 10;
          border-top: 4px solid #4a277a;
          animation: fadeIn 0.4s ease-out;
        ">
          <div style="
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 24px;
          ">
            <div style="display: flex; align-items: center;">
              <div style="
                background: #4a277a;
                padding: 12px;
                border-radius: 8px;
                color: white;
                margin-right: 16px;
                display: flex;
                align-items: center;
                justify-content: center;
              ">
                <!-- Calendar icon would go here -->
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 2V5M16 2V5M3.5 9.09H20.5M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M15.6947 13.7H15.7037M15.6947 16.7H15.7037M11.9955 13.7H12.0045M11.9955 16.7H12.0045M8.29431 13.7H8.30329M8.29431 16.7H8.30329" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <h2 style="
                font-size: 1.5rem;
                font-weight: 700;
                color: #1a1a1a;
                margin: 0;
              ">Planning</h2>
            </div>
          </div>

          <div style="
            background: #f9fafb;
            border-radius: 12px;
            padding: 20px;
            box-shadow: inset 0 1px 3px rgba(0,0,0,0.05);
          ">
            ${printContent}
          </div>
        </div>
      </div>
    `;

    // Print the document
    window.print();

    // Restore the original content
    window.location = "/";
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 transition-all duration-700 relative z-10 border-t-4 border-[#4a277a]">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <div className="bg-[#4a277a] p-3 rounded-lg text-white mr-4">
            <Calendar className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Planning Généré</h2>
        </div>
        <div className="flex gap-3">
          <button
            onClick={generatePDF}
            className="flex items-center cursor-pointer px-4 py-2 bg-[#4a277a] text-white rounded-lg hover:bg-opacity-90 transition-colors shadow-md hover:shadow-lg"
          >
            <Printer className="w-4 h-4 mr-2" />
            Imprimer
          </button>
        </div>
      </div>

      <div
        className="printed-part overflow-x-auto print:overflow-visible rounded-xl"
        id="planning-content"
      >
        {planning && planning.length > 0 ? (
          <table className="w-full border-collapse bg-white overflow-hidden rounded-xl">
            <thead className="bg-[#4a277a] text-white">
              <tr>
                <th className="px-6 py-4 text-left">Jour</th>
                <th className="px-6 py-4 text-left">Module</th>
                <th className="px-6 py-4 text-left">Début</th>
                <th className="px-6 py-4 text-left">Fin</th>
                <th className="px-6 py-4 text-left">Durée</th>
              </tr>
            </thead>
            <tbody>
              {planning.map((day, dayIndex) => {
                // Safety check
                if (!day || !day.modules) return null;

                // Convert modules object to array for mapping
                const moduleEntries = Object.keys(day.modules).map((key) => ({
                  key,
                  value: day.modules[key],
                }));

                return moduleEntries.map((entry, moduleIndex) => {
                  const moduleKey = entry.key;
                  const moduleStartTime = getModuleTime(
                    day,
                    moduleKey,
                    "debut"
                  );
                  const moduleEndTime = getModuleTime(day, moduleKey, "fin");
                  const moduleName = getModuleName(day, moduleKey);

                  return (
                    <tr
                      key={`${dayIndex}-${moduleKey}-${moduleIndex}`}
                      className={`${getDayColor(
                        dayIndex
                      )} hover:bg-purple-100 transition-colors`}
                    >
                      {moduleIndex === 0 && (
                        <td
                          rowSpan={moduleEntries.length}
                          className="border-b border-purple-100 px-6 py-4 capitalize font-medium"
                        >
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-[#4a277a]" />
                            {day.jour}
                          </div>
                        </td>
                      )}
                      <td className="border-b border-purple-100 px-6 py-4">
                        <div className="font-medium text-[#4a277a]">
                          {moduleName}
                        </div>
                      </td>
                      <td className="border-b border-purple-100 px-6 py-4">
                        <div className="flex items-center">
                          <input
                            type="time"
                            value={moduleStartTime}
                            onChange={(e) =>
                              handleTimeUpdate(
                                dayIndex,
                                moduleKey,
                                "debut",
                                e.target.value
                              )
                            }
                            className="bg-transparent border-b border-gray-300 focus:border-[#4a277a] focus:outline-none px-1 py-1"
                            step="3600"
                          />
                        </div>
                      </td>
                      <td className="border-b border-purple-100 px-6 py-4">
                        <div className="flex items-center">
                          <input
                            type="time"
                            value={moduleEndTime}
                            onChange={(e) =>
                              handleTimeUpdate(
                                dayIndex,
                                moduleKey,
                                "fin",
                                e.target.value
                              )
                            }
                            className="bg-transparent border-b border-gray-300 focus:border-[#4a277a] focus:outline-none px-1 py-1"
                            step="3600"
                          />
                        </div>
                      </td>
                      <td className="border-b border-purple-100 px-6 py-4">
                        <span className="bg-[#4a277a] text-white px-3 py-1 rounded-full text-sm">
                          {calculateDuration(moduleStartTime, moduleEndTime)}h
                        </span>
                      </td>
                    </tr>
                  );
                });
              })}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-16 bg-purple-50 rounded-xl">
            <Calendar
              className="mx-auto mb-4 opacity-60 text-purple-500"
              size={48}
            />
            <h3 className="text-xl font-semibold text-[#4a277a] mb-2">
              Aucun planning généré
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Veuillez sélectionner au moins un jour disponible pour générer
              votre planning de formation.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlanningCard;
