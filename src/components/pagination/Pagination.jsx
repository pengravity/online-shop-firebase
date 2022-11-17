import { useState } from 'react';

import styles from './Pagination.module.scss';

const Pagination = ({
  currentPage,
  setCurrentPage,
  productsPerPage,
  totalProducts,
}) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className={styles.pagination}>
      <li
        onClick={() => paginate(currentPage - 1)}
        className={currentPage === 1 ? `${styles.hidden}` : null}
      >
        Prev
      </li>
      {pageNumbers.map((number) => {
        if (
          number <= totalPages &&
          number > 0 &&
          // displaying 2 pages on each side of the current page
          number >= currentPage - 2 &&
          number <= currentPage + 2
        ) {
          return (
            <li
              key={number}
              onClick={() => paginate(number)}
              className={currentPage === number ? `${styles.active}` : null}
            >
              {number}
            </li>
          );
        }
      })}
      <li
        onClick={() => paginate(currentPage + 1)}
        className={currentPage === totalPages ? `${styles.hidden}` : null}
      >
        Next
      </li>
      <p>
        <b className={styles.page}>{`page ${currentPage}`}</b>
        <span>{` of `}</span>
        <b>{`${Math.ceil(totalPages)}`}</b>
      </p>
    </ul>
  );
};

export default Pagination;
