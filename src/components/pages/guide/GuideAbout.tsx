import { useNavigate } from "react-router-dom";
import { GuideIcon } from "./GuideIcon";
import styles from './GuideAbout.module.scss';
import { cn } from "@/utils/common";
import { guideLists } from "@/data/guide/guideLists";

// Guide 간단 소개 페이지
export const GuideAbout = () => {
  const navigate = useNavigate();

  const handleLinkClick = (path:string, depthPath:string | undefined) => {
    if(depthPath){
      let checkDepth = depthPath.indexOf(':id') > 0 ? '': depthPath;
      navigate(`/guide/${path}/${checkDepth}`);
    }else{
      navigate(`/guide/${path}`);
    }
  }
  return (
    <div className={styles.aboutInner}>
      <div className={styles.aboutHeader}>
        <span className={styles.lineBox}>
          <h3 className={styles.title}>
            <span className={styles.color}>Guide</span> System
          </h3>
          <p className={styles.desc}>
            총 <span className={styles.color}>{guideLists.length}</span>개 카테고리로 <br />
            구성되어 있어요!
          </p>
        </span>
      </div>
      <div className={styles.aboutContent}>
        <div className={styles.designBox} aria-hidden="true">
          <span className={styles.squareBox}>
            <span className={styles.squareItem}></span>
            <span className={styles.squareItem}></span>
            <span className={styles.squareItem}></span>
          </span>
        </div>
        <div className={styles.linkBox}>
          <ul className={styles.linkLists}>
            {
              guideLists.map((item,idx) => (
                <li 
                  className={cn(styles.linkItem, styles[`${item.id}`])}
                   key={idx}
                >
                  <button 
                    type="button"
                    className={styles.linkBtn}
                    onClick={() => handleLinkClick(item.path, item?.children?.[0]?.path)}
                  >
                    <span className={styles.icon}><GuideIcon id={item.id} /></span>
                    <span className={styles.tit}>{item.title}</span>
                  </button>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
      <p className="desc">프로젝트의 가이드 페이지로 카테고리별로 <br />한눈에 확인하여 작업 시 참고할 수 있습니다.</p>
    </div>
  )
}
