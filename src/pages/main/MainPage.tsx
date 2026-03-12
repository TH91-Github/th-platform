import { GuideLayout } from "@/components/pages/main/GuideLayout"
import { MainVisual } from "@/components/pages/main/MainVisual"
import { MainHubAbout } from "@/components/pages/main/MainHubAbout"
import { MainBgFixed } from "@/components/pages/main/MainBgFixed"

export const MainPage = () => {
  return (
    <>
      {/* visual */}
      <MainVisual />
      {/* hub 소개 */}
      <MainHubAbout />
      {/* 가이드 소개 */}
      <GuideLayout />

      {/* BG */}
      <MainBgFixed />
      {/* <div className="main-item">
        <ProjectLayout />
      </div>
      <div className="main-item">
        <DivisionLayout />
      </div> */}

    </>
  )
}