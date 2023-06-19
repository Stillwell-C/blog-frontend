const AllPostsPageBtn = ({ pageNum, currentPage, setCurrentPage }) => {
  return (
    <button
      type='button'
      className={`posts-pagination-btn basic-button ${
        currentPage === pageNum && "highlighted-btn"
      }`}
      disabled={currentPage === pageNum ? true : false}
      aria-current={currentPage === pageNum ? true : false}
      aria-label={
        currentPage === pageNum
          ? `Current Page, Page ${pageNum}`
          : `Page ${pageNum}`
      }
      onClick={() => setCurrentPage(pageNum)}
    >
      {pageNum}
    </button>
  );
};

export default AllPostsPageBtn;
