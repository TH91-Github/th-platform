import styles from "./Pagination.module.scss";

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
  viewCount?: number; // 보여줄 페이지 개수 (기본 5)
}
export const Pagination = ({
  page,
  totalPages,
  onChange,
  viewCount = 5,
}: PaginationProps) => {
  const start = Math.floor((page - 1) / viewCount) * viewCount + 1;
  const end = Math.min(start + viewCount - 1, totalPages);
  const pages = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return (
    <div className={styles.pagination}>
      <button
        disabled={page === 1}
        onClick={() => onChange(1)}
      >
        «
      </button>
      <button
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
      >
        ‹
      </button>
      {pages.map((p) => (
        <button
          key={p}
          className={p === page ? styles.active : ""}
          onClick={() => onChange(p)}
        >
          {p}
        </button>
      ))}
      <button
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
      >
        ›
      </button>
      <button
        disabled={page === totalPages}
        onClick={() => onChange(totalPages)}
      >
        »
      </button>
    </div>
  );
};