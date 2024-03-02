import rightArrow from "../assets/right-arrow-svgrepo-com.svg";
import leftArrow from "../assets/arrow-left-5-svgrepo-com.svg";

type Props = {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
};

export default function Pagination({ page, setPage, totalPages }: Props) {
  const generatePageNumbers = (): number[] => {
    const pages = [];
    const totalPagesToShow = 10;

    // Case when there are fewer total pages than the maximum to show
    if (totalPages <= totalPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Calculate starting page index for the pagination
      let startPage = Math.max(1, page - Math.floor(totalPagesToShow / 2));

      // Calculate ending page index for the pagination
      let endPage = Math.min(totalPages, startPage + totalPagesToShow - 1);

      // Adjust the start page if we're at the end of the pagination
      if (endPage - startPage + 1 < totalPagesToShow) {
        startPage = Math.max(1, endPage - totalPagesToShow + 1);
      }

      // Push the page numbers into the array
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  return (
    <div className="flex items-center gap-5">
      <button
        onClick={() => setPage(Math.max(page - 1, 1))}
        disabled={page === 1}
        className={page === 1 ? "cursor-not-allowed" : "cursor-pointer"}
      >
        <img src={leftArrow} className="w-5" />
      </button>
      {generatePageNumbers().map((pageNumber) => (
        <div
          key={pageNumber}
          onClick={() => setPage(pageNumber)}
          className={`cursor-pointer
            ${
              pageNumber === page
                ? "border border-sky-600 w-8 h-8 flex items-center justify-center rounded-lg font-semibold"
                : ""
            }`}
        >
          {pageNumber}
        </div>
      ))}
      <button
        onClick={() => setPage(page + 1)}
        disabled={page === totalPages}
        className={
          page === totalPages ? "cursor-not-allowed" : "cursor-pointer"
        }
      >
        <img src={rightArrow} className="w-5" />
      </button>
    </div>
  );
}
