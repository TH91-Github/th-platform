
interface BreakpointsDataType {  // Breakpoints Data Type
  id:string;
  title:string;
  lists: {
    id: string;
    title: string[];
    desc?: string[];
    code?: string;
    media?: {
      min: number | null;
      max: number | null;
    }
  }[]
}

export const breakpointData : BreakpointsDataType[] = [
  {
    id:'bp',
    title:'해상도에 따른 5단계 기준 변수',
    lists: [
      {
        id:'bp-maxPc',
        title:['$bp-max-pc','bp.maxPc'],
        desc:['최대 가로 사이즈 기준'],
        code:'1920',
      },
      {
        id:'bp-pc',
        title:['$bp-pc','bp.pc'],
        desc:['일반적인 노트북 및 중형 데스크탑 기준 사이즈','1440보다 작은 해상도 환경에 최적화'],
        code:'1440',
      },
      {
        id:'bp-tablet',
        title:['$bp-tablet','bp.tablet'],
        desc:['Tablet 기준 사이즈', '세로 모드 기준 넓은 태블릿까지 포함'],
        code:'1140',
      },
      {
        id:'bp-mo',
        title:['$bp-mob','bp.mob'],
        desc:['Mobile 기준 사이즈','일반적인 스마트폰 가로 모드까지 포함'],
        code:'768',
      },
      {
        id:'bp-smallMo',
        title:['$bp-smallMob','bp.smallMob'],
        desc:['Mobile 작은 기종 사이즈','작은 디바이스 또는 최소 해상도 대응'],
        code:'450',
      },
    ]
  },
  {
    id:'media',
    title:'@media - SCSS : @include key / Emotion : ${media.key}',
    lists: [
      {
        id:'media-maxPc',
        title:['max-pc','maxPc'],
        desc:['최대 가로 사이즈 기준', '@media screen and (max-width: 1920px)'],
        media:{
          min: null,
          max: 1920
        },
      },
      {
        id:'media-largePc',
        title:['large-pc','largePc'],
        desc:['pc만 사용 ','@media screen and (min-width:1440px)'],
        media:{
          min: 1440,
          max: null
        },
      },
      {
        id:'media-pc',
        title:['pc','pc'],
        desc:['데스크탑 시작 ','@media screen and (min-width:1440px)'],
        media:{
          min: 1140,
          max: null
        },
      },
      {
        id:'media-smailPc',
        title:['smail-pc','smailPc'],
        desc:['랩탑/노트북 포함 일반 PC 범위','@media screen and (min-width:1140px) and (max-width:1439px)'],
        media:{
          min: 1140,
          max: 1439
        },
      },
      {
        id:'media-tabletPc',
        title:['tablet-pc','tabletPc'],
        desc:['태블릿과 PC 포함 범위 ','@media screen and (min-width: 768px)'],
        media:{
          min: 768,
          max: null
        },
      },
      {
        id:'media-tablet',
        title:['tablet','tablet'],
        desc:['태블릿 전용 ','@media screen and (min-width: 768px) and (max-width:1139)'],
        media:{
          min: 768,
          max: 1139
        },
      },
      {
        id:'media-tabletMo',
        title:['tablet-mob','tabletMob'],
        desc:['모바일과 태블릿 포함 범위 ','@media screen and (max-width:1139px'],
        media:{
          min: null,
          max: 1139
        },
      },
      {
        id:'media-tabletMo',
        title:['tablet-mob','tabletMob'],
        desc:['모바일 전용 ','@media screen and (max-width:767px)'],
        media:{
          min: null,
          max: 767
        },
      },
      {
        id:'media-smallMo',
        title:['small-mob','smallMob'],
        desc:['작은 모바일 전용 ','@media screen and (max-width:450px'],
        media:{
          min: null,
          max: 450
        },
      },
    ]
  }
]