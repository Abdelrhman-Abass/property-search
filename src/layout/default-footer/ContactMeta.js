import { useTranslations } from "next-intl";
import Link from "next/link";
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
                <Link href={contact.phoneLink}>{contact.phone}</Link>
              </h6>
            )}
            {contact.mail && (
              <h6 className="info-phone text-center" style={{ color: "#fff" }}>
                <Link href={contact.mailLink}>{contact.mail}</Link>
              </h6>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactMeta;
