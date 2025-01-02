"use client"
import Image from "next/image";
import "../../../../public/loadingStyle.css";
// import { useEffect } from "react";
const loading = () => {
  // useEffect(() => { 

  // },[])
  return (
    <div className="loading-page">
      <div className="my_spinner">
        <Image
          width={155}
          className="loader-img"
          height={60}
          src="/logo.webp"
          alt="Header Logo"
          priority
          loading="eager"
          
        />
      </div>
    </div>
  );
};

export default loading;
