import React, { useEffect, useState } from "react";
import {
  Calendar,
  User,
  Award,
  Download,
  FileText,
  Link,
  Edit,
} from "lucide-react";

const FormCard = ({
  formData,
  handleInputChange,
  generatePDF,
  formations,
  setFormationsUpade,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 relative z-10 border-t-4 border-[#4a277a] transform transition-all hover:shadow-2xl">
      <div className="flex items-center mb-6">
        <div className="bg-[#4a277a] p-3 rounded-lg text-white mr-4">
          <FileText className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">
          Informations du certificat
        </h2>
      </div>

      {/* Input Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Nom & Prénom & Formation Title */}
        <div className="bg-purple-50 p-4 rounded-xl col-span-2">
          <label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
            <User className="w-4 h-4 mr-2 text-[#4a277a]" />
            Identité du participant
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="Prénom"
              className="w-full px-4 py-3 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4a277a] transition-all"
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Nom"
              className="w-full px-4 py-3 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4a277a] transition-all"
            />
          </div>

          {/* Formation Title */}
          <div className="mt-2">
            <label className="text-sm font-medium text-gray-700 mt-2 flex items-center">
              <Award className="w-4 h-4 mr-2 text-[#4a277a]" />
              Formation
            </label>

            <div className="flex items-center justify-center gap-5  mt-2">
              <select
                value={formData.formationTitle}
                name="formationTitle"
                id="formationTitle"
                className="w-full cursor-pointer px-4 py-3 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4a277a] transition-all"
                onChange={handleInputChange}
              >
                <option className="cursor-pointer" disabled value="">
                  Select titre de la formation
                </option>
                {formations &&
                  formations.map((formation, i) => (
                    <option key={i} className="cursor-pointer">
                      {formation}
                    </option>
                  ))}
              </select>

              <div
                className="bg-[#4a277a] px-4 py-3 rounded-md cursor-pointer"
                onClick={() => setFormationsUpade(true)}
              >
                <Edit className="text-white rounded-md" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          {/* Date */}
          <div className="bg-purple-50 p-4 rounded-xl">
            <label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
              <Calendar className="w-4 h-4 mr-2 text-[#4a277a]" />
              Date d'obtention
            </label>
            <input
              type="date"
              name="obtentionDate"
              value={formData.obtentionDate}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4a277a] transition-all mt-2"
            />
          </div>

          {/* Download Button */}
          <button
            onClick={generatePDF}
            className="bg-[#4a277a] hover:bg-[#5b3191] cursor-pointer text-white py-4 rounded-xl font-medium flex items-center justify-center transition-all shadow-md hover:shadow-lg"
          >
            <Download className="w-5 h-5 mr-2" />
            Télécharger en PDF
          </button>
        </div>
      </div>

      {/* QR Code Link */}
      <div className="bg-purple-50 p-4 rounded-xl mt-5">
        <label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
          <Link className="w-4 h-4 mr-2 text-[#4a277a]" />
          Lien pour le QR Code de vérification
        </label>
        <input
          type="text"
          name="qrCodeLink"
          value={formData.qrCodeLink}
          onChange={handleInputChange}
          placeholder="Lien pour le QR Code"
          className="w-full px-4 py-3 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4a277a] transition-all mt-2"
        />
      </div>
    </div>
  );
};

export default FormCard;
