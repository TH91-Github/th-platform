# 💻 통합 플랫폼
이 프로젝트는 여러 사이드 프로젝트를 하나로 실험하고 확장하기 위한 통합 플랫폼입니다.
현재는 개발 가이드(색상, 폰트, 공통 컴포넌트, 훅, 유틸리티) 를 중심으로 구축되어 있고
이후에는 기록 기반 서비스를 단계적으로 추가할 예정입.
- 메모, 여행 기록, 가계부 등 기록 중심 기능
- 회원을 기반으로 방(Room)을 생성하고 여러 명이 함께 참여
- 지도, 날씨 등 외부 데이터 연동

## 배포
- vercel 사용 예정

### 환경변수
.env

### 폴더 구조 및 파일
- assets/ : style, font, img, svg 등 관리
- components/ : 공통 컴포넌트 외 pages 경로 폴더 생성 후 하위 구조 진행
- data/ : 단순 노출 고정 데이터 & 테스트 data 관리
- firebase/ : firebase 메서드, 기능 관리
- hook/ : hook 관리 
- pages/ : router 연결된 페이지 ~Page.tsx
- router/ 
- utils/ : 공통 함수
- type/ : 최소 2곳 이상에서 사용하는 type 폴더 만들어서 진행
- 개별 컴포넌트 파일 & .module 시작 대문자(PascalCase) 
- 폴더소문자(camelCase)로 시작

### 🔷 style 
- css module과 emotion 사용 중
- module 사용법과 emotion 사용을 경험하기 위함.
- assets/style/ : 공통 스타일 작성
- modules.scss : 컴포넌트와 동일 위치 네이밍 동일하게 Btn.module.scss
- assets/style/common : font, root, global, theme
- assets/style/emotion : 변수로 지정된 스타일

기본 스타일은 CSS Module을 사용해 구조를 단순하게 유지하고 
컴포넌트 단위로 동적 스타일이 필요로 하는 컴포넌트는 Emotion을 병행하고 있습니다.

### 🔷 type 
- 여러 컴포넌트에서 사용하는 type > 공통 type 폴더 내 관리
- 하나의 컴포넌트에서 사용하는 경우 같은 폴더 내 type.ts 생성하여 관리

### 🔷 상태관리 참고
둘 다 사용하는 이유는 둘 다 사용하고 경험하여 사용 방법을 숙지하고 활용하기 위해서 입니다.
Redux와 Zustand를 각각의 목적에 맞게 분리하여 함께 사용하고 있습니다.
- redux : api 사용 중심 데이터 값 
- zustand : api 사용하지 않는 UI 상태 프로젝트 내부 값

<hr /> 

### 🔷 프로젝트 스택
| 분류 | 라이브러리/패키지 이름 | 설명 |
| ---- | ---------------------- | ---- |
| **기본** | `react`, `react-dom` | React 19 |
| **번들러 / 개발환경** | `vite` | 빠른 개발 서버 및 빌드 환경 구성 |
| **타입** | `typescript` | TypeScript 사용 |
| **라우팅** | `react-router-dom` | SPA 구조의 라우팅 처리 및 페이지 이동 관리 |
| **상태 관리** | `@reduxjs/toolkit`, `react-redux` | Redux Toolkit 기반 전역 상태 (API 전용 상태) 관리 |
|  | `zustand` | UI /로컬 상태 관리 라이브러리 |
| **스타일링** | `sass, Module` | 전역 스타일 및 공통 스타일 관리를 위한 SCSS 사용 |
|  | `@emotion/react`, `@emotion/styled` | CSS-in-JS 방식의 컴포넌트 단위 스타일링 |
| **UI / 아이콘** | `react-icons` | React svg 아이콘 사용 |
| **캐러셀** | `swiper` | 슬라이드, 캐러셀 swiper.js |
| **콘텐츠 처리** | `dompurify` | HTML 콘텐츠 렌더링 시 XSS 방지를 위한 Sanitizing 처리 |
| **하이라이팅** | `highlight.js` | 코드 하이라이팅 |


### 🔷 Node 기준
node 22.12.0

#### 🔷 실행
npm run dev


감사합니다. 🙇‍♂️
