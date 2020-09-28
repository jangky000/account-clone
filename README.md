# javascript-w5-accountbook

스프린트 5-6주차 웹 프로젝트 - 가계부

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

![WEEK5 ERD](https://user-images.githubusercontent.com/46799722/94427851-b5336d00-01ca-11eb-989a-0a09d4895084.JPG)

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
