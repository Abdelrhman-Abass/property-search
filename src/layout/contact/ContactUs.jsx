"use client";
import React from "react";
import Form from "./Form";
import { useTranslations } from "next-intl";

const ContactUs = ({ id = null, type }) => {
  const f = useTranslations("form");
  return (
    <div className="home8-contact-form default-box-shadow1 bdrs12 bdr1 p20 mb30-md bgc-white">
      <h4 className="form-title ">{id ? f("reqTitle") : f("contactTitle")}</h4>
      <p className="mb25">{f("text")} </p>
      <Form id={id} type={type} />
    </div>
  );
};

export default ContactUs;
