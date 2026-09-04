---
title: "D2 — GenAI의 기초"
domain: "D2"
level: "beginner"
status: "draft"
source_urls:
  - "https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain2.html"
source_checked: "2026-09-04"
---

# D2 — GenAI의 기초

## 이 문서에서 배울 것

D2에서는 생성형 AI(Generative AI)의 작동에 필요한 기본 용어와 비즈니스 활용 방법을 배웁니다. 토큰·청킹·임베딩·벡터·프롬프트를 이해한 뒤, Transformer 기반 대규모 언어 모델(LLM), 파운데이션 모델(FM), 멀티모달 모델과 확산 모델을 구분합니다. 이어서 GenAI의 장점과 한계, AWS의 GenAI 서비스와 비용·성능 절충을 판단합니다.

공식 AIF-C01 시험 안내서에서 D2의 채점 콘텐츠 가중치는 **24%**입니다. [AWS 공식 Domain 2](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain2.html)

## 선수 지식과 한 줄 요약

- 선수 지식: D1의 AI·ML·딥 러닝·추론 개념을 알고 있으면 좋습니다.
- 한 줄 요약: **GenAI는 학습한 패턴을 이용해 새로운 콘텐츠를 만들며, 입력을 토큰과 컨텍스트로 다루고 모델·데이터·비용·안전성을 함께 설계해야 합니다.**

## 공식 범위와 문서 연결

| 공식 작업 | 다룰 핵심 내용 | 연결 문서 | 상태 |
|---|---|---|---|
| 2.1 GenAI 기본 개념 | 토큰·청킹·임베딩·벡터·프롬프트·Transformer·FM·멀티모달·확산 모델·에이전트 | [GenAI 핵심 개념](01-genai-core-concepts.md) | draft |
| 2.1 GenAI 기본 개념 | FM 수명 주기, 토큰 기반 가격, 컨텍스트 엔지니어링, 도구·메모리·오케스트레이션 | [GenAI 기능·한계와 FM 수명 주기](02-genai-capabilities-and-limitations.md) | draft |
| 2.2 비즈니스 문제 해결에서 GenAI의 기능과 한계 | 장점·한계·모델 선택·비즈니스 지표·사람 검토 | [GenAI 기능·한계와 FM 수명 주기](02-genai-capabilities-and-limitations.md) | draft |
| 2.3 AWS 인프라와 GenAI 기술 | Amazon Bedrock, Amazon SageMaker AI, SageMaker JumpStart, Amazon Q, Kiro, Strands Agents, AgentCore, 비용·성능 절충 | [AWS GenAI 인프라·기술과 비용](03-aws-genai-infrastructure-and-cost.md) | draft |

공식 범위의 모든 항목은 문서 작성 과정에서 연결 상태를 갱신합니다. `draft`는 출처와 초보자 관점 검토가 진행 중이라는 뜻이며, 최종 검증 전에는 `verified`로 표시하지 않습니다.

## 추천 학습 순서

1. GenAI가 기존 예측·분류형 ML과 어떻게 다른지 이해하기
2. 토큰·컨텍스트·청킹·임베딩·벡터 연결하기
3. Transformer·LLM·FM·멀티모달·확산 모델 구분하기
4. 프롬프트와 컨텍스트 엔지니어링의 목적 이해하기
5. GenAI의 기능·한계와 모델 선택 조건 확인하기
6. AWS 서비스와 비용·성능·보안 절충 연결하기
7. [D2 복습 카드](d2-review-cards.md)·[용어 퀴즈](d2-terminology-quiz.md)·[Anki 자료](d2-anki.tsv)·[자체 문제은행](../06-exam-strategy/d2-question-bank.md) 반복하기

## 시험 핵심과 AWS 실무 확장

- **시험 핵심**: 용어의 관계, GenAI 사용 사례, 모델 선택 조건, 토큰·임베딩·프롬프트의 역할, 환각과 비결정성 같은 한계를 판단합니다.
- **AWS 실무 확장**: Amazon Bedrock, Amazon SageMaker AI, Amazon Q, Strands Agents, Amazon Bedrock AgentCore와 같은 AWS GenAI 기술이 어떤 개발·사용 방식과 연결되는지 살펴봅니다. 기능·리전·요금은 작성일 기준 공식 문서에서 다시 확인합니다.

## D2 진행 상태

- [x] D2 README와 공식 범위 추적표 초안
- [x] GenAI 핵심 개념 문서
- [x] GenAI의 기능·한계와 비즈니스 문제 문서
- [x] AWS 인프라·GenAI 기술과 비용 절충 문서
- [x] D2 카드 요약·용어 퀴즈·문제은행 연결
- [ ] 출처·초보자 관점·누락 검토

## 출처

- [AWS Certified AI Practitioner — Domain 2: GenAI의 기초](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain2.html) — 확인일: 2026-09-04
- [AWS Certified AI Practitioner(AIF-C01) 시험 안내서](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html) — 확인일: 2026-09-04
