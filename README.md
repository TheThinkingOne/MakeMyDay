# Make My Day

**"나만의 월페이퍼와 일정으로 하루를 특별하게"**

## 📌 프로젝트 개요

**Make My Day**는 사용자가 직접 이미지를 등록하여 배경화면으로 설정 후 순환 재생하고, 자신만의 일정을 관리할 수 있는 웹 애플리케이션입니다.  
또한 모두가 공유할 수 있는 **격언(Quotes)**을 등록하고 감상할 수 있으며, 로그인 기능은 일반 회원가입 외에도 **Kakao OAuth**를 통해 제공합니다.  
**1인 개발**로 기획부터 배포까지 진행했으며, 실사용을 염두에 두고 유지보수 및 기능 개선을 목표로 하고 있습니다.

---

## 🔧 사용 기술 스택

### Backend
- **Java 21**
- **Spring Boot 3**
- **Spring Security** (JWT 인증/인가)
- **JPA + QueryDSL**
- **OAuth 2.0 (Kakao Login)**
- **MariaDB**
- **Gradle**

### Frontend
- **React (with Vite)**
- **Recoil / React Query**
- **Axios**
- **Tailwind CSS**
- **React Router v6**

### DevOps & Deployment
- **Docker & Docker Compose**
- **Nginx**
- **AWS EC2**
- **GitHub Actions** (CI/CD 준비 중)

---

## 👨‍💻 개발 정보

- **개발 기간**: 2025.03 ~ 2025.05.06
- **개발 인원**: 개인 프로젝트 (1인 개발)
- **배포 주소**: [makemyday.kr](https://www.makemyday.kr/)

---

## 💡 주요 기능

- 사용자 회원가입, 로그인 (JWT + OAuth2.0)
- 나만의 월페이퍼 등록 및 무한 순환 표시
- 일정(Todo) 등록, 수정, 삭제
- 격언 등록 (모든 사용자가 볼 수 있음)
- 사용자별 데이터 분리 및 권한 기반 접근 제어
- 반응형 UI 및 다크 모드 디자인
- AWS EC2 배포 + HTTPS (Certbot)



