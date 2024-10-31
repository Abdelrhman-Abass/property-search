"use client";
import Pagination from "@/layout/Pagination";
import React, { useState } from "react";

const SearchPagination = ({ totalRecords, pageSize }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalRecords / pageSize);

  return (
    <div className="row">
      <div className="mbp_pagination text-center">
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default SearchPagination;
