
import { TextHighlight } from '@/components/element/highlight/TextHighlight';
import styles from './PreviewText.module.scss';

// 🔹 자동 완성 목록 단순 목록 노출 및 일치 텍스트 반환. 중복 제거

interface PreviewTextPropsType {
  data: string[], // keyword 전체 합쳐서
  matchVal: string,
  selectKeyword: (val: string) => void,
}
export const PreviewText = ({ data, matchVal, selectKeyword }: PreviewTextPropsType) => {

  if(matchVal.length < 2) return null
  return (
    <div className={styles.previewText}>
      <div className={styles.inner}>
        {data.length > 0 ? (
          <ul>
            {data.map((text) => (
              <li key={text}>
                <button
                  type="button"
                  className={styles.btn}
                  onClick={() => selectKeyword(text)}
                >
                  <TextHighlight
                    text={text}
                    keyword={matchVal}
                  />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className={styles.empyt}>
            <p>일치하는 검색 값이 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  )
}
