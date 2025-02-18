<p align="center">
 <img src="https://github.com/user-attachments/assets/a55ea178-b842-4e38-8e87-2dc637784dcd">
</p>
 <h3> 테이블 오더 & 가맹점 & 본사(인트라넷) 연계 프로젝트 </h3></div>
<div align="center"></div>

# 인트라넷 기반 그룹웨어 개발 프로젝트

---
### 📌 프로젝트 소개
- 테이블 오더 & 가맹점 & 본사(인트라넷) 연계 프로젝트
<img src="https://github.com/user-attachments/assets/1b67fd3e-e3c3-44f9-898b-647b1deed0cb" >

### PDF
[프렌차이즈(TO & POS)와 인트라넷기반의 그룹웨어 프로젝트.pdf](https://github.com/user-attachments/files/16531140/default.pdf)
 
<br>

### 📰 제작기간 & 팀원 소개
- 2024-06-19. ~ 2024-07-12.

|이름| 담당 기능 구현                                                                         |
|------|----------------------------------------------------------------------------------|
|김예린| 인트라넷 - 가맹점관리(CRUD), 메뉴관리(CRUD), 매출관리(CRUD), 재고관리(CRUD)                |
|나소림| 가맹점 - 재고관리(CRUD), 매출관리(CRUD), 메뉴관리(CRUD), 지점장POS(CRUD), 관리자용POS(CRUD)        |
|문승환| 인트라넷 - 인사관리(CRUD), 로그인(JWT), 메신저(CRUD) |
|박민규| 인트라넷 - 캘린더관리(CRUD), 일정관리(CRUD), 대시보드(CRUD), 디자인 |
|이윤재| 인트라넷 - 전자결재(CRUD), 대시보드(CRUD), 알림(CRUD) |
|임주연| 가맹점 - 관리자관리(CRUD), 가맹점관리(CRUD), 테이블관리(CRUD), 주문(CRUD), 테이블오더 |

<br>

## ⛏ FE 기술 Stack

###### Dev-Tools
- Notion
- Git
- GitHub
- Slack

<br>

###### Front-end Stack
- React
- Redux Toolkit
- Router

<br>

## 🌸 아키텍쳐

<img alt="erd" src="https://github.com/user-attachments/assets/1e4359ca-7a5e-49bf-80da-5d4995a1affb">
<br>

## ⚙️ ERD

<img alt="erd" src="https://github.com/user-attachments/assets/16572375-ebf6-45c8-910f-6a9b87de3af1">
<img alt="erd" src="https://github.com/user-attachments/assets/189eea46-a248-4e98-9ad1-837971d770ab">
<br>

## ✔ 주요 기능

- 🏬 가맹점관리
  - 가맹점 등록
  - 가맹점 경고 기능
  - 폐점한 매장 업데이트 및 조회

- 🍽 메뉴관리
  - 메뉴 등록
  - 메뉴 판매 상태 변경 및 조회(판매/미판매)

- 💻 주문관리
  - 가맹점 POS서버 발주 정보 API통신

- 📈 매출관리
  - 가맹점주 POS 내 매출 정보를 연월별로 API통신
  - 최저/최고 매출액 구분 및 미제공 가맹점 목록 조회

- 🗓 캘린더관리
  - 부서별 캘린더 조회 및 등록
  - 캘린더별 일정 관리

- 📋 전자결재
  - 결재 양식을 선택하여 기안문 상신
  - 결재자 수에 따른 결재라인 생성
  - 기안문 승인 및 반려
  - 결재 순서에 따른 메뉴 구분
  - 전자결재 문서 PDF 및 인쇄 기능
