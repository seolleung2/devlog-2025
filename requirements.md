# 기술 블로그 프로젝트

## 프로젝트 목적

- 회사에서 프로젝트를 진행하면서 알게 된 기술을 정리하기 위한 블로그 개발
- 개인 학습관련 알고리즘, 언어, 프레임워크, 라이브러리 등에 대한 학습 내용 정리

## 기술 스택

- Frontend
  - React
  - TypeScript
  - TailwindCSS
  - shadcn/ui
  - Vite
- Backend/Database
  - Firebase

## 개발 체크리스트

### 1. 프로젝트 초기 설정 ✅

- [x] 프로젝트 구조 설정 (components, pages, hooks 등)
  - components, routes, lib 등 기본 폴더 구조 구성
  - ESLint, TypeScript 설정
- [x] Firebase 초기 설정 및 연동
  - Firebase 프로젝트 생성
  - 환경 변수 설정
- [x] 기본 라우팅 설정
  - React Router DOM 설정
  - 주요 라우트 구성 (/blog/_, /auth/_, /admin/\*)
- [x] 공통 레이아웃 구성
  - RootLayout 컴포넌트 생성
  - Header, Footer 기본 구조

### 2. CI/CD 설정 ✅

- [x] GitHub Actions CI 설정
  - TypeScript 타입 체크
  - ESLint 검사
  - 빌드 검증
  - PR 시 자동 검사
- [x] Firebase Hosting 배포 자동화
  - PR 시 프리뷰 배포
  - main 브랜치 머지 시 자동 배포
  - GitHub Actions 워크플로우 구성

### 3. 인증 시스템

- [x] Firebase Authentication 설정
  - [x] Google 로그인 설정
  - [x] 관리자 계정 설정
    - [x] Firestore에 관리자 이메일 저장
    - [x] 관리자 권한 확인 로직 구현
- [x] 인증 상태 관리
  - [x] AuthContext 구현
  - [x] AuthProvider 구현
  - [x] useAuth 훅 구현
- [x] 로그인/로그아웃 UI 구현
  - [x] AuthButton 컴포넌트 구현
  - [x] 헤더에 인증 버튼 추가
- [x] 권한 관리
  - [x] PrivateRoute 컴포넌트 구현
  - [x] 관리자 전용 페이지 보호 (/admin/\*)
  - [x] 인증 필요 기능 제한

### 4. 메인 화면

- [x] 데이터 모델 설계
  - [x] 포스트 스키마 정의 (제목, 내용, 작성일, 조회수 등)
  - [x] 카테고리 스키마 정의
- [x] 레이아웃 구현
  - [x] Header 컴포넌트 구현
  - [x] Footer 컴포넌트 구현
  - [x] 반응형 디자인
  - [ ] 다크모드 지원
- [-] 메인 컨텐츠 구현
  - [x] 인기 게시글 Top 5 섹션 UI
    - [ ] 조회수 기준 정렬
    - [x] 미리보기 카드 UI
  - [x] 최신 게시글 프리뷰 UI
    - [x] 최신 글 5개 표시
    - [ ] 더보기 버튼으로 전체 목록 이동
  - [x] 카테고리 바로가기 메뉴 UI
    - [x] 카테고리별 게시글 수 표시
    - [ ] 클릭시 해당 카테고리 게시글 목록으로 이동

### 4-1. 블로그 글 작성 시스템 (최우선 구현)

- [ ] 관리자 전용 글쓰기 접근 UI
  - [ ] 관리자 로그인 시 좌측 하단에 Floating Action Button 구현
  - [ ] 비관리자 접근 제한 및 리다이렉트 처리
- [ ] 글 작성 페이지 구현
  - [ ] 마크다운 에디터 통합
    - [ ] 실시간 미리보기
    - [ ] 코드 블록 하이라이팅
    - [ ] 이미지/파일 첨부 UI
  - [ ] 글 설정 영역
    - [ ] 제목 입력
    - [ ] 카테고리 선택
    - [ ] 태그 입력
    - [ ] 발행 여부 설정
- [ ] Firebase 연동
  - [ ] Storage에 이미지/파일 업로드
  - [ ] Firestore에 글 저장
  - [ ] 임시저장 기능

### 5. 블로그 게시글 목록

- [ ] 게시글 목록 페이지 구현
  - [ ] 게시글 카드 UI
  - [ ] 무한 스크롤 또는 페이지네이션
- [ ] 필터링 및 검색
  - [ ] 카테고리 필터링
  - [ ] 검색 기능
  - [ ] 정렬 옵션 (최신순, 인기순)

### 6. 게시글 상세 페이지

- [ ] 마크다운 렌더링 구현
- [ ] TOC (목차) 구현
- [ ] 카테고리 및 태그 표시
- [ ] 댓글 시스템 구현
- [ ] 좋아요 기능
- [ ] 공유 기능
- [ ] 조회수 기능

### 7. 게시글 작성/수정

- [ ] 마크다운 에디터 구현
- [ ] Code Playground 기능
- [ ] 이미지 업로드 기능
- [ ] 임시 저장 기능

### 8. 자기소개 페이지

- [ ] 프로필 섹션
- [ ] 기술 스택 섹션
- [ ] 경력 사항 섹션
- [ ] 연락처 정보

### 9. 방명록

- [ ] 방명록 UI 구현
- [ ] 댓글 작성 기능
- [ ] 관리자 답글 기능

### 10. 최적화 및 성능

- [ ] Code Splitting 적용
- [ ] 이미지 최적화
- [ ] 캐싱 전략 구현
- [ ] SEO 최적화

### 11. 접근성

- [ ] 키보드 네비게이션
- [ ] 스크린 리더 호환성
- [ ] 고대비 모드

### 12. 모니터링

- [ ] 에러 로깅 설정
- [ ] 사용자 행동 분석 설정
- [ ] 성능 모니터링 설정

## 보안

- Firebase Authentication 활용
- XSS 방지
- CSRF 보호
- 입력값 검증
