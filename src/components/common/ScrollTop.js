"use client";
import React, { useEffect, useState } from "react";
import WhatsAppButton from "./WhatsAppButton";

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
        className="scrollToHome"
        style={{ cursor: "pointer" }}
        onClick={scrollToTop}
      >
        <i className="fas fa-angle-up"></i>
      </button>
      )}
      {/* <WhatsAppButton/> */}
    </>
  );
}
