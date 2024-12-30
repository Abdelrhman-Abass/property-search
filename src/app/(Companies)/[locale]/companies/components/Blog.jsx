import { blogFormatDate } from "@/services";
import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaWhatsapp ,FaPhoneAlt , FaVideo} from "react-icons/fa";


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
    subTitleEN,
    subTitleAR,
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

  const imagePath = `${process.env.NEXT_PUBLIC_COMPANIES_IMAGE}/${image}`;
  return (
    <div className="blog-style1 large-size bgc-white">
      <div className="blog-img">
        <Image
          width={360}
          height={200}
          priority
          className="w-100 cover"
          src={imagePath}
          alt={`blog ${titleAR}`}
          loading="eager"
        />
      </div>
      <div className="blog-content pl30 pb20">
        
        <h5 className="title mt20 mb20">
          <Link href={`/${locale}/companies/${id}`}>
            {locale == "ar" ? titleAR : titleEN}
          </Link>
        </h5>
        <p className="text mt-15 pb5 text-secondary">
          {locale == "ar" ? subTitleAR : subTitleEN}
        </p>
        <h6 className="text truncate-text-three" style={{maxHeight:70}}>
          {shortDescriptionAR || shortDescriptionEN ? (
            (locale == "ar" ? shortDescriptionAR : shortDescriptionEN)

          ):(
            <div style={{maxHeight:70}}></div>
          )}
        </h6>
        <div className="contact-buttons-blog-out pt20">
          {/* WhatsApp Button */}
          <Link href={whatsappUrl} passHref>
            <button
              className="contact-button-blog-out whatsapp"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Whats app contact"
            >
              <FaWhatsapp style={{fontSize:25}} />          
              <span className="mx10">واتساب</span>
            </button>
          </Link>

          {/* Phone Button */}
          <Link href={phoneUrl} passHref>
            <button
              className="contact-button-blog-out phone"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="phone calls"
            >
              <FaPhoneAlt style={{fontSize:20}} />          

              <span className="mx10">اتصل</span>
            </button>
          </Link>

          {/* Video Call Button */}
          <Link href={videoCallUrl} passHref>
            <button
              className="contact-button-blog-out video"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Zoom meetings"
            >
              <FaVideo style={{fontSize:25}} />          

              <span className="mx10">زووم</span>

            </button>
          </Link>
        </div>
        
      </div>
    </div>
  );
};

export default Blog;
