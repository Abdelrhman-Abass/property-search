"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const Pagination = ({
  totalPages = 1,
  currentPage = 1,
  setCurrentPage = () => {},
  scrollToSectionRef = null,
}) => {
  const router = useRouter();
  const [isPaginating, setIsPaginating] = useState(false); // State to track pagination

  const handlePrevious = () => {
    setCurrentPage((prevPage) => prevPage - 1);
    setIsPaginating(true);
  };

  const handleNext = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    setIsPaginating(true);
  };

  const renderPaginationItems = () => {
    const paginationItems = [];

    paginationItems.push(
      <li className="page-item" key="previous">
        <button
        aria-label="paginiation left"
          className="page-link"
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          <FaAngleRight style={{fontSize:25}} />          

        </button>
      </li>
    );

    for (let page = 1; page <= totalPages; page++) {
      paginationItems.push(
        <li
          className={`page-item ${currentPage === page ? "active" : ""}`}
          aria-current={currentPage === page ? "page" : undefined}
          key={page}
        >
          <button aria-label="Pagination page" className="page-link" onClick={() => setCurrentPage(page)}>
            {page}
          </button>
        </li>
      );
    }

    paginationItems.push(
      <li className="page-item" key="next">
        <button
        aria-label="Pagination Right"
          className="page-link"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          <FaAngleLeft style={{fontSize:25}} />          

        </button>
      </li>
    );

    return paginationItems;
  };

  // useEffect(() => {
  //   router.push(`/${locale}/blog?page=${currentPage}`); //here gpt
  // }, [currentPage]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("page", currentPage);

    // Scroll to the top of the section
    if (scrollToSectionRef && scrollToSectionRef.current && isPaginating) {
      router.push(`${window.location.pathname}?${searchParams.toString()}`, {
        shallow: true,
        scroll: false,
      });
      const sectionTop = scrollToSectionRef.current.getBoundingClientRect().top;
      const offsetPosition = window.pageYOffset + sectionTop - 100;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    } else {
      router.push(
        `${window.location.pathname}?${searchParams.toString()}`,
        undefined,
        { shallow: true }
      );
    }
  }, [currentPage, router, scrollToSectionRef]);

  return (
    totalPages > 1 && (
      <ul className="page_navigation mt20">{renderPaginationItems()}</ul>
    )
  );
};

export default Pagination;
