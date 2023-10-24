<div align="center">
  <img src="https://github.com/GIL-DONG/gil-dong-project-client/assets/96197310/823746fa-dcc8-4085-a546-44e24544e38e" width="100px" height="100px"/>
  <h2>🏖 한국관광공사와 kakao가 함께하는 
 2023 관광데이터 활용 공모전 출품작</h2>

  <br/>
</div>
  
- 서비스 명 : **AI Travel Planner 길동이**
- 서비스 목표 : 모든 사용자의 취향과 요구를 반영하여 안전하고 편리한 여행 경험을 보장하며, 장애 여부와 상관없이 모두가 여행의 즐거움을 누릴 수 있도록 하는 것
- 서비스 대상 : **전국민** [ + 장애인 (시각, 청각, 지체) ]

- 주요 기능 :
  - 여행 챗봇
    - 국내 여행 추천
    - 여행지 정보 제공
    - 여행 계획 자동 생성 기능
    - 이미지 검색 기능
    - 실시간 날씨 정보 및 여행지 후기 검색
  - 여행 일정 카카오 캘린더 연동 기능
  - 음성 서비스 제공
- 서비스 기술 :
  - LLM 기반 생성형 AI (Polyglot Finetuning, OpenAI)
  - STT 음성인식 기술
  - ImageBind 멀티모달 이미지 검색
  - SBERT 텍스트 의미적 유사성 기반 검색
- 사용 데이터 :
  - 한국관광공사 TourAPI
  - 공공데이터 포털
  - google search API / kakao open API
- 배포 링크 : https://gildong.site
  <br />

## Contents

- [🚩 Role](#role)
- [🛠 Tech Stack](#tech-stack)
- [🖥 Deployment](#Deployment)
- [🔗 Git](#git)

<br />

## Role

<div align="center">

|                                           Front-end                                           |                                           Back-end                                            |                                           Back-end                                            |                                           Back-end                                            |
| :-------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------: |
| <img src="https://avatars.githubusercontent.com/u/96197310?v=4" width="200px" height="200px"> | <img src="https://avatars.githubusercontent.com/u/72532377?v=4" width="200px" height="200px"> | <img src="https://avatars.githubusercontent.com/u/86283443?v=4" width="200px" height="200px"> | <img src="https://avatars.githubusercontent.com/u/97862180?v=4" width="200px" height="200px"> |
|                   [강명주<br/>(@myungju030)](https://github.com/myungju030)                   |                  [홍민지<br/>(@ella-hong22)](https://github.com/ella-hong22)                  |                      [이원석<br/>(@leewaay)](https://github.com/leewaay)                      |                  [이준엽<br/>(@Makeitshort)](https://github.com/Makeitshort)                  |
|                                        프론트엔드 개발                                        |                                     기획 총괄, 챗봇 개발                                      |                                  백엔드 개발 총괄, 챗봇 개발                                  |                              데이터베이스 관리, 이미지 검색 개발                              |

</div>
<br/>

## Tech Stack

<div align =center>

|     Area     |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       Tech Stack                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| :----------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| **Frontend** | <img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=for-the-badge&logo=TypeScript&logoColor=black"> <img src="https://img.shields.io/badge/-vite-FFD22A?style=for-the-badge&logo=vite&logoColor=white"> <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/Axios-5A29E4.svg?&style=for-the-badge&logo=axios&logoColor=white"> <img src="https://img.shields.io/badge/React Router-CA4245.svg?&style=for-the-badge&logo=reactrouter&logoColor=white"> <img src="https://img.shields.io/badge/RECOIL-3578E5?&style=for-the-badge&logo=recoil&logoColor=white"> <img src="https://img.shields.io/badge/Sass-CC6699?&style=for-the-badge&logo=Sass&logoColor=white"> <img src="https://img.shields.io/badge/reactIcons-e91e63?&style=for-the-badge&logoColor=white"> <img src="https://img.shields.io/badge/ESLINT-4B32C3?&style=for-the-badge&logo=ESLint&logoColor=white"> <img src="https://img.shields.io/badge/PRETTIER-F7B93E?&style=for-the-badge&logo=Prettier&logoColor=white"> <img src="https://img.shields.io/badge/husky-285f77?&style=for-the-badge&logoColor=white"> <img src="https://img.shields.io/badge/lintStaged-4daad4?&style=for-the-badge&logoColor=white"> |
| **Backend**  |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           <img src="https://img.shields.io/badge/python-3776AB.svg?style=for-the-badge&logo=python&logoColor=black"> <img src="https://img.shields.io/badge/elasticsearch-005571.svg?style=for-the-badge&logo=elasticsearch&logoColor=white">                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
|   **Tool**   |                                                                                                                                                                                                                                                                                                                                                                                                                      <img src="https://img.shields.io/badge/notion-000000.svg?style=for-the-badge&logo=notion&logoColor=white"> <img src="https://img.shields.io/badge/discord-5865F2.svg?style=for-the-badge&logo=discord&logoColor=white"> <img src="https://img.shields.io/badge/figma-F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white"> <img src="https://img.shields.io/badge/postman-FF6C37.svg?style=for-the-badge&logo=postman&logoColor=white">                                                                                                                                                                                                                                                                                                                                                                                                                      |

</div>
<br />

## Deployment

|     Area     |                                                      Deployment                                                      |
| :----------: | :------------------------------------------------------------------------------------------------------------------: |
| **Frontend** | <img src="https://github.com/GIL-DONG/gil-dong-project-client/assets/96197310/020bd094-adaa-4608-bfcc-3e0ce7d15341"> |

<br />

## Git

### 🌿 Branch

- main : 서비스 운영 브랜치
- dev : 개발중인 브랜치
- feat/기능명 : 기능 개발 브랜치

<br/>

### 💌 Commit Message

| Message  |                  설명                  |
| :------: | :------------------------------------: |
|   feat   |            새로운 기능 추가            |
|   fix    |               버그 수정                |
|   docs   |               문서 수정                |
| refactor |             코드 리팩터링              |
|  style   | 코드 의미에 영향을 주지 않는 변경사항  |
|   test   | 테스트 코드, 리팩터링 테스트 코드 추가 |
|  chore   | 빌드 부분 혹은 패키지 매니저 수정사항  |
|  rename  |      파일 혹은 폴더명을 수정사항       |
| release  |                  배포                  |