import React from "react";
import { Printer, Calendar } from "lucide-react";
import logo from "../../assets/logo_.png";

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

    // Create a new window for printing
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      alert("Please allow pop-ups to generate the PDF planning");
      return;
    }

    // Get the original styles from the page
    const styles = Array.from(document.styleSheets)
      .map((styleSheet) => {
        try {
          return Array.from(styleSheet.cssRules)
            .map((rule) => rule.cssText)
            .join("\n");
        } catch (e) {
          console.log("Error accessing stylesheet rules", e);
          return "";
        }
      })
      .join("\n");

    // Clone the table content but disable inputs
    const tableHTML = tableToPrint.innerHTML;
    const processedHTML = tableHTML.replace(
      /<input[^>]*value="([^"]*)"[^>]*>/g,
      '<span class="time-value">$1</span>'
    );

    // Get the formation title if available
    let formationTitle = "Planning de Formation";
    const titleElement = document.querySelector("h1");
    if (titleElement) {
      formationTitle = titleElement.textContent;
    }

    // Get current date for the report
    const today = new Date().toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${formationTitle}</title>
        <style>
          ${styles}
          @page {
            size: landscape;
            margin: 15mm;
          }
          html, body {
            margin: 0;
            padding: 0;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          }
          body {
            background-color: white;
          }
          .planning-container {
            padding: 20px;
            max-width: 100%;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            page-break-inside: auto;
          }
          thead {
            display: table-header-group;
          }
          tr {
            page-break-inside: avoid;
            page-break-after: auto;
          }
          th {
            background-color: #4a277a !important;
            color: white !important;
            padding: 10px;
            text-align: left;
            font-weight: bold;
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          td {
            padding: 10px;
            border-bottom: 1px solid #e0e0e0;
          }
          .time-value {
            font-family: monospace;
            font-size: 0.9rem;
          }
          .header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
            align-items: center;
          }
          .title {
            font-size: 24px;
            font-weight: bold;
            color: #4a277a;
            text-transform: capitalize;
          }
          .date {
            font-size: 14px;
            color: #666;
          }
          .logo {
            height: 50px;
            margin-bottom: 10px;
          }
          .footer {
            margin-top: 30px;
            font-size: 12px;
            color: #666;
            text-align: center;
            page-break-inside: avoid;
          }
          @media print {
            body {
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            .bg-\[\#4a277a\] {
              background-color: #4a277a !important;
              color: white !important;
            }
            th {
              background-color: #4a277a !important;
              color: white !important;
            }
            .no-print {
              display: none !important;
            }
          }
        </style>
      </head>
      <body>
        <div class="planning-container">
          <div class="header">
              <img src=${logo} alt="logo" />
              <div class="date">le ${today}</div>
          </div>

          <table>
            ${processedHTML}
          </table>

        </div>

        <div class="no-print" style="position: fixed; top: 20px; right: 20px;">
          <button onclick="window.print(); setTimeout(() => window.close(), 500);"
                  style="padding: 10px 20px; background-color: #4a277a; color: white;
                  border: none; border-radius: 5px; cursor: pointer; font-weight: bold;">
            Imprimer / Enregistrer en PDF
          </button>
        </div>

        <script>
          window.onload = () => {
            window.print();
            setTimeout(() => window.close(), 100);
          };
        </script>
      </body>
    </html>
  `);

    // Finish loading the document
    printWindow.document.close();
    printWindow.focus();
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
