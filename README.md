# 1vs1 Quiz Battle

> Socket.IO 기반 실시간 1대1 퀴즈 대결 게임

## 기술 스택

| 구분 | 기술 |
|------|------|
| Server | Node.js, Express |
| 실시간 통신 | Socket.IO |
| Database | JSON (정적 DB) |
| Front-end | HTML, CSS, JS |

## 실행 방법

```bash
npm install
node server.js
```

접속(로컬): `http://localhost:3000/quiz`
접속(외부): `http://IPv4주소:3000/quiz`

## 기획 메모

메인 기능

- Socket 통신 기반 1:1 매칭
- 문제는 전부 객관식
- 출제 기준은 html, css, js
- 일단 10문제
- 회원 DB..?

부가 기능

- 반응형 UI
- 힌트 사용시 오답 선지 하나 제거 (문제당 1번)
- 랭킹 기능

TODO
문제 출제 후 JSON (data 폴더로)
JS로 1:1 매칭 시스템 개발

UI 컨셉 (피그마)

- 철권 + 조이스틱
- 상대 피 깍는 애니메이션 9판 5선승제
  (5문제 먼저 맞추는 걸로)

피그마 [재한]
문제출제 4지선다 (오답까지 넣어서) [현지]
main page html [호성]
로그인 page [호성]
회원 가입 page [호성]
-=> 코드 룰 정립
게임 실행 page
게임 결과 page
socket npm [동현]
