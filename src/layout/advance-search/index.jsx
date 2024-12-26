// "use client";
// import Select from "react-select";
// import PriceRange from "./PriceRange";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useLocale, useTranslations } from "next-intl";
// import { useEffect, useState } from "react";
// import { useData } from "@/context";

// const AdvanceFilterModal = () => {
//   const searchParams = useSearchParams();
//   const { propertyTypesData, areasData } = useData();

//   const router = useRouter();
//   const g = useTranslations("global");
//   const local = useLocale();

//   const customStyles = {
//     option: (styles, { isFocused, isSelected, isHovered }) => {
//       return {
//         ...styles,
//         backgroundColor: isSelected
//           ? "#0f2950"
//           : isHovered
//           ? "#eb675312"
//           : isFocused
//           ? "#eb675312"
//           : undefined,
//       };
//     },
//   };

//   //search data

//   // convert to object set 
//   const [price, setPrice] = useState([0, 10000000]);
//   const [propertyType, setPropertyType] = useState("");
//   const [rooms, setRooms] = useState("");
//   const [minArea, setMinArea] = useState("");
//   const [maxArea, setMaxArea] = useState("");
//   const [selectetArea, setSelectetArea] = useState("");


//   // update after converting
//   useEffect(() => {
//     const query = {
//       SearchTerm: searchParams.get("SearchTerm") || "",
//       MinPrice: searchParams.get("MinPrice") || 0,
//       MaxPrice: searchParams.get("MaxPrice") || 10000000,
//       PropertyTypeIds: searchParams.get("PropertyTypeIds") || "",
//       Rooms: searchParams.get("Rooms") || "",
//       MinArea: searchParams.get("MinArea") || "",
//       MaxArea: searchParams.get("MaxArea") || "",
//       AreaId: searchParams.get("AreaId") || "",
//       OrderBy: searchParams.get("OrderBy") || "Latest",
//     };
//     setPrice([query.MinPrice, query.MaxPrice]);
//     setPropertyType(query.PropertyTypeIds);
//     setRooms(query.Rooms);
//     setMinArea(query.MinArea);
//     setMaxArea(query.MinArea);
//     setMaxArea(query.MaxArea);
//     setSelectetArea(query.AreaId);
//   }, []);

//   // calleback function 
//   const searchHandler = () => {
//     router.push(
//       `/${local}/search?MinPrice=${price[0]}&MaxPrice=${price[1]}&PropertyTypeIds=${propertyType}&Rooms=${rooms}&MinArea=${minArea}&MaxArea=${maxArea}&AreaId=${selectetArea}`
//     );
//   };


//   // calleback function 

//   const reset = () => {
//     setPrice([0, 10000000]);
//     setPropertyType("");
//     setRooms("");
//     setMinArea("");
//     setMaxArea("");
//     setSelectetArea("");
//   };

//   return (
//     <div className="modal-dialog modal-dialog-centered modal-lg">
//       <div className="modal-content">
//         <div className="modal-header pl30 pr30">
//           <h5 className="modal-title" id="exampleModalLabel">
//             {g("moreSearch")}
//           </h5>
//           <button
//             type="button"
//             className="btn-close m-0"
//             data-bs-dismiss="modal"
//             aria-label="Close"
//           />
//         </div>
//         <div className="modal-body pb-0">
//           <div className="row">
//             <div className="col-lg-12">
//               <div className="widget-wrapper">
//                 <h6 className="list-title mb20">{g("price")}</h6>
//                 <div className="range-slider-style modal-version">
//                   <PriceRange price={price} setPrice={setPrice} />
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="row">
//             <div className="col-sm-6">
//               <div className="widget-wrapper">
//                 <h6 className="list-title">{g("type")}</h6>
//                 <div className="form-style2 input-group">
//                   <Select
//                     name="type"
//                     options={propertyTypesData}
//                     styles={customStyles}
//                     className="select-custom"
//                     classNamePrefix="select"
//                     placeholder={g("type")}
//                     onChange={(e) => setPropertyType(e ? e.value : null)}
//                     value={
//                       propertyTypesData?.find(
//                         (option) => option.value === propertyType
//                       ) || null
//                     }
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="col-sm-6">
//               <div className="widget-wrapper">
//                 <h6 className="list-title">{g("romsNumber")}</h6>
//                 <div className="form-style2">
//                   <input
//                     onChange={(e) => {
//                       const value = e.target.value;
//                       if (value >= 0) {
//                         setRooms(value);
//                       }
//                     }}
//                     value={rooms}
//                     type="number"
//                     min={0}
//                     className="form-control"
//                     placeholder={g("romsNumber")}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="row">
//             <div className="col-sm-6">
//               <div className="widget-wrapper">
//                 <h6 className="list-title">{g("slectArea")}</h6>
//                 <div className="form-style2 input-group">
//                   <Select
//                     name="slectArea"
//                     styles={customStyles}
//                     options={areasData}
//                     value={
//                       areasData?.find(
//                         (option) => option.value === selectetArea
//                       ) || null
//                     }
//                     onChange={(e) => setSelectetArea(e ? e.value : null)}
//                     className="select-custom"
//                     classNamePrefix="select"
//                     placeholder={g("slectArea")}
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="col-sm-6">
//               <div className="widget-wrapper">
//                 <h6 className="list-title">
//                   {g("theArea")} {g("sqft")}
//                 </h6>
//                 <div className="space-area">
//                   <div className="d-flex align-items-center justify-content-between">
//                     <div className="form-style1">
//                       <input
//                         type="number"
//                         className="form-control"
//                         min={0}
//                         placeholder={g("from")}
//                         onChange={(e) => {
//                           const value = e.target.value;
//                           if (value >= 0) {
//                             setMinArea(value);
//                           }
//                         }}
//                         value={minArea}
//                       />
//                     </div>
//                     <span className="dark-color">-</span>
//                     <div className="form-style1">
//                       <input
//                         type="number"
//                         min={0}
//                         className="form-control"
//                         placeholder={g("to")}
//                         onChange={(e) => {
//                           const value = e.target.value;
//                           if (value >= 0) {
//                             setMaxArea(value);
//                           }
//                         }}
//                         value={maxArea}
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="modal-footer justify-content-between">
//           <button className="reset-button" onClick={reset}>
//             <span className="flaticon-turn-back px-1" />
//             <u>{g("reset")}</u>
//           </button>
//           <div className="btn-area">
//             <button
//               data-bs-dismiss="modal"
//               type="submit"
//               className="ud-btn btn-thm d-flex align-items-center gap-2"
//               onClick={searchHandler}
//             >
//               <span>{g("search")}</span>
//               <span className="flaticon-search d-flex items-center justify-content-center align-text-top" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdvanceFilterModal;

"use client";

import Select from "react-select";
import PriceRange from "./PriceRange";
import { useRouter, useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState, useCallback } from "react";
import { useData } from "@/context";

const AdvanceFilterModal = () => {
  const searchParams = useSearchParams();
  const { propertyTypesData, areasData } = useData();

  const router = useRouter();
  const translate = useTranslations("global");
  const locale = useLocale();

  const [filters, setFilters] = useState({
    price: [0, 10000000],
    propertyType: "",
    rooms: "",
    minArea: "",
    maxArea: "",
    selectedArea: "",
  });

  const customStyles = {
    option: (styles, { isFocused, isSelected, isHovered }) => ({
      ...styles,
      backgroundColor: isSelected
        ? "#0f2950"
        : isHovered || isFocused
        ? "#eb675312"
        : undefined,
    }),
  };

  const initializeFilters = useCallback(() => {
    const query = {
      SearchTerm: searchParams.get("SearchTerm") || "",
      MinPrice: Number(searchParams.get("MinPrice")) || 0,
      MaxPrice: Number(searchParams.get("MaxPrice")) || 10000000,
      PropertyTypeIds: searchParams.get("PropertyTypeIds") || "",
      Rooms: searchParams.get("Rooms") || "",
      MinArea: searchParams.get("MinArea") || "",
      MaxArea: searchParams.get("MaxArea") || "",
      AreaId: searchParams.get("AreaId") || "",
      OrderBy: searchParams.get("OrderBy") || "Latest",
    };

    setFilters({
      price: [query.MinPrice, query.MaxPrice],
      propertyType: query.PropertyTypeIds,
      rooms: query.Rooms,
      minArea: query.MinArea,
      maxArea: query.MaxArea,
      selectedArea: query.AreaId,
    });
  }, [searchParams]);

  useEffect(() => {
    initializeFilters();
  }, [initializeFilters]);

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    const { price, propertyType, rooms, minArea, maxArea, selectedArea } = filters;

    router.push(
      `/${locale}/search?MinPrice=${price[0]}&MaxPrice=${price[1]}&PropertyTypeIds=${propertyType}&Rooms=${rooms}&MinArea=${minArea}&MaxArea=${maxArea}&AreaId=${selectedArea}`
    );
  };

  const handleReset = () => {
    setFilters({
      price: [0, 10000000],
      propertyType: "",
      rooms: "",
      minArea: "",
      maxArea: "",
      selectedArea: "",
    });
  };

  return (
    <div className="modal-dialog modal-dialog-centered modal-lg">
      <div className="modal-content">
        <div className="modal-header pl30 pr30">
          <h5 className="modal-title" id="exampleModalLabel">
            {translate("moreSearch")}
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
            <div className="col-lg-12">
              <div className="widget-wrapper">
                <h6 className="list-title mb20">{translate("price")}</h6>
                <div className="range-slider-style modal-version">
                  <PriceRange price={filters.price} setPrice={(value) => updateFilter("price", value)} />
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-6">
              <div className="widget-wrapper">
                <h6 className="list-title">{translate("type")}</h6>
                <div className="form-style2 input-group">
                  <Select
                    name="type"
                    options={propertyTypesData}
                    styles={customStyles}
                    className="select-custom"
                    classNamePrefix="select"
                    placeholder={translate("type")}
                    onChange={(e) => updateFilter("propertyType", e ? e.value : null)}
                    value={
                      propertyTypesData?.find((option) => option.value === filters.propertyType) ||
                      null
                    }
                  />
                </div>
              </div>
            </div>

            <div className="col-sm-6">
              <div className="widget-wrapper">
                <h6 className="list-title">{translate("romsNumber")}</h6>
                <div className="form-style2">
                  <input
                    type="number"
                    min={0}
                    className="form-control"
                    placeholder={translate("romsNumber")}
                    value={filters.rooms}
                    onChange={(e) => updateFilter("rooms", e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-6">
              <div className="widget-wrapper">
                <h6 className="list-title">{translate("slectArea")}</h6>
                <div className="form-style2 input-group">
                  <Select
                    name="slectArea"
                    styles={customStyles}
                    options={areasData}
                    value={
                      areasData?.find((option) => option.value === filters.selectedArea) || null
                    }
                    onChange={(e) => updateFilter("selectedArea", e ? e.value : null)}
                    className="select-custom"
                    classNamePrefix="select"
                    placeholder={translate("slectArea")}
                  />
                </div>
              </div>
            </div>

            <div className="col-sm-6">
              <div className="widget-wrapper">
                <h6 className="list-title">
                  {translate("theArea")} {translate("sqft")}
                </h6>
                <div className="space-area">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="form-style1">
                      <input
                        type="number"
                        className="form-control"
                        min={0}
                        placeholder={translate("from")}
                        value={filters.minArea}
                        onChange={(e) => updateFilter("minArea", e.target.value)}
                      />
                    </div>
                    <span className="dark-color">-</span>
                    <div className="form-style1">
                      <input
                        type="number"
                        min={0}
                        className="form-control"
                        placeholder={translate("to")}
                        value={filters.maxArea}
                        onChange={(e) => updateFilter("maxArea", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer justify-content-between">
          <button className="reset-button" onClick={handleReset}>
            <span className="flaticon-turn-back px-1" />
            <u>{translate("reset")}</u>
          </button>

          <div className="btn-area">
            <button
              data-bs-dismiss="modal"
              type="submit"
              className="ud-btn btn-thm d-flex align-items-center gap-2"
              onClick={handleSearch}
            >
              <span>{translate("search")}</span>
              <span className="flaticon-search d-flex items-center justify-content-center align-text-top" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvanceFilterModal;
