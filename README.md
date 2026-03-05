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

---
## Quiz Question List

HTML, CSS, JavaScript 핵심 지식을 테스트하기 위한 객관식 문제입니다.

---
#기본 4문제, 중간 4문제, 고난도 2문제를 랜덤으로 추출하여 총 10문제 출제
# 기본 난이도 (1~18)

### 1
HTML5 문서를 선언하는 올바른 코드는?

A. `<html5>`  
B. `<!DOCTYPE html>`  
C. `<doctype html>`  
D. `<document html>`

---

### 2
웹페이지 제목이 브라우저 탭에 표시되도록 하는 태그는?

A. `<header>`  
B. `<title>`  
C. `<meta>`  
D. `<head>`

---

### 3
HTML 문서의 가장 큰 제목 태그는?

A. `<h1>`  
B. `<header>`  
C. `<title>`  
D. `<h0>`

---

### 4
본문의 단락을 나타내는 태그는?

A. `<text>`  
B. `<p>`  
C. `<section>`  
D. `<content>`

---

### 5
줄바꿈을 만드는 태그는?

A. `<lb>`  
B. `<br>`  
C. `<newline>`  
D. `<break>`

---

### 6
수평선을 만드는 태그는?

A. `<line>`  
B. `<hr>`  
C. `<rule>`  
D. `<border>`

---

### 7
웹페이지 링크를 만드는 태그는?

A. `<link>`  
B. `<a>`  
C. `<nav>`  
D. `<href>`

---

### 8
`<a>` 태그에서 이동할 주소를 지정하는 속성은?

A. src  
B. href  
C. link  
D. target

---

### 9
순서가 없는 목록 태그는?

A. `<ul>`  
B. `<ol>`  
C. `<li>`  
D. `<list>`

---

### 10
목록 항목을 만드는 태그는?

A. `<item>`  
B. `<li>`  
C. `<list>`  
D. `<ul>`

---

### 11
HTML에서 이미지를 삽입하는 태그는?

A. `<image>`  
B. `<img>`  
C. `<picture>`  
D. `<media>`

---

### 12
이미지 파일 경로를 지정하는 속성은?

A. href  
B. src  
C. path  
D. url

---

### 13
이미지가 없을 때 대체 텍스트를 표시하는 속성은?

A. title  
B. alt  
C. description  
D. text

---

### 14
폼 데이터를 서버로 전송하는 태그는?

A. `<input>`  
B. `<form>`  
C. `<submit>`  
D. `<send>`

---

### 15
폼 데이터를 전송할 URL을 지정하는 속성은?

A. method  
B. action  
C. target  
D. name

---

### 16
GET 방식 특징은?

A. 데이터가 URL에 포함된다  
B. 데이터가 body에 저장된다  
C. 항상 암호화된다  
D. 파일 업로드에 사용된다

---

### 17
POST 방식 특징은?

A. 데이터가 URL에 표시된다  
B. 데이터가 body에 포함된다  
C. 데이터 길이 매우 제한된다  
D. 캐시가 항상 사용된다

---

### 18
웹 브라우저가 서버에 보내는 메시지는?

A. response  
B. request  
C. reply  
D. packet

---

# 중간 난이도 (19~40)

### 19
다음 중 block 요소는?

A. span  
B. div  
C. a  
D. img

---

### 20
다음 중 inline 요소는?

A. div  
B. section  
C. span  
D. article

---

### 21
HTML에서 의미 있는 구조를 표현하는 태그를 무엇이라 하는가?

A. logic tag  
B. semantic tag  
C. style tag  
D. layout tag

---

### 22
웹페이지의 머리 영역을 나타내는 태그는?

A. `<nav>`  
B. `<header>`  
C. `<section>`  
D. `<aside>`

---

### 23
사이트 메뉴 영역을 나타내는 태그는?

A. `<nav>`  
B. `<menu>`  
C. `<aside>`  
D. `<header>`

---

### 24
독립적인 콘텐츠 영역을 나타내는 태그는?

A. `<article>`  
B. `<div>`  
C. `<header>`  
D. `<main>`

---

### 25
페이지 하단 영역을 나타내는 태그는?

A. `<bottom>`  
B. `<footer>`  
C. `<end>`  
D. `<aside>`

---

### 26
HTML에서 여러 줄 텍스트 입력을 받는 태그는?

A. `<input>`  
B. `<textarea>`  
C. `<text>`  
D. `<field>`

---

### 27
라디오 버튼을 만드는 input 타입은?

A. checkbox  
B. radio  
C. select  
D. option

---

### 28
라디오 버튼을 하나의 그룹으로 묶는 속성은?

A. id  
B. name  
C. class  
D. value

---

### 29
label 태그에서 input과 연결하는 속성은?

A. id  
B. name  
C. for  
D. type

---

### 30
HTTP 기본 포트 번호는?

A. 21  
B. 80  
C. 443  
D. 8080

---

### 31
HTTP 특징은?

A. stateful  
B. stateless  
C. synchronous  
D. encrypted

---

### 32
HTTP 요청 메시지 구성요소는?

A. request line + header + body  
B. header + html  
C. method + port  
D. path + query

---

### 33
GET 요청에서 일반적으로 없는 부분은?

A. header  
B. URL  
C. body  
D. method

---

### 34
HTTP 응답 코드 200 의미는?

A. 서버 오류  
B. 요청 성공  
C. 페이지 없음  
D. 인증 실패

---

### 35
HTTP 응답 코드 404 의미는?

A. 페이지 없음  
B. 서버 정상  
C. 인증 실패  
D. 서버 오류

---

### 36
URL에서 서버 주소를 나타내는 부분은?

A. protocol  
B. host  
C. path  
D. query

---

### 37
URL에서 서버 자원의 위치를 나타내는 부분은?

A. host  
B. path  
C. protocol  
D. port

---

### 38
IPv4 주소는 몇 비트인가?

A. 16  
B. 32  
C. 64  
D. 128

---

### 39
IPv4 주소 표현 방식은?

A. 10진수 4개  
B. 16진수 4개  
C. 2진수 문자열  
D. 문자 문자열

---

### 40
HTML에서 테이블 행(row)을 만드는 태그는?

A. `<td>`  
B. `<tr>`  
C. `<th>`  
D. `<row>`

---

# 고난이도 (41~50)

### 41
다음 코드에서 label 클릭 시 입력창이 활성화되는 이유는?

```
<label for="username">Username</label>
<input id="username" type="text">
```

A. class 연결  
B. id 연결  
C. name 연결  
D. type 연결

---

### 42
다음 중 semantic 구조로 가장 적절한 것은?

A. header → nav → section → article → footer  
B. div → div → div → div  
C. script → style → link  
D. form → input → textarea

---

### 43
다음 JavaScript 코드 실행 결과는?

```
let a = "10";
let b = 5;
console.log(a + b);
```

A. 15  
B. 105  
C. 오류  
D. NaN

---

### 44
다음 JavaScript 코드 결과는?

```
console.log(typeof []);
```

A. object  
B. array  
C. list  
D. undefined

---

### 45
CSS에서 id 선택자는 무엇으로 시작하는가?

A. .  
B. #  
C. @  
D. *

---

### 46
CSS에서 class 선택자는 무엇으로 시작하는가?

A. .  
B. #  
C. @  
D. *

---

### 47
다음 CSS 코드 의미는?

```
div p {
color: red;
}
```

A. div와 p 둘 다 적용  
B. div 안의 p에 적용  
C. 모든 p에 적용  
D. div 다음 p에 적용

---

### 48
다음 중 HTTP stateless 의미는?

A. 서버가 이전 요청 상태 기억  
B. 서버가 요청 상태를 기억하지 않음  
C. 서버가 항상 로그인 유지  
D. 요청이 항상 암호화됨

---

### 49
다음 HTML 코드 결과는?

```
<a href="#section1">Go</a>
<h2 id="section1">Title</h2>
```

A. 새 페이지 이동  
B. 같은 페이지 내부 이동  
C. 서버 요청 발생  
D. 새 탭 열림

---

### 50
다음 중 HTML / CSS / JavaScript 역할 설명으로 가장 정확한 것은?

A. HTML 구조 / CSS 스타일 / JS 동작  
B. HTML 스타일 / CSS 구조 / JS 서버  
C. HTML 서버 / CSS 디자인 / JS 구조  
D. HTML 데이터 / CSS 서버 / JS 구조
