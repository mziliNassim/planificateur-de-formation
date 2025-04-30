import React from "react";
import { QRCodeSVG } from "qrcode.react";

import bg_certificate from "../../assets/bg_certificate.png";

const CertificatePreview = ({ formData }) => {
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
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-dashed border-gray-300">
      <h3 className="text-lg font-semibold text-gray-700 mt-4 mb-8">
        Aperçu du certificat
      </h3>
      <div className="printed-part certificate relative w-full">
        <div className="relative w-full aspect-[1.4/1]">
          {/* Background Image */}
          <img
            src={bg_certificate}
            alt="Certificate Background"
            className="rounded w-full h-full object-contain"
          />

          {/* Certificate Content with Responsive Positioning */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {/* Flex container for certificate content */}
            <div className="flex flex-col items-center justify-center h-full w-full relative">
              {/* Name - positioned at ~50% from top */}
              <div className="mb-20 -mt-7 text-center">
                <h2 className="font-bold text-3xl md:text-4xl capitalize text-[#63448d]">
                  <span className="capitalize font-exo">
                    {formData.firstName || "_"}
                  </span>{" "}
                  <span className="uppercase font-exo">
                    {formData.lastName || "_"}
                  </span>
                </h2>
              </div>

              {/* Formation Title - positioned below name */}
              <div className="text-center">
                <h3 className="font-exo font-bold text-2xl md:text-4xl capitalize text-[#63448d]">
                  {formData.formationTitle || "_"}
                </h3>
              </div>

              {/* date and director */}
              <div className="flex justify-around items-center absolute z-50 bottom-30 w-full">
                {/* date */}
                <div className="flex flex-col w-fit items-center justify-center">
                  <span className="font-medium text-lg text-[#bbbbbb]">
                    Completion date :
                  </span>
                  <span className="font-medium text-lg text-[#bbbbbb]">
                    {formatDate(formData.obtentionDate)}
                  </span>
                </div>

                {/* director */}
                <div className="flex flex-col w-fit items-center justify-center">
                  <span className="font-medium text-lg text-[#bbbbbb]">
                    The Director of WEB4JOBS
                  </span>
                  <span className="font-bold text-md text-[#4a277a]">
                    Abdelmonaim FAOUZI
                  </span>
                </div>
              </div>

              {/* QR Code */}
              <div className="absolute bottom-24 md:bottom-28 lg:bottom-32">
                <div className="flex items-center justify-center">
                  <QRCodeSVG
                    value={formData.qrCodeLink || "https://w4j.yool.education/"}
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
  );
};

export default CertificatePreview;
