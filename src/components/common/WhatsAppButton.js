import Link from 'next/link';

const WhatsAppButton = () => {
  const phoneNumber = '+1234567890'; // Replace with the phone number you want to send the message to
  const message = 'Hello, I am interested in your services!'; // The message to send
  const encodedMessage = encodeURIComponent(message); // Encode the message to be URL safe

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <Link href={whatsappUrl} passHref>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
        target="_blank" // Opens the link in a new tab
        rel="noopener noreferrer" // Security feature
      >
        Contact on WhatsApp
      </button>
    </Link>
  );
};

export default WhatsAppButton;
