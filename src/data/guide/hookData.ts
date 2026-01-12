import type { GuidePopupDataType } from "@/types/guide"

export const hookData: GuidePopupDataType[] = [
  {
    id: 'toggle',
    title: 'useToggle',
    desc: 'boolean값 toggle',
    category: 'state',
    keyword: ['toggle','useState','useToggle','토글'],
    link: '',
    popInfo:{
      tit:'useToggle()',
      desc:[
        'toggle, toggleChange 구성되어 있습니다.',
        'toggleChange(), toggleChange(false), toggleChange(true) 사용'
      ],
      code:`
        const [isToggle, setIsToggle] = useToggle();`
    },
  },
  {
    id: 'scroll-lock',
    title: 'useBodyScrolLock',
    desc: 'Body Scroll Lock',
    category: 'scroll',
    keyword: ['scroll lock','lock','scroll','modal lock','스크롤 락','스크롤 멈춤'],
    link: '',
    popInfo:{
      tit:'useBodyScrolLock()',
      desc:[
        'modal 또는 popup 등 스크롤 동작을 멈춰야하는 경우 사용',
        'lockScroll(), unlockScroll()'
      ],
      code:`
        const { lockScroll, unlockScroll } = useBodyScrolLock();`
    },
  },
  {
    id: 'restore-focus',
    title: 'useRestoreFocus',
    desc: '포커스 저장 및 회귀',
    category: 'focus',
    keyword: ['useRestoreFocus','focus','포커스 회귀','id 포커스'],
    link: '',
    popInfo:{
      tit:'useRestoreFocus()',
      desc:[
        'data-id 활용하여 포커스 회귀, 대상 속성 data-id="id값 지정" ',
        '이전 focus data-id 저장, 회귀 필요한 경우 focus 복귀'
      ],
      code:`
        const {beforeFocus, resetFocus} = useRestoreFocus();
        // id 값 저장
        beforeFocus(pathID);
        // Focus 회귀 후 저장 id 삭제
        resetFocus();`
    },
  },
  {
    id: 'intersection-observer',
    title: 'useIntersection',
    desc: '뷰포트에 요소가 들어오면 상태 변경',
    category: 'scroll',
    keyword: ['useIntersection','intersection','observer','스크롤 노출','scroll','인터섹션 옵저버'],
    link: '',
    popInfo:{
      tit:'useIntersection()',
      desc:[
        '요소가 뷰포트에 나타나면 상태를 반환하는 훅',
        '스크롤 애니메이션, Lazy 로딩에 사용'
      ],
      code:`
        // 대상, 보여지고 있는지, 한 번이라도 보여졌는지
        const { 
          observerRef, observerToggle, observerVisible 
        } = useIntersection<HTMLDivElement>({
          threshold: 0.3, // 보여지는 영역 %
          freezeOnceVisible: true, // 한번만 
        });
        <div ref={observerRef} >...</div>`
    },
  },
  {
    id: 'copy-toast',
    title: 'useCopyToast',
    desc: 'Copy + Toast 사용',
    category: 'popup',
    keyword: ['copy','toast','useCopyToast','복사','복사팝업'],
    link: '',
    popInfo:{
      tit:'useAddToast()',
      desc:[
        '복사할 Value 필수',
        '복사 완료 후 Toast',
        '복사 여부 알림',
      ],
      code:`
        const { copy } = useCopyToast();
        // 조건
        copy(
          value: string, 
          options?: {
            successMessage: 복사 성공 시 message
            errorMessage:실패 message
            type: Toast Type 조건 base success error 
          }
        );
        // 사용
        copy('복사할 Value');
        copy('복사할 Value',{type:'success'});`
    },
  },
]
