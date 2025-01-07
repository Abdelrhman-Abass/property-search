import React from "react";
import { useLocale } from "next-intl";
import Image from "next/image";

const ContentPhotoList = ({ company }) => {
  const locale = useLocale();
  const photoPlcaHolder = "https://via.placeholder.com/300x200";
  const imagePath = `${process.env.NEXT_PUBLIC_COMPANIES_CONTENT_IMAGE}`;
  
  return (
      <div className="my-5 mb0">
      {company.map((item, index) => (
        <div
          key={index}
          className={`row align-items-center mb-4 content-padding-companies min500-height ${
            index % 2 !== 0 ? "flex-row-reverse bg-white" : ""
          }`}
        >
          {/* Image Section */}
          <div
            className={`col-md-6 d-flex align-items-center justify-content-center height400 `}
            style={{
              backgroundColor: index % 2 === 0 ? "#f8f9fa" : "white", // Alternate background color
            }}
          >
            <Image
              src={
                item.image
                  ? `${imagePath}/${item.image}`
                  : photoPlcaHolder
              }
              alt={`Photo ${locale === "ar" ? item.titleAR : item.titleEN}`}
              
              className="img-fluid rounded custom-height w-100 object-fit-cover"
            />
          </div>

          <div className="col-md-6">
            <div className="pr10">
                <h3 className="company-title">{locale === "ar" ? item.titleAR : item.titleEN}</h3>
            </div>
            <div
              className="p-3 list-pollets"
              dangerouslySetInnerHTML={{
                __html:
                  locale === "ar"
                    ? item?.contentAR
                    : item?.contentEN,
              }}
            ></div>
          </div>
          {/* Content Section */}
        </div>
      ))}
    </div>
  );
};

export default ContentPhotoList;
