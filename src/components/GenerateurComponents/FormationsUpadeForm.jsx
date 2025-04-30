import React, { useState, useEffect } from "react";
import { X, Save, Plus, Trash2, BookOpen } from "lucide-react";

const FormationsUpadeForm = ({ setFormationsUpade, setFormations }) => {
  const [formationsList, setFormationsList] = useState([]);
  const [newFormation, setNewFormation] = useState("");
  const [error, setError] = useState("");

  // Load formations from localStorage on component mount
  useEffect(() => {
    const storedFormations = localStorage.getItem("formations");
    if (storedFormations) {
      setFormationsList(JSON.parse(storedFormations));
    }
  }, []);

  const handleAddFormation = () => {
    if (!newFormation.trim()) {
      setError("Please enter a formation name");
      return;
    }

    // Check if formation already exists
    if (formationsList.includes(newFormation.trim())) {
      setError("This formation already exists");
      return;
    }

    setFormationsList([...formationsList, newFormation.trim()]);
    setNewFormation("");
    setError("");
  };

  const handleRemoveFormation = (index) => {
    const updatedList = [...formationsList];
    updatedList.splice(index, 1);
    setFormationsList(updatedList);
  };

  const handleSaveFormations = () => {
    // Save to localStorage
    localStorage.setItem("formations", JSON.stringify(formationsList));
    setFormations(formationsList);

    // Close the form modal
    setFormationsUpade(false);
  };

  return (
    <div className="fixed inset-0 bg-transparent backdrop:blur-10xl bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-white to-purple-50 rounded-2xl shadow-2xl p-8 w-full max-w-4xl border border-purple-100 transform transition-all">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <div className="bg-purple-100 p-2 rounded-lg mr-3">
              <BookOpen size={24} className="text-purple-800" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 bg-gradient-to-r from-purple-900 to-purple-600 bg-clip-text text-transparent">
              Edit Formations
            </h2>
          </div>
          <button
            onClick={() => setFormationsUpade(false)}
            className="text-gray-400 cursor-pointer hover:text-purple-700 transition-colors bg-white rounded-full p-1 hover:bg-purple-100"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mb-6">
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={newFormation}
              onChange={(e) => setNewFormation(e.target.value)}
              placeholder="Add new formation"
              className="flex-1 border-2 border-purple-100 focus:border-purple-500 focus:ring-purple-500 rounded-lg p-3 text-sm outline-none transition-all shadow-sm"
            />
            <button
              onClick={handleAddFormation}
              className="bg-gradient-to-r cursor-pointer from-purple-800 to-purple-600 hover:from-purple-700 hover:to-purple-500 text-white rounded-lg px-4 py-2 flex items-center transition-all shadow-md hover:shadow-lg"
            >
              <Plus size={18} className="mr-1" />
            </button>
          </div>
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>

        <div className="max-h-screen overflow-y-auto mb-6 pr-2 scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-purple-100">
          <h3 className="text-sm font-medium text-purple-800 mb-3 uppercase tracking-wider">
            Current Formations
          </h3>
          {formationsList.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400 text-sm italic">
                No formations added yet
              </p>
            </div>
          ) : (
            <ul className="space-y-2">
              {formationsList.map((formation, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm border-l-4 border-purple-600 group hover:shadow-md transition-all"
                >
                  <span className="text-gray-700">{formation}</span>
                  <button
                    onClick={() => handleRemoveFormation(index)}
                    className="text-gray-400 cursor-pointer group-hover:text-red-500 transition-colors p-1 rounded-full hover:bg-red-50"
                  >
                    <Trash2 size={16} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={() => setFormationsUpade(false)}
            className="border-2 cursor-pointer border-purple-300 text-purple-700 hover:bg-purple-50 rounded-lg px-4 py-2 font-medium transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={handleSaveFormations}
            className="bg-gradient-to-r  cursor-pointer from-purple-800 to-purple-600 hover:from-purple-700 hover:to-purple-500 text-white rounded-lg px-5 py-2 flex items-center font-medium transition-all shadow-md hover:shadow-lg"
          >
            <Save size={18} className="mr-2" /> Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormationsUpadeForm;
