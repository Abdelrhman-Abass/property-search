// "use client";
// import React, { useEffect, useState } from "react";

// export default function ScrollToTop() {
//   const [isVisible, setIsVisible] = useState(false);
//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   };

//   useEffect(() => {
//     const toggleVisibility = () => {
//       if (window.pageYOffset > 100) {
//         setIsVisible(true);
//       } else {
//         setIsVisible(false);
//       }
//     };

//     window.addEventListener("scroll", toggleVisibility);

//     return () => window.removeEventListener("scroll", toggleVisibility);
//   }, []);

//   return (
//     isVisible && (
//       <button
//         className="scrollToHome"
//         style={{ cursor: "pointer" }}
//         onClick={scrollToTop}
//       >
//         <i className="fas fa-angle-up"></i>
//       </button>
//     )
//   );
// }

"use client";
import React, { useEffect, useState } from "react";
import Link from 'next/link';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // WhatsApp button setup
  const phoneNumber = '+1234567890'; // Replace with the WhatsApp phone number
  const message = 'Hello, I am interested in your services!'; // Your predefined message
  const encodedMessage = encodeURIComponent(message); // URL encode the message
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    isVisible && (
      <div className="fixed bottom-10 right-5">
        <button
          className="bg-blue-500 text-white p-3 rounded-full mb-3 hover:bg-blue-600"
          style={{ cursor: "pointer" }}
          onClick={scrollToTop}
        >
          <i className="fas fa-angle-up"></i>
        </button>

        <Link href={whatsappUrl} passHref>
          <button
            className="bg-green-500 text-white p-3 rounded-full hover:bg-green-600"
            target="_blank" // Opens in a new tab
            rel="noopener noreferrer" // Security feature
          >
            <i className="fab fa-whatsapp"></i> Contact on WhatsApp
          </button>
        </Link>
      </div>
    )
  );
}
