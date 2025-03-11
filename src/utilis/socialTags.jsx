"use client"; // Ensure it's a client component

import React from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  TelegramShareButton,
} from "react-share";

import {
  FaFacebook,
  FaTwitter,
  FaWhatsapp,
  FaLinkedin,
  FaTelegram,
} from "react-icons/fa";
import { usePathname } from "next/navigation";

const ShareButtons = ({ url, title, description }) => {
    const pathname = usePathname();

    

  return (
    <div className="flex space-x-3">
      <FacebookShareButton url={url + pathname} quote={title}>
        <FaFacebook size={30} className="text-blue-600 hover:opacity-80" />
      </FacebookShareButton>

      <TwitterShareButton url={url} title={title}>
        <FaTwitter size={30} className="text-blue-400 hover:opacity-80" />
      </TwitterShareButton>

      <WhatsappShareButton url={url} title={title}>
        <FaWhatsapp size={30} className="text-green-500 hover:opacity-80" />
      </WhatsappShareButton>

      <LinkedinShareButton url={url} title={title} summary={description}>
        <FaLinkedin size={30} className="text-blue-700 hover:opacity-80" />
      </LinkedinShareButton>

      <TelegramShareButton url={url} title={title}>
        <FaTelegram size={30} className="text-blue-500 hover:opacity-80" />
      </TelegramShareButton>
    </div>
  );
};

export default ShareButtons;