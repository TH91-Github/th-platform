import MatchScroll from "@/components/layout/scrollLayout/MatchScroll"
import styles from './MainHubAbout.module.scss'

const data = [
  {
    id:'Cashledger',
    title:'가계부',
    desc:'수입, 지출을 등록하고 한 눈에 통계를 확인해서 관리하세요!',
    imgSrc: '',
    url:'/hub',
  },
  {
    id:'Travel',
    title:'여행',
    desc:'⚠️ 준비 중...<br />여행 일정과 계획을 세우고 <br />지도와 함께 공유하세요!',
    imgSrc: 'https://fastly.picsum.photos/id/961/400/500.jpg?hmac=S3dC9-tcavl_2TB18z9SVpAsxruy-V5WadNKHsN7_Rc',
    url:'/',
  },
  {
    id:'Calendar',
    title:'달력',
    desc:'⚠️ 준비 중...<br /> 일정을 등록하고 공유해서 <br />기록하세요!',
    imgSrc: '',
    url:'/',
  },
  {
    id:'Memo',
    title:'메모',
    desc:'⚠️ 준비 중...<br />간단한 메모와 체크리스트를 <br />만들고 공유하세요!',
    imgSrc: '',
    url:'/',
  },
  {
    id:'Running',
    title:'러닝',
    desc:'⚠️ 준비 중...<br />러닝 기록을 하고 팀을 만들어 <br />목표를 세우고 PB를 갱신하세요!',
    imgSrc: '',
    url:'/',
  }
]

const bgImages = [
  "https://fastly.picsum.photos/id/431/300/200.jpg?hmac=t36jx_1pTMP348laF5bxobhFZk-XChMIoJAbYnEwrEs",
  "https://fastly.picsum.photos/id/29/400/500.jpg?hmac=m5Npo_fr_C9zWG3oy-F_tY9DIzxM7RkAXcJn4e48-w0",
  "https://fastly.picsum.photos/id/377/300/200.jpg?hmac=RvM7Dit6cHPrG0RTc0tGhvr0NoQJN8uv8ma6zlY2mdA",
];

export const MainHubAbout = () => {
  return (
    <div className={styles.hubAbout}>
      <MatchScroll
        data={data}
        bgImages={bgImages}
      />
    </div>
  )
}