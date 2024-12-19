import React from "react";
import { useLocale } from "next-intl";

const ContentPhotoList = ({ company }) => {
  const locale = useLocale();
  const photoPlcaHolder = "https://via.placeholder.com/300x200";
  const imagePath = `${process.env.NEXT_PUBLIC_COMPANIES_CONTENT_IMAGE}`;
  
  return (
      <div className="my-5 mb0">
      {company.map((item, index) => (
        <div
          key={index}
          className={`row align-items-center mb-4 content-padding-companies ${
            index % 2 !== 0 ? "flex-row-reverse bg-white" : ""
          }`}
          style={{ minHeight: "500px"  }} // Ensure fixed height for the entire row
        >
          {/* Image Section */}
          <div
            className="col-md-6 d-flex align-items-center justify-content-center"
            style={{
              height: "400px", // Fixed height for image section
              overflow: "hidden", // Prevents overflow for large images
              backgroundColor: index % 2 === 0 ? "#f8f9fa" : "white", // Alternate background color
            }}
          >
            <img
              src={
                item.image
                  ? `${imagePath}/${item.image}`
                  : photoPlcaHolder
              }
              alt={`Photo ${item.id || index}`}
              
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
