---
title: 'D1 — AI 및 ML의 기초'
domain: 'D1'
level: 'beginner'
status: 'draft'
source_urls:
  - 'https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain1.html'
source_checked: '2026-09-04'
---

<!-- metadata-badges -->
<p><kbd>도메인 D1</kbd> <kbd>입문</kbd> <kbd>초안</kbd></p>

# D1 — AI 및 ML의 기초

- 공식 도메인: [AI 및 ML의 기초](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain1.html)
- 공식 가중치: **20%**
- 문서 상태: `draft` — 공식 출처 revision과 기술 행은 현재 sources/ 기록에 따라 검증 보류 상태입니다.

![AI·ML·딥러닝·생성형 AI 계층 구조](../../assets/images/d1-ai-ml-dl-genai.svg)

## 학습 순서

```mermaid
flowchart TD
  subgraph D1 ["📚 Domain 1: AI 및 ML의 기초 (공식 가중치 20%)"]
    direction TB
    
    subgraph T11 ["Task 1.1: 기본 AI 개념 및 핵심 용어"]
      T11_1["Part 1: AI/ML/DL/GenAI 계층도 & 기술 분류"]
      T11_2["Part 2: 5단계 학습 파이프라인 & 4대 데이터 유형"]
      T11_3["Part 3: 실시간 vs 배치 추론 & 3대 학습 패러다임"]
      T11_4["Part 4: 과소/과대적합 & 편향/공정성 3단계"]
      T11_5["Part 5: 심층 신경망 & 트랜스포머 병렬 처리"]
      T11_1 --> T11_2 --> T11_3 --> T11_4 --> T11_5
    end

    subgraph T12 ["Task 1.2: AI 비즈니스 활용 사례 & 서비스 선택"]
      T12_1["Part 1: AI 도입 판단 트리 (규칙 기반 vs ML)"]
      T12_2["Part 2: 지도/비지도, 분류/회귀, 군집/이상탐지"]
      T12_3["Part 3: 사전 훈련된 AI 서비스 (시각/문서/음성)"]
      T12_4["Part 4: Bedrock vs SageMaker vs AI 서비스"]
      T12_5["Part 5: 6대 글로벌 엔터프라이즈 성공 사례"]
      T12_1 --> T12_2 --> T12_3 --> T12_4 --> T12_5
    end

    subgraph T13 ["Task 1.3: 머신러닝 개발 수명 주기 (ML Lifecycle)"]
      T13_1["Part 1: ML 수명 주기 6단계 & 3단계 구현 사다리"]
      T13_2["Part 2: 데이터 준비, 80/10/10 분할 & Glue/Feature Store"]
      T13_3["Part 3: SageMaker 훈련 작업 & 자동 모델 튜닝(AMT)"]
      T13_4["Part 4: 실시간 REST & 4대 추론 옵션 (Batch/Async/Serverless/Real-time)"]
      T13_5["Part 5: 데이터/개념 드리프트 & MLOps 파이프라인"]
      T13_1 --> T13_2 --> T13_3 --> T13_4 --> T13_5
    end

    T11 --> T12 --> T13
  end

  style D1 fill:#F8F9FA,stroke:#232F3E,stroke-width:2px
  style T11 fill:#E8F0FE,stroke:#1A73E8,stroke-width:1.5px
  style T12 fill:#FEF7E0,stroke:#F9AB00,stroke-width:1.5px
  style T13 fill:#E6F4EA,stroke:#1E8E3E,stroke-width:1.5px
```

- [Task 1.1 기본 AI 개념과 용어](./task-1-1/README.md)
- [Task 1.2 AI 실제 사용 사례](./task-1-2/README.md)
- [Task 1.3 ML 개발 수명 주기](./task-1-3/README.md)

## 원본 보존

원본 57개는 모두 docs/Refs/에 그대로 보존합니다. 이 디렉터리의 문서는 원본을 복사한 뒤 메타데이터·도식·네비게이션만 추가한 학습용 파생본입니다.

렌더러 없이도 노드와 화살표로 도메인의 학습 흐름을 읽을 수 있습니다.

```mermaid
flowchart TD
  ai[AI 문제 해결 범주] --> ml[ML 데이터 학습]
  ml --> dl[딥 러닝 신경망]
  dl --> gen[GenAI 새 콘텐츠]
  ml -. 규칙 기반과 구분 .-> rules[명시적 규칙]
  gen --> output[텍스트 이미지 코드 출력]
```

---

이전: 없음 | [Contents 인덱스](../README.md) | [다음 도메인](../D2/README.md)
