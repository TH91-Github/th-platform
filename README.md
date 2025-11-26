

# 💻 
테스트 중

## 개발 

### 환경변수
.env

### 폴더 구조 및 파일
- assets/ style, font, img, svg 등 관리
- components/ 공통 컴포넌트 외 pages 경로 폴더 생성 후 하위 구조 진행
- pages/ router 연결된 페이지 ~Page.tsx
- utils/ 공통 함수
- type/ 최소 2곳 이상에서 사용하는 type 폴더 만들어서 진행
- router/ 
※ 개별 컴포넌트 폴더는 시작 대문자(PascalCase) 단순 분류는 소문자(camelCase)로 시작

### 🔷 style 
- assets/style/ : 공통 스타일 작성
- modules.scss
※ 개별 modules 스타일 따로 관리하지 않고 같은 폴더 내 작성하여 관리.

### 🔷 type 
- 여러 컴포넌트에서 사용하는 type > 공통 type 폴더 내 관리
- 하나의 컴포넌트에서 사용하는 경우 같은 폴더 내 type.ts 생성하여 관리

### 🔷 상태관리
- redux : api 사용 중심 데이터 값 
- zustand : api 사용하지 않는 UI 상태 프로젝트 내부 값

<hr /> 

## 📘 설치

### 🔷 Node 설치 기준
node 22.12 권장

#### 🔷 설치 방법
npm install

#### 🔷 실행
npm run dev
