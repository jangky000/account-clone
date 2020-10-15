# javascript-w5-accountbook

스프린트 5-6주차 웹 프로젝트 - 가계부

## 배포 주소

http://101.101.210.76:8000/

## 요구사항 분석

### 가계부 ERD

- 회원
  - id
  - pw
  - 이름
  - 이메일
  - 가입일
- 내역
  - 날짜
  - 수입 or 지출
  - 금액
  - 내용
  - 결제수단
  - 카테고리
- 결제 수단
  - 결제방법
- 카테고리
  - 카테고리

![w5ERD](https://user-images.githubusercontent.com/46799722/94554257-c8ab0a80-0294-11eb-9151-3cd3e7ce3c07.JPG)

- 추가 고려사항
  - 사용자마다 결제 수단을 추가할 수 있다 → 사용자마다 결제 수단이 다르다.
  - 카테고리가 수입과 지출에 따라 선택 리스트가 달라진다. mode 칼럼을 추가해줘야 한다.

### 가계부 기능

- 로그인 기능
  - passport, jwt 사용
- 월별 수입 조회 / 지출 조회
- 결제수단 관리
- 파이 그래프 / 라인 그래프
  - 통계 SQL
- 달력

### 개발 계획

- 환경 설정

  - 공통
    - ES Lint
    - Prettier
  - BE
    - express generator
    - mySQL
      - ERD 설계 workbench 사용
      - SQL 작성
  - FE
    - Webpack
    - Babel
    - Polyfill
  - 배포
    - pm2
    - 배포 자동화 shell script

- 로그인
  - passport
  - jwt 적용
  - 인증 미들웨어 개발, isLoggedIn 등

## Route URL

- **인증**
- POST /api/auth/login
- GET /api/auth/logout

- **회원가입**
- POST /api/member/

- **account**
- GET /api/account/:year/:month
- POST /api/account/

- **status**
- GET /api/status/category/expense/:year/:month
- GET /api/status/date/expense/:year/:month
- GET /api/status/date/income/:year/:month

## 개발 진행

### day1

- **Server**
- express 템플릿 설정
- ESlint, prettier 설정
- dotenv 설정

- **Client**
- webpack 설정
- babel loader 설정
- polyfill 설정
- css, style loader 설정
- html-webpack-plugin 설정
- dev-server 설정

### day2

- sql문 작성
- scss loader 적용
- auth, member 라우트 생성
- DB config 설정, memberDB 생성

### day3

- memberDB sequalize 적용
- bcrypt 적용
- passport local 인증 기능 추가
- passport jwt 인증 기능 추가

### day4

- 컨트롤러 리팩토링
- redis 설치, 테스트, 적용 여부는 미정
- token을 쿠키에 저장
- 가계부 내역 라우터 작업 중

### day5

- 가계부 내역 조회/삽입/수정/삭제 구현
- 가계부 카테고리별, 일별 지출/수입 통계 조회 구현

### day6

- client의 header, main, login 레이아웃, scss 추가
- login & register 탭 변환 기능 추가
- login & register fetch 기능 추가

## Week6

### day1

- Client localStorage에 jwt 토큰 저장
- Client 내역 레이아웃 디자인

### day2

- Client 내역 레이아웃 완성
- Client 내역 레이아웃 리팩토링
- Client global Nav 이벤트 추가
- Client calendar, stats 폴더 추가
- Client 내역 레이아웃 fetch 조회 추가

### day3

- Client fetchAPI 리팩토링
- Client token expired 처리
- Server select 라우트 추가, Client 내역 select 항목 render 추가
- Client 파이 차트 레이아웃
- Client 카테고리별 지출 모델
- Client 달력 레이아웃
- Client 예외 처리

### day4

- Client 파이 차트 태그 추가
- Client Calendar 모델 추가
- Client Calendar 조회 기능 완성
- Client Bar 차트 조회 기능 완성
- Client 로그아웃 추가
- Client globalNavEvent 버그 수정
- Client 내역 filter 추가

### 진행할 사항

- 사용내역 등록, 수정, 삭제
- Client Model 캐시 적용
- SPA 라우팅,히스토리
