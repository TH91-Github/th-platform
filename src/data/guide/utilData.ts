import type { GuidePopupDataType } from "@/types/guide"

export const utilData: GuidePopupDataType[] = [
  {
    id: 'cn',
    title: 'cn(...)',
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
        ' 조건 && className 사용',
        'utils/common.ts'
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
  {
    id: 'copy-clipboard',
    title: 'copyClipboard(copyText)',
    desc: '텍스트를 클립보드에 복사',
    category: 'clipboard',
    keyword: [
      '클립보드',
      'copyClipboard',
      '복사하기',
      'navigator.clipboard'
    ],
    link: '',
    popInfo: {
      tit: 'copyClipboard 클립보드 복사',
      desc: [
        'navigator.clipboard.writeText() 사용한 현대적 클립보드 복사',
        'Promise<boolean> 반환 (성공:true, 실패:false)',
        'utils/common.ts'
      ],
      code: `
        async function copyClipboard(
          copyText: string
        ): Promise<boolean> {}
        // 사용
        const success = await copyClipboard('복사할 텍스트')
        if(success) console.log('복사 성공!')
      `
    }
  },
  {
    id: 'capitalize-words',
    title: 'capitalizeWords()',
    desc: '띄어쓰기 기준 앞글자 대소문자 변경',
    category: 'common',
    keyword: ['대소문자','앞자리변경','capitalizeWords','toUpperCase','toLowerCase', '띄어쓰기 기준'],
    link: '',
    popInfo:{
      tit:'capitalizeWords 앞 대소문자 변경',
      desc:[
        'capitalizeWords(Text))',
        '띄어쓰기 기준 앞글자 대문자 or 소문자',
        'upperFirst 대,소 타입',
        `test text -> Test Text`,
        'utils/textUtils.ts'
      ],
      code:`
        function capitalizeWords( 
          text: string, upperFirst: boolean = true
        ) {}
        // 사용
        capitalizeWords(Text)`
    },
  },
  {
    id: 'random-num',
    title: 'randomNum(max, name?)',
    desc: '중복되지 않는 랜덤 ID 생성',
    category: 'common',
    keyword: [
      '랜덤ID',
      'randomNum',
      'UUID 대체',
      '고유값 생성'
    ],
    link: '',
    popInfo: {
      tit: 'randomNum 고유 랜덤ID 생성',
      desc: [
        '0 ~ max 범위 랜덤수 + 타임스탬프 조합',
        'name 파라미터로 접두사 지정 가능 (기본: "random")',
        'random-1234-1642600000000 형식 반환',
        'utils/common.ts'
      ],
      code: `
        function randomNum(
          _max: number, name?: string
        ): string {}
        // 사용
        randomNum(9999)           // "random-4567-1642600000000"
        randomNum(999, "user")    // "user-789-1642600000000"
      `
    }
  },
  {
    id: 'random-id-check',
    title: 'randomIdChk(usedIds, name?)',
    desc: '기존 ID 목록을 기준으로 중복되지 않는 랜덤 ID 생성',
    category: 'common',
    keyword: ['랜덤ID','중복체크','uniqueId','randomIdChk','고유값 생성'],
    link: '',
    popInfo: {
      tit: 'randomIdChk 중복 방지 랜덤ID 생성',
      desc: [
        '기존 ID 배열(usedIds)에 포함되지 않는 값이 나올 때까지 반복 생성',
        'randomNum 유틸을 내부에서 사용',
        'name 파라미터로 ID 접두사 지정 가능 (기본: "random")',
        'random-1234-1642600000000 형식 반환',
        'utils/common.ts'
      ],
      code: `
        function randomIdChk(
          usedIds: string[],
          name = 'random'
        ): string {
          let id: string;

          do {
            id = randomNum(9999, name);
          } while (usedIds.includes(id));

          return id;
        }

        // 사용
        randomIdChk(ids, 'user') -> user-8912-1642600456789
      `
    }
  },

  {
    id: 'partial-undisclosed',
    title: 'partialUndisclosed(eVal, cutNum?, cutType?, closedText?)',
    desc: '문자열 앞부분만 남기고 나머지 마스킹 처리',
    category: 'textUtils',
    keyword: ['마스킹','비공개 처리','partialUndisclosed','이메일 마스킹','전화번호 마스킹','부분 숨김'],
    link: '',
    popInfo: {
      tit: 'partialUndisclosed 부분 마스킹 처리',
      desc: [
        '이메일, 전화번호 등 개인정보 앞부분만 표시하고 나머지 *로 마스킹',
        '기본: 앞 3자리 표시, 나머지 * 처리 (@ 기준 분할)',
        'cutNum, cutType, closedText 매개변수로 커스터마이징 가능',
        'utils/textUtils.ts'
      ],
      code: `
        function partialUndisclosed(
          eVal: string, 
          cutNum?: number, 
          cutType?: string, 
          closedText?: string
        ): string {}
        
        // 사용 예시
        partialUndisclosed("user123@domain.com")
        // 결과: use***@domain.com
        
        partialUndisclosed("01012345678", 3, "-", "*")
        // 결과: 010********
      `
    }
  },
  {
    id: 'spaces-check',
    title: 'spacesCheck(text)',
    desc: '공백, 탭, 스페이스 등 공백 찾기',
    category: 'regex',
    keyword: ['regex','띄어쓰기 체크','spacesCheck','input 체크', 'whitespace', '공백 찾기'],
    link: '',
    popInfo:{
      tit:'spacesCheck 띄어쓰기 체크',
      desc:[
        '공백(스페이스)뿐만 아니라 탭, 줄바꿈 등 모든 whitespace 문자 찾기',
        '공백 문자가 하나라도 있으면 true, 전혀 없으면 false 를 반환',
        '정규식',
        'utils/regex.ts'
      ],
      code:`
        function spacesCheck(text: string): boolean {}
        // 사용
        spacesCheck(Text)`
    },
  },
  {
    id: 'has-special-characters',
    title: 'hasSpecialCharacters(text)',
    desc: '특수문자 포함 여부 체크',
    category: 'regex',
    keyword: ['regex', '특수문자 체크', 'hasSpecialCharacters','input 체크','validation' ],
    link: '',
    popInfo: {
      tit: 'hasSpecialCharacters 특수문자 체크',
      desc: [
        '영문, 한글, 숫자, 공백(스페이스)만 허용하는 화이트리스트 방식 정규식',
        '허용된 문자만 있을 경우 false, 하나라도 다른 문자(특수문자 등)가 있으면 true 반환',
        '입력값에 특수문자/이모지/기타 문자가 섞여 있는지 검사할 때 사용',
        'utils/regex.ts'
      ],
      code: `
        function hasSpecialCharacters(text: string): boolean {}
        // 사용
        hasSpecialCharacters(text)
      `
    }
  },
  {
    id: 'en-number-check',
    title: 'enNumberCheck(text)',
    desc: '영문(대/소문자)과 숫자만 허용 + 최소 1개 이상 영문 포함',
    category: 'regex',
    keyword: ['regex','알파벳 숫자 체크','영문자 숫자만','enNumberCheck','영문 필수','input 체크'],
    link: '',
    popInfo: {
      tit: 'enNumberCheck 영문/숫자 조합 체크',
      desc: [
        '문자열이 영문 대/소문자와 숫자로만 구성되어 있는지 검사',
        '최소 1개 이상의 영문자를 반드시 포함해야 true 반환',
        '순수 숫자만 있는 값(예: "1234")은 false, 영문+숫자 조합은 true',
        '아이디, 코드 값 등 영문자 포함 알파뉴메릭 검증에 사용',
        'utils/regex.ts'
      ],
      code: `
        function enNumberCheck(text: string): boolean {}
        // 사용
        enNumberCheck(text)
      `
    }
  },
  {
    id: 'format-date',
    title: 'formatDate(date)',
    desc: 'Date 객체를 YYYY-MM-DD 문자열로 변환',
    category: 'date',
    keyword: ['날짜 포맷','formatDate','YYYY-MM-DD','date to string','달력 표시'],
    link: '',
    popInfo: {
      tit: 'formatDate 날짜 포맷 변환',
      desc: [
        'Date 객체를 "YYYY-MM-DD" 형식의 문자열로 변환',
        '월/일은 2자리 0패딩 자동 적용',
        '달력 UI, 이벤트 날짜 표시 등에 사용',
        'utils/date/calendar.ts'
      ],
      code: `
        function formatDate(date: Date): string {}
        // 사용
        formatDate(new Date())
        // 결과: 2026-01-19
      `
    }
  },
  {
    id: 'get-month-info',
    title: 'getMonthInfo(year, month)',
    desc: '특정 월의 시작요일과 마지막날 정보 반환',
    category: 'date',
    keyword: ['월 정보','getMonthInfo','달력 그리기','firstDay','lastDate'],
    link: '',
    popInfo: {
      tit: 'getMonthInfo 월 정보 추출',
      desc: [
        '해당 월의 1일 요일(0=일요일)과 마지막 날짜 반환',
        '달력 그리기 시 빈칸 위치 계산에 필수',
        '{ firstDay: number, lastDate: number } 객체 반환',
        'utils/date/calendar.ts'
      ],
      code: `
        function getMonthInfo(
          year: number, month: number)
          : {firstDay: number, lastDate: number
        } {}
        // 사용
        getMonthInfo(2026, 0)  // 1월 정보
        // 결과: { firstDay: 1, lastDate: 31 }  // 월요일 시작
      `
    }
  },
  {
    id: 'create-event-map',
    title: 'createEventMap(events)',
    desc: '이벤트 배열을 날짜별 Map으로 그룹화',
    category: 'date',
    keyword: ['이벤트 그룹화','createEventMap','CalendarEvent','날짜별 일정','Map 변환'],
    link: '',
    popInfo: {
      tit: 'createEventMap',
      desc: [
        'CalendarEvent[] 배열을 날짜별로 그룹핑한 Map<string, CalendarEvent[]> 반환',
        '같은 날짜의 이벤트들을 배열로 묶음',
        '달력에서 특정 날짜 클릭 시 해당 일정만 빠르게 조회 가능',
        'utils/date/calendar.ts'
      ],
      code: `
        function createEventMap(
          events?: CalendarEvent[]) 
          :Map<string, CalendarEvent[]
        > {}
        // 사용
        const eventMap = createEventMap(events)
        eventMap.get('2026-01-19')  // 해당 날짜 모든 이벤트 배열 반환
      `
    }
  },
  {
    id: 'split-text-spans',
    title: 'splitTextToSpans(text, options?)',
    desc: '텍스트를 개별 span 배열로 분리',
    category: 'react',
    keyword: ['텍스트애니메이션','splitTextToSpans','lettering','ReactNode'],
    link: '',
    popInfo: {
      tit: 'splitTextToSpans 글자별 span 분리',
      desc: [
        '문자열을 span[] 배열로 변환 (텍스트 애니메이션용)',
        'spacing=true: 공백도 span 포함 / className으로 스타일링',
        'utils/common.ts'
      ],
      code: `
        function splitTextToSpans(
          text: string, options?: {
            spacing?:boolean, 
            className?:string
          }
        ): React.ReactNode[] {}
        // 사용
        splitTextToSpans('Test',{옵션})
      `
    }
  }





]
