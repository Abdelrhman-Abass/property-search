"use client";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useData } from "@/context";

const ContactPopForm = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        mobile: "",
        Watsmobile:"",
        date: "",
        time: "",
    });
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
            mobile: "",
            date: "",
            time: "",
            Watsmobile:"",
        });
    };

    const handleSubmit = () => {
        const { fullName, mobile, date, time } = formData;
        const message = `Hello, here are the details:\n\nFull Name: ${fullName}\nMobile: ${mobile}\nDate: ${date}\nTime: ${time}`;
        const whatsappURL = `https://wa.me/${appSettings.whatsApp}?text=${encodeURIComponent(message)}`;
        window.open(whatsappURL, "blank");
    };

    return (
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
                <div className="modal-body pb-0">
                    <div className="row">
                        <div className="col-12 mb-3">
                            <label htmlFor="fullName" className="form-label">
                                {g("fullName")}
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
                        <div className="col-6 mb-3">
                            <label htmlFor="mobile" className="form-label">
                                {g("Mobile")}
                            </label>
                            <input
                                type="tel"
                                id="mobile"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                                className="form-control"
                                placeholder={g("MobileHolder")}
                                required
                            />
                        </div>
                        <div className="col-6 mb-3">
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
                        <div className="col-6 mb-3">
                            <label htmlFor="date" className="form-label">
                                {g("Date")}
                            </label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="col-6 mb-3">
                            <label htmlFor="time" className="form-label">
                                {g("Time")}
                            </label>
                            <input
                                type="time"
                                id="time"
                                name="time"
                                value={formData.time}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </div>
                    </div>
                </div>
                
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
    );
};

export default ContactPopForm;
