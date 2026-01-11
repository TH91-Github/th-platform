import { ContactLayout } from "@/components/pages/main/ContactLayout"
import { DivisionLayout } from "@/components/pages/main/DivisionLayout"
import { MainVisual } from "@/components/pages/main/MainVisual"
import { ProjectLayout } from "@/components/pages/main/ProjectLayout"
import './MainPage.scss'
import { GuideLayout } from "@/components/pages/main/GuideLayout"

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