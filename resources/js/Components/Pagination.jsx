import React from 'react';

const Pagination = ({
  currentpage,
  nextpage,
  prevpage,
  firstpage,
  lastpage,
  totalRecord,
  totalPage,
  perPage,
  onPageChange,
}) => {
  const pageSize = Number(perPage) || 0;
  const from = totalRecord === 0 ? 0 : pageSize ? (currentpage - 1) * pageSize + 1 : null;
  const to = pageSize ? Math.min(currentpage * pageSize, totalRecord) : null;

  return (
    <nav className="table-pagination" aria-label="Table pagination">
      <span className="table-pagination-summary">
        {from !== null
          ? `Showing ${from}–${to} of ${totalRecord}`
          : `${totalRecord} records`}
      </span>
      <div className="table-pagination-controls">
        <span className="table-pagination-page">Page {currentpage} of {totalPage}</span>
        <button
          type="button"
          className="table-pagination-button"
          onClick={() => onPageChange(firstpage)}
          disabled={!prevpage}
          aria-label="First page"
        >
          First
        </button>
        <button
          type="button"
          className="table-pagination-button"
          onClick={() => onPageChange(prevpage || firstpage)}
          disabled={!prevpage}
          aria-label="Previous page"
        >
          Previous
        </button>
        <button
          type="button"
          className="table-pagination-button"
          onClick={() => onPageChange(nextpage || lastpage)}
          disabled={!nextpage}
          aria-label="Next page"
        >
          Next
        </button>
        <button
          type="button"
          className="table-pagination-button"
          onClick={() => onPageChange(lastpage)}
          disabled={!nextpage}
          aria-label="Last page"
        >
          Last
        </button>
      </div>
    </nav>
  );
};

export default Pagination;
