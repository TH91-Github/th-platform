import styles from './ProjectLayout.module.scss';

export const ProjectLayout = () => {
  return( 
    <div className={styles.project}>
      <div className={`${styles.portfolio}`}>
        <div className={styles.heading}>
          <h3 className="title">Title TItle</h3>
        </div>
        <div className={styles.full}>
          <div className={styles.scroll}>
            <ul className={styles.lists}>
              <li>
                <div className={styles.box}>
                  <p className={`tit`}>Title</p>
                  <p className="text">TEST TEXT TEST TEXT</p>
                </div>
              </li>
              <li>
                <div className={styles.box}>
                  <p className={`tit`}>Title</p>
                  <p className="text">TEST TEXT TEST TEXT</p>
                </div>
              </li>
              <li>
                <div className={styles.box}>
                  <p className={`tit`}>Title</p>
                  <p className="text">TEST TEXT TEST TEXT</p>
                </div>
              </li>
              <li>
                <div className={styles.box}>
                  <p className={`tit`}>Title</p>
                  <p className="text">TEST TEXT TEST TEXT</p>
                </div>
              </li>
              <li>
                <div className={styles.box}>
                  <p className={`tit`}>Title</p>
                  <p className="text">TEST TEXT TEST TEXT</p>
                </div>
              </li>
              <li>
                <div className={styles.box}>
                  <p className={`tit`}>Title</p>
                  <p className="text">TEST TEXT TEST TEXT</p>
                </div>
              </li>
              <li>
                <div className={styles.box}>
                  <p className={`tit`}>Title</p>
                  <p className="text">TEST TEXT TEST TEXT</p>
                </div>
              </li>
              <li>
                <div className={styles.box}>
                  <p className={`tit`}>Title</p>
                  <p className="text">TEST TEXT TEST TEXT</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* ex) 함께 했었던 기업 리스트 */}
      <div className={styles.client}>
        <div className={styles.heading}>
          <h3 className="title">Title TItle</h3>
        </div>
        <div className={styles.full}>
          <div className={styles.scroll}>
            <ul className={styles.lists}>
              <li>
                <div className={styles.box}>
                  <p className={`tit`}>Title</p>
                  <p className="text">TEST TEXT TEST TEXT</p>
                </div>
              </li>
              <li>
                <div className={styles.box}>
                  <p className={`tit`}>Title</p>
                  <p className="text">TEST TEXT TEST TEXT</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.detail}>
          <div className={styles.info}>
            정보
          </div>
          <div className={styles.history}>
            이력
          </div>
        </div>
      </div>
     
    </div>
  )
}