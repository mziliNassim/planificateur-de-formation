import React, { useState, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Calendar, User, Award, Download, FileText, Link } from "lucide-react";

import Hero from "../components/UI/Hero";

import bg_certificate from "../assets/bg_certificate.png";

const GenerateurDeCertificats = () => {
  const [formData, setFormData] = useState({
    firstName: "Nassim",
    lastName: "MZILI",
    formationTitle: "Développement Full-Stack",
    obtentionDate: new Date().toISOString().split("T")[0],
    qrCodeLink: "https://w4j.yool.education/",
  });

  const certificateRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const generatePDF = () => {
    const certificateToPrint = document.querySelector(".printed-part");
    if (!certificateToPrint) {
      console.error("Could not find certificate to print");
      return;
    }

    // Create a new window for printing
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      alert("Please allow pop-ups to generate the PDF certificate");
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

    // Set up the print document with proper styling
    printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${formData.firstName} ${formData.lastName} - Certificate</title>
        <style>
          ${styles}
          html, body {
            margin: 0;
            padding: 0;
            height: 100%;
            overflow: hidden;
            background-color: #f5f5f5;
          }
          body {
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .certificate-container {
            width: 297mm;  /* A4 landscape width */
            height: 210mm; /* A4 landscape height */
            overflow: hidden;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            background-color: white;
            position: relative;
            page-break-after: avoid;
            page-break-before: avoid;
            page-break-inside: avoid;
          }
          .certificate-content {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          @media print {
            html, body {
              height: 100%;
              width: 100%;
              margin: 0;
              padding: 0;
              background-color: white;
            }
            .certificate-container {
              box-shadow: none;
              width: 100%;
              height: 100%;
              max-height: 100%;
              margin: 0;
              padding: 0;
              page-break-after: avoid;
              page-break-before: avoid;
              page-break-inside: avoid;
              break-inside: avoid;
            }
            .no-print {
              display: none !important;
            }
            @page {
              size: landscape;
              margin: 0;
              padding: 0;
            }
          }
        </style>
      </head>
      <body>
        <div class="certificate-container">
          <div class="certificate-content">
            ${certificateToPrint.outerHTML}
          </div>
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

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div>
      <main className="container mx-auto p-4 flex-grow z-10 relative w-full xl:w-10/12 max-w-7xl">
        <Hero title="générateur de certificats" />

        <div className="grid grid-cols-1 gap-8 mb-16">
          {/* Form Card */}
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
                  <input
                    type="text"
                    name="formationTitle"
                    value={formData.formationTitle}
                    onChange={handleInputChange}
                    placeholder="Titre de la formation"
                    className="w-full px-4 py-3 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4a277a] transition-all mt-2"
                  />
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

          {/* Certificate Preview - RESPONSIVE VERSION */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-dashed border-gray-300">
            <h3 className="text-lg font-semibold text-gray-700 mt-4 mb-8">
              Aperçu du certificat
            </h3>
            <div
              ref={certificateRef}
              className="printed-part certificate relative w-full"
            >
              <div className="relative w-full aspect-[1.4/1]">
                {/* Background Image */}
                <img
                  src={bg_certificate}
                  alt="Certificate Background"
                  className="rounded w-full h-full object-contain"
                />

                {/* Certificate Content with Responsive Positioning */}
                <div className="absolute inset-0 flex flex-col items-center justify-center ">
                  {/* Flex container for certificate content */}
                  <div className="flex flex-col items-center justify-center h-full w-full relative">
                    {/* Name - positioned at ~50% from top */}
                    <div className="mb-20 -mt-7 text-center">
                      <h2 className="font-bold text-3xl md:text-4xl capitalize text-[#63448d]">
                        <span className="capitalize">
                          {formData.firstName || ""}
                        </span>{" "}
                        <span className="uppercase">
                          {formData.lastName || ""}
                        </span>
                      </h2>
                    </div>

                    {/* Formation Title - positioned below name */}
                    <div className="text-center">
                      <h3 className="font-bold text-2xl md:text-4xl  text-[#63448d]">
                        {formData.formationTitle || ""}
                      </h3>
                    </div>

                    {/* date */}
                    <div className="flex w-full justify-between absolute bottom-28 left-60 text-[#adacad]">
                      <div className="font-medium text-xl text-[#adacad]">
                        {/* {formatDate(formData.obtentionDate)} */}
                      </div>
                    </div>

                    {/* QR Code */}
                    <div className="absolute bottom-24 md:bottom-28 lg:bottom-32">
                      <div className="flex items-center justify-center">
                        <QRCodeSVG
                          value={
                            formData.qrCodeLink || "https://w4j.yool.education/"
                          }
                          size={100}
                          bgColor={"#ffffff"}
                          fgColor={"#4a277a"}
                          level={"L"}
                          includeMargin={false}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GenerateurDeCertificats;

<></>;
