import { NavLink } from "react-router-dom"

export const NotLoad = () => {
  return (
    <div>
      <p>
        요청하신 정보를 불러올 수 없어요.. <br />
        잘못된 주소이거나, 해당 정보가 존재하지 않을 수 있어요. 🙇‍♂️
      </p>
      <NavLink to="/guide/components/element" className="back-link">
        <span>다른 컴포넌트 보러가기</span>
      </NavLink>
    </div>
  )
}