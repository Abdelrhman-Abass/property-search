// "use client"
// import React, { useState ,useEffect} from 'react'
// import Link from 'next/link';
// import { useData } from "../../context/index";
// import AdvanceFilterModal from '@/layout/advance-search';
// import StickyNotification from './ContactForm';
// import { FaWhatsapp ,FaPhoneAlt , FaVideo} from "react-icons/fa";
// import { useLocale } from 'next-intl';

// const WhatsAppButton = ({ data , url="" , sticky=true}) => {
//   const { appSettings } = useData();
//   const [open, setOpen] = useState(false)
//   const [isVisible, setIsVisible] = useState(false);
  
//   const locale=useLocale()
//   const phoneNumber = appSettings?.whatsApp; // Replace with the phone number you want to send the message to
//   const message = `مرحبا أود الاستفسار عن ${data}`; // The message to send
//   const encodedMessage = encodeURIComponent(message); // Encode the message to be URL safe

//   const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
//   const phoneUrl = `tel:${appSettings?.phone}`;
//   const videoCallUrl = `https://somevideoapp.com/call/${phoneNumber}`; // Replace with actual video call URL
//   (url)
//   let messageUrl= `${process.env.NEXT_PUBLIC_FRONT_DOMAIN}${locale}/`+ url  

//   useEffect(() => {
//       const toggleVisibility = () => {
//         if (window.pageYOffset > 100) {
//           setIsVisible(true);
//         } else {
//           setIsVisible(false);
//         }
//       };
  
//       window.addEventListener("scroll", toggleVisibility);
  
//       return () => window.removeEventListener("scroll", toggleVisibility);
//     }, []);

//   return (
//     <>
//     {isVisible && (
//       {/* {sticky ? <StickyNotification /> : null} */}
//       <div className="floating-buttons">
//       {/* Contact Us Button */}
//       <Link href={whatsappUrl} className='contact-us' passHref>
//           تواصل معنا <FaWhatsapp className='fs25' />          
//         </Link>

      
//       <Link href={phoneUrl} className="icon-button phone" passHref>
//           {/* <button className="phone_but" aria-label="Call Phone" target="_blank" rel="noopener noreferrer"> */}
//             <FaPhoneAlt className='fs22'  />          

//           {/* </button> */}
//         </Link>

      
//     </div>

//     )}
//        {/* <div className="side-buttons"> */}

//         {/* <Link href={whatsappUrl} className='whats_button ' passHref>
//           تواصل معنا <FaWhatsapp className='fs25' />          
//         </Link> */}
// {/* 
//         <Link href={phoneUrl} className="phone_but" passHref>
//           <button className="phone_but" aria-label="Call Phone" target="_blank" rel="noopener noreferrer">
//             <FaPhoneAlt className='fs22'  />          

//           </button>
//         </Link>

//         <Link href="#" passHref>
//           <button
//           aria-label="open toogle"
//             className=""
//             data-bs-toggle="modal"
//             data-bs-target="#contactPopFprm"
//             type="button"
//             rel="noopener noreferrer"
//             onClick={() => setOpen(true)}>
//             <FaVideo className='fs25'  />          

//           </button>

//         </Link>
//       </div>  */}
      
//       {/* <div className="contact-buttons">
//         <Link href={whatsappUrl} passHref>
//           <button className="contact-button whatsapp" aria-label="Whats app buuton" target="_blank" rel="noopener noreferrer">
//             <FaWhatsapp className='fs25' />          
//             </button>
//         </Link>

//         <Link href={phoneUrl} passHref>
//           <button className="contact-button phone" aria-label="Call Phone" target="_blank" rel="noopener noreferrer">
//             <FaPhoneAlt className='fs22'  />          

//           </button>
//         </Link>

//         <Link href="#" passHref>
//           <button
//           aria-label="open toogle"
//             className="contact-button video"
//             data-bs-toggle="modal"
//             data-bs-target="#contactPopFprm"
//             type="button"
//             rel="noopener noreferrer"
//             onClick={() => setOpen(true)}>
//             <FaVideo className='fs25'  />          

//           </button>

//         </Link>
//         <div className="advance-feature-modal">
//           <div
//             className="modal fade"
//             id="contactPopFprm"
//             tabIndex={-1}
//             aria-labelledby="contactPopFprm"
//             aria-hidden="true"
//           >
//             <ContactPopForm message={messageUrl}/>
//           </div>
//         </div>

//       </div> */}

//     </>
//   );
// };

// export default WhatsAppButton;


"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useData } from "../../context/index";
import { FaWhatsapp, FaPhoneAlt ,FaVideo } from "react-icons/fa";
import { useLocale } from "next-intl";
import ContactPopForm from './ContactPopForm';

const WhatsAppButton = ({ data, url = "", sticky = true }) => {
  const { appSettings } = useData();
  const [isVisible, setIsVisible] = useState(false);
   const [open, setOpen] = useState(false)

  const locale = useLocale();
  const phoneNumber = appSettings?.whatsApp || "+201026901040";
  const message = `مرحبا أود الاستفسار عن ${data}`;
  const encodedMessage = encodeURIComponent(message);

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  const phoneUrl = `tel:${appSettings?.phone || "+201026901040"}`;
  
  let messageUrl= `${process.env.NEXT_PUBLIC_FRONT_DOMAIN}${locale}/`+ url  
  
  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 100);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <>
    {isVisible ? (
      <>
      <div className={`floating-buttons`} data-aos-delay="100" data-aos="fade-up">
        {/* WhatsApp Button */}
        <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="contact-us">
          <FaWhatsapp className="icon" />
          تواصل معنا
        </Link>

        {/* Phone Button */}
        {/* <Link href={phoneUrl} className="icon-button phone">
          <FaPhoneAlt className="icon" />
        </Link> */}
        <Link href={phoneUrl}  passHref>
           <button className="contact-button phone" aria-label="Call Phone" target="_blank" rel="noopener noreferrer">
             <FaPhoneAlt className='fs22'  />          

           </button>
         </Link>
          {/* <Link href="#" passHref> */}
            <button
              aria-label="open toogle"
              className="contact-button video"
              data-bs-toggle="modal"
              data-bs-target="#contactPopFprm"
              type="button"
              rel="noopener noreferrer"
              onClick={() => setOpen(true)}>
              <FaVideo className='fs25' />          

            </button>

          {/* </Link> */}

         
         
      </div>

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
      </>

    ):null}
    </>
  );
};

export default WhatsAppButton;
