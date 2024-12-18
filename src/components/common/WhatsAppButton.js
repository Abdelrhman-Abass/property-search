"use client"
import Link from 'next/link';
import { useData } from "../../context/index";

const WhatsAppButton = ({ data }) => {
  const { appSettings } = useData();

  const phoneNumber = appSettings.whatsApp ; // Replace with the phone number you want to send the message to
  const message = `مرحبا أود الاستفسار عن ${data}`; // The message to send
  const encodedMessage = encodeURIComponent(message); // Encode the message to be URL safe

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  const phoneUrl = `tel:${appSettings.phone}`;
  const videoCallUrl = `https://somevideoapp.com/call/${phoneNumber}`; // Replace with actual video call URL

  return (
    <div className="contact-buttons">
      {/* WhatsApp Button */}
      <Link href={whatsappUrl} passHref>
        <button className="contact-button whatsapp" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-whatsapp"></i>
        </button>
      </Link>

      {/* Phone Button */}
      <Link href={phoneUrl} passHref>
        <button className="contact-button phone" target="_blank" rel="noopener noreferrer">
          <i className="fas fa-phone"></i>
        </button>
      </Link>

      {/* Video Call Button */}
      <Link href={videoCallUrl} passHref>
        <button className="contact-button video" target="_blank" rel="noopener noreferrer">
          <i className="fas fa-video"></i>
        </button>
      </Link>
    </div>
  );
};

export default WhatsAppButton;
