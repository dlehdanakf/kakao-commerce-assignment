## 과제 1. 화물엘리베이터 사전과제

- 지원자 : 이 동 현
- 이메일 : dlehdanakf@gmail.com



### 개요

#### 모듈 구조

과제물로 제출한 프로젝트는 아래와 같은 디렉토리 구조를 가지고 있습니다.

```
ProjectRoot/
|-- dist/
|    |-- script.js                   /* 최종 트랜스파일, 번들링된 스크립트 */
|    +-- style.css                   /* 최종 트랜스파일, 번들링된 스타일시트 */
|-- src/
|    |-- scripts
|    |    |-- controllers
|    |    |    |-- call_elevator.ts  /* 엘리베이터 호출 API */
|    |    |    |-- check_floor.ts    /* 층 호출버튼 활성여부 확인 API */
|    |    |    +-- initialize.ts     /* 엘리베이터 어플리케이션 초기화 */
|    |    |-- data_models
|    |    |    |-- BasicDataModel.ts /* 데이터모델 추상 클래스 */
|    |    |    |-- Elevator.ts       /* 엘리베이터 데이터모델 */
|    |    |    +-- Floor.ts          /* 층 데이터모델 */
|    |    |-- view_models
|    |    |    |-- BasicViewModel.ts /* 뷰모델 추상 클래스 */
|    |    |    |-- ElevatorView.ts   /* 엘리베이터 뷰모델 */
|    |    |    +-- FloorView.ts      /* 층 뷰모델 */
|    |    +-- script.ts              /* 입력폼 Submit 이벤트 정의 */
|    +-- styles
|         |-- _color.scss            /* 스타일시트에서 사용하는 색상값 저장 */
|         |-- _simulator.scss        /* 시뮬레이터 컴포넌트 관련 스타일시트 */
|         |-- _variable-form.scss    /* 층, 엘리베이터 수 입력폼 스타일시트 */
|         +-- style.scss             /* 번들링을 위한 부모 스타일시트 */
+-- assignment.html                  /* 정적인 엘리먼트들이 미리 정의된 HTML */
```



##### DataModels

- **Elevator** : 엘리베이터 하나를 나타내는 데이터 객체로 엘리베이터의 상태, 위치, 해야할 작업 큐 배열이 담겨있습니다.
- **Floor** : 층 하나를 나타내는 데이터 객체로 몇 층인지, 엘리베이터가 배정된 상태인지 상태값을 저장합니다.



##### ViewModels

- **ElevatorView** : Elevator 객체에 담겨있는 데이터 값에 따라 엘리베이터를 표현하는 HTML 앨리먼트의 속성과 마크업을 변경합니다.
- **FloorView** : Floor 객체에 담겨있는 데이터 값에 따라 층에 배정된 엘리베이터 인텍스를 표기하거나, 사용자의 액션에 따라 `호출` 버튼 이벤트를 발생시킵니다.



##### BasicDataModel ⇔ BasicViewModel



<p align="center"><img src="https://res.cloudinary.com/deqrkzpqw/image/upload/v1606623803/kakao-commerce-document/class_structure_voxh3n.png" width="500px" /></p>



- **BasicDataModel** : 데이터 모델은 일대일 대응되는 뷰 모델 레퍼런스를 가지고 있으며 필드 값이 갱신될 경우 뷰 모델에게 화면을 업데이트할 것을 요청합니다.
- **BasicViewModel** : 뷰 모델은 일대일 대응되는 데이터 모델 레퍼런스를 가지고 있으며 데이터 모델에서 화면 업데이트 요청을 받을 경우 데이터 모델의 상태값을 토대로 화면을 재구성합니다. `click` 이벤트 같이 화면에 표시된 앨리먼트에 대해 사용자 액션이 있을 경우 API를 호출하여 데이터 상태를 변경하도록 구현했습니다.



##### Elevator

<p align="center"><img src="https://res.cloudinary.com/deqrkzpqw/image/upload/v1606625939/kakao-commerce-document/elevator_structure_mejk42.png" width="700px" /></p>



- 엘리베이터가 배정되었을 때 `Elevator` 객체에서는 새로운 목적지를 등록하고 목적지까지 가는 동작을 수행하기 위해 `addDestination` 메소드가 실행됩니다.
- 해당 메소드에서는 엘리베이터의 마지막 목적지와 신규 추가된 목적지까지 이동거리를 계산하고, 이동하는 거리를 `generateMovingTasks()` 함수를 호출하여 거리를 Task 단위로 쪼갠 뒤 Task_Queue에 등록합니다.
- `doTask` 메소드는 등록된 Task를 큐에서 가져와 초 당 하나씩 실행하고 변경된 데이터를 필드에 저장합니다. 만약, 큐에 더 이상 Task가 남아있지 않다면 반복 실행을 중단합니다.
- `ElevatorView` 뷰 모델은 Elevator 데이터 모델의 변경사항에 따라 View를 업데이트함으로써 엘리베이터가 이동하는 모습이 사용자에게 보여지게 됩니다. 





#### 실행 방법

##### 과제 실행방법

제출한 과제는 미리 웹팩 빌드한 `js`, `css` 파일을 `dist/` 폴더안에 넣어두었습니다. 프로젝트 루트 디렉토리에 `assignment.html` 문서를 IE10 이상, 최신의 크롬 브라우저에서 열어주세요.



##### 빌드 방법

NodeJS 및 NPM 모듈이 이미 설치되어 있다는 가정하에 아래 명령어를 입력해주세요.

```bash
# 프로젝트 루트 디렉토리로 이동
$ cd kakao-commerce-assignment

# 의존성 라이브러리 설치
$ npm install

# Webpack 빌드
$ npm run build
```



##### 테스트 방법

프로젝트에 포함된 테스트코드를 실행하려면 아래 명령어를 입력해주세요. Jest 테스트 프레임워크를 활용하여 엘리베이터 모델 및 호출 관련 메소드에 대해 테스트코드를 작성했습니다.

```bash
$ npm test
```



#### API Reference

프로젝트에서 작성한 메소드를 `windows` 전역객체의 프로퍼티로 등록하여 어디서든 메소드를 호출할 수 있도록 구현하였습니다. 요구사항에 있었던 층 번호를 입력하여 엘리베이터를 호출하는 API와, 층 번호를 입력했을 때 층 활성 여부를 알려주는 API 두 가지를 등록했습니다.



##### 엘리베이터 호출 API

```typescript
windows.elevator.callElevator(floorIndex: number) => number
```

**매개변수**

- **floorIndex** : 엘리베이터를 호출할 층 인덱스

**반환값**

- **(number)** 호출에 따라 배정받은 엘리베이터 번호, 배정에 실패할 경우 -1 반환



##### 층 활성여부 확인 API

```typescript
windows.elevator.isFloorCallable(floorIndex: number) => boolean
```

**매개변수**

- **floorIndex** : 호출버튼 활성 여부를 확인할 층 인덱스

**반환값**

- **(boolean)** : 전달받은 인자값이 존재하지 않는 층 인덱스일 경우 `undefined`, 호출 버튼 활성 여부 반환





### 중점적으로 고민하고 구현했던 이슈들

#### 모듈 관심사 분리

- React나 Angular 프레임워크 없이 복잡한 어플리케이션의 View를 구현할 때 어떻게하면 효율적으로 구조를 설계할 수 있을까 고민했습니다.
- 처음에 하나의 model을 두고 모델에서 데이터 상태와 View를 갱신하는 메소드까지 모두 담아둔다는 생각을 했지만, 하나의 객체에 너무 많은 메소드와 역할이 담기는 것 같아서 꺼림칙했습니다.
- 마치 React, Angular를 사용할 때 처럼, 개발자는 데이터 값에만 신경쓰고 View 영역은 미리 설계해둔 컴포넌트가 알아서 데이터 갱신 시 화면에 반영하도록 서로 관심사가 분리되는 구조로 설계했습니다.
- Elevator, Floor 각각에 대해 데이터 모델과 뷰 모델로 나누어 데이터 모델은 데이터 상태 관리에만 관심을 두고, 뷰 모델은 데이터 모델이 바뀔 때 화면을 갱신하는데 관심을 분리했습니다.
- 프로젝트 구현에 앞서 구조 설계를 고민한 결과 엘리베이터가 호출되고 움직이며 버튼을 눌렀을 때 이벤트 핸들링까지 완만하게 구현할 수 있었습니다.



#### 클래스 소멸자 구현

- 데이터 모델과 뷰 모델을 일대일 대응시키며 각각의 필드에 상대방 레퍼런스 참조 값을 저장합니다.
- 그러다 보니 순환 참조 꼴이 되어 사용자가 "초기화" 버튼을 눌러 시뮬레이터를 종료하더라도 가비지 컬렉터가 해당 객체를 제대로 회수하지 않을 것으로 예상했습니다.
- 메모리 누수를 방지하고자 사용자가 "초기화" 버튼을 눌렀을 때 생성된 "FloorList", "ElevatorList" 배열을 지우기 전, 각각의 객체에 `destructor` 메소드를 구현하고 서로의 레퍼런스를 저장하는 필드를 `undefined`로 초기화했습니다.



#### 엘리베이터 이동 에니메이션 효과

- 1층에 위치한 엘리베이터를 2층으로 올리는 방법은 몇 가지가 있습니다. `{ position: absolute; bottom: 0; }` 스타일 속성을 부여한 뒤 `bottom` 속성 값을 조절해주면 HTMLElement의 위치를 조정할 수 있습니다.
- 변경되는 `bottom` 속성에 대해 에니메이션 효과를 주는 방법은 CSS Transition 속성을 사용했습니다.
- 하지만 `bottom` 속성을 변경하면 브라우저 reflow / repaint 작업이 있다면 단점이 있습니다. 엘리베이터의 개수가 요구사항 예시에서 보여준 4개 정도라면 문제 없지만 엘리베이터의 개수가 500개가 넘어가고 층 수도 많아진다면 모든 엘리베이터의 위치를 옮기는 에니메이션 때문에 화면이 버벅거릴 수도 있습니다.
- 브라우저 reflow / repaint 작업을 최소화하고자 `tranform(translate)`  스타일 속성을 이용했습니다. `transform` 속성이 변하면 `transition ` 을 활용하여 1초에 걸쳐 변화가 일어나도록 구현했습니다.
- 그 결과, 초당 약 100회 발생하던 layout 작업을 획기적으로 줄이고 repainting이 일어나지 않았습니다.

|                            bottom                            |                 transform(translate(0, -y))                  |
| :----------------------------------------------------------: | :----------------------------------------------------------: |
| <img src="https://res.cloudinary.com/deqrkzpqw/image/upload/v1606623803/kakao-commerce-document/css_bottom_ktzzmr.png" /> | <img src="https://res.cloudinary.com/deqrkzpqw/image/upload/v1606623803/kakao-commerce-document/css_transform_gdrzlj.png" /> |



#### 가장 빠르게 도착하는 엘리베이터 선발

-  `Array.prototype.reduce` 와 같이 자바스크립트 내장 메소드만을 이용하여 비즈니스 로직을 구현하며 누구나 알아보기 쉽도록 코드를 작성하고자 노력했습니다.
- 먼저 엘리베이터 데이터 모델에 Task_Queue 배열을 선언하여 엘리베이터가 작업해야하는 작업량을 확인할 수 있도록 만들었습니다. 엘리베이터가 1초에 한 층씩 이동할 수 있으므로 "위로 올라간다", "아래로 내려간다" 와 같은 작업단위 하나당 1초로 환산했습니다. 엘리베이터에 배정된 작업을 모두 완수하는데 걸리는 시간과 엘리베이터가 호출한 층 까지 이동하는데 걸리는 시간을 합산하여 가장 값이 작은 엘리베이터가 배정되도록 구현했습니다.
- 요구사항에 **엘리베이터는 목적지에 도착한 뒤 3초간 머무르는 조건**이 있었는데 "머무른다"는 상태를 표현하고자 재밌게 "문열림" 상태로 만들어보았습니다.
- "문열림" 상태 또한 "위로 올라간다", "아래로 내려간다" 작업 처럼 단위 하나당 1초로 설정하여 구현상 편의를 주었습니다.





### 기술적으로 어렵게 해결했던 이슈들

##### Windows Chrome ⇔ macOS Chrome 크로스브라우징

- ElevatorList 컴포넌트에는 수평 스크롤이 있습니다. 화면 전체 스크롤이 발생하지 않아 FloorList는 고정된 채 ElevatorList만 좌우로 드래그하며 엘리베이터의 이동 상황을 지켜볼 수 있습니다.
- 이 때 윈도우 환경의 브라우저에선 수평 스크롤이 만들어지면서 FloorList 와 ElevatorList 사이에 "스크롤바" 만큼 간격이 발생하는 이슈가 발생하여 CSS Hack 및 `window.navigator.platform` 속성을 활용해 문제를 해결했습니다.

|                            BEFORE                            |                            AFTER                             |
| :----------------------------------------------------------: | :----------------------------------------------------------: |
| <img src="https://res.cloudinary.com/deqrkzpqw/image/upload/v1606623803/kakao-commerce-document/scroll_before_q8ogbo.png" /> | <img src="https://res.cloudinary.com/deqrkzpqw/image/upload/v1606623803/kakao-commerce-document/scroll_after_kn3gru.png" /> |



##### Internet Explorer 10 Polyfill

- 사전과제 공통 요구사항에는 과제 제출물이 IE10 이상에서 정상 동작해야한단 조건이 있습니다.
- 매킨토시 환경에서 개발을 마치고 IE10 인터넷 브라우저로 HTML 문서를 열었을 때 어플리케이션 초기화조차 되지 않는 결과에 당황했습니다.
- 타입스크립트 컴파일 옵션에 `{ "target": "es5" }` 속성을 주고, Babel을 설치해도 실행이 되지 않았습니다.
- Webpack에서 빌드된 `script.js` 파일을 뜯어보니 일부 화살표함수 문법이 남아있는 것을 확인했습니다. TypeScript, Babel 등 다양한 시도와 검색을 한 끝에 Webpack 5 부터 스크립트들을 번들링할 때 화살표 함수를 사용한다는 이슈 댓글을 발견했고, Webpack 4 버젼으로 변경함으로서 문제를 해결할 수 있었습니다.
- 그 밖에도 IE10 에서는 지원하지 않는 `Array.prototype.includes` 와 같은 메소드들을 위해 polyfill 라이브러리를 설치하고, `Element.prototype.dataset` 을 지원하지 않을 경우 `Elelement.prototype.setAttribute` 메소드를 사용하는 등 IE10에서도 정상 동작하도록 예외처리를 해준 결과 IE10 환경에서도 모든 기능이 정상 동작하는 것을 확인할 수 있었습니다.

<img src="https://res.cloudinary.com/deqrkzpqw/image/upload/v1606623803/kakao-commerce-document/browser_compatibility_poeb2f.png" />



- 평소 레퍼런스를 읽으면서도 유심히 보지 않았던 브라우저 호환성 항목이 실제 서비스를 구현하고 다양한 환경에서 정상 동작하도록 만드는데 있어선 중요하겠다는 생각이 들었습니다.





끝.
감사합니다.

