"use client"
import { blogFormatDate } from "@/services";
import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaWhatsapp, FaPhoneAlt, FaVideo } from "react-icons/fa";
import { useData } from "@/context";

const Blog = ({ blog }) => {

  const locale = useLocale();
  const {
    id,
    titleAR,
    titleEN,
    shortDescriptionAR,
    shortDescriptionEN,
    image,
    createdDateUtc,
    installmentYears,
    downPaymentPercentage,
    priceStartsFrom,
    seoTitle,
    seoDescription,
    seoMetaTags = [],
  } = blog;
  const { appSettings } = useData();

  
  const phoneNumber = '+201094002482'; // Replace with the phone number you want to send the message to
  const message = `مرحبا أود الاستفسار عن ${titleAR}`; // The message to send
  const encodedMessage = encodeURIComponent(message); // Encode the message to be URL safe

  const whatsappUrl = `https://wa.me/${appSettings?.whatsApp}?text=${encodedMessage}`;
  const phoneUrl = `tel:${appSettings?.phone}`;
  const videoCallUrl = `https://somevideoapp.com/call/${appSettings?.phone}`; // Replace with actual video call URL

  const imagePath = `${process.env.NEXT_PUBLIC_ARTICLES_IMAGE}/${image}`;
  const blogDate = blogFormatDate(createdDateUtc, locale);

  const handleFormSubmit = async (data) => {
    const captchaValue = recaptchaRef.current?.getValue();
    if (!captchaValue) {
      toast.error("Please complete the CAPTCHA.");
      return;
    }

    // Prepare the data for the POST request
    const payload = {
      fullName: data.fullName,
      whatsApp: String(data.Watsmobile), // Replace with actual key for your API
    };
    (JSON.stringify(payload))

    try {
      // Send the POST request to the server
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/Subscription`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Specify JSON content type
        },
        body: JSON.stringify(payload), // Convert payload to JSON
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
      }

      const responseData = await response.json(); // Parse the response
      toast.success("Subscription successful!");

      // Reset the form after successful submission
      reset();
      recaptchaRef.current.reset();
    } catch (error) {
      console.error("Unexpected error:", error.message);
      toast.error("There was an error submitting the form.");
    }
  };
  return (
    <div className="blog-style1 large-size bgc-white">
      <div className="blog-img">
        <Image
          width={300}
          height={200}
          
          className="w-100 cover"
          src={imagePath}
          alt={`blog ${titleAR}`}
          loading="lazy"


        />
      </div>
      <div className="blog-content pl30 pb20" >
        <div className="date">
          <span className="month">{blogDate.month}</span>
          <span className="day">{blogDate.day}</span>
        </div>

        <h6 className="title mt20 truncate-text height45" >
          <Link href={`/${locale}/blog/${id}`}>
            {locale == "ar" ? titleAR : titleEN}
          </Link>
        </h6>

        {priceStartsFrom !== null ? (
          <>
            <h6 className="price-blog-out">
              <span className="">{Intl.NumberFormat('fr-FR').format(priceStartsFrom)}</span>  جنيه
            </h6>
          </>
        ) : (
          <p className="height30"></p>
        )}

        <div className="info-boxes mb20 height30" >
          <div className="info-box">
            <span>{downPaymentPercentage}% {locale == "ar" ? "دفعة مبدئية " : " Deposit"}</span>
            {/* <p className="info-label"> {locale == "ar" ? "مقدم " : " Deposit"}</p> */}
          </div>
          <div className="info-box">
            <span>{installmentYears} {locale == "ar" ? " تقسيط" : "Installment"}</span>
            {/* <p className="info-label"> {locale == "ar" ? " تقسيط" : "Installment"}</p> */}
          </div>
        </div>
        <div className="contact-buttons-blog-out">
          {/* WhatsApp Button */}
        <Link href={whatsappUrl} target="_blank" passHref>

            <button
              aria-label="Whats app"
              className="contact-button-blog-out whatsapp"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp className="fs25" />
              <span className="mx10"> {locale == "ar" ? " واتساب" : "WhatsApp"}</span>
            </button>
          </Link>

          {/* Phone Button */}
          <Link href={phoneUrl} passHref>
            <button
              aria-label="Call us"
              className="contact-button-blog-out phone"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaPhoneAlt className="fs20" />
              <span className="mx10"> {locale == "ar" ? " اتصل" : "Call"}</span>
            </button>
          </Link>

          {/* Video Call Button */}
          <Link href="#" passHref>
            <button
              className="contact-button-blog-out video"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="open toogle"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#contactPopFprm"
            >
              <FaVideo className="fs25" />
              <span className="mx10"> {locale == "ar" ? " زووم" : "Zoom"}</span>

            </button>
          </Link>
          

        </div>
        <p className="text">
          {locale == "ar" ? shortDescriptionAR : shortDescriptionEN}
        </p>
      </div>

    </div>
  );
};

export default Blog;
