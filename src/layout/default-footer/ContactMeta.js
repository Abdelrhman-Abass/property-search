import { useTranslations } from "next-intl";
import React from "react";

const ContactMeta = ({ appSettings }) => {
  const t = useTranslations("footer");

  const contactInfoList = [
    {
      title: t("contact"),
      phone: appSettings?.phone,
      phoneLink: `tel:${appSettings?.phone}`,
      mail: appSettings?.email,
      mailLink: `mailto:${appSettings?.email}`,
    },
  ];

  return (
    <div className="row mb-4 mb-lg-5">
      {contactInfoList.map((contact, index) => (
        <div className="col-auto" key={index}>
          <div className="contact-info">
            <p className="info-title" style={{ textAlign: "center" }}>
              {contact.title}
            </p>
            {contact.phone && (
              <h6 className="info-phone text-center" dir="ltr">
                <a href={contact.phoneLink}>{contact.phone}</a>
              </h6>
            )}
            {contact.mail && (
              <h6 className="info-phone text-center" style={{ color: "#fff" }}>
                <a href={contact.mailLink}>{contact.mail}</a>
              </h6>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactMeta;
