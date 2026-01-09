import type { GuidePopupDataType } from "@/types/guide"

export const utilData: GuidePopupDataType[] = [
  {
    id: 'cn',
    title: 'cn 함수',
    desc: 'className 조건 처리 함수',
    category: 'common',
    keyword: ['클래스','classnames','조건 처리','class','className함수'],
    link: '',
    popInfo:{
      tit:'cn 조건 처리 함수',
      desc:[
        'cn(...)',
        '특정 class를 사용하기 위함',
        `? 'on' : '' 조건 처리 시 불필요한 공백 없음`,
        ' 조건 && className 사용' 
      ],
      code:`
        function cn (
          ...classNames: (string | false | undefined
        )[]){...}
        // 사용
        className={cn(
          'test-class',
          styles.Test,
          isToggle && 'toggle'
          isOpen ? 'open' :'close'
        )} `
    },
    
  },
]
