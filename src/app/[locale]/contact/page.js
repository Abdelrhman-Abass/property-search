import ContactContent from "./components/Contact";
export async function generateMetadata({ params }) {
  return { title: params.locale == "ar" ? "تواصل معنا" : "Contact Us" };
}

const Contact = () => {
  return <ContactContent />;
};

export default Contact;
