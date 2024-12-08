import Link from 'next/link';

const WhatsAppButton = () => {
  const phoneNumber = '+201007582994'; // Replace with the WhatsApp phone number
  const message = 'Hello, I am interested in your services!'; // Your predefined message
  const encodedMessage = encodeURIComponent(message); // URL encode the message
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <Link href={whatsappUrl} passHref>
      <button
        className="whatsapp-button"
        target="_blank" // Opens the link in a new tab
        rel="noopener noreferrer" // Security feature
      >
        Contact on WhatsApp
      </button>
    </Link>
  );
};

export default WhatsAppButton;
