"use client";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";
import ReCAPTCHA from "react-google-recaptcha";
import { GoArrowUpRight } from "react-icons/go";

const Form = ({ id, type = 0 }) => {
  const t = useTranslations("global");
  const f = useTranslations("form");
  const [isLoading, setIsLoading] = useState(false);
  const recaptcha = useRef();

  const validationSchema = yup.object().shape({
    fullName: yup.string().required(f("fullName")),
    mobile: yup
      .string()
      .required(f("mobileReq"))
      .matches(/^01\d{9}$/, f("mobile")),
    email: yup.string().required(f("emailReq")).email(f("email")),
    message: yup.string().required(f("msg")),
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
          requestedItemId: id,
          requestedItemType: type,
        };
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
                className={`form-control ${
                  errors.fullName ? "border-red" : ""
                }`}
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
                  <GoArrowUpRight className='fs22'  />          

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
