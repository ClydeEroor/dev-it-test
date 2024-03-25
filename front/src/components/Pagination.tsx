import React, { useEffect, useState } from 'react';

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  onPageChange: React.Dispatch<React.SetStateAction<number>>;
};

const Pagination = ({ totalPages, currentPage, onPageChange }: PaginationProps) => {
  const [visiblePages, setVisiblePages] = useState<number[]>([]);

  useEffect(() => {
    const maxVisiblePages = 9;
    const pagesArray = [];

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    if (totalPages - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, totalPages - maxVisiblePages + 1);
    }
    for (let i = 0; i < Math.min(totalPages, maxVisiblePages); i++) {
      pagesArray.push(startPage + i);
    }

    setVisiblePages(pagesArray);
  }, [totalPages, currentPage]);

  return (
    <div className={'text-matrix gap-x-2 justify-center flex fixed right-0 left-0 bottom-20'}>
      {visiblePages.map(page => (
        <button
          className={`hover:text-white border border-matrix px-1 min-w-[30px] ${currentPage === page ? 'text-white' : ''}`}
          key={page}
          onClick={() => onPageChange(page)}
          disabled={page === currentPage}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
