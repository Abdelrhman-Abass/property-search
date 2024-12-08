import Link from 'next/link';

const WhatsAppButton = () => {
  const phoneNumber = '+20 109 400 2482'; // Replace with the phone number you want to send the message to
  const message = 'Hello, I am interested in your services!'; // The message to send
  const encodedMessage = encodeURIComponent(message); // Encode the message to be URL safe

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <Link href={whatsappUrl} passHref>
      <button
        className="whatsapp-button"
        target="_blank" // Opens the link in a new tab
        rel="noopener noreferrer" // Security feature
      >
        <i className="fab fa-whatsapp whatsapp-icon"></i> {/* FontAwesome WhatsApp icon */}
      </button>
    </Link>
  );
};

export default WhatsAppButton;
