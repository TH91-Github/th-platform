import { IconArrowLeft, IconArrowRight } from "@/assets/icon";
import styles from "./Pagination.module.scss";

// 🔹 pagination
interface PaginationPropsType {
  page: number; // 현재 활성 page
  totalPages: number; // 총 데이터 개수
  viewCount?: number; // 페이지당 데이터 개수
  pageBtnCount?: number; // 페이지 버튼 개수
  center?: boolean; // 활성 가운데
  onChange: (page: number) => void;
}

export const Pagination = ({
  page,
  totalPages,
  onChange,
  viewCount = 5,
  pageBtnCount = 5,
  center = false,
}: PaginationPropsType) => {
  const totalNumber = Math.ceil(totalPages / viewCount);
  if (!totalNumber) return null;

  const safePage = page > totalNumber ? totalNumber : page;

  let start = 1;
  let end = totalNumber;

  // 활성 센터인 경우 버튼 수 조정
  if (center) {
    const tempHalf = Math.floor(pageBtnCount / 2);
    let tempStart = safePage - tempHalf;
    let tempEnd = safePage + tempHalf;

    if (tempStart < 1) {
      tempStart = 1;
      tempEnd = Math.min(pageBtnCount, totalNumber);
    }

    if (tempEnd > totalNumber) {
      tempEnd = totalNumber;
      tempStart = Math.max(1, totalNumber - pageBtnCount + 1);
    }

    const isShowFirst = tempStart > 1;
    const isShowLast = tempEnd < totalNumber;
    const extraCount = (isShowFirst ? 1 : 0) + (isShowLast ? 1 : 0);
    const visibleCount = pageBtnCount - extraCount;
    const half = Math.floor(visibleCount / 2);

    start = safePage - half;
    end = safePage + half;

    if (visibleCount % 2 === 0) {
      end -= 1;
    }

    if (start < 1) {
      start = 1;
      end = Math.min(visibleCount, totalNumber);
    }

    if (end > totalNumber) {
      end = totalNumber;
      start = Math.max(1, totalNumber - visibleCount + 1);
    }
  } else {
    start = Math.floor((safePage - 1) / pageBtnCount) * pageBtnCount + 1;
    end = Math.min(start + pageBtnCount - 1, totalNumber);
  }

  const pages = Array.from(
    { length: end - start + 1 },
    (_, i) => start + i
  );

  return (
    <div className={styles.pagination}>
      {/* prev */}
      <button
        disabled={safePage === 1}
        className={styles.prev}
        onClick={() => onChange(safePage - 1)}
      >
        <i className={styles.icon}><IconArrowLeft /></i>
      </button>

      {/* 가장 앞 */}
      {start > 1 && (
        <button onClick={() => onChange(1)}>
          <span>1</span>
        </button>
      )}

      {/*  pageBtnCount 수만큼 칸 이전 */}
      {start > 2 && (
        <button
          onClick={() =>
            onChange(center ? Math.max(1, safePage - pageBtnCount) : start - 1 )
          }
        >
          <span>...</span>
        </button>
      )}

      {/* page number */}
      {pages.map((p) => (
        <button
          key={p}
          className={p === safePage ? styles.active : ""}
          onClick={() => onChange(p)}
        >
          <span>{p}</span>
        </button>
      ))}

      {/* next jump */}
      {end < totalNumber - 1 && (
        <button
          onClick={() =>
            onChange(center
              ? Math.min(totalNumber, safePage + pageBtnCount)
              : end + 1
            )
          }
        >
          <span>...</span>
        </button>
      )}

      {/* last */}
      {end < totalNumber && (
        <button onClick={() => onChange(totalNumber)}>
          <span>{totalNumber}</span>
        </button>
      )}

      {/* next */}
      <button
        disabled={safePage === totalNumber}
        onClick={() => onChange(safePage + 1)}
      >
        <i className={styles.icon}><IconArrowRight /></i>
      </button>
    </div>
  );
};