"use server";
import React from "react";
import Head from "./components/Head";
import MainList from "@/layout/main/MainList";
import SearchPagination from "./components/SearchPagination";
import { ApiGetter } from "@/services/ApiGetter";

export async function generateMetadata({ params, searchParams }) {
  const SearchTerm = searchParams?.SearchTerm;
  return {
    title:
      params.locale == "ar"
        ? `بحث ${SearchTerm && `| ${SearchTerm}`}`
        : `Search  ${SearchTerm && `| ${SearchTerm}`}`,
  };
}

const Search = async ({ searchParams }) => {
  const {
    SearchTerm,
    MinPrice,
    MaxPrice,
    PropertyTypeIds,
    Rooms,
    MinArea,
    MaxArea,
    AreaId,
    OrderBy,
    page,
  } = searchParams;

  const queryString = new URLSearchParams({
    SearchTerm: SearchTerm || "",
    MinPrice: MinPrice || "",
    MaxPrice: MaxPrice || "",
    PropertyTypeIds: PropertyTypeIds || "",
    Rooms: Rooms || "",
    MinArea: MinArea || "",
    MaxArea: MaxArea || "",
    AreaId: AreaId || "",
    OrderBy: OrderBy || "Latest",
    PageNumber: page || 1,
  }).toString();
  const pageSize = 9;
  const url = `/api/PropertySearch/search?${queryString}&pageSize=${pageSize}`;
  const data = await ApiGetter({ url, type: "SSR" });

  return (
    <section className="pt30-md pt150 pb30">
      <Head headSearchTerm={SearchTerm} />
      <MainList
        data={data?.data?.items || []}
        networkError={data === null}
        searchParams={searchParams}
        type="property"
      />
      <SearchPagination
        pageSize={pageSize}
        totalRecords={data?.data?.totalRecords || []}
      />
    </section>
  );
};

export default Search;
