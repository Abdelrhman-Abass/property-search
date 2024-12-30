"use client";
import React, { useEffect, useState } from "react";
import { FaAngleUp } from "react-icons/fa";

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

  

  return (
    <>
      {isVisible && (
      <button
      aria-label="Scroll button"
        className="scrollToHome"
        style={{ cursor: "pointer" }}
        onClick={scrollToTop}
      >
        <FaAngleUp style={{fontSize:30 , marginTop:-10 }} />          

      </button>
      )}
      {/* <WhatsAppButton/> */}
    </>
  );
}
