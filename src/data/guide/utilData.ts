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
  },
  {
    id: 'is-mobile-size-check',
    title: 'isMobileSizeChk()',
    desc: '현재 화면이 모바일 너비인지 체크',
    category: 'common',
    keyword: ['모바일 체크', '반응형', 'media query', 'isMobileSizeChk', 'viewport'],
    link: '',
    popInfo: {
      tit: 'isMobileSizeChk 모바일 너비 체크',
      desc: [
        'window.matchMedia("(max-width: 768px)") 기반 체크',
        '현재 화면이 모바일 기준 너비인지 boolean으로 반환',
        '브라우저 환경에서 반응형 분기 처리 시 사용',
        'utils/common.ts'
      ],
      code: `
        function isMobileSizeChk(): boolean {}
        // 사용
        if (isMobileSizeChk()) {
          console.log('mobile');
        }
      `
    }
  },
  {
    id: 'escape-sanitized-html',
    title: 'escapeSanitizedHtml(str)',
    desc: '코드 문자열을 이스케이프 후 sanitize 처리',
    category: 'common',
    keyword: ['html escape', 'sanitize', 'escapeSanitizedHtml', '코드 문자열', 'XSS'],
    link: '',
    popInfo: {
      tit: 'escapeSanitizedHtml 코드 문자열 안전 처리',
      desc: [
        'HTML 특수문자를 먼저 escape 하고 DOMPurify로 sanitize',
        '코드 예시 문자열을 화면에 안전하게 노출할 때 사용',
        '태그가 실제 DOM으로 해석되지 않도록 보호',
        'utils/common.ts'
      ],
      code: `
        function escapeSanitizedHtml(str: string): string {}
        // 사용
        const safeCode = escapeSanitizedHtml('<div>Hello</div>');
      `
    }
  },
  {
    id: 'sanitize-html',
    title: 'sanitizeHtml(dataHTML, options?)',
    desc: 'HTML 문자열을 안전하게 정제',
    category: 'common',
    keyword: ['sanitizeHtml', 'DOMPurify', 'html 보안', 'XSS 방지', 'dangerouslySetInnerHTML'],
    link: '',
    popInfo: {
      tit: 'sanitizeHtml HTML 정제',
      desc: [
        'className을 class로 변환한 뒤 DOMPurify로 sanitize',
        '허용 태그/속성 기본값을 포함하고 options로 확장 가능',
        '사용자 입력 HTML 또는 외부 HTML 렌더링 전 보안 처리에 사용',
        'utils/common.ts'
      ],
      code: `
        function sanitizeHtml(
          dataHTML: string,
          options?: Config
        ): string {}
        // 사용
        const safeHtml = sanitizeHtml('<a href="/">link</a>');
      `
    }
  },
  {
    id: 'number-comma',
    title: 'numberComma(num)',
    desc: '숫자를 천 단위 콤마 문자열로 변환',
    category: 'common',
    keyword: ['숫자 포맷', '천단위 콤마', 'numberComma', 'toLocaleString'],
    link: '',
    popInfo: {
      tit: 'numberComma 숫자 콤마 처리',
      desc: [
        '숫자를 locale 기반 문자열로 변환',
        '금액, 수량, 통계 수치 표시 시 자주 사용',
        '1,000 / 20,300 같은 형식으로 반환',
        'utils/common.ts'
      ],
      code: `
        const result = numberComma(20300);
        // 결과: "20,300"
      `
    }
  },
  {
    id: 'breadcrumb-lists',
    title: 'breadcrumbLists(pathname, capitalize?)',
    desc: 'pathname을 breadcrumb용 배열로 변환',
    category: 'common',
    keyword: ['breadcrumb', '경로 분해', 'breadcrumbLists', 'pathname'],
    link: '',
    popInfo: {
      tit: 'breadcrumbLists 경로 배열 생성',
      desc: [
        'pathname을 / 기준으로 분해하고 빈 값 제거',
        'capitalize=true면 각 세그먼트 앞글자를 대문자로 변환',
        'Breadcrumb UI 데이터의 기반 값으로 사용',
        'utils/common.ts'
      ],
      code: `
        breadcrumbLists('/guide/components/element');
        // 결과: ['Guide', 'Components', 'Element']
      `
    }
  },
  {
    id: 'strip-indent',
    title: 'stripIndent(code)',
    desc: '멀티라인 문자열의 공통 들여쓰기 제거',
    category: 'textUtils',
    keyword: ['들여쓰기 제거', 'stripIndent', '코드 문자열 정리', 'template literal'],
    link: '',
    popInfo: {
      tit: 'stripIndent 공통 들여쓰기 제거',
      desc: [
        '멀티라인 문자열에서 공통 앞 공백만 계산해 제거',
        '코드 예시 문자열을 보기 좋게 정리할 때 유용',
        '가이드 code block, 샘플 문자열 정리에 사용',
        'utils/textUtils.ts'
      ],
      code: `
        const code = stripIndent(\`
          function test() {
            return true;
          }
        \`);
      `
    }
  },
  {
    id: 'date-format-util',
    title: 'dateFormat(value, options?)',
    desc: '날짜/시간 값을 다양한 형식으로 포맷',
    category: 'date',
    keyword: ['dateFormat', '날짜 포맷', '시간 포맷', '오전 오후', 'YYYY.MM.DD'],
    link: '',
    popInfo: {
      tit: 'dateFormat 날짜/시간 포맷',
      desc: [
        'number | Date | string 입력값을 날짜/시간 문자열로 포맷',
        'date / time / datetime 모드와 separator, 12시간제 옵션 지원',
        'UI 노출용 날짜 formatting에 폭넓게 사용 가능',
        'utils/date/dateFormat.ts'
      ],
      code: `
        dateFormat(Date.now(), { format: 'date', separator: '.' })
        dateFormat(Date.now(), { use12Hour: true })
      `
    }
  },
  {
    id: 'create-days',
    title: 'createDays(year, month, events?, holidays?)',
    desc: '달력 렌더링용 날짜 셀 배열 생성',
    category: 'date',
    keyword: ['createDays', '달력 셀', 'calendar grid', '이전달 다음달', '공휴일'],
    link: '',
    popInfo: {
      tit: 'createDays 달력 셀 생성',
      desc: [
        '이전 달/현재 달/다음 달을 포함한 달력 셀 배열 반환',
        '이벤트 Map과 공휴일 데이터를 함께 매핑',
        'DateGrid 렌더링의 핵심 데이터 생성 유틸',
        'utils/date/calendar.ts'
      ],
      code: `
        const cells = createDays(2026, 2, events, holidays);
        // 결과: CalendarCell[]
      `
    }
  },
  {
    id: 'unflatten',
    title: 'unflatten(data, prefix)',
    desc: 'dot notation 객체를 중첩 객체로 복원',
    category: 'firebase',
    keyword: ['unflatten', 'dot notation', 'firebase', '중첩 객체', 'stats.'],
    link: '',
    popInfo: {
      tit: 'unflatten Firebase dot notation 복원',
      desc: [
        'prefix로 시작하는 키만 골라 중첩 객체 구조로 복원',
        'Firebase increment 업데이트 후 읽어온 평탄화 데이터를 다시 구조화할 때 사용',
        'Partial<T> 형태로 반환',
        'utils/firebaseStore.ts'
      ],
      code: `
        const stats = unflatten<UserRoomStats>(data, 'stats.');
      `
    }
  },
  {
    id: 'validate-email',
    title: 'validateEmail(email)',
    desc: '이메일 형식과 허용 도메인 검증 메시지 반환',
    category: 'auth',
    keyword: ['validateEmail', '이메일 검증', '도메인 체크', 'gmail', '회원가입'],
    link: '',
    popInfo: {
      tit: 'validateEmail 이메일 검증',
      desc: [
        '빈 값, 이메일 형식, 허용 도메인까지 한 번에 검증',
        '문제가 있으면 사용자용 메시지 문자열 반환',
        '문제가 없으면 빈 문자열 반환',
        'utils/auth/auth.ts'
      ],
      code: `
        const error = validateEmail(email);
        if (error) {
          console.log(error);
        }
      `
    }
  },
  {
    id: 'validate-login-id',
    title: 'validateLoginId(val)',
    desc: '로그인 아이디 길이와 문자 규칙 검증',
    category: 'auth',
    keyword: ['validateLoginId', '아이디 검증', '로그인 아이디', 'auth'],
    link: '',
    popInfo: {
      tit: 'validateLoginId 로그인 아이디 검증',
      desc: [
        '4~20자 길이와 특수문자/공백 여부를 체크',
        '사용자 입력 즉시 validation에 적합한 메시지 반환',
        '유효하면 빈 문자열 반환',
        'utils/auth/auth.ts'
      ],
      code: `
        const error = validateLoginId('testUser01');
      `
    }
  },
  {
    id: 'validate-password',
    title: 'validatePassword(val)',
    desc: '비밀번호 길이와 공백 사용 여부 검증',
    category: 'auth',
    keyword: ['validatePassword', '비밀번호 검증', '회원가입', '공백 체크'],
    link: '',
    popInfo: {
      tit: 'validatePassword 비밀번호 검증',
      desc: [
        '비밀번호 입력 여부, 길이, 공백 사용 여부를 확인',
        '로그인/회원가입 폼에서 공통 사용 가능',
        '유효하지 않으면 안내 메시지 반환',
        'utils/auth/auth.ts'
      ],
      code: `
        const error = validatePassword(password);
      `
    }
  },
  {
    id: 'validate-signup',
    title: 'validateSignup(values)',
    desc: '회원가입 입력값 전체 검증 결과 반환',
    category: 'auth',
    keyword: ['validateSignup', '회원가입 검증', '폼 검증', 'errors'],
    link: '',
    popInfo: {
      tit: 'validateSignup 회원가입 전체 검증',
      desc: [
        'email, password, password confirm 값을 한 번에 검증',
        'isValid와 필드별 errors 객체를 함께 반환',
        'submit 전 최종 검증에 적합',
        'utils/auth/auth.ts'
      ],
      code: `
        const result = validateSignup(values);
        // { isValid: boolean, errors: {...} }
      `
    }
  },
  {
    id: 'save-session',
    title: 'saveSession(remember)',
    desc: '로그인 세션 정보를 localStorage에 저장',
    category: 'session',
    keyword: ['saveSession', '세션 저장', 'remember me', 'localStorage'],
    link: '',
    popInfo: {
      tit: 'saveSession 세션 저장',
      desc: [
        '마지막 활동 시간, remember 여부, 생성 시간을 저장',
        '로그인 유지와 세션 만료 계산의 시작점',
        'platform-sessionInfo 키를 사용',
        'utils/auth/session.ts'
      ],
      code: `
        saveSession(true);
      `
    }
  },
  {
    id: 'is-session-valid',
    title: 'isSessionValid()',
    desc: '현재 세션이 만료되지 않았는지 검사',
    category: 'session',
    keyword: ['isSessionValid', '세션 만료', '로그인 유지', 'remember'],
    link: '',
    popInfo: {
      tit: 'isSessionValid 세션 유효성 검사',
      desc: [
        'remember 여부에 따라 30분 또는 7일 만료 기준 적용',
        'JSON 파싱 오류나 만료 시 false 반환',
        '인증 초기화 시 가장 먼저 검사하는 유틸',
        'utils/auth/session.ts'
      ],
      code: `
        if (!isSessionValid()) {
          console.log('세션 만료');
        }
      `
    }
  },
  {
    id: 'refresh-session',
    title: 'refreshSession()',
    desc: '현재 세션의 마지막 활동 시간을 갱신',
    category: 'session',
    keyword: ['refreshSession', '세션 갱신', 'lastActive', 'keep alive'],
    link: '',
    popInfo: {
      tit: 'refreshSession 세션 시간 갱신',
      desc: [
        '유효한 세션이면 lastActive를 현재 시각으로 업데이트',
        '만료된 세션은 자동 삭제',
        '사용자 활동 중 세션 유지 처리에 사용',
        'utils/auth/session.ts'
      ],
      code: `
        refreshSession();
      `
    }
  },
  {
    id: 'get-formatted-remaining-time',
    title: 'getFormattedRemainingTime()',
    desc: '세션 남은 시간을 사람이 읽기 쉬운 문자열로 반환',
    category: 'session',
    keyword: ['남은 시간', '세션 남은시간', 'getFormattedRemainingTime', '만료됨'],
    link: '',
    popInfo: {
      tit: 'getFormattedRemainingTime 남은 시간 문자열',
      desc: [
        '세션 남은 시간을 일/시간/분 기준 문자열로 반환',
        '만료 시 "만료됨" 반환',
        '마이페이지 또는 보안 섹션 표시용으로 적합',
        'utils/auth/session.ts'
      ],
      code: `
        const remaining = getFormattedRemainingTime();
        // 예: "25분 남음"
      `
    }
  },
  {
    id: 'get-hub-uid',
    title: 'getHubUid(user?)',
    desc: '회원/비회원에 따라 Hub용 uid 반환',
    category: 'hub',
    keyword: ['getHubUid', '게스트 uid', 'hub uid', 'HUB_GUEST_UID'],
    link: '',
    popInfo: {
      tit: 'getHubUid Hub 전용 uid 선택',
      desc: [
        '로그인 유저면 user.uid 반환',
        '비회원이면 테스트용 guest uid 반환',
        'Hub 관련 query와 firestore 경로 계산에 사용',
        'utils/hun/common.ts'
      ],
      code: `
        const uid = getHubUid(user);
      `
    }
  },
  {
    id: 'is-col-name',
    title: 'isColName(isGuest, baseName)',
    desc: '회원/비회원 여부에 따라 firestore 컬렉션명 생성',
    category: 'hub',
    keyword: ['isColName', '컬렉션명', 'guest collection', 'firebase hub'],
    link: '',
    popInfo: {
      tit: 'isColName Hub 컬렉션명 결정',
      desc: [
        '비회원이면 test 접두사가 붙은 컬렉션명 반환',
        '회원이면 원래 baseName 그대로 사용',
        'hubRooms / hubStats / userRooms 경로 분기에 사용',
        'utils/hun/common.ts'
      ],
      code: `
        const col = isColName(true, 'userRooms');
        // 결과: testUserRooms
      `
    }
  },
  {
    id: 'merge-user-stats',
    title: 'mergeUserStats(defaultStats, stats)',
    desc: '부분 통계 데이터를 기본 통계 구조와 병합',
    category: 'hub',
    keyword: ['mergeUserStats', 'hub stats', '기본값 병합', 'firebase stats'],
    link: '',
    popInfo: {
      tit: 'mergeUserStats 통계 구조 병합',
      desc: [
        '중첩 객체 구조를 포함한 user stats 기본값 병합',
        '없는 필드는 defaultStats로 보완',
        'Firestore 일부 필드만 읽어온 경우 안전하게 구조를 완성',
        'utils/hun/hubStats.ts'
      ],
      code: `
        const nextStats = mergeUserStats(defaultStats, partialStats);
      `
    }
  },
  {
    id: 'user-total-merge',
    title: 'userTotalMerge(base, stats)',
    desc: 'Hub 표시용 total 데이터와 사용자 통계를 병합',
    category: 'hub',
    keyword: ['userTotalMerge', 'hub total', '카테고리 합산', '통계 카드'],
    link: '',
    popInfo: {
      tit: 'userTotalMerge 표시용 Hub 통계 병합',
      desc: [
        '기본 total 카드 데이터에 사용자 통계 수치를 주입',
        '전체 / 카테고리 / 북마크 섹션별 total 값을 계산',
        'Hub 메인 상단 카테고리 UI 데이터 생성에 사용',
        'utils/hun/hubStats.ts'
      ],
      code: `
        const totalData = userTotalMerge(hubTotalData, stats);
      `
    }
  },
  {
    id: 'get-hub-total',
    title: 'getHubTotal(totalData, category, id)',
    desc: 'Hub total 데이터에서 특정 항목 수치 조회',
    category: 'hub',
    keyword: ['getHubTotal', 'hub total 조회', '카테고리 total', 'stats lookup'],
    link: '',
    popInfo: {
      tit: 'getHubTotal Hub 통계 값 조회',
      desc: [
        '카테고리와 id 기준으로 total 값을 찾아 반환',
        '값이 없으면 0 반환',
        '페이지네이션이나 카운트 UI에 직접 사용 가능',
        'utils/hun/hubStats.ts'
      ],
      code: `
        const total = getHubTotal(totalData, 'total', 'all');
      `
    }
  }





]
