---
title: "D2 자체 문제은행"
domain: "D2"
level: "beginner"
status: "draft"
source_urls:
  - "https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain2.html"
source_checked: "2026-09-04"
---

# D2 자체 문제은행

> 이 문서는 공식 시험 문제가 아닙니다. AIF-C01 D2의 개념을 시나리오에 적용하는 연습을 위해 새로 작성한 문제입니다.

## 문제

### Q1 — 단일 선택

한 애플리케이션이 긴 사내 문서를 모델에 제공하기 전에 검색하기 쉬운 여러 조각으로 나누려고 합니다. 어떤 작업인가요?

- A. 청킹
- B. 추론
- C. 프로비저닝
- D. 확산

**정답:** A

**해설:** 청킹은 긴 문서를 처리·검색에 적합한 작은 조각으로 나누는 작업입니다. [D2 문서: GenAI 핵심 개념](../02-generative-ai/01-genai-core-concepts.md)

### Q2 — 단일 선택

질문과 의미가 가까운 문서를 찾기 위해 문서와 질문을 숫자 표현으로 변환하려고 합니다. 가장 관련 있는 개념은 무엇인가요?

- A. 임베딩
- B. 환각
- C. 비결정성
- D. 중복성

**정답:** A

**해설:** 임베딩은 데이터의 의미를 반영한 숫자 벡터 표현이며, 벡터 검색에 활용할 수 있습니다. [D2 문서: GenAI 핵심 개념](../02-generative-ai/01-genai-core-concepts.md)

### Q3 — 복수 응답

RAG 애플리케이션의 품질에 영향을 줄 수 있는 요소를 모두 고르세요.

- A. 문서를 적절한 크기로 청킹하는 방법
- B. 임베딩과 벡터 검색의 관련성
- C. 검색된 컨텍스트의 최신성과 권한
- D. 모델이 근거 없이 답을 만들어도 검증하지 않는 정책

**정답:** A, B, C

**해설:** RAG는 검색 자료의 조각화·표현·검색 품질·최신성·권한과 모델의 답변 구성이 모두 중요합니다. 근거 없는 답변을 검증 없이 허용하면 환각 위험이 커집니다. [D2 문서: GenAI 핵심 개념](../02-generative-ai/01-genai-core-concepts.md)

### Q4 — 단일 선택

모델에게 작업 목표, 배경 정보, 출력 형식과 제한 조건을 전달하는 입력은 무엇인가요?

- A. 프롬프트
- B. 리전
- C. 처리량
- D. 레이블

**정답:** A

**해설:** 프롬프트는 모델에 작업 지시와 맥락·제약·출력 형식을 전달합니다. [D2 문서: GenAI 핵심 개념](../02-generative-ai/01-genai-core-concepts.md)

### Q5 — 단일 선택

회사가 최신 내부 정책을 바탕으로 답변하는 애플리케이션을 만들려고 합니다. 모델을 다시 훈련하지 않고 관련 정책을 검색해 입력 컨텍스트로 제공하려면 어떤 접근을 우선 검토하나요?

- A. RAG
- B. 무조건 가장 큰 모델 선택
- C. 레이블 제거
- D. 다중 리전만 추가

**정답:** A

**해설:** 최신 문서를 검색해 모델에 제공하는 RAG는 외부 지식과 최신성을 보완하는 접근입니다. [D2 문서: GenAI 기능·한계](../02-generative-ai/02-genai-capabilities-and-limitations.md)

### Q6 — 단일 선택

모델이 존재하지 않는 정책 조항을 실제 조항인 것처럼 답변했습니다. 가장 가까운 한계는 무엇인가요?

- A. 환각
- B. 청킹
- C. 프로비저닝 처리량
- D. 멀티모달 입력

**정답:** A

**해설:** 사실이 아닌 내용이 그럴듯하게 생성된 것은 환각입니다. 출처 제공·검색 근거·업무 규칙 대조·사람 검토를 고려할 수 있습니다. [D2 문서: GenAI 기능·한계](../02-generative-ai/02-genai-capabilities-and-limitations.md)

### Q7 — 단일 선택

같은 프롬프트를 여러 번 실행했는데 답변 표현과 일부 내용이 달라졌습니다. 어떤 특성이 관련 있나요?

- A. 비결정성
- B. 임베딩
- C. 데이터 레지던시
- D. 모델 카드

**정답:** A

**해설:** 생성 결과는 설정·컨텍스트·상태 등에 따라 달라질 수 있으며 이를 비결정성으로 설명합니다. [D2 문서: GenAI 기능·한계](../02-generative-ai/02-genai-capabilities-and-limitations.md)

### Q8 — 복수 응답

모델을 선택할 때 함께 고려해야 할 조건을 모두 고르세요.

- A. 업무 작업과 필요한 모달리티
- B. 품질과 언어 지원
- C. 비용과 지연 시간
- D. 보안·규정 준수·운영 가능성
- E. 모델 크기가 가장 크다는 사실만

**정답:** A, B, C, D

**해설:** 모델 선택은 품질만이 아니라 작업·모달리티·언어·비용·지연·보안·운영 조건의 절충입니다. [D2 문서: GenAI 기능·한계](../02-generative-ai/02-genai-capabilities-and-limitations.md)

### Q9 — 단일 선택

금전 보상과 고객 자격에 영향을 주는 상담 답변을 생성합니다. 가장 적절한 설계는 무엇인가요?

- A. 모델 답변을 최종 결정으로 자동 승인
- B. 사람이 답변과 근거를 검토한 뒤 승인
- C. 정확도를 측정하지 않음
- D. 모든 입력 컨텍스트를 제거

**정답:** B

**해설:** 잘못된 결과의 영향이 큰 업무에서는 모델을 초안·후보 생성에 사용하고 사람이 검토·승인하도록 설계할 수 있습니다. [D2 문서: GenAI 기능·한계](../02-generative-ai/02-genai-capabilities-and-limitations.md)

### Q10 — 복수 응답

GenAI 애플리케이션의 성공을 평가할 때 함께 볼 수 있는 지표를 모두 고르세요.

- A. 답변 품질이나 오류율
- B. 처리 시간과 처리량
- C. 사용자 만족도나 작업 완료율
- D. 요청당 비용
- E. 모델 이름의 길이

**정답:** A, B, C, D

**해설:** 모델 품질 지표와 효율성·사용자 경험·비용 같은 비즈니스 지표를 함께 봐야 실제 목표 달성 여부를 알 수 있습니다. [D2 문서: GenAI 기능·한계](../02-generative-ai/02-genai-capabilities-and-limitations.md)

### Q11 — 단일 선택

팀이 서버에서 모델을 직접 호스팅하지 않고 여러 공급자의 FM을 API로 비교·호출해 생성형 AI 애플리케이션을 만들려고 합니다. 먼저 검토할 AWS 서비스는 무엇인가요?

- A. Amazon Bedrock
- B. Amazon Q
- C. Amazon Route 53
- D. Amazon Transcribe

**정답:** A

**해설:** Amazon Bedrock은 여러 FM을 선택·호출해 GenAI 애플리케이션을 구성하는 관리형 플랫폼입니다. [D2 문서: AWS GenAI 인프라·기술](../02-generative-ai/03-aws-genai-infrastructure-and-cost.md)

### Q12 — 단일 선택

팀이 자체 데이터로 모델을 훈련·사용자 지정하고 배포·관리하는 ML 개발 수명 주기를 폭넓게 제어하려고 합니다. 중심 플랫폼은 무엇인가요?

- A. Amazon SageMaker AI
- B. Amazon Q
- C. Amazon Bedrock만
- D. Amazon CloudFront

**정답:** A

**해설:** Amazon SageMaker AI는 모델 개발·훈련·사용자 지정·배포를 폭넓게 지원하는 ML 플랫폼입니다. [D2 문서: AWS GenAI 인프라·기술](../02-generative-ai/03-aws-genai-infrastructure-and-cost.md)

### Q13 — 단일 선택

SageMaker AI 환경에서 준비된 FM을 찾아 빠르게 실험하고 배포를 시작하려고 합니다. 어떤 기능이 가장 가까운가요?

- A. SageMaker JumpStart
- B. Provisioned Throughput
- C. Amazon Q
- D. CloudTrail

**정답:** A

**해설:** SageMaker JumpStart는 사전 훈련 모델을 찾아 SageMaker AI에서 개발을 빠르게 시작하도록 돕습니다. [D2 문서: AWS GenAI 인프라·기술](../02-generative-ai/03-aws-genai-infrastructure-and-cost.md)

### Q14 — 단일 선택

직원이 회사 정책과 개발 작업에 대해 대화로 도움을 받도록 바로 사용할 수 있는 AWS 생성형 AI 어시스턴트를 찾습니다. 무엇을 검토하나요?

- A. Amazon Q
- B. SageMaker JumpStart
- C. Strands Agents SDK
- D. 벡터 임베딩

**정답:** A

**해설:** Amazon Q는 조직 업무와 개발 작업을 돕는 생성형 AI 어시스턴트 제품군입니다. 접근 권한과 연결된 데이터 범위를 함께 설계해야 합니다. [D2 문서: AWS GenAI 인프라·기술](../02-generative-ai/03-aws-genai-infrastructure-and-cost.md)

### Q15 — 단일 선택

개발자가 에이전트의 행동 흐름과 도구 연결을 직접 설계하고 싶습니다. 가장 가까운 기술은 무엇인가요?

- A. Strands Agents
- B. Amazon Q
- C. Amazon Bedrock Pricing
- D. 리전

**정답:** A

**해설:** Strands Agents는 에이전트 개발을 위한 오픈 소스 SDK입니다. 모델 자체나 운영 인프라와 같은 개념은 아닙니다. [D2 문서: AWS GenAI 인프라·기술](../02-generative-ai/03-aws-genai-infrastructure-and-cost.md)

### Q16 — 단일 선택

에이전트를 운영 환경에 배포하고 외부 도구 연결·보안·확장을 관리하는 기반을 찾습니다. 무엇을 검토하나요?

- A. Amazon Bedrock AgentCore
- B. 토큰화
- C. Amazon SageMaker JumpStart만
- D. 분류

**정답:** A

**해설:** AgentCore는 에이전트의 운영·연결·보호·확장을 지원하는 관리형 기반입니다. Strands Agents는 개발 SDK라는 점과 구분합니다. [D2 문서: AWS GenAI 인프라·기술](../02-generative-ai/03-aws-genai-infrastructure-and-cost.md)

### Q17 — 단일 선택

모델 호출 비용을 추정할 때 가장 먼저 확인해야 할 사용량은 무엇인가요?

- A. 평균 입력 토큰과 출력 토큰
- B. 사용자 이름의 글자 수만
- C. 리전 이름의 길이
- D. 모델 아이콘의 색상

**정답:** A

**해설:** 생성형 AI 호출 비용은 모델·가격 방식에 따라 입력·출력 토큰 양의 영향을 받습니다. 요청 수만으로 충분하지 않습니다. [D2 문서: AWS GenAI 인프라·기술](../02-generative-ai/03-aws-genai-infrastructure-and-cost.md)

### Q18 — 단일 선택

트래픽이 예측 가능하고 일정한 처리량과 지연 시간 계획이 중요합니다. 온디맨드와 비교할 선택지는 무엇인가요?

- A. Provisioned Throughput
- B. 환각
- C. 확산 모델
- D. 청킹

**정답:** A

**해설:** Provisioned Throughput은 일정한 처리량과 예측 가능한 성능이 필요한 경우 검토할 수 있습니다. 고정 비용과 용량 계획도 함께 비교합니다. [D2 문서: AWS GenAI 인프라·기술](../02-generative-ai/03-aws-genai-infrastructure-and-cost.md)

### Q19 — 복수 응답

AWS GenAI 애플리케이션의 총비용을 추정할 때 포함할 수 있는 항목을 모두 고르세요.

- A. 입력·출력 토큰 호출 비용
- B. 임베딩·검색·저장 비용
- C. 도구 호출·로그·모니터링 비용
- D. 사용자 지정 모델의 데이터 준비·훈련·배포 비용
- E. 모델의 브랜드 색상

**정답:** A, B, C, D

**해설:** 모델 호출 외에도 RAG 구성 요소, 도구·관찰성, 사용자 지정·배포와 운영에 비용이 발생할 수 있습니다. [D2 문서: AWS GenAI 인프라·기술](../02-generative-ai/03-aws-genai-infrastructure-and-cost.md)

### Q20 — 복수 응답

리전·보안·규정 준수 설계에서 확인해야 할 조건을 모두 고르세요.

- A. 필요한 모델과 기능의 리전 제공 여부
- B. 데이터 처리 위치와 레지던시 요구
- C. IAM·암호화·네트워크·로그 접근 제어
- D. 지연 시간·가격·할당량과 장애 대응
- E. 관리형 서비스이므로 고객 권한 설정은 불필요하다는 가정

**정답:** A, B, C, D

**해설:** 리전은 기능 제공·데이터 위치·지연·가격·할당량·장애 대응을 함께 고려합니다. 관리형 서비스에서도 고객의 권한·데이터·네트워크·로그 설계 책임이 남습니다. [D2 문서: AWS GenAI 인프라·기술](../02-generative-ai/03-aws-genai-infrastructure-and-cost.md)

## 점수 해석

- 17~20개 정답: D2 핵심 개념을 D3의 FM 적용·프롬프트·RAG 학습으로 연결합니다.
- 13~16개 정답: 틀린 문제의 연결 문서를 다시 읽고 복습 카드를 반복합니다.
- 0~12개 정답: [D2 복습 카드](../02-generative-ai/d2-review-cards.md)와 [D2 용어 퀴즈](../02-generative-ai/d2-terminology-quiz.md)를 먼저 반복합니다.

## 출처

- [콘텐츠 도메인 2: GenAI의 기초](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain2.html) — 공식 시험 범위와 D2 주제 확인, 확인일: 2026-09-04
- 본 문제은행의 문항과 해설은 위 공식 범위를 학습 목적으로 재구성한 자체 제작 자료입니다.
