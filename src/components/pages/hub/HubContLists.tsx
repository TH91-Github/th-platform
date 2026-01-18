import styles from './HubContLists.module.scss'

const DUMMYDATADAT = ['Visibility','Title','Category','Date','Members']
export const HubContLists = () => {
  return (
    <div className={styles.wrap}>
      <div className={styles.table}>
        {/* 
          공개/비공개, 제목, 카테고리, 날짜, 멤버,
        */}
        <div className={styles.header}>
          <div className={styles.row}>
            {
              DUMMYDATADAT.map((headItem) => (
                <div className={styles.cell} key={headItem}>
                  <span>{headItem}</span>
                </div>
              ))
            }
          </div>
        </div>
        <div className={styles.body}>
          {
            new Array(5).fill('-').map((_, idx) => (
              <div className={styles.row} key={idx}>
                {
                  new Array(5).fill('__').map((_,idx2) => (
                    <div className={styles.cell} key={idx2}>
                      test
                    </div>
                  ))
                }
              </div>
            )) }
        </div>
      </div>
    </div>
  )
}