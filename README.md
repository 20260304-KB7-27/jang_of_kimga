# 목차

- 프로젝트 소개
- 프로젝트 기여
- 기술 스택
- 기능 소개
- 실행 방법

# 프로젝트 소개

TODO: 프로젝트 이름 정하기1vs1 Quiz Battle

> 김가네장씨
> Socket.IO 기반 실시간 1대1 퀴즈 대결 게임입니다.
> 대결이라는 컨텐츠를 활용하여, 사용자의 프론트엔드 지식 향상을 목표로 합니다.

<br/>

## 프로젝트 기여

김호성(팀장)

- Git + File 구조 관리
- 프로젝트 depth 기획 및 json 관리
- 게임 진행 이전 모듈 구현

김동현

- Socket 통신 구현
- 게임 진행에 관한 JS 구현
- 점수에 따른 HP바 모듈 구현

김현지

- 문제 제작
- 대결 결과 모듈 구현
- 프로토타입 개발 이후 CSS 리팩토링

장재한

- 프로젝트 UI 구상 (피그마)
- 매칭 대기 모듈 구현
- 퀴즈 진행 모듈 구현

<br/>

## 기술 스택

| 구분        | 기술             |
| ----------- | ---------------- |
| Server      | Node.js, Express |
| 실시간 통신 | Socket.IO        |
| Database    | JSON (정적 DB)   |
| Front-end   | HTML, CSS, JS    |

<br/>

## 기획 메모

메인 기능

- Socket 통신 기반 1:1 대결 매칭
- JSON기반 정적 DB를 활용한 랜덤 문제 출제

부가 기능

- 힌트 사용시 오답 선지 하나 제거 (문제당 1번)
- 랭킹 기능

<br/>

## 실행 방법

1. VScode에 git 설치
2. node.js 설치
3. npm -v, node -v를 통해 설치확인
4. VScode 다시로드
5. 명령어 실행

```bash
npm install
node server.js
```

접속(로컬): `http://localhost:3000/quiz`
접속(외부): `http://IPv4주소:3000/quiz`
