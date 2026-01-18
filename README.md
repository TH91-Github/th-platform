# 💻 통합 플랫폼
이전 사이드 프로젝트였던 카카오맵 api 기반 지도(리뷰&즐겨찾기 등), 날씨(지역검색), 가이드 기능을
통합 리팩토링하여 재시작을 하였습니다.<br />
※ ui 스타일링은 React 19 버전부터 styled-components 유지보수 중심으로 변경됨에 따라
호환성과 확장성을 고려해 CSS Module과 emotion 병행하여 사용.

## 배포
- vercel 사용 예정

### 환경변수
.env

### 폴더 구조 및 파일
- assets/ style, font, img, svg 등 관리
- components/ 공통 컴포넌트 외 pages 경로 폴더 생성 후 하위 구조 진행
- pages/ router 연결된 페이지 ~Page.tsx
- utils/ 공통 함수
- type/ 최소 2곳 이상에서 사용하는 type 폴더 만들어서 진행
- router/  <br />
※ 개별 컴포넌트 폴더는 시작 대문자(PascalCase) 단순 분류는 소문자(camelCase)로 시작

### 🔷 style 
- assets/style/ : 공통 스타일 작성
- modules.scss <br />
- emotion : 동적 및 일반 css로 표현하기 효율적이지 못하는 컴포넌트 내 사용
※ 개별 modules 스타일 따로 관리하지 않고 같은 폴더 내 작성하여 관리.

### 🔷 type 
- 여러 컴포넌트에서 사용하는 type > 공통 type 폴더 내 관리
- 하나의 컴포넌트에서 사용하는 경우 같은 폴더 내 type.ts 생성하여 관리

### 🔷 상태관리 참고
- redux : api 사용 중심 데이터 값 
- zustand : api 사용하지 않는 UI 상태 프로젝트 내부 값

<hr /> 
### 🔷 프로젝트 스택
| 분류             | 라이브러리/패키지 이름                        | 설명                                      |
| -------------- | ----------------------------------- | --------------------------------------- |
| **기본**         | `react`, `react-dom`                | React 19 
| **번들러 / 개발환경** | `vite`                              | 빠른 개발 서버 및 빌드 환경 구성                     |
| **타입**         | `typescript`                        | TypeScript 사용         |
| **라우팅**        | `react-router-dom`                  | SPA 구조의 라우팅 처리 및 페이지 이동 관리              |
| **상태 관리**      | `@reduxjs/toolkit`, `react-redux`   | Redux Toolkit 기반 전역 상태 (API 전용 상태) 관리               |
|                | `zustand`                           | 간단한 전역/로컬 상태 관리 라이브러리         |
| **스타일링**       | `@emotion/react`, `@emotion/styled` | CSS-in-JS 방식의 컴포넌트 단위 스타일링              |
|                | `sass`                              | 전역 스타일 및 공통 스타일 관리를 위한 SCSS 사용          |
| **UI / 아이콘**   | `react-icons`                       | React svg 아이콘 사용                      |
| **캐러셀**        | `swiper`                            | 슬라이드, 캐러셀 swiper.js                        |
| **콘텐츠 처리**     | `dompurify`                         | HTML 콘텐츠 렌더링 시 XSS 방지를 위한 Sanitizing 처리 |
| **하이라이팅**   | `highlight.js`                      | 코드 하이라이팅                      



### 🔷 Node 설치 기준
node 22.12.0

#### 🔷 실행
npm run dev


감사합니다. 🙇‍♂️
