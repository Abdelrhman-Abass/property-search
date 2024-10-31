"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocale } from "next-intl";
import { ApiGetter } from "@/services/ApiGetter";

const formatSelectData = (array, locale) => {
  return array?.map(({ nameAr, nameEn, id }) => ({
    value: id,
    label: locale == "ar" ? nameAr : nameEn,
  }));
};

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const locale = useLocale();
  const [propertyTypesData, setPropertyTypesData] = useState([]);
  const [areasData, setAreasData] = useState([]);
  const [appSettings, setAppSettings] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [propertyTypesResponse, areasResponse, settingsResponse] =
          await Promise.all([
            ApiGetter({ url: "/api/PropertyTypes" }),
            ApiGetter({ url: "/api/Area" }),
            ApiGetter({ url: "/api/Settings" }),
          ]);


        setPropertyTypesData(
          formatSelectData(propertyTypesResponse?.data, locale)
        );
        setAreasData(formatSelectData(areasResponse?.data, locale));
        setAppSettings(settingsResponse?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <DataContext.Provider
      value={{ propertyTypesData, areasData, appSettings, error, loading }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};
