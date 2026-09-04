---
title: "D1 — AI 및 ML의 기초"
domain: "D1"
level: "beginner"
status: "draft"
source_urls:
  - "https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain1.html"
source_checked: "2026-09-04"
---

# D1 — AI 및 ML의 기초

## 이 문서에서 배울 것

D1에서는 인공지능(AI), 머신 러닝(ML), 딥 러닝, 신경망, 생성형 AI(GenAI)의 관계를 이해하고, 데이터·모델·훈련·추론을 구분합니다. 이어서 문제에 맞는 학습 유형과 사용 사례를 판단하고, ML 개발 수명 주기와 MLOps의 기본 역할을 익힙니다.

공식 AIF-C01 시험 안내서에서 D1의 채점 콘텐츠 가중치는 **20%**입니다. [AWS 공식 Domain 1](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain1.html)

## 선수 지식과 한 줄 요약

- 선수 지식: 특별한 AI·ML 경험은 필요하지 않으며, 데이터를 보고 규칙이나 패턴을 찾는다는 정도의 일상적인 경험이면 충분합니다.
- 한 줄 요약: **AI는 넓은 목표이고, ML은 데이터에서 패턴을 학습하는 대표적인 방법이며, 딥 러닝은 신경망을 깊게 쌓은 ML 접근 방식입니다.**

## 공식 범위와 문서 연결

| 공식 작업 | 다룰 핵심 내용 | 연결 문서 | 상태 |
|---|---|---|---|
| 1.1 기본 AI 개념과 용어 | AI·ML·딥 러닝·GenAI 관계, 데이터·모델·훈련·추론, 학습 유형 | [AI·ML·GenAI 관계](01-ai-ml-genai-relationship.md) | draft |
| 1.1 기본 AI 개념과 용어 | 데이터 유형, 지도·비지도·강화 학습, 컴퓨터 비전, NLP, 음성, 편향·공정성 | [데이터 유형과 학습 유형](02-data-and-learning-types.md) | draft |
| 1.2 AI의 실제 사용 사례와 기법 선택 | 회귀·분류·클러스터링, 사용 사례 적합성, 관리형 AI 서비스 | [AI 사용 사례와 기법 선택](03-ai-use-cases-and-technique-selection.md) | draft |
| 1.3 ML 개발 수명 주기와 MLOps | 데이터 준비부터 모니터링까지의 흐름, 지표와 운영 | [ML 개발 수명 주기와 MLOps](04-ml-lifecycle-and-mlops.md) | draft |

공식 범위의 모든 항목은 도메인별 문서를 작성하면서 연결 상태를 갱신합니다. 현재 `draft`는 내용과 출처 검토가 진행 중이라는 뜻이며, 최종 검증 전에는 `verified`로 표시하지 않습니다.

## 추천 학습 순서

1. AI·ML·GenAI의 관계와 모델의 기본 흐름
2. 데이터 유형과 지도·비지도·강화 학습
3. 문제 유형과 회귀·분류·클러스터링
4. 컴퓨터 비전·NLP·음성 등 사용 사례
5. ML 개발 수명 주기와 MLOps
6. D1 요약 카드와 문제은행

## 시험 핵심과 AWS 실무 확장

- **시험 핵심**: 용어의 관계, 학습 유형, 사용 사례에 맞는 접근 방식, 훈련과 추론의 차이, ML 수명 주기의 순서를 판단합니다.
- **AWS 실무 확장**: Amazon SageMaker AI와 Amazon Transcribe·Amazon Translate·Amazon Comprehend·Amazon Lex·Amazon Polly 같은 관리형 AI 서비스가 어떤 문제를 도울 수 있는지 연결합니다. 특정 기능과 현재 제공 범위는 각 서비스의 공식 문서에서 다시 확인합니다.

## D1 진행 상태

- [x] D1 README와 공식 범위 추적표 초안
- [x] AI·ML·GenAI 관계 문서 초안
- [x] 데이터와 학습 유형 문서
- [x] AI 사용 사례와 기법 선택 문서
- [x] ML 수명 주기와 MLOps 문서
- [x] D1 카드 요약·용어 퀴즈·문제은행 연결 — [복습 카드](d1-review-cards.md), [용어 퀴즈](d1-terminology-quiz.md), [Anki TSV](d1-anki.tsv), [D1 문제은행](../06-exam-strategy/d1-question-bank.md)
- [ ] 출처·초보자 관점·누락 검토

## 출처

- [AWS Certified AI Practitioner — Domain 1: AI 및 ML의 기초](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain1.html) — 확인일: 2026-09-04
- [AWS Certified AI Practitioner(AIF-C01) 시험 안내서](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html) — 확인일: 2026-09-04
