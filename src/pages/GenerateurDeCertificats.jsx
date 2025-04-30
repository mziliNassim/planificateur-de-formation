import React, { useState, useEffect } from "react";

import Hero from "../components/UI/Hero";

import FormCard from "../components/GenerateurComponents/FormCard.jsx";
import CertificatePreview from "../components/GenerateurComponents/CertificatePreview.jsx";
import FormationsUpadeForm from "../components/GenerateurComponents/FormationsUpadeForm.jsx";

import { Loader } from "lucide-react";

const GenerateurDeCertificats = () => {
  const [loading, setLoading] = useState(true);
  const [formations, setFormations] = useState([]);
  const [formationsUpade, setFormationsUpade] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    formationTitle: "",
    obtentionDate: new Date().toISOString().split("T")[0],
    qrCodeLink: "https://w4j.yool.education/",
  });

  // Check exist formations // localStorage
  useEffect(() => {
    setLoading(true);
    const formationsStorage = localStorage.getItem("formations");
    if (!formationsStorage) {
      console.log(" useEffect ~ !!!!!! formations:", formations);
      const data = [
        "Security Developer",
        "Web Developer & Solution",
        "Data Developer",
      ];
      setFormations(data);
      localStorage.setItem("formations", JSON.stringify(data));
    } else setFormations(JSON.parse(formationsStorage));
    setLoading(false);
  }, []);

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
      {formationsUpade && (
        <FormationsUpadeForm
          setFormationsUpade={setFormationsUpade}
          setFormations={setFormations}
        />
      )}

      <main className="container mx-auto p-4 flex-grow z-10 relative w-full xl:w-10/12 max-w-7xl">
        <Hero title="générateur de certificats" />

        {loading ? (
          <Loader className="h-8 w-8 mx-auto mt-20 text-blue-500 animate-spin" />
        ) : (
          <div className="grid grid-cols-1 gap-8 mb-16">
            {/* Form Card */}
            <FormCard
              formData={formData}
              handleInputChange={handleInputChange}
              generatePDF={generatePDF}
              setLoading={setLoading}
              formations={formations}
              setFormationsUpade={setFormationsUpade}
            />

            {/* Certificate Preview - RESPONSIVE VERSION */}
            <CertificatePreview formData={formData} />
          </div>
        )}
      </main>
    </div>
  );
};

export default GenerateurDeCertificats;

<></>;
