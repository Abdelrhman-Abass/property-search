"use client";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useLocale, useTranslations } from "next-intl";
import toast from "react-hot-toast";
import ReCAPTCHA from "react-google-recaptcha";
import { GoArrowUpRight } from "react-icons/go";

const Form = ({ id, type = 0, url }) => {
  const t = useTranslations("global");
  const f = useTranslations("form");
  const [isLoading, setIsLoading] = useState(false);
  const recaptcha = useRef();
  const locale = useLocale();

  const validationSchema = yup.object().shape({
    fullName: yup
      .string()
      .required(locale === "ar" ? "الاسم الكامل مطلوب" : "Full name is required") // Required field
      .min(1, locale === "ar" ? "الاسم الكامل مطلوب" : "Full name is required") // Minimum length
      .max(40, locale === "ar" ? "الاسم الكامل يجب أن يكون أقل من 40 حرفًا" : "Full name must be less than 40 characters") // Maximum length
      .matches(
        /^[\p{Script=Arabic}A-Za-z\s]+$/u,
        locale === "ar" ? "الاسم الكامل يمكن أن يحتوي فقط على أحرف ومسافات" : "Full name can only contain letters and spaces"
      ) // Regex validation for Arabic, English letters, and spaces
      .test(
        "no-leading-trailing-spaces",
        locale === "ar" ? "الاسم لا يجب أن يحتوي على مسافات في البداية أو النهاية" : "Name should not have leading or trailing spaces",
        (value) => value.trim() === value
      ), // Trim validation
    mobile: yup
      .string()
      .required(locale === "ar" ? "رقم الهاتف مطلوب" : "Mobile number is required")
      .matches(/^01\d{9}$/, locale === "ar" ? "رقم الهاتف يجب أن يبدأ بـ 01 ويحتوي على 9 أرقام" : "Mobile number must start with 01 and have 9 digits"),
    email: yup
      .string()
      .required(locale === "ar" ? "البريد الإلكتروني مطلوب" : "Email is required")
      .email(locale === "ar" ? "البريد الإلكتروني غير صالح" : "Email must be a valid email address"),
    message: yup
      .string()
      .required(locale === "ar" ? "الرسالة مطلوبة" : "Message is required"),
  });


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const formHandler = async (form, url) => {
    setIsLoading(true);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (data.success) {
        toast.success(f("success"));
        reset();
      } else {
        toast.error(f("error"));
      }
    } catch (error) {
      toast.error(f("error"));
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (formData) => {
    const captchaValue = recaptcha.current.getValue();
    if (!captchaValue) {
      alert("Please verify the reCAPTCHA!");
    } else {
      if (type) {
        const request = {
          ...formData,
          "requestedItemId": id,
          "requestedItemType": type,
          "link": "https://property-search.com" + url,
        };
        // console.log(request)
        await formHandler(request, `${process.env.NEXT_PUBLIC_BASE_URL}/api/Request`);
      } else {
        await formHandler(formData, `${process.env.NEXT_PUBLIC_BASE_URL}/api/ContactUs`);
      }
    }
  };

  return (
    <>
      <form className="form-style1" onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-lg-12">
            <div className="mb20">
              <label className="heading-color ff-heading fw600 mb10">
                {t("name")}
              </label>
              <input
                type="text"
                className={`form-control ${errors.fullName ? "border-red" : ""
                  }`}
                maxLength={40} // Limit input to 40 characters
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^\p{Script=Arabic}A-Za-z\s]/gu, ''); // Remove non-alphabetic characters
                }}
                placeholder={t("name")}
                {...register("fullName")}
              />
              {errors.fullName && (
                <p className="error-text">{errors.fullName.message}</p>
              )}
            </div>
          </div>

          <div className="col-lg-12">
            <div className="mb20">
              <label className="heading-color ff-heading fw600 mb10">
                {t("phone")}
              </label>
              <input
                type="text"
                className={`form-control ${errors.mobile ? "border-red" : ""}`}
                placeholder={t("phone")}
                {...register("mobile")}
              />
              {errors.mobile && (
                <p className="error-text">{errors.mobile.message}</p>
              )}
            </div>
          </div>

          <div className="col-md-12">
            <div className="mb20">
              <label className="heading-color ff-heading fw600 mb10">
                {t("email")}
              </label>
              <input
                type="email"
                className={`form-control ${errors.email ? "border-red" : ""}`}
                placeholder={t("email")}
                {...register("email")}
              />
              {errors.email && (
                <p className="error-text">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="col-md-12">
            <div className="mb10">
              <label className="heading-color ff-heading fw600 mb10">
                {t("msg")}
              </label>
              <textarea
                className={` h-auto form-control ${errors.message ? "border-red" : ""}`}
                cols={30}
                rows={6}
                placeholder={t("msg")}
                {...register("message")}
              />
              {errors.message && (
                <p className="error-text">{errors.message.message}</p>
              )}
            </div>
          </div>
          <ReCAPTCHA

            className="mb10 d-flex align-items-center justify-content-center"
            ref={recaptcha}
            sitekey={process.env.NEXT_PUBLIC_KEY_CAPTCHA}
          />
          <div className="col-md-12">
            <div className="d-grid">
              <button
                aria-label="Recaptcha"
                disabled={isLoading}
                style={{ opacity: isLoading && 0.7 }}
                type="submit"
                className="ud-btn btn-thm gap-2"
              >
                <span className="mx-1">{t("send")}</span>
                {isLoading ? (
                  <div
                    className="spinner-border text-light mx-2 loading-form-content"
                    role="status"
                  >
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  <GoArrowUpRight className='fs22' />

                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Form;
