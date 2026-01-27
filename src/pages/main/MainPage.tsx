import { GuideLayout } from "@/components/pages/main/GuideLayout"
import { MainVisual } from "@/components/pages/main/MainVisual"
import './MainPage.scss'

export const MainPage = () => {
  return (
    <div className="main-wrap">
      {/* visual */}
      <MainVisual />
      <div className="main-conent">
        {/* 가이드 */}
        <div className="main-item">
          <GuideLayout />
        </div>
      </div>
    </div>
  )
}