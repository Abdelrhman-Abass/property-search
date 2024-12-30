import { blogFormatDate } from "@/services";
import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React from "react";

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

  const phoneNumber = '+201094002482'; // Replace with the phone number you want to send the message to
  const message = `مرحبا أود الاستفسار عن ${titleAR}`; // The message to send
  const encodedMessage = encodeURIComponent(message); // Encode the message to be URL safe

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  const phoneUrl = `tel:${phoneNumber}`;
  const videoCallUrl = `https://somevideoapp.com/call/${phoneNumber}`; // Replace with actual video call URL

  const imagePath = `${process.env.NEXT_PUBLIC_ARTICLES_IMAGE}/${image}`;
  const blogDate = blogFormatDate(createdDateUtc, locale);
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
        
        <h6 className="title mt20 truncate-text" style={{height:50}}>
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
        ):(
          <p style={{height:30}}></p>
        )}

        <div className="info-boxes mb20" style={{height:30}}>
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
          <Link href={whatsappUrl} passHref>
            <button
            aria-label="Whats app"
              className="contact-button-blog-out whatsapp"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-whatsapp"></i>
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
              <i className="fas fa-phone"></i>
              <span className="mx10"> {locale == "ar" ? " اتصل" : "Call"}</span>
            </button>
          </Link>

          {/* Video Call Button */}
          <Link href={videoCallUrl} passHref>
            <button
            aria-label="Zoom Us"
              className="contact-button-blog-out video"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fas fa-video"></i>
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
