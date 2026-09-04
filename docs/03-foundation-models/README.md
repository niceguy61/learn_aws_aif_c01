---
title: "D3 — 파운데이션 모델의 적용"
domain: "D3"
level: "beginner"
status: "draft"
source_urls:
  - "https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain3.html"
source_checked: "2026-09-04"
---

# D3 — 파운데이션 모델의 적용

## 이 문서에서 배울 것

D3에서는 이미 만들어진 파운데이션 모델(FM)을 실제 애플리케이션에 적용할 때의 판단 기준을 배웁니다. 모델 선택과 추론 파라미터, RAG와 벡터 저장소, 에이전트부터 프롬프트 엔지니어링, 모델 사용자 지정·미세 조정, FM 성능 평가와 비즈니스 지표까지 연결합니다.

공식 AIF-C01 시험 안내서에서 D3의 채점 콘텐츠 가중치는 **28%**입니다. 다섯 도메인 중 가장 큰 비중이므로 단순한 서비스 이름 암기보다 시나리오에서 적절한 접근 방식을 선택하는 연습이 중요합니다. [AWS 공식 Domain 3](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain3.html)

## 선수 지식과 한 줄 요약

- 선수 지식: D1의 ML 수명 주기와 D2의 토큰·프롬프트·RAG·에이전트·FM 개념이 필요합니다.
- 한 줄 요약: **FM 적용은 모델 선택 → 입력·프롬프트 설계 → 필요한 데이터 사용자 지정 → 평가·운영의 반복 과정입니다.**

## 공식 범위와 문서 연결

| 공식 작업 | 다룰 핵심 내용 | 연결 문서 | 상태 |
|---|---|---|---|
| 3.1 FM 애플리케이션 설계 고려 사항 | 모델 선택·추론 파라미터·RAG·벡터 저장·사용자 지정 비용·AI 에이전트 | [FM 애플리케이션 설계](01-fm-application-design.md) | draft |
| 3.2 효과적인 프롬프트 엔지니어링 기법 선택 | 프롬프트 구성·zero/one/few-shot·생각의 사슬·템플릿·위험·Prompt Management | [프롬프트 엔지니어링·RAG·에이전트](02-prompt-engineering-and-rag.md) | draft |
| 3.3 FM의 훈련과 미세 조정 프로세스 | 사전 훈련·미세 조정·지속적인 사전 훈련·증류·명령 튜닝·데이터 준비·RL | [FM 훈련·사용자 지정](03-fm-training-and-customization.md) | draft |
| 3.4 FM 성능 평가 방법 | 인간 평가·벤치마크·Bedrock 모델 평가·ROUGE·BLEU·BERTScore·LLM-as-a-judge·비즈니스 지표 | [FM 성능 평가](04-fm-performance-evaluation.md) | draft |

### D3 공식 기술 항목 추적

| 영역 | 반드시 다룰 항목 |
|---|---|
| 모델·애플리케이션 | 비용·모달리티·지연 시간·다국어·모델 크기·복잡도·사용자 지정·입출력 길이·프롬프트 캐싱 |
| 추론 | 온도, 입력·출력 길이가 응답에 미치는 영향 |
| 지식 연결 | RAG 정의·비즈니스 사례·Amazon Bedrock Knowledge Bases |
| 벡터 저장 | Amazon OpenSearch Service, Amazon Aurora, Amazon Neptune, Amazon RDS for PostgreSQL |
| 사용자 지정 선택 | 사전 훈련, 미세 조정, 컨텍스트 내 학습, RAG, 모델 증류의 비용 절충 |
| 에이전트 | AI 에이전트의 역할과 비즈니스 애플리케이션 |
| 프롬프트 구성 | 컨텍스트·명령·네거티브 프롬프트·모델 잠재 공간 |
| 프롬프트 기법 | 생각의 사슬, zero-shot·one-shot·few-shot, 프롬프트 템플릿 |
| 프롬프트 운영 | 품질 개선·실험·가드레일·발견·구체성·간결성·여러 예시·출력 형식 |
| 프롬프트 위험 | 노출, 데이터 중독, prompt injection, 하이재킹, 탈옥 |
| 프롬프트 관리 | Amazon Bedrock Prompt Management, 버전 관리·운영 전략 |
| 훈련·사용자 지정 | 사전 훈련·미세 조정·지속적인 사전 훈련·증류·명령 튜닝·도메인 조정·전이 학습 |
| 사용자 지정 데이터 | 큐레이션·거버넌스·데이터 크기·레이블·대표성·사용자 피드백을 통한 강화 학습 |
| 평가 | 인간 평가·벤치마크·Amazon Bedrock 모델 평가·ROUGE·BLEU·BERTScore·LLM-as-a-judge |
| 애플리케이션 평가 | RAG·에이전트·워크플로 품질, 생산성·참여·작업 완료율·만족도·상호 작용당 비용 |

## 추천 학습 순서

1. D2에서 배운 FM·프롬프트·RAG·에이전트 개념을 복습하기
2. 업무 요구에 맞는 FM과 애플리케이션 구조 선택하기
3. 프롬프트 구성 요소와 zero-shot·one-shot·few-shot을 비교하기
4. RAG·프롬프트·미세 조정·재훈련·증류의 선택 기준 구분하기
5. 품질·안전·비용·지연 시간과 모델 성능을 평가하기
6. 모델 지표와 실제 비즈니스 지표를 연결하기
7. D3 카드·용어 퀴즈·문제은행으로 시나리오 판단 반복하기

## 복습 자료

- [D3 복습 카드](d3-review-cards.md) — 핵심 개념 35개
- [D3 용어 퀴즈](d3-terminology-quiz.md) — 20문항
- [D3 Anki 카드](d3-anki.tsv) — 35개 카드, `Front\tBack\tTags` 형식
- [D3 자체 문제은행](../06-exam-strategy/d3-question-bank.md) — Q1~Q25, 단일 선택·복수 응답 혼합

## 시험 핵심과 AWS 실무 확장

- **시험 핵심**: 요구사항에 맞는 FM 적용 방식, 프롬프트 기법, 사용자 지정 방법, 평가 지표와 비즈니스 지표를 선택합니다.
- **AWS 실무 확장**: Amazon Bedrock Knowledge Bases·Prompt Management·모델 평가, 벡터 저장에 활용할 수 있는 AWS 데이터 서비스와 모델 사용자 지정 경로를 공식 문서에서 확인합니다.
- **주의**: 특정 모델명·가격·리전·할당량은 변경될 수 있으므로 이 가이드에서는 작성일 기준 개념을 설명하고, 실제 사용 전 공식 문서를 다시 확인합니다.

## D3 진행 상태

- [x] D3 공식 범위·가중치·기술 항목 추적표 초안
- [x] FM 애플리케이션 설계 문서
- [x] 프롬프트 엔지니어링·RAG·에이전트 문서
- [x] FM 훈련·사용자 지정 문서
- [x] FM 성능 평가 문서
- [x] D3 카드 요약·용어 퀴즈·Anki·문제은행 연결
- [ ] 출처·초보자 관점·누락 검토

## 출처

- [AWS Certified AI Practitioner — Domain 3: 파운데이션 모델의 적용](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain3.html) — 공식 작업·기술 항목과 가중치 확인, 확인일: 2026-09-04
- [AWS Certified AI Practitioner(AIF-C01) 시험 안내서](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html) — 시험 안내서 전체 구조 확인, 확인일: 2026-09-04

이 문서는 공식 시험 범위를 초보자 학습 목적에 맞게 재구성한 초안입니다. 시험 범위와 AWS 실무 확장 내용을 구분해서 읽어 주세요.
