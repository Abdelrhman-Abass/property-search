// "use client";
// import { useRef, useState } from "react";
// import { useLocale, useTranslations } from "next-intl";
// import { useData } from "@/context";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import ReCAPTCHA from "react-google-recaptcha";
// import toast from "react-hot-toast";

// const ContactPopForm = () => {
//     const [formData, setFormData] = useState({
//         fullName: "",
//         mobile: "",
//         Watsmobile: "",
//         date: "",
//         time: "",
//     });
//     const g = useTranslations("global");
//     const { appSettings } = useData();
//     const recaptchaRef = useRef(null);

//     // Yup validation schema
//     const validationSchema = yup.object().shape({
//         fullName: yup.string().required(g("fullNameError")),
//         mobile: yup
//             .string()
//             .required(g("mobileError"))
//             .matches(/^01\d{9}$/, g("mobileInvalid")),
//         Watsmobile: yup
//             .string()
//             .required(g("watsMobileError"))
//             .matches(/^01\d{9}$/, g("watsMobileInvalid")),
//         date: yup.string().required(g("dateError")),
//         time: yup.string().required(g("timeError")),
//     });

//     const {
//         register,
//         handleSubmit,
//         reset,
//         formState: { errors },
//     } = useForm({
//         resolver: yupResolver(validationSchema),
//         defaultValues: formData,
//     });

//     const today = new Date().toISOString().split("T")[0];

//     const resetForm = () => {
//         reset();
//         setFormData({
//             fullName: "",
//             mobile: "",
//             Watsmobile: "",
//             date: "",
//             time: "",
//         });
//         if (recaptchaRef.current) {
//             recaptchaRef.current.reset();
//         }
//     };

//     const handleSubmitForm = (data) => {
//         const captchaValue = recaptchaRef.current?.getValue();
//         if (!captchaValue) {
//             toast.error("Recaptcha Error");
//         }
//         if (errors) {
//             toast.error("Format Error");
//         }


//         const { fullName, mobile, date, time } = data;
//         const message = `Hello, here are the details:\n\nFull Name: ${fullName}\nMobile: ${mobile}\nDate: ${date}\nTime: ${time}`;
//         const whatsappURL = `https://wa.me/${appSettings.whatsApp}?text=${encodeURIComponent(message)}`;
//         window.open(whatsappURL, "blank");
//     };

//     return (
//         <div className="modal-dialog modal-dialog-centered modal-lg">
//             <div className="modal-content">
//                 <div className="modal-header pl30 pr30">
//                     <h5 className="modal-title" id="exampleModalLabel">
//                         {g("SpecifyTime")}
//                     </h5>
//                     <button
//                         type="button"
//                         className="btn-close m-0"
//                         data-bs-dismiss="modal"
//                         aria-label="Close"
//                     />
//                 </div>
//                 <form onSubmit={(event) => {
//                     event.preventDefault(); // Prevent page reload
//                     handleSubmitForm();
//                 }}>
//                     <div className="modal-body pb-0">
//                         <div className="row">
//                             <div className="col-12 mb-3">
//                                 <label htmlFor="fullName" className="form-label">
//                                     {g("fullName")}
//                                 </label>
//                                 <input
//                                     type="text"
//                                     id="fullName"
//                                     name="fullName"
//                                     className={`form-control ${errors.fullName ? "border-red" : ""}`}
//                                     placeholder={g("FullNamePlaceHolder")}
//                                     {...register("fullName")}
//                                 />
//                                 {errors.fullName && (
//                                     <p className="error-text">برجاء ادخال الاسم</p>
//                                 )}
//                             </div>
//                             <div className="col-6 mb-3">
//                                 <label htmlFor="mobile" className="form-label">
//                                     {g("Mobile")}
//                                 </label>
//                                 <input
//                                     type="tel"
//                                     id="mobile"
//                                     name="mobile"
//                                     className={`form-control ${errors.mobile ? "border-red" : ""}`}
//                                     placeholder={g("MobileHolder")}
//                                     {...register("mobile")}
//                                 />
//                                 {errors.mobile && (
//                                     <p className="error-text">برجاء ادخال رقم صحيح </p>
//                                 )}
//                             </div>
//                             <div className="col-6 mb-3">
//                                 <label htmlFor="Watsmobile" className="form-label">
//                                     {g("WatsAppMobile")}
//                                 </label>
//                                 <input
//                                     type="tel"
//                                     id="Watsmobile"
//                                     name="Watsmobile"
//                                     className={`form-control ${errors.Watsmobile ? "border-red" : ""}`}
//                                     placeholder={g("MobileHolder")}
//                                     {...register("Watsmobile")}
//                                 />
//                                 {errors.Watsmobile && (
//                                     <p className="error-text">برجاء ادخال رقم صحيح </p>
//                                 )}
//                             </div>
//                             <div className="col-6 mb-3">
//                                 <label htmlFor="date" className="form-label">
//                                     {g("Date")}
//                                 </label>
//                                 <input
//                                     type="date"
//                                     id="date"
//                                     name="date"
//                                     className={`form-control ${errors.date ? "border-red" : ""}`}
//                                     min={today}
//                                     {...register("date")}
//                                 />
//                                 {errors.date && (
//                                     <p className="error-text">برجاء ادخال تاريخ صحيح </p>
//                                 )}
//                             </div>
//                             <div className="col-6 mb-3">
//                                 <label htmlFor="time" className="form-label">
//                                     {g("Time")}
//                                 </label>
//                                 <input
//                                     type="time"
//                                     id="time"
//                                     name="time"
//                                     className={`form-control ${errors.time ? "border-red" : ""}`}
//                                     {...register("time")}
//                                 />
//                                 {errors.time && (
//                                     <p className="error-text">برجاء ادخال توقيت صحيح </p>
//                                 )}
//                             </div>
//                             <div className="col-12 mb-3">
//                                 <ReCAPTCHA
//                                     ref={recaptchaRef}
//                                     sitekey={process.env.NEXT_PUBLIC_KEY_CAPTCHA}
//                                 />
//                             </div>
//                         </div>
//                     </div>
//                     <div className="modal-footer justify-content-between">
//                         <button
//                             className="reset-button"
//                             type="button"
//                             onClick={resetForm}
//                         >
//                             <span className="flaticon-turn-back px-1" />
//                             <u>{g("reset")}</u>
//                         </button>
//                         <div className="btn-area">
//                             <button
//                                 data-bs-dismiss="modal"
//                                 type="submit"
//                                 className="ud-btn btn-thm d-flex align-items-center gap-2"
//                             >
//                                 <span>{g("sendContact")}</span>
//                             </button>
//                         </div>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default ContactPopForm;
"use client";

import { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import ReCAPTCHA from "react-google-recaptcha";
import toast from "react-hot-toast";
import { useLocale, useTranslations } from "next-intl";
import { useData } from "@/context";
import { Modal } from "bootstrap";


const ContactPopForm = () => {
    const { appSettings } = useData();
    const recaptchaRef = useRef(null);
    const locale = useLocale();
    const g = useTranslations("global");
    const modalRef = useRef(null); // Reference to the modal

    // Validation schema
    const schema = z.object({
        fullName: z
            .string()
            .min(1, "Full name is required")
            .refine(
                (val) => val.split(" ").length > 1 && val.split(" ").length < 3,
                locale === "ar"
                    ? "الاسم يجب أن يكون بين كلمتين وثلاث كلمات"
                    : "Full name must be between two and three words"
            ),
        mobile: z
            .string()
            .min(11, locale == "ar" ? "الرقم لابد ان يكون بين 11 الي 15 رقم" : "Watsapp number must be between 11 and 15 numbers")
            .max(15, locale == "ar" ? "الرقم لابد ان يكون بين 11 الي 15 رقم" : "Watsapp number must be between 11 and 15 numbers")
            .regex(/^01\d{9}$/, "WhatsApp number must start with 01 and have 9 digits"),
        Watsmobile: z
            .string()
            .min(11, locale == "ar" ? "الرقم لابد ان يكون بين 11 الي 15 رقم" : "Watsapp number must be between 11 and 15 numbers")
            .max(15, locale == "ar" ? "الرقم لابد ان يكون بين 11 الي 15 رقم" : "Watsapp number must be between 11 and 15 numbers")
            .regex(/^01\d{9}$/, "WhatsApp number must start with 01 and have 9 digits"),
        date: z.string().date(),
        time: z.string(),
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
    });

    const today = new Date().toISOString().split("T")[0];

    const resetForm = () => {
        reset();
        recaptchaRef.current?.reset();
    };

    const handleFormSubmit = (data) => {
        const captchaValue = recaptchaRef.current?.getValue();
        if (!captchaValue) {
            toast.error(g("captchaError"));
            return;
        }

        const { fullName, mobile, Watsmobile, date, time } = data;
        const message = `Hello, here are the details:\n\nFull Name: ${fullName}\nMobile: ${mobile}\nWhatsApp Mobile: ${Watsmobile}\nDate: ${date}\nTime: ${time}`;
        const whatsappURL = `https://wa.me/${appSettings.whatsApp}?text=${encodeURIComponent(message)}`;

        // Open WhatsApp with the pre-filled message
        window.open(whatsappURL, "blank");

        toast.success(g("successMessage"));
        resetForm();
        const modal = Modal.getInstance(modalRef.current);
        if (modal) {
            modal.hide();
        }
    };

    return (
        <div className="modal-dialog modal-dialog-centered modal-lg" ref={modalRef}
        id="contactModal"
        tabIndex="-1"
        aria-labelledby="contactModalLabel"
        aria-hidden="true"
            style={{ zIndex: 1101 }}>
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
                                    placeholder={g("FullNamePlaceHolder")}
                                    {...register("fullName")}
                                />
                                {errors.fullName && <p className="error-text">{errors.fullName.message}</p>}
                            </div>

                            <div className="col-6 mb-3">
                                <label htmlFor="mobile" className="form-label">
                                    {g("Mobile")}
                                </label>
                                <input
                                    type="tel"
                                    id="mobile"
                                    className={`form-control ${errors.mobile ? "border-red" : ""}`}
                                    placeholder={g("MobileHolder")}
                                    {...register("mobile")}
                                />
                                {errors.mobile && <p className="error-text">{errors.mobile.message}</p>}
                            </div>

                            <div className="col-6 mb-3">
                                <label htmlFor="Watsmobile" className="form-label">
                                    {g("WatsAppMobile")}
                                </label>
                                <input
                                    type="tel"
                                    id="Watsmobile"
                                    className={`form-control ${errors.Watsmobile ? "border-red" : ""}`}
                                    placeholder={g("MobileHolder")}
                                    {...register("Watsmobile")}
                                />
                                {errors.Watsmobile && <p className="error-text">{errors.Watsmobile.message}</p>}
                            </div>

                            <div className="col-6 mb-3">
                                <label htmlFor="date" className="form-label">
                                    {g("Date")}
                                </label>
                                <input
                                    type="date"
                                    id="date"
                                    className={`form-control ${errors.date ? "border-red" : ""}`}
                                    min={today}
                                    {...register("date")}
                                />
                                {errors.date && <p className="error-text">{errors.date.message}</p>}
                            </div>

                            <div className="col-6 mb-3">
                                <label htmlFor="time" className="form-label">
                                    {g("Time")}
                                </label>
                                <input
                                    type="time"
                                    id="time"
                                    className={`form-control ${errors.time ? "border-red" : ""}`}
                                    {...register("time")}
                                />
                                {errors.time && <p className="error-text">{errors.time.message}</p>}
                            </div>

                            <div className="col-12 mb-3">
                                <ReCAPTCHA ref={recaptchaRef} sitekey={process.env.NEXT_PUBLIC_KEY_CAPTCHA} />
                            </div>
                        </div>
                    </div>

                    <div className="modal-footer justify-content-between">
                        <button className="reset-button" type="button" onClick={resetForm}>
                            <span className="flaticon-turn-back px-1" />
                            <u>{g("reset")}</u>
                        </button>
                        <div className="btn-area">
                            <button type="submit" data-bs-dismiss={!errors ? "modal" : ""}
                                className="ud-btn btn-thm d-flex align-items-center gap-2">
                                <span>{g("sendContact")}</span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ContactPopForm;
