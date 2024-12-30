"use client"
import React, { useState } from 'react'
import Link from 'next/link';
import { useData } from "../../context/index";
import AdvanceFilterModal from '@/layout/advance-search';
import ContactPopForm from './ContactPopForm';
import StickyNotification from './ContactForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const WhatsAppButton = ({ data }) => {
  const { appSettings } = useData();
  const [open, setOpen] = useState(false)
  const phoneNumber = appSettings?.whatsApp; // Replace with the phone number you want to send the message to
  const message = `مرحبا أود الاستفسار عن ${data}`; // The message to send
  const encodedMessage = encodeURIComponent(message); // Encode the message to be URL safe

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  const phoneUrl = `tel:${appSettings?.phone}`;
  const videoCallUrl = `https://somevideoapp.com/call/${phoneNumber}`; // Replace with actual video call URL

  return (
    <>
      <StickyNotification />
      <div className="contact-buttons">
        {/* WhatsApp Button */}
        <Link href={whatsappUrl} passHref>
          <button className="contact-button whatsapp" aria-label="Whats app buuton" target="_blank" rel="noopener noreferrer">
            {/* <i className="fab fa-whatsapp"></i> */}
            <FontAwesomeIcon icon="fab fa-whatsapp" />
          </button>
        </Link>

        {/* Phone Button */}
        <Link href={phoneUrl} passHref>
          <button className="contact-button phone" aria-label="Call Phone" target="_blank" rel="noopener noreferrer">
            <i className="fas fa-phone"></i>
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
            <i className="fas fa-video"></i>

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
            <ContactPopForm />
          </div>
        </div>

      </div>

    </>
  );
};

export default WhatsAppButton;
