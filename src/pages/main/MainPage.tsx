import { ContactLayout } from "@/components/main/ContactLayout"
import { DivisionLayout } from "@/components/main/DivisionLayout"
import { MainVisual } from "@/components/main/MainVisual"
import { ProjectLayout } from "@/components/main/ProjectLayout"
import './MainPage.scss'

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
        <div className="main-item">
          {/* 기타 */}
          <ContactLayout />
        </div>
      </div>
    </div>
  )
}