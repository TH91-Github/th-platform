export interface ColorListsDataType {
  title: string,
  code:string,
  scss:string,
  rgb?:string,
  emotion?:string,
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
            title:'Black',
            code:'#050b21',
            scss:'$color-black',
            root:'var(--color)'
          },
          {
            title:'White',
            code:'#f5f5ff',
            scss:'$color-white',
            root:'var(--color-bg)'
          },
          {
            title:'White Origin',
            code:'#ffffff',
            scss:'#fff',
            root:'var(--color-origin)'
          },
          {
            title:'White Origin On',
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
        desc:'라이트 테마에서 사용하는 box-shadow',
        lists:[
          {
            title:'Default',
            code:'0 2px 8px rgba(0, 0, 0, 0.15)',
            scss:'$shadow-b',
            root:'var(--box-shadow)'
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
            title:'White',
            code:'#f5f5ff',
            scss:'$color-white',
            root:'var(--color)'
          },
          {
            title:'Black',
            code:'#050b21',
            scss:'$color-black',
            root:'var(--color-bg)'
          },
          {
            title:'Black Origin',
            code:'#000000',
            scss:'#000',
            root:'var(--color-origin)'
          },
          {
            title:'Black Origin On',
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
            scss:'$color-sub-text-w',
            root:'var(--color-sub-text)'
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
        desc:'다크 테마에서 사용하는 box-shadow',
        lists:[
          {
            title:'Text',
            code:'rgba(255, 255, 255, 0.2)',
            scss:'$color-text-w',
            root:'var(--color-text)'
          }
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
        code:'#395acc',
        rgb:'57,90,204',
        scss:'$color-blue',
        emotion:'colors.blue'
      },
      {
        title:'Yellow',
        code:'#ffb000',
        rgb:'255,176,0',
        scss:'$color-yellow',
        emotion:'colors.yellow'
      },
      {
        title:'Red',
        code:'#e8392c',
        rgb:'232,57,44',
        scss:'$color-red',
        emotion:'colors.red'
      },
      {
        title:'Green',
        code:'#0C9463',
        rgb:'12,148,99',
        scss:'$color-green',
        emotion:'colors.green'
      },
      {
        title:'Navy',
        code:'#333A73',
        rgb:'51,58,115',
        scss:'$color-navy',
        emotion:'colors.navy'
      },
      {
        title:'Gray',
        code:'#898a8d',
        rgb:'137,138,141',
        scss:'$color-gray',
        emotion:'colors.gray'
      },
      {
        title:'Disabled',
        code:'#e7ebee',
        rgb:'231,235,238',
        scss:'$color-disabled',
        emotion:'colors.disabled'
      },
      {
        title:'Line',
        code:'#dbdbdb',
        rgb:'219,219,219',
        scss:'$color-line',
        emotion:'colors.line'
      },
      {
        title:'Line Black',
        code:'#40444b',
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
        code:'#f5f5ff',
        rgb:'245,245,255',
        scss:'$color-white',
        emotion:'colors.white'
      },
      {
        title:'Black',
        code:'#050b21',
        rgb:'5,11,33',
        scss:'$color-black',
        emotion:'colors.black'
      },
      {
        title:'Dark BG',
        code:'#2a2d3e',
        rgb:'42,45,62',
        scss:'$color-dark-bg',
        emotion:'colors.darkBg'
      },
      {
        title:'Dark BG On',
        code:'#454864',
        rgb:'69,72,100',
        scss:'$color-dark-bg-on',
        emotion:'colors.darkBgOn'
      },
      {
        title:'Blue BG',
        code:'#e3e4fc',
        rgb:'227,228,252',
        scss:'$color-blue-bg',
        emotion:'colors.blueBg'
      },
      {
        title:'Yellow BG',
        code:'#f6f3ee',
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
        code:'#353844',
        rgb:'53,56,68',
        scss:'$color-title-b',
        emotion:''
      },
      {
        title:'Text Black',
        code:'#42464d',
        rgb:'66,70,77',
        scss:'$color-text-b',
        emotion:''
      },
      {
        title:'Desc Black',
        code:'#495057',
        rgb:'73,80,87',
        scss:'$color-desc-b',
        emotion:''
      },
      {
        title:'Sub Text Black',
        code:'#8d9095',
        rgb:'141,144,149',
        scss:'$color-sub-text-b',
        emotion:''
      },
      {
        title:'title White',
        code:'#f1f3f5',
        rgb:'241,243,245',
        scss:'$color-title-w',
        emotion:''
      },
      {
        title:'Text White',
        code:'#e9ecef',
        rgb:'233,236,239',
        scss:'$color-text-w',
        emotion:''
      },
      {
        title:'Desc White',
        code:'#dee2e6',
        rgb:'222,226,230',
        scss:'$color-desc-w',
        emotion:''
      },
      {
        title:'Sub Text White',
        code:'#adb5bd',
        rgb:'173,181,189',
        scss:'$color-sub-text-w',
        emotion:''
      }
    ]
  },
  {
    id:'shadow',
    title:'Shadow Color',
    desc:'',
    lists:[
      {
        title:'Shadow White',
        code:'0 4px 20px rgba(255, 255, 255, 0.2)',
        scss:'$shadow-w',
        emotion:''
      },
      {
        title:'Shadow Black',
        code:'0 2px 8px rgba(0, 0, 0, 0.15)',
        scss:'$shadow-b',
        emotion:''
      },
    ]
  },
]
