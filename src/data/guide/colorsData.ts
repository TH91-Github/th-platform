import { colors, colorsText } from "@/assets/style/emotion/variables"

export interface ColorListsDataType {
  title: string,
  code:string,
  scss:string,
  rgb?:string,
  emotion?:string,
  isText?:boolean,
  root?:string,
}
export interface ColorDataType {
  id:string,
  title:string,
  desc: string,
  lists:ColorListsDataType[]
}
export const themeColorData = [
  {
    id:'light',
    title:'Light',
    data:[
      {
        id:'color',
        title:'Color',
        desc:'라이트 테마에서 사용하는 색상',
        lists:[
          {
            title:'Color',
            code:colors.black,
            scss:'$color-black',
            root:'var(--color)'
          },
          {
            title:'Color Bg',
            code: colors.white,
            scss:'$color-white',
            root:'var(--color-bg)'
          },
          {
            title:'Color Origin',
            code:'#ffffff',
            scss:'#fff',
            root:'var(--color-origin)'
          },
          {
            title:'Color Origin On',
            code:'#ffffff',
            scss:'#fff',
            root:'var(--color-origin-on)'
          },
          {
            title:'Point',
            code:'#395acc',
            scss:'$color-blue',
            root:'var(--color-point)'
          },
          {
            title:'Point BG',
            code:'#e3e4fc',
            scss:'$color-blue-bg',
            root:'var(--color-point-bg)'
          },
          {
            title:'Point Text',
            code:'#e9ecef',
            scss:'$color-text-w',
            root:'var(--color-point-text)'
          },
          {
            title:'Line',
            code:'#dbdbdb',
            scss:'$color-line',
            root:'var(--color-line)'
          },
          {
            title:'Title',
            code:'#353844',
            scss:'$color-title-b',
            root:'var(--color-title)'
          },
          {
            title:'Text',
            code:'#42464d',
            scss:'$color-text-b',
            root:'var(--color-text)'
          },
          {
            title:'Desc',
            code:'#495057',
            scss:'$color-desc-b',
            root:'var(--color-desc)'
          },
          {
            title:'Sub Text',
            code:'#8d9095',
            scss:'$color-sub-text-b',
            root:'var(--color-sub-text)'
          },
        ]
      },
      {
        id:'shadow',
        title:'Shadow',
        desc:'라이트 테마에서 사용하는 shadow',
        lists:[
          {
            title:'Default box shadow',
            code:'0 2px 8px rgba(0, 0, 0, 0.15)',
            scss:'$shadow-b',
            root:'var(--box-shadow)'
          },
          {
            title:'Default text shadow',
            code:'0px 1px 2px rgba(0,0,0,0.2)',
            scss:'$shadow-w',
            root:'var(--text-shadow)',
            isText:true,
          },
        ]
      },
      {
        id:'option',
        title:'Option',
        desc:'다크 테마에서 사용하는 option',
        lists:[
          {
            title:'투명도 BG',
            code:'rgba(255,255,255,0.5)',
            scss:'$opacity-w',
            root:'var(--opacity-bg)'
          },
        ]
      }
    ]
  },
  {
    id:'dark',
    title:'Dark',
    data:[
      {
        id:'color',
        title:'Color',
        desc:'다크 테마에서 사용하는 색상',
        lists:[
          {
            title:'Color',
            code: colors.white,
            scss:'$color-white',
            root:'var(--color)'
          },
          {
            title:'Color Bg',
            code:colors.black,
            scss:'$color-black',
            root:'var(--color-bg)'
          },
          {
            title:'Color Origin',
            code:'#000000',
            scss:'#000',
            root:'var(--color-origin)'
          },
          {
            title:'Color Origin On',
            code:'#454864',
            scss:'$color-dark-bg-on',
            root:'var(--color-origin-on)'
          },
          {
            title:'Point',
            code:'#ffb000',
            scss:'$color-yellow',
            root:'var(--color-point)'
          },
          {
            title:'Point BG',
            code:'#f6f3ee',
            scss:'$color-yellow-bg',
            root:'var(--color-point-bg)'
          },
          {
            title:'Point Text',
            code:'#42464d',
            scss:'$color-text-b',
            root:'var(--color-point-text)'
          },
          {
            title:'Line',
            code:'#40444b',
            scss:'$color-line-black',
            root:'var(--color-line)'
          },
          {
            title:'Title',
            code:'#f1f3f5',
            scss:'$color-title-w',
            root:'var(--color-title)'
          },
          {
            title:'Text',
            code:'#e9ecef',
            scss:'$color-text-w',
            root:'var(--color-text)'
          },
          {
            title:'Desc',
            code:'#dee2e6',
            scss:'$color-desc-w',
            root:'var(--color-desc)'
          },
          {
            title:'Sub Text',
            code:'#adb5bd',
            scss:'$color-sub-text-w',
            root:'var(--color-sub-text)'
          },
        ]
      },
      {
        id:'shadow',
        title:'Shadow',
        desc:'다크 테마에서 사용하는 shadow',
        lists:[
          {
            title:'Default box shadow',
            code:'0 4px 20px rgba(255, 255, 255, 0.2)',
            scss:'$shadow-w',
            root:'var(--box-shadow)'
          },
          {
            title:'Default text shadow',
            code:'0px 2px 2px rgba(255, 255, 255, 0.4)',
            scss:'$shadow-w',
            root:'var(--text-shadow)',
            isText:true,
          },
        ]
      },
      {
        id:'option',
        title:'Option',
        desc:'다크 테마에서 사용하는 option',
        lists:[
          {
            title:'투명도 BG',
            code:'rgba(5,11,33,0.5)',
            scss:'$opacity-b',
            root:'var(--opacity-bg)'
          },
        ]
      }
    ]
  }
]
// 컬러 지정
export const colorsData:ColorDataType[] = [
  {
    id:'system',
    title:'System Color',
    desc:'주요 포인트 색상',
    lists:[
      {
        title:'Blue',
        code:colors.blue,
        rgb:'57,90,204',
        scss:'$color-blue',
        emotion:'colors.blue'
      },
      {
        title:'Yellow',
        code:colors.yellow,
        rgb:'255,176,0',
        scss:'$color-yellow',
        emotion:'colors.yellow'
      },
      {
        title:'Red',
        code:colors.red,
        rgb:'232,57,44',
        scss:'$color-red',
        emotion:'colors.red'
      },
      {
        title:'Green',
        code:colors.green,
        rgb:'12,148,99',
        scss:'$color-green',
        emotion:'colors.green'
      },
      {
        title:'Navy',
        code:colors.navy,
        rgb:'51,58,115',
        scss:'$color-navy',
        emotion:'colors.navy'
      },
      {
        title:'Dark Navy',
        code:colors.darkNavy,
        rgb:'3, 5, 58, 1',
        scss:'$color-dark-navy',
        emotion:'colors.darkNavy'
      },
      {
        title:'Gray',
        code:colors.gray,
        rgb:'137,138,141',
        scss:'$color-gray',
        emotion:'colors.gray'
      },
      {
        title:'Disabled',
        code: colors.disabled,
        rgb:'231,235,238',
        scss:'$color-disabled',
        emotion:'colors.disabled'
      },
      {
        title:'Line',
        code:colors.line,
        rgb:'219,219,219',
        scss:'$color-line',
        emotion:'colors.line'
      },
      {
        title:'Line Black',
        code:colors.lineBlack,
        rgb:'64,68,75',
        scss:'$color-line-black',
        emotion:'colors.lineBlack'
      },
    ]
  },
  {
    id:'layers',
    title:'Layers Color',
    desc:'',
    lists:[
      {
        title:'White',
        code:colors.white,
        rgb:'245,245,255',
        scss:'$color-white',
        emotion:'colors.white'
      },
      {
        title:'Black',
        code:colors.black,
        rgb:'5,11,33',
        scss:'$color-black',
        emotion:'colors.black'
      },
      {
        title:'Dark BG',
        code:colors.darkBg,
        rgb:'42,45,62',
        scss:'$color-dark-bg',
        emotion:'colors.darkBg'
      },
      {
        title:'Dark BG On',
        code:colors.darkBgOn,
        rgb:'69,72,100',
        scss:'$color-dark-bg-on',
        emotion:'colors.darkBgOn'
      },
      {
        title:'Blue BG',
        code:colors.blueBg,
        rgb:'227,228,252',
        scss:'$color-blue-bg',
        emotion:'colors.blueBg'
      },
      {
        title:'Yellow BG',
        code:colors.yellowBg,
        rgb:'246,246,238',
        scss:'$color-yellow-bg',
        emotion:'colors.yellowBg'
      },
    ]
  },
  {
    id:'text',
    title:'Text Color',
    desc:'',
    lists:[
      {
        title:'Title Black',
        code:colorsText.titleB,
        rgb:'53,56,68',
        scss:'$color-title-b',
        emotion:'colorsText.titleB'
      },
      {
        title:'Text Black',
        code:colorsText.textB,
        rgb:'66,70,77',
        scss:'$color-text-b',
        emotion:'colorsText.textB'
      },
      {
        title:'Desc Black',
        code:colorsText.descB,
        rgb:'73,80,87',
        scss:'$color-desc-b',
        emotion:'colorsText.descB'
      },
      {
        title:'Sub Text Black',
        code:colorsText.subTextB,
        rgb:'141,144,149',
        scss:'$color-sub-text-b',
        emotion:'colorsText.subTextB'
      },
      {
        title:'Title White',
        code:colorsText.titleW,
        rgb:'241,243,245',
        scss:'$color-title-w',
        emotion:'colorsText.titleW'
      },
      {
        title:'Text White',
        code:colorsText.textW,
        rgb:'233,236,239',
        scss:'$color-text-w',
        emotion:'colorsText.textW'
      },
      {
        title:'Desc White',
        code:colorsText.descW,
        rgb:'222,226,230',
        scss:'$color-desc-w',
        emotion:'colorsText.descW'
      },
      {
        title:'Sub Text White',
        code:colorsText.subTextW,
        rgb:'173,181,189',
        scss:'$color-sub-text-w',
        emotion:'colorsText.subTextW'
      }
    ]
  },
  {
    id:'shadow',
    title:'Shadow Color',
    desc:'',
    lists:[
      {
        title:'Box Shadow White',
        code:'0 4px 20px rgba(255, 255, 255, 0.2)',
        scss:'$shadow-w',
        emotion:''
      },
      {
        title:'Box Shadow Black',
        code:'0 2px 8px rgba(0, 0, 0, 0.15)',
        scss:'$shadow-b',
        emotion:''
      },
      {
        title:'Text Shadow White',
        code:'0px 2px 2px rgba(255, 255, 255, 0.4)',
        scss:'$shadow-w',
        emotion:'',
        isText:true,
      },
      {
        title:'Text Shadow Black',
        code:'0px 1px 2px rgba(0,0,0,0.2)',
        scss:'$shadow-b',
        emotion:'',
        isText:true,
      },
    ]
  },
]
