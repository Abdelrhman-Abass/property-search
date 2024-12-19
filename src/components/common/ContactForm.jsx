"use client";
import { useState , useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useData } from "@/context";
import toast from "react-hot-toast";
import ReCAPTCHA from "react-google-recaptcha";

const StickyNotification = () => {
  const [isNotificationVisible, setNotificationVisible] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    Watsmobile: "",
  });
  const recaptcha = useRef();

  const g = useTranslations("global");
  const { appSettings } = useData();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const reset = () => {
    setFormData({
      fullName: "",
      Watsmobile: "",
    });
  };

  const handleSubmit = async () => {
    const captchaValue = recaptcha.current.getValue();
    if (!captchaValue) {
      alert("Please verify the reCAPTCHA!");
    } else {

      const payload = {
        fullName: formData.fullName,
        whatsApp: formData.Watsmobile, // Match the required key from Swagger
      };

      try {
        // Send the POST request
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/Subscription`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Specify JSON content type
          },
          body: JSON.stringify(payload), // Convert payload to JSON
        });

        // Handle response
        if (!response.ok) {
          throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
        }

        const data = await response.json(); // Parse the response
        console.log("Subscription successful:", data);

        console.log(JSON.stringify(payload))

        // Reset the form after successful submission
        reset();
        toast.success("Subscription successful!");
      } catch (error) {
        console.error("Unexpected error:", error.message);
        toast.error("Failed to submit the form. Please try again.");
      }
    }


    // Prepare the JSON payload
  };


  const handleCloseNotification = () => {
    setNotificationVisible(false);
  };

  return (
    <>
      {/* Sticky Notification */}
      {isNotificationVisible && (
        <div
          style={{
            position: "fixed",
            bottom: "70px",
            left: "20px",
            background: "white",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            padding: "16px",
            zIndex: 1000,
            maxWidth: "300px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h5 style={{ margin: "0", fontSize: "16px", fontWeight: "bold" }}>
              {g("News")}
            </h5>
            <button
              style={{
                background: "none",
                border: "none",
                fontSize: "16px",
                cursor: "pointer",
              }}
              onClick={handleCloseNotification}

            >
              &times;
            </button>
          </div>
          <p style={{ fontSize: "12px", margin: "8px 0" }}>
            {g("newsProperty")}
          </p>
          <button
            style={{
              background: "#007bff",
              color: "white",
              border: "none",
              padding: "8px 16px",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
            }}
            data-bs-toggle="modal"
            data-bs-target="#contactForm"
            type="button"
          >
            {g("EnterSubscrib")}
          </button>
        </div>
      )}

      {/* Modal */}

      <div
        className="modal fade"
        id="contactForm"
        tabIndex={-1}
        aria-labelledby="contactForm"
        aria-hidden="false"
      >

        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header pl30 pr30">
              <h5 className="modal-title" id="exampleModalLabel">
                {g("SpecifyTime")}
              </h5>
              <button
                type="button"
                className="btn-close m-0"
                // onClick={handleCloseModal}

                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body pb-0">
              <div className="row">
                <div className="col-12 mb-3">
                  <label htmlFor="fullName" className="form-label">
                    {g("Subscrib")}
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="form-control"
                    placeholder={g("FullNamePlaceHolder")}
                    required
                  />
                </div>

                <div className="col-12 mb-3">
                  <label htmlFor="mobile" className="form-label">
                    {g("WatsAppMobile")}
                  </label>
                  <input
                    type="tel"
                    id="Watsmobile"
                    name="Watsmobile"
                    value={formData.Watsmobile}
                    onChange={handleChange}
                    className="form-control"
                    placeholder={g("MobileHolder")}
                    required
                  />
                </div>


              </div>
            </div>
            <ReCAPTCHA
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              className="mb10"
              ref={recaptcha}
              sitekey={process.env.NEXT_PUBLIC_KEY_CAPTCHA}
            />

            <div className="modal-footer justify-content-between">
              <button className="reset-button" onClick={reset}>
                <span className="flaticon-turn-back px-1" />
                <u>{g("reset")}</u>
              </button>
              <div className="btn-area">
                <button
                  data-bs-dismiss="modal"
                  type="submit"
                  className="ud-btn btn-thm d-flex align-items-center gap-2"
                  onClick={handleSubmit}
                >
                  <span>{g("sendContact")}</span>
                  {/* <span className="flaticon-search d-flex items-center justify-content-center align-text-top" /> */}
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

    </>
  );
};

export default StickyNotification;
