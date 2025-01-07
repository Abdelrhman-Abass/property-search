"use client"
import React, { useState } from 'react'
import Link from 'next/link';
import { useData } from "../../context/index";
import AdvanceFilterModal from '@/layout/advance-search';
import ContactPopForm from './ContactPopForm';
import StickyNotification from './ContactForm';
import { FaWhatsapp ,FaPhoneAlt , FaVideo} from "react-icons/fa";
import { useLocale } from 'next-intl';

const WhatsAppButton = ({ data , url="" , sticky=true}) => {
  const { appSettings } = useData();
  const [open, setOpen] = useState(false)
  const locale=useLocale()
  const phoneNumber = appSettings?.whatsApp; // Replace with the phone number you want to send the message to
  const message = `مرحبا أود الاستفسار عن ${data}`; // The message to send
  const encodedMessage = encodeURIComponent(message); // Encode the message to be URL safe

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  const phoneUrl = `tel:${appSettings?.phone}`;
  const videoCallUrl = `https://somevideoapp.com/call/${phoneNumber}`; // Replace with actual video call URL
  (url)
  let messageUrl= `${process.env.NEXT_PUBLIC_FRONT_DOMAIN}${locale}/`+ url  
  return (
    <>
      {sticky ? <StickyNotification /> : null}
      
      <div className="contact-buttons">
        {/* WhatsApp Button */}
        <Link href={whatsappUrl} passHref>
          <button className="contact-button whatsapp" aria-label="Whats app buuton" target="_blank" rel="noopener noreferrer">
            <FaWhatsapp className='fs25' />          
            </button>
        </Link>

        {/* Phone Button */}
        <Link href={phoneUrl} passHref>
          <button className="contact-button phone" aria-label="Call Phone" target="_blank" rel="noopener noreferrer">
            <FaPhoneAlt className='fs22'  />          

          </button>
        </Link>

        {/* Video Call Button */}
        <Link href="#" passHref>
          <button
          aria-label="open toogle"
            className="contact-button video"
            data-bs-toggle="modal"
            data-bs-target="#contactPopFprm"
            type="button"
            rel="noopener noreferrer"
            onClick={() => setOpen(true)}>
            <FaVideo className='fs25'  />          

          </button>

        </Link>
        <div className="advance-feature-modal">
          <div
            className="modal fade"
            id="contactPopFprm"
            tabIndex={-1}
            aria-labelledby="contactPopFprm"
            aria-hidden="true"
          >
            <ContactPopForm message={messageUrl}/>
          </div>
        </div>

      </div>

    </>
  );
};

export default WhatsAppButton;
