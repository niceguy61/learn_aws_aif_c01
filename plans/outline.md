---
title: "AIF-C01 초보자용 완벽 가이드 전체 목차 초안"
status: "draft"
source_urls:
  - "https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html"
  - "https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain1.html"
  - "https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain2.html"
  - "https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain3.html"
  - "https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain4.html"
  - "https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain5.html"
source_checked: "2026-09-04"
---
# AIF-C01 초보자용 완벽 가이드 전체 목차 초안

> 상태: `draft` — 사용자 질문에 대한 답변과 목차 승인 전까지 확정하지 않는다.
>
> 기준: AWS 공식 AIF-C01 안내서의 5개 도메인과 작업·목표를 모두 추적한다. 각 장은 초보자 설명, AWS 서비스 연결, 비교, 시나리오, 시험 판단법, 오개념, 확인 질문을 기본으로 한다.

## 0. 이 가이드 사용법 (`docs/00-start-here/`)

### 0.1 AIF-C01이 무엇을 평가하는가
- 시험의 목적과 대상 응시자
- AI·ML·GenAI를 직접 개발하지 않아도 되는 범위
- 시험에 필요한 AWS 경험 수준
- 채점되는 50문항과 채점되지 않는 15문항의 의미
- 합격 점수 700점, 변환 점수, 섹션 가중치의 이해
- 선다형·복수 응답형·순서 배열·매칭형 문제 대응

### 0.2 학습 로드맵과 진행 진단
- 완전 초보자용 시작 순서
- AWS 기초가 있는 학습자의 단축 순서
- AI/ML 용어 사전 사용법
- 개념 이해 → 서비스 선택 → 시나리오 판단 → 문제 풀이 루프
- 학습 전 자기 진단표와 도메인별 진도표

### 0.3 시험에 필요한 AWS 클라우드 기초
- AWS 계정, 리전, 가용 영역, 리소스와 관리형 서비스
- 컴퓨팅·스토리지·네트워크의 아주 기본적인 역할
- Amazon EC2, Amazon S3, AWS Lambda의 사용 사례
- AWS IAM의 사용자·역할·정책·권한
- AWS 요금 모델과 비용·성능·관리 부담의 관계
- AWS 공동 책임 모델

### 0.4 AI/ML을 처음 배우는 방법
- 데이터·모델·훈련·추론을 일상적인 비유로 이해하기
- 통계와 수학을 최소한으로 준비하는 방법
- 시험 범위와 실무 확장을 구분하는 방법

## 1. 도메인 1 — AI 및 ML의 기초 (`docs/01-ai-ml-foundations/`, 20%)

### 1.1 기본 AI 개념과 용어
- AI, ML, 딥 러닝, 신경망, GenAI의 포함 관계와 차이
- 모델, 알고리즘, 데이터, 특징, 레이블
- 훈련(training)과 추론(inference)
- 사전 훈련 모델, 기초 모델(FM), 대규모 언어 모델(LLM)
- 컴퓨터 비전(CV), 자연어 처리(NLP), 음성 인식
- 편향(bias), 공정성(fairness), 적합성·일반화
- 배치·실시간·비동기·서버리스 추론
- 레이블 지정 데이터와 레이블 없는 데이터
- 테이블 형식·시계열·이미지·텍스트 데이터
- 정형·반정형·비정형 데이터
- 지도 학습·비지도 학습·강화 학습

### 1.2 AI의 실제 사용 사례와 기법 선택
- 인간 의사 결정 지원·자동화·확장성에서 AI가 주는 가치
- AI/ML이 적합하지 않은 문제와 비용-이점 판단
- 예측이 필요한 문제와 규칙 기반 결과가 필요한 문제 구분
- 회귀·분류·클러스터링 선택법
- 컴퓨터 비전, NLP, 음성, 추천, 사기 탐지, 예측
- 지식 기반 시스템과 에이전틱 AI의 역할
- Amazon SageMaker AI, Amazon Transcribe, Amazon Translate
- Amazon Comprehend, Amazon Lex, Amazon Polly
- 기존 ML 모델과 FM을 선택하는 기준
- 규제·설명 가능성·운영 제약이 모델 선택에 미치는 영향

### 1.3 ML 개발 수명 주기와 MLOps
- 문제 정의·데이터 수집·탐색·전처리·훈련·평가·배포·모니터링
- ML 파이프라인 구성 요소와 일반 소프트웨어 파이프라인의 차이
- 오픈 소스 사전 훈련 모델과 사용자 지정 모델 훈련
- 관리형 API 서비스와 자체 호스팅 API
- 파이프라인 단계별 Amazon Bedrock, Amazon Q, Amazon Quick, Kiro, SageMaker AI
- 실험·반복 가능성·확장성·기술 부채
- 프로덕션 준비 상태, 모델 모니터링, 재훈련
- 정확도·AUC·F1 점수의 직관
- 사용자당 비용·개발 비용·고객 피드백·ROI 등 비즈니스 지표

## 2. 도메인 2 — GenAI의 기초 (`docs/02-generative-ai/`, 24%)

### 2.1 생성형 AI의 기본 개념
- 생성형 AI와 예측·분류형 ML의 차이
- 토큰과 토큰화
- 청킹과 문서 분할
- 임베딩·벡터·벡터 검색의 직관
- 프롬프트 엔지니어링 기초
- Transformer 기반 LLM
- 파운데이션 모델과 멀티모달 모델
- 확산 모델과 이미지·오디오·비디오 생성
- 요약, 번역, 코드 생성, 검색, 추천, 고객 서비스
- AI 어시스턴트와 고객 서비스 에이전트
- FM 수명 주기: 데이터 선택·모델 선택·사전 훈련·미세 조정·평가·배포·피드백
- 토큰 기반 가격 책정과 비용·성능 영향
- 컨텍스트 엔지니어링의 역할
- 에이전트 AI: 다중 에이전트 패턴, MCP, 외부 시스템 연결
- 다중 에이전트 통신, 메모리 관리, 도구 사용, 워크플로 오케스트레이션

### 2.2 비즈니스 문제 해결에서 GenAI의 기능과 한계
- 적응성·반응성·대화·콘텐츠 생성 능력
- 환각·부정확성·비결정성·해석 가능성의 한계
- 모델 유형·성능·기능·제약·규정 준수를 기준으로 모델 선택
- 크로스 도메인 성능과 운영 적합성
- 효율성·전환율·평균 사용자 수익·정확도·고객 생애 가치
- 사람 검토가 필요한 상황과 자동화하면 안 되는 상황

### 2.3 AWS 인프라와 GenAI 기술
- Amazon Bedrock, Amazon SageMaker AI, SageMaker JumpStart
- Amazon Q, Kiro, Strands Agents, Amazon Bedrock AgentCore
- 관리형 서비스가 진입 장벽·개발 시간·출시 시간에 주는 영향
- AWS 인프라의 보안·규정 준수·책임 경계
- 응답성·가용성·중복성·성능의 비용 절충
- 리전 적용 범위와 토큰 기반 요금
- 프로비저닝 처리량과 사용자 지정 모델의 비용 특성

## 3. 도메인 3 — 파운데이션 모델의 적용 (`docs/03-foundation-models/`, 28%)

### 3.1 FM 애플리케이션 설계 고려 사항
- 비용·모달리티·지연 시간·다국어 지원
- 모델 크기·복잡도·사용자 지정·입출력 길이
- 프롬프트 캐싱
- 온도와 입력·출력 길이가 응답에 미치는 영향
- RAG의 정의와 비즈니스 적용
- Amazon Bedrock Knowledge Bases
- 임베딩 저장과 Amazon OpenSearch Service
- Amazon Aurora, Amazon Neptune, Amazon RDS for PostgreSQL의 역할 구분
- 사전 훈련·미세 조정·컨텍스트 내 학습·RAG·모델 증류의 비용 절충
- AI 에이전트의 역할과 비즈니스 애플리케이션

### 3.2 효과적인 프롬프트 엔지니어링
- 컨텍스트·명령·네거티브 프롬프트·모델 잠재 공간
- zero-shot·one-shot·few-shot
- 생각의 사슬과 프롬프트 템플릿
- 구체성·간결성·반복 실험·가드레일
- 여러 예시와 출력 형식 지정
- 프롬프트 노출·데이터 중독·prompt injection·하이재킹·탈옥
- Amazon Bedrock Prompt Management
- 프롬프트 버전 관리와 운영 전략

### 3.3 FM 훈련과 미세 조정
- 사전 훈련·미세 조정·지속적인 사전 훈련·증류
- 명령 튜닝과 특정 도메인 조정
- 전이 학습
- 미세 조정 데이터 큐레이션과 거버넌스
- 데이터 크기·레이블·대표성
- 사용자 피드백을 통한 강화 학습(RL)
- 언제 RAG·프롬프트·미세 조정·재훈련을 선택하는가

### 3.4 FM 성능 평가
- 인간 평가와 벤치마크 데이터세트
- Amazon Bedrock 모델 평가
- ROUGE·BLEU·BERTScore·LLM-as-a-judge
- 태스크 품질과 실제 업무 성과의 차이
- RAG·에이전트·워크플로 애플리케이션 평가
- 생산성·사용자 참여·작업 완료율·만족도·상호 작용당 비용
- 모델 지표와 비즈니스 지표의 정렬

## 4. 도메인 4 — 책임 있는 AI (`docs/04-responsible-ai/`, 14%)

### 4.1 책임 있는 AI 시스템 개발
- 편향성·공정성·포용성·견고성·안전성·진실성
- Amazon Bedrock Guardrails
- 환경 영향과 지속 가능성을 고려한 모델 선택
- 지적 재산권 침해 주장
- 편향 출력·환각·최종 사용자 위험·고객 신뢰 상실
- 포용성·다양성·큐레이션·균형 잡힌 데이터세트
- 편향·분산이 인구통계학적 그룹과 정확도에 미치는 영향
- 과적합·과소적합
- 레이블 품질 분석·인간 감사·하위 그룹 분석
- Amazon SageMaker Clarify, SageMaker Model Monitor, Amazon A2I

### 4.2 투명하고 설명 가능한 모델
- 투명한 모델과 설명 불가능한 모델의 차이
- 해석 가능성·설명 가능성·투명성
- Amazon SageMaker Model Cards
- SageMaker 모델 평가와 기반 모델 평가
- 오픈 소스 모델·데이터·라이선스 확인
- 안전성·투명성·성능 간 절충
- 인간 중심 설계와 사용자 피드백
- AI 의사 결정의 설명과 이의 제기 경로

## 5. 도메인 5 — 보안·규정 준수·거버넌스 (`docs/05-security-compliance/`, 14%)

### 5.1 AI 시스템 보안
- IAM 역할·정책·권한
- 저장 중·전송 중 암호화
- Amazon Macie와 민감 데이터 탐지
- AWS PrivateLink와 비공개 연결
- AWS 공동 책임 모델
- Amazon Bedrock AgentCore Identity와 정책
- Amazon Bedrock Guardrails
- 소스 인용·데이터 계보·데이터 카탈로그
- Amazon SageMaker Model Cards
- 데이터 품질·프라이버시 강화·접근 제어·무결성
- 애플리케이션 보안·위협 탐지·취약성 관리·인프라 보호
- prompt injection, 데이터 유출, 출력 필터링과 검증
- 독성 탐지와 관리
- AI 상호 작용 감사 추적과 로깅
- 환각 탐지·RAG grounding·출력 검증·신뢰도 점수

### 5.2 AI 거버넌스와 규정 준수
- AWS Config, Amazon Inspector
- AWS Audit Manager, AWS Artifact
- AWS CloudTrail, AWS Trusted Advisor
- 데이터 수명 주기·로깅·데이터 레지던시·보존
- 모니터링과 관찰 가능성
- 정책·검토 주기·검토 전략
- 생성형 AI Security Scoping Matrix
- 투명성 표준과 팀 교육
- 규정 준수 증거와 감사 준비

## 6. 통합 복습과 시험 전략 (`docs/06-exam-strategy/`)

### 6.1 서비스 선택 의사결정표
- 사용 사례 → 기술 유형 → AWS 서비스
- 관리형 API·FM·RAG·미세 조정·자체 호스팅 비교
- 보안·규정 준수·비용·지연 시간·정확도 우선순위 판단

### 6.2 도메인별 복습
- D1~D5 핵심 한 장 요약
- 반드시 구분할 개념 쌍
- 자주 발생하는 오개념
- 모르는 문제를 소거하는 순서

### 6.3 문제 유형별 풀이법
- 단일 선택
- 복수 응답
- 순서 배열
- 매칭
- 문제의 요구 조건과 선택지의 제약 추출

### 6.4 오리지널 연습 문제
- 공식 시험 문제를 복제하지 않는 자체 제작 문항
- 정답·해설·오답 분석·연결 문서
- 난이도와 관련 도메인 태그
- 문항별 출처와 검증 상태

### 6.5 최종 점검
- 7일·14일·30일 학습 일정 템플릿
- 마지막 복습 체크리스트
- 시험 당일 운영
- 시험 후 결과 분석과 재응시 학습 루프

## 7. 누적 참고 자료

- `docs/glossary.md`: 용어, 쉬운 정의, 영어 표기, 관련 도메인, 출처
- `sources/aws-sidebar-index.md`: 공식 사이드바 링크와 도메인 매핑
- `sources/source-registry.yaml`: URL·상태·확인일·출력 문서 추적
- 도메인별 `README.md`: 공식 작업·목표 커버리지 매트릭스

## 작성 단위와 검토 게이트

1. 도메인 README와 커버리지 매트릭스 작성
2. 개념 단위 Markdown 작성
3. 공식 출처 확인 및 링크 등록
4. 초보자 독해 검토
5. 시험 범위·도메인 누락 검토
6. 사용자 승인 후 `verified` 상태로 승격

## 개정 전 미결정 사항

아래 항목은 질문지 답변으로 결정되었으며, 현재는 개정 1의 기준을 따른다.

- 학습 기간과 시험 예정일 → 1개월 이내
- 실습 포함 여부와 AWS 비용 허용 범위 → 기본 실습 없음
- 오리지널 연습 문제의 문항 수와 난이도 → 100문항 이상 자체 제작
- 시험 대비 중심과 실무 확장의 비율 → 합격 최우선, 실무·심화 별도 표시
- 원문 자료의 보관 범위와 공개 방식 → 접근 가능한 공식 Markdown/PDF 보관, Markdown 중심 열람
- AI-DLC 실행 scope, depth, test strategy → `/aidlc compose` 우선, Comprehensive depth와 Standard test strategy 제안

## 목차 개정 1 — 사용자 답변 반영

- 기본 독자는 AI/ML과 AWS 모두 처음인 학습자로 확정했다.
- 1개월 이내 시험과 주당 1~3시간을 고려해 각 장의 시작 부분에 `시험 직결 핵심`, `초보자 설명`, `복습 카드`를 배치한다.
- 코드·수학·유료 AWS 실습은 기본 목차에서 제외하고, 필요한 경우 개념 이해용 비실행 예시로만 설명한다.
- 합격을 최우선으로 하되, 실무 확장과 심화 읽을거리는 본문과 분리된 상자로 제공한다.
- 연습 문제는 100문항 이상 자체 제작을 목표로 하며 단일 선택·복수 응답을 우선한다. 실제 AWS 문항 유형 설명은 공식 시험 안내서와 일치하는지 검증한다.
- 서비스는 공식 도메인 페이지에 명시된 AWS 서비스 중심으로 제한한다.
- Markdown 본문 외에 다음 보조 산출물을 추가한다.
  - 도메인별 한 장 카드 요약
  - 전체 학습 진도표
  - 도메인별 용어 퀴즈
  - Anki 가져오기용 카드 파일과 동일 내용의 Markdown 카드
- 작성 순서는 D1 → D2 → D3 → D4 → D5이며, 각 도메인 완료 후 사용자 승인을 받는다.
- AI-DLC 실행은 `/aidlc compose` 제안을 먼저 확인하고, 제안값으로 `depth: Comprehensive`, `test strategy: Standard`를 우선 검토한다.

## 개정 1 승인 상태

`outline_revision_required` — 사용자 확인 전까지 확정하지 않는다.
