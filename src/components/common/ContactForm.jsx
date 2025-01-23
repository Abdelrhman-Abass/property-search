"use client";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import ReCAPTCHA from "react-google-recaptcha";
import toast from "react-hot-toast";
import { useLocale, useTranslations } from "next-intl";
// Define the Zod validation schema

const StickyNotification = () => {
  const [isNotificationVisible, setNotificationVisible] = useState(true);
  const recaptchaRef = useRef(null);
  const g = useTranslations("global");
  const locale = useLocale()
  
  const schema = z.object({
    fullName: z
      .string()
            .min(1, "Full name is required")
            .max(40, "Full name must be less than 40 characters")
            .regex(/^[\p{Script=Arabic}A-Za-z\s]+$/u, "Full name can only contain letters and spaces") // Allow Arabic, English letters, and spaces
			  
			  .refine(
				(val) => val.trim() === val,
				locale === "ar"
				  ? "الاسم لا يجب أن يحتوي على مسافات في البداية أو النهاية"
				  : "Name should not have leading or trailing spaces"
			  ),
    Watsmobile: z
      .string()
      .min(11, locale == "ar" ? "الرقم لابد ان يكون بين 11 الي 15 رقم" : "Watsapp number must be between 11 and 15 numbers")
      .max(15, locale == "ar" ? "الرقم لابد ان يكون بين 11 الي 15 رقم" : "Watsapp number must be between 11 and 15 numbers")
      .regex(/^01\d{9}$/, "WhatsApp number must start with 01 and have 9 digits"),
  });
  const { register, handleSubmit, formState: { errors }, setError, reset } = useForm({
    resolver: zodResolver(schema),
  });

  // Handle form submission
  const handleFormSubmit = async (data) => {
    const captchaValue = recaptchaRef.current?.getValue();
    if (!captchaValue) {
      toast.error("Please complete the CAPTCHA.");
      return;
    }

    // Prepare the data for the POST request
    const payload = {
      fullName: data.fullName,
      whatsApp: String(data.Watsmobile), // Replace with actual key for your API
    };
    (JSON.stringify(payload))

    try {
      // Send the POST request to the server
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/Subscription`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Specify JSON content type
        },
        body: JSON.stringify(payload), // Convert payload to JSON
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
      }

      const responseData = await response.json(); // Parse the response
      toast.success("Subscription successful!");

      // Reset the form after successful submission
      reset();
      recaptchaRef.current.reset();
    } catch (error) {
      console.error("Unexpected error:", error.message);
      toast.error("There was an error submitting the form.");
    }
  };

  const handleCloseNotification = () => {
    setNotificationVisible(false);
  };

  // Handle Full Name field changes and trigger validation on blur


  return (
    <>
      {/* Sticky Notification */}
      {isNotificationVisible && (
        <div
          className="animate-up-5 position-fixed bg-white rounded-3 p-3 custom-fixedContact-box"
          
        >
          <div className="d-flex justify-content-between">
            <h5 className="m-0 fs-6 fw-bold">
              {g("News")}
            </h5>
            <button
               aria-label="News"

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
          <p className="contact-button-aria-p">{g("newsProperty")}</p>
          <button
          aria-label="New Propert"
            className="contact-button-aria-label"
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
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <div className="modal-body pb-0">
                <div className="row">
                  <div className="col-12 mb-3">
                    <label htmlFor="fullName" className="form-label">
                      {g("fullName")}
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      className={`form-control ${errors.fullName ? "border-red" : ""}`}
                      placeholder={locale === "ar" ? "أدخل اسمك الكامل" : "Enter your full name"}
                      maxLength={30}
                      {...register("fullName")}
                    // onBlur={handleFullNameBlur} // Trigger validation on blur
                    />
                    {errors.fullName && (
                      <p className="error-text">{errors.fullName.message}</p>
                    )}
                  </div>

                  <div className="col-12 mb-3">
                    <label htmlFor="Watsmobile" className="form-label">
                      {g("WatsAppMobile")}
                    </label>
                    <input
                      type="tel"
                      id="Watsmobile"
                      className={`form-control ${errors.Watsmobile ? "border-red" : ""}`}
                      placeholder={locale === "ar" ? "أدخل رقم الواتس أب" : "Enter WhatsApp number"}

                      {...register("Watsmobile")}
                    />
                    {errors.Watsmobile && (
                      <p className="error-text">{errors.Watsmobile.message}</p>
                    )}
                  </div>
                </div>
              </div>

              <ReCAPTCHA
                
                className="mb10 d-flex align-items-center justify-content-center"
                ref={recaptchaRef}
                sitekey={process.env.NEXT_PUBLIC_KEY_CAPTCHA}
              />
              <div className="modal-footer justify-content-between">
                <button
                aria-label="Modal footer"
                  className="reset-button"
                  type="button"
                  onClick={() => {
                    reset();
                    recaptchaRef.current.reset();
                  }}
                >
                  <span className="flaticon-turn-back px-1" />

                  <u>{g("reset")}</u>
                </button>
                <div className="btn-area">
                  <button
                  aria-label="send contact"
                  data-bs-dismiss={!errors? "modal" : ""}
                    type="submit"
                    className="ud-btn btn-thm d-flex align-items-center gap-2"
                  >
                    <span>{g("sendContact")}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default StickyNotification;
