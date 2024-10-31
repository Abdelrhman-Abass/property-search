import React from "react";

const getCurrentYear = () => {
  return new Date().getFullYear();
};

const Footer = () => {
  return (
    <div className="container white-bdrt1 py-4">
      <div className="row">
        <div className="text-center text-lg-start">
          <p className="copyright-text text-gray ff-heading mb-0">
            ©{" "}
            <a
              style={{ color: "inherit" }}
              href="https://itlegend.net/ProgrammingServices/Index"
              target="_blank"
            >
              It Legend
            </a>{" "}
            {getCurrentYear()} - All rights reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
