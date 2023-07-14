# ✨ LV-4 & 5 개인과제 ✨

<br>
<br>

## 🚀 배포

x(mock서버와 배포서버(vercel)의 통신규격 불일치로 인해 배포불가)

<br>
<br>

## 🔧 기술 스택

- Javascript
- CSS
- Redux-toolkit
- React-router-dom
- react-query
- firebase
- axios

<br>
<br>

## 📒 폴더 구조

```sh
📦src
 ┣ 📂assets        # 프로젝트에 사용된 아이콘을 모은 폴더
 ┃ ┗ 📂svgs        # svg파일을 모은 폴더
 ┣ 📂components    # 컴포넌트들을 모아놓은 폴더
 ┃ ┣ 📂Button      # 공용버튼 컴포넌트
 ┃ ┣ 📂Card        # 작성글 하나하나에 대한 card 컴포넌트
 ┃ ┣ 📂header      # 헤더 컴포넌트
 ┃ ┣ 📂Input       # 로그인/회원가입 input 컴포넌트
 ┃ ┣ 📂layout      # 레이아웃 컴포넌트
 ┃ ┗ 📂Modal       # portal 모달 컴포넌트
 ┣ 📂hooks         # hook들을 모아놓은 폴더
 ┣ 📂pages         # route를 모아놓은 폴더
 ┃ ┣ 📂Detail      # post의 상세페이지
 ┃ ┣ 📂Home        # Home 페이지
 ┃ ┣ 📂Login       # Login 페이지
 ┃ ┣ 📂Post        # 글 작성 페이지
 ┃ ┣ 📂Register    # 회원가입 페이지
 ┃ ┗ 📂Update      # 글 수정 페이지
 ┣ 📂redux         # 리덕스 상태관리를 위한 slice, store 폴더
 ┃ ┣ 📂config      # 리덕스 설정, store 파일이 있는 폴더
 ┃ ┗ 📂modules     # slice파일들을 모아놓은 폴더
 ┗ 📂service       # 비동기 동작 관련 axios 함수를 모아놓은 폴더
```

<br>
<br>

## 📌 실행 방법

```
git clone git@github.com:wsdx123/jy-lv4.git
```

```
yarn install && yarn start
```

<br>
<br>

## 💡 구현 내용

<br>

### **필수 구현**

- CRUD 를 하는 프로그램을 제작했습니다.

- json-server를 통해 db를 관리해주었습니다.
- 동적 라우팅을 사용해주었습니다.( /update/:postId , /detail/:postId )
- 커스텀 훅을 구현하여 재사용성과 가독성을 높혔습니다.(useInput.js)
- 로그인/회원가입 form에서 id/password를 다 입력하지 않았을때, form help text를 input박스 밑에 띄워 유효성 검사를 진행하였습니다.
- 공통된 style을 가지고 onclick함수를 받는 공통버튼 컴포넌트를 만들어 사용했습니다.
- JWT토큰을 활용한 로그인/회원가입을 구현하였습니다.
- id/password가 모두 입력되지 않으면 api요청을 보내지 않고 help text를 출력합니다.
- 그 외 로그인/회원가입 예외처리는 직접만든 modal을 통해 alert를 띄워주었습니다.
- 라우트를 이동할 때마다 인가 요청을 보내, jwt 토큰이 만료되었을 때 재로그인 하도록 요청하는 모달을 띄우고 로그아웃 후 로그인화면으로 navigate시켰습니다.
- 로그인/회원가입을 하지않았을때는 로그인/회원가입 라우트 외엔 접근할 수 없습니다. 반대로 로그인 시에는 로그인/회원가입 라우트에 접근할 수 없습니다.
- 로그아웃 기능을 구현하였습니다.

### API 명세서

<img src='https://github.com/wsdx123/jy-lv4/assets/50202150/eb4e016a-512d-4649-8846-ff81b1f163f5' width={300} height={300}>

<br>
<br>

## ✏️ 어려웠던 점

<br>

### 1. custom hook의 제작

- 커스텀 훅의 숙련도가 낮아 input state와 onChange함수 정도만 관리하는 커스텀훅밖에 구현하지 못했다. 좀 더 능숙하게 다뤄 효과적이고 재사용성 높은 커스텀훅을 쓰기엔 아직 어렵다.

### 2. JWT 토큰의 만료에 따른 처리

- 일단 mock서버에서 준 토큰은 60분의 만료시간이 있다. 하지만 이것을 내부적으로 카운트다운해주는 기능이 없고, 로그인 시점부터 60분을 세는 로직을 짜는건 비효율적이라 생각했다. 그래서 대부분의 동작을 실행하는것과 같은 라우트 이동시에 jwt인가 요청을 보내어 토큰 만료에 따른 인가 처리를 하도록 했다.

### 3. form help text 제작

- 처음엔 단순히 state를 이용해 form이 invalid할때 state를 true로 해줘서 p태그를 display 해준다 같은식으로 생각했었다. 분명 이렇게 해도 동작은 하겠지만, 뭔가 마음에 들지 않는 로직이었다.(하드코딩의 냄새도 나고 예쁘지 않은 코드였고, 무엇보다 다른 방법이 있을것 같았다.) 주변에 의견을 묻고, 구글링을 한 결과 input 태그의 onInValid라는 속성을 사용하면 가능했다. onInValid에 동작을 부여해 validation을 하는 로직을 만들어 낼 수 있었다.

### 4. 무한 스크롤

- 사실 무한 스크롤은 해결해 내지 못했다. react-query에 무한 스크롤을 위한 기능이 내장되어있지만(useInfiniteQuery), api차이 때문인지.. 공식문서만으로 이해가 어려워서 해결해 내지 못했다. 다음 page의 api요청을 발생시키는 로직도 구상만 하고 시간이 부족해 완료하지 못하여 아쉬움이 남는다.

### 5. 자체 제작 모달로 alert 동작

- portal을 사용해 독립적인 modal을 만들어내었고, 리덕스를 이용해 모달을 열고 text를 넣을수 있지만 재사용성과 동작 측면에서 완성도가 낮은것이 아쉽다. 일단 alert의 용도로만 사용할 수 있는 구조다. 추가적으로 다른 버튼을 넣거나 하여 확인용 모달로 사용할 수도 있지만, 거기까지는 시간이 부족해 구현하지 못했다. 그리고 그 내용의 연장선상으로 alert를 띄울 시 실제 alert처럼 뒤의 동작들이 멈춰있지 않다. 이 모달을 promise형태로 만들어 async-await를 걸어주면 되겠지만 이 역시 완성하지 못해 아쉬움이 남는다.
