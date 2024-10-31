"use client"
import Image from "next/image";
import "../../../public/loadingStyle.css";
import { useEffect } from "react";
const loading = () => {
  useEffect(() => { 

  },[])
  return (
    <div className="loading-page">
      <div className="my_spinner">
        <Image
          width={155}
          className="loader-img"
          height={60}
          src="/logo.png"
          alt="Header Logo"
        />
      </div>
    </div>
  );
};

export default loading;
