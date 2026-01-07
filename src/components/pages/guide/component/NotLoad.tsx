import { NavLink } from "react-router-dom"
import styles from './NotLoad.module.scss';
import { IconBack } from "@/assets/icon";

export const NotLoad = ({category}:{category:string}) => {
  return (
    <div className={styles.notLoad}>
      <p>
        요청하신 정보를 불러올 수 없어요.. <br />
        잘못된 주소이거나, 해당 정보가 존재하지 않을 수 있어요. 🙇‍♂️
      </p>
      <NavLink 
        to={category ? `/guide/components/${category}`: '/'} 
        className={styles.backBtn}
      >
        <span className={styles.icon}><IconBack /></span>
        <span>목록 돌아가기</span>
      </NavLink>
    </div>
  )
}