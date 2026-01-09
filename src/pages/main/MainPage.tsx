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
        <div className="main-item">
          {/* project lists */}
          <ProjectLayout />
        </div>
        <div className="main-item">
          {/* 부문 소개 */}
          <DivisionLayout />
        </div>
        {/* 가이드 */}
        <div className="main-item">
          <GuideLayout />
        </div>
        <div className="main-item">
          {/* 기타 */}
          <ContactLayout />
        </div>
      </div>
    </div>
  )
}