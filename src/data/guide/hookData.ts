import type { GuidePopupDataType } from "@/types/guide"

export const hookData: GuidePopupDataType[] = [
  {
    id: 'toggle',
    title: 'useToggle',
    desc: 'boolean 상태를 toggle 제어',
    category: 'state',
    keyword: ['toggle', 'boolean', 'useState', 'useToggle', '토글'],
    link: '',
    popInfo: {
      tit: 'useToggle(initialState?)',
      desc: [
        'boolean 상태를 toggle / open / close / set 메서드로 제어합니다.',
      ],
      code: `
        const [toggle, setToggle] = useToggle(false);

        // 상태 확인
        isOpen // boolean

        // 상태 변경
        toggleCtrl.toggle();      // true <-> false
        toggleCtrl.open();        // true
        toggleCtrl.close();       // false
        toggleCtrl.set(boolean);  // 지정한 값으로 설정`
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
  {
    id: 'ani-close-toggle',
    title: 'useCloseAniToggle',
    desc: 'on/off 애니메이션 class 제어',
    category: 'state',
    keyword: ['toggle', 'animation', '애니메이션','on/off 모션','효과'],
    link: '',
    popInfo:{
      tit:'useCloseAniToggle(options?)',
      desc:[
        'DOM 렌더링과 애니메이션 상태를 분리하여 자연스러운 UI 전환을 제공',
        'CSS transition 기반으로 동작하며 외부 클릭 시 자동 닫기를 지원',
      ],
      code:`
        {
          isRender, // 렌더용 { isRender && <div>...</div> }
          isOpen, // on,open
          isClosing, // off 사라지는 모션 제어용
          toggle, // on / off 변경 setState
          close, // 강제 닫기 
          containerRef, // ref 제외 영역 클릭 시 닫기
        } = useCloseAniToggle({ duration: 500 }); `
    },
  },
  {
    id: 'ani-delay-rendar-toggle',
    title: 'useDelayRenderToggle',
    desc: 'on/off 애니메이션 class 제어',
    category: 'state',
    keyword: ['toggle', 'animation', '애니메이션','on/off 모션','딜레이', 'delay'],
    link: '',
    popInfo:{
      tit:'useDelayRenderToggle(delay?)',
      desc:[
        'DOM 렌더링과 상태 변경을 시간차를 주고 활용하는 hook',
        'toggle 발생 시 isOpen 즉각 반응하고 isRender 설정 delay 이후 발생',
      ],
      code:`
        {
          isRender, // 렌더용 { isRender && <div>...</div> }
          isOpen, // 즉시 
          toggle, // on / off 변경 setState
        } = useDelayRenderToggle({ duration: 1000 }); `
    },
  },
]
