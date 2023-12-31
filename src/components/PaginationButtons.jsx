import PaginationButton from "./PaginationButton";

const PaginationButtons = ({ totalPages, currentPage, setCurrentPage }) => {
  let content = [];
  if (totalPages <= 5 || currentPage <= 3) {
    const displayCount = totalPages > 5 ? 5 : totalPages;
    for (let i = 1; i <= displayCount; i++) {
      content.push(
        <PaginationButton
          key={i}
          pageNum={i}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      );
    }
  } else if (totalPages - currentPage === 1) {
    for (let i = currentPage - 3; i <= totalPages; i++) {
      content.push(
        <PaginationButton
          key={i}
          pageNum={i}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      );
    }
  } else if (totalPages === currentPage) {
    for (let i = currentPage - 4; i <= totalPages; i++) {
      content.push(
        <PaginationButton
          key={i}
          pageNum={i}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      );
    }
  } else {
    for (let i = currentPage - 2; i <= currentPage + 2; i++) {
      content.push(
        <PaginationButton
          key={i}
          pageNum={i}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      );
    }
  }

  return (
    <nav
      className='post-pagination-nav gap-5p flex-container margin-top-1 margin-btm-2'
      aria-label='All Posts Page Pagination Navigation'
    >
      <button
        type='button'
        className='posts-pagination-btn posts-pagination-btn-small basic-button'
        disabled={currentPage <= 1 ? true : false}
        aria-disabled={currentPage <= 1 ? true : false}
        aria-label='Skip to page 1.'
        onClick={() => setCurrentPage(1)}
      >
        &laquo;
      </button>
      <button
        type='button'
        className='posts-pagination-btn posts-pagination-btn-small basic-button'
        disabled={currentPage <= 1 ? true : false}
        aria-disabled={currentPage <= 1 ? true : false}
        aria-label={`Move one page back ${
          currentPage !== 1 ? `to page ${currentPage - 1}` : ""
        }`}
        onClick={() => setCurrentPage((prev) => prev - 1)}
      >
        &lsaquo;
      </button>
      {content}
      <button
        type='button'
        className='posts-pagination-btn posts-pagination-btn-small basic-button'
        disabled={currentPage === totalPages ? true : false}
        aria-disabled={currentPage === totalPages ? true : false}
        aria-label={`Move one page forward ${
          currentPage !== totalPages ? `to page ${currentPage + 1}` : ""
        }`}
        onClick={() => setCurrentPage((prev) => prev + 1)}
      >
        &rsaquo;
      </button>
      <button
        type='button'
        className='posts-pagination-btn posts-pagination-btn-small basic-button'
        disabled={currentPage === totalPages ? true : false}
        aria-disabled={currentPage === totalPages ? true : false}
        aria-label={`Skip to last page, page ${totalPages}`}
        onClick={() => setCurrentPage(totalPages)}
      >
        &raquo;
      </button>
    </nav>
  );
};

export default PaginationButtons;
