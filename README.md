# 1vs1 Quiz Battle

> Socket.IO 기반 실시간 1대1 퀴즈 대결 게임

## 기술 스택

| 구분        | 기술             |
| ----------- | ---------------- |
| Server      | Node.js, Express |
| 실시간 통신 | Socket.IO        |
| Database    | JSON (정적 DB)   |
| Front-end   | HTML, CSS, JS    |

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
https://www.figma.com/design/rEaH0VZwjWMRgCe6MsMTuA/quiz_%ED%99%94%EB%A9%B4-%EC%B4%88%EC%95%88?node-id=0-1&t=OnNW8R8iWWT1uhiv-1
문제출제 4지선다 (오답까지 넣어서) [현지]
main page html [호성]
로그인 page
회원 가입 page
-=> 코드 룰 정립
게임 실행 page
게임 결과 page
socket npm [동현]

- quiz N문제중 10문제 추출하는 로직 [동현]
- hp바 100 - 상대스코어 css 로직 [현지]
- 피그마

- JoinForm.html 유틸 -> 메인, 로그인(=회원가입) [재한]
- JoinForm CSS 만드는 게 필요하고 [재한]
- JoinForm에 필요한 JS필요 [호성]

---

#문제 출제\_기본 4문제, 중간 4문제, 고난도 2문제를 랜덤으로 추출하여 총 10문제

---

# 기본 난이도 (1~18)

### 1

HTML5 문서를 선언하는 올바른 코드는?

A. `<html5>`  
B. `<!DOCTYPE html>`  
C. `<doctype html>`  
D. `<document html>`

정답: B

---

### 2

웹페이지 제목이 브라우저 탭에 표시되도록 하는 태그는?

A. `<header>`  
B. `<title>`  
C. `<meta>`  
D. `<head>`

정답: B

---

### 3

HTML 문서의 가장 큰 제목 태그는?

A. `<h1>`  
B. `<header>`  
C. `<title>`  
D. `<h0>`

정답: A

---

### 4

본문의 단락을 나타내는 태그는?

A. `<text>`  
B. `<p>`  
C. `<section>`  
D. `<content>`

정답: B

---

### 5

줄바꿈을 만드는 태그는?

A. `<lb>`  
B. `<br>`  
C. `<newline>`  
D. `<break>`

정답: B

---

### 6

수평선을 만드는 태그는?

A. `<line>`  
B. `<hr>`  
C. `<rule>`  
D. `<border>`

정답: B

---

### 7

웹페이지 링크를 만드는 태그는?

A. `<link>`  
B. `<a>`  
C. `<nav>`  
D. `<href>`

정답: B

---

### 8

`<a>` 태그에서 이동할 주소를 지정하는 속성은?

A. src  
B. href  
C. link  
D. target

정답: B

---

### 9

순서가 없는 목록 태그는?

A. `<ul>`  
B. `<ol>`  
C. `<li>`  
D. `<list>`

정답: A

---

### 10

목록 항목을 만드는 태그는?

A. `<item>`  
B. `<li>`  
C. `<list>`  
D. `<ul>`

정답: B

---

### 11

HTML에서 이미지를 삽입하는 태그는?

A. `<image>`  
B. `<img>`  
C. `<picture>`  
D. `<media>`

정답: B

---

### 12

이미지 파일 경로를 지정하는 속성은?

A. href  
B. src  
C. path  
D. url

정답: B

---

### 13

이미지가 없을 때 대체 텍스트를 표시하는 속성은?

A. title  
B. alt  
C. description  
D. text

정답: B

---

### 14

폼 데이터를 서버로 전송하는 태그는?

A. `<input>`  
B. `<form>`  
C. `<submit>`  
D. `<send>`

정답: B

---

### 15

폼 데이터를 전송할 URL을 지정하는 속성은?

A. method  
B. action  
C. target  
D. name

정답: B

---

### 16

GET 방식 특징은?

A. 데이터가 URL에 포함된다  
B. 데이터가 body에 저장된다  
C. 항상 암호화된다  
D. 파일 업로드에 사용된다

정답: A

---

### 17

POST 방식 특징은?

A. 데이터가 URL에 표시된다  
B. 데이터가 body에 포함된다  
C. 데이터 길이 매우 제한된다  
D. 캐시가 항상 사용된다

정답: B

---

### 18

웹 브라우저가 서버에 보내는 메시지는?

A. response  
B. request  
C. reply  
D. packet

정답: B

---

# 중간 난이도 (19~40)

### 19

다음 중 block 요소는?

A. span  
B. div  
C. a  
D. img

정답: B

---

### 20

다음 중 inline 요소는?

A. div  
B. section  
C. span  
D. article

정답: C

---

### 21

HTML에서 의미 있는 구조를 표현하는 태그를 무엇이라 하는가?

A. logic tag  
B. semantic tag  
C. style tag  
D. layout tag

정답: B

---

### 22

웹페이지의 머리 영역을 나타내는 태그는?

A. `<nav>`  
B. `<header>`  
C. `<section>`  
D. `<aside>`

정답: B

---

### 23

사이트 메뉴 영역을 나타내는 태그는?

A. `<nav>`  
B. `<menu>`  
C. `<aside>`  
D. `<header>`

정답: A

---

### 24

독립적인 콘텐츠 영역을 나타내는 태그는?

A. `<article>`  
B. `<div>`  
C. `<header>`  
D. `<main>`

정답: A

---

### 25

페이지 하단 영역을 나타내는 태그는?

A. `<bottom>`  
B. `<footer>`  
C. `<end>`  
D. `<aside>`

정답: B

---

### 26

HTML에서 여러 줄 텍스트 입력을 받는 태그는?

A. `<input>`  
B. `<textarea>`  
C. `<text>`  
D. `<field>`

정답: B

---

### 27

라디오 버튼을 만드는 input 타입은?

A. checkbox  
B. radcio --> 오타인듯?
C. select  
D. option

정답: B

---

### 28

라디오 버튼을 하나의 그룹으로 묶는 속성은?

A. id  
B. name  
C. class  
D. value

정답: B

---

### 29

label 태그에서 input과 연결하는 속성은?

A. id  
B. name  
C. for  
D. type

정답: C

---

### 30

HTTP 기본 포트 번호는?

A. 21  
B. 80  
C. 443  
D. 8080

정답: B

---

### 31

HTTP 특징은?

A. stateful  
B. stateless  
C. synchronous  
D. encrypted

정답: B

---

### 32

HTTP 요청 메시지 구성요소는?

A. request line + header + body  
B. header + html  
C. method + port  
D. path + query

정답: A

---

### 33

GET 요청에서 일반적으로 없는 부분은?

A. header  
B. URL  
C. body  
D. method

정답: C

---

### 34

HTTP 응답 코드 200 의미는?

A. 서버 오류  
B. 요청 성공  
C. 페이지 없음  
D. 인증 실패

정답: B

---

### 35

HTTP 응답 코드 404 의미는?

A. 페이지 없음  
B. 서버 정상  
C. 인증 실패  
D. 서버 오류

정답: A

---

### 36

URL에서 서버 주소를 나타내는 부분은?

A. protocol  
B. host  
C. path  
D. query

정답: B

---

### 37

URL에서 서버 자원의 위치를 나타내는 부분은?

A. host  
B. path  
C. protocol  
D. port

정답: B

---

### 38

IPv4 주소는 몇 비트인가?

A. 16  
B. 32  
C. 64  
D. 128

정답: B

---

### 39

IPv4 주소 표현 방식은?

A. 10진수 4개  
B. 16진수 4개  
C. 2진수 문자열  
D. 문자 문자열

정답: A

---

### 40

HTML에서 테이블 행(row)을 만드는 태그는?

A. `<td>`  
B. `<tr>`  
C. `<th>`  
D. `<row>`

정답: B

---

# 고난도 (41~50)

### 41

다음 코드에서 `<label>`을 클릭했을 때 입력창이 활성화되는 이유는?

```
<label for="username">Username</label>
<input id="username" type="text">
```

A. label의 for 속성이 input의 id와 연결되기 때문  
B. label과 input의 name 속성이 동일하기 때문  
C. label은 항상 가장 가까운 input과 자동으로 연결되기 때문  
D. label이 input보다 먼저 선언되어 있기 때문

정답: A

---

### 42

다음 중 HTML5 semantic 구조로 가장 적절한 것은?

A. header-nav-section-article-footer 구조로 페이지를 구성한다  
B. div 태그만 사용하여 모든 페이지 영역을 구성한다  
C. script와 style 태그를 사용하여 페이지 구조를 만든다  
D. form과 input 태그로 페이지 레이아웃을 구성한다

정답: A

---

### 43

다음 JavaScript 코드의 실행 결과는?

```
console.log(1 + "2" + 3);
```

A. 숫자 6이 출력된다  
B. 문자열 "123"이 출력된다  
C. 숫자 33이 출력된다  
D. NaN이 출력된다

정답: B

---

### 44

다음 JavaScript 코드의 실행 결과는?

```
console.log(typeof []);
```

A. 배열 타입인 "array"가 출력된다  
B. 객체 타입인 "object"가 출력된다  
C. 문자열 타입인 "string"가 출력된다  
D. 정의되지 않은 "undefined"가 출력된다

정답: B

---

### 45

다음 CSS 선택자 중 우선순위가 가장 높은 것은?

A. div p 선택자  
B. p 태그 선택자  
C. .menu 클래스 선택자  
D. #menu 아이디 선택자

정답: D

---

### 46

다음 CSS 코드의 의미로 가장 올바른 것은?

```
div p {
color: red;
}
```

A. 모든 div와 p 요소에 빨간색이 적용된다  
B. div 바로 다음에 오는 p 요소에만 적용된다  
C. div 내부에 있는 p 요소에 빨간색이 적용된다  
D. 모든 p 요소에 빨간색이 적용된다

정답: C

---

### 47

다음 JavaScript 코드 실행 결과는?

```
console.log("5" - 2);
```

A. 문자열 "52"가 출력된다  
B. 숫자 3이 출력된다  
C. 숫자 7이 출력된다  
D. NaN이 출력된다

정답: B

---

### 48

HTTP가 stateless 프로토콜이라는 의미로 가장 올바른 것은?

A. 서버가 이전 요청의 상태 정보를 계속 저장한다  
B. 서버가 클라이언트의 이전 요청 상태를 기억하지 않는다  
C. 서버가 항상 로그인 상태를 유지한다  
D. 모든 HTTP 통신이 암호화되어 전달된다

정답: B

---

### 49

다음 HTML 코드의 동작으로 가장 올바른 것은?

```
<a href="#section1">Go</a>
<h2 id="section1">Title</h2>
```

A. 새로운 웹 페이지로 이동한다  
B. 같은 페이지 내 특정 위치로 이동한다  
C. 서버에 새로운 HTTP 요청을 보낸다  
D. 새로운 탭에서 페이지가 열린다

정답: B

---

### 50

다음 JavaScript 코드 실행 결과는?

```
console.log(2 + "2" * 2);
```

A. 숫자 6이 출력된다  
B. 숫자 8이 출력된다  
C. 문자열 "22"가 출력된다  
D. NaN이 출력된다

정답: A
