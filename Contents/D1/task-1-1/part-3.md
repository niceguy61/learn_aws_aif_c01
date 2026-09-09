![도메인 D1](https://img.shields.io/badge/%F0%9F%A7%AD%20Domain-D1-232F3E?style=flat-square&labelColor=0F172A) ![난이도 입문](https://img.shields.io/badge/%F0%9F%8C%B1%20Level-Beginner-2EA44F?style=flat-square&labelColor=0F172A) ![문서 상태 초안](https://img.shields.io/badge/%F0%9F%8F%97%EF%B8%8F%20Status-Draft-F59E0B?style=flat-square&labelColor=0F172A)

# AIF-C01 Task 1.1 Part 3 - 모델 아티팩트와 배포, 학습 유형

> 모델 훈련 관련 마지막 강의

## 1. 모델 아티팩트와 배포

- **훈련 프로세스 결과:** 훈련된 파라미터, 추론 계산 방법 설명하는 모델 정의, 기타 메타데이터로 구성된 **모델 아티팩트** 생성
- **저장:** 일반적으로 **Amazon S3**
- **배포 가능한 모델 = 모델 아티팩트 + 추론 코드**
  - 추론 코드: 아티팩트 읽어 모델 구현하는 소프트웨어

### 호스팅 2가지 옵션

| 구분 | 실시간 추론 (Real-time) | 배치 (Batch) |
| :--- | :--- | :--- |
| 방식 | 엔드포인트가 항상 실시간으로 추론 요청 수락 | 배치 작업이 추론 수행 |
| 특징 | 지연 시간 짧음, 처리량 높음, 온라인 추론. 영구 엔드포인트에 배포, 지속적인 요청 흐름 처리 | 대량 데이터 미리 사용 가능, 영구 엔드포인트 불필요, 오프라인 처리. **비용 효율적** |
| 예시 | 클라이언트가 입력 보내면 매우 빠르게 결과 반환 | 판매 기록 데이터로 카탈로그 각 제품 다음달 필요 재고 예측. 월별 일정으로 한꺼번에 처리해 보고서 생성 |
| 핵심 차이 | 컴퓨팅 리소스 항상 실행, 요청 처리 가능 | 컴퓨팅 리소스가 배치 처리할 때만 실행 후 종료 |

```mermaid
flowchart TD
  subgraph RealTime ["⚡ 실시간 추론 (Real-time)"]
    direction TB
    C1["클라이언트 애플리케이션"] -->|실시간 단일 요청| EP["영구 엔드포인트<br/>(24/7 가동 중)"]
    EP -->|밀리초 수준 즉시 응답| C1
    Note1["특징: 저지연, 온라인 지속 서비스, 항상 비용 발생"]
  end

  subgraph Batch ["📦 배치 추론 (Batch)"]
    direction TB
    S3In["S3 입력 데이터셋<br/>(대용량 일괄 축적)"] -->|일괄 작업 기동| BJ["배치 추론 잡 (Batch Job)<br/>(작업 완료 시 인스턴스 자동 종료)"]
    BJ -->|추론 결과 파일 생성| S3Out["S3 결과 버킷<br/>(정기 리포트 생성)"]
    Note2["특징: 대규모 오프라인, 최고 비용 효율성, 엔드포인트 유지 불필요"]
  end

  style RealTime fill:#E8F0FE,stroke:#1A73E8,stroke-width:1.5px
  style Batch fill:#FEF7E0,stroke:#F9AB00,stroke-width:1.5px
```

## 2. 기계 학습 유형 - 예상 출력과 입력 유형에 따라 구분

```mermaid
graph TD
  ML["🧠 머신러닝의 3가지 학습 유형"]

  ML --> SL["1️⃣ 지도 학습 (Supervised)"]
  SL --> SL_Desc["• 데이터: <b>특성 + 정답 레이블</b><br/>• 목표: 입력 ➔ 정답 매핑 관계 학습<br/>• 주요 태스크: 분류, 회귀<br/>• AWS 도구: <b>SageMaker Ground Truth</b>"]

  ML --> UL["2️⃣ 비지도 학습 (Unsupervised)"]
  UL --> UL_Desc["• 데이터: <b>레이블 없는 특성 데이터</b><br/>• 목표: 숨겨진 패턴 및 군집(Cluster) 발견<br/>• 주요 태스크: 군집화, 이상 탐지<br/>• 예시: 고객 그룹화, 센서 이상 징후"]

  ML --> RL["3️⃣ 강화 학습 (Reinforcement)"]
  RL --> RL_Desc["• 에이전트와 환경의 상호작용<br/>• 목표: <b>시행착오를 통한 보상(Reward) 극대화</b><br/>• 학습 방식: 행동 ➔ 보상 ➔ 정책 최적화<br/>• AWS 도구: <b>AWS DeepRacer</b>"]

  style ML fill:#232F3E,color:#FFFFFF,stroke:#232F3E
  style SL fill:#E8F0FE,stroke:#1A73E8,color:#1A73E8
  style UL fill:#FEF7E0,stroke:#F9AB00,color:#B06000
  style RL fill:#E6F4EA,stroke:#1E8E3E,color:#1E8E3E
```

### (1) 지도 학습 (Supervised Learning)

- **정의:** 레이블 미리 지정된 데이터로 모델 훈련
- **예시:** 어류 모델 사진에는 어류 레이블, 해우 같은 다른 동물 사진은 비어류 레이블. 훈련 데이터는 입력과 원하는 출력 모두 지정
- **작동:** 이미지 분류 - 이미지 픽셀 보고 클러스터/패턴 인식, 내부 파라미터 조정, 어류 vs 비어류 성공적 식별까지 계속
- **중요:** ML 추론이 항상 정확하지 않음. 실제로 생성하는 것은 **이미지가 어류일 확률**
- **과제:** 데이터 레이블 지정. 수천 장 레이블링에 사람 직접 작업 필요
- **해결 서비스:** **Amazon SageMaker Ground Truth** - 레이블 지정 서비스. **Amazon Mechanical Turk** 크라우드소싱 서비스 활용, 전세계 대규모 저렴 노동력 풀 액세스 제공

### (2) 비지도 학습 (Unsupervised Learning)

- **정의:** 특성은 있지만 레이블 없는 데이터 대상 훈련
- **기능:** 패턴 찾아내거나 데이터 클러스터로 그룹화, 특정 수 그룹으로 나눔
- **장점:** 레이블 필요 없으므로 설정 간단. 추가 모델링 위해 데이터 자동 정리/처리에도 사용
- **사용 사례:** 패턴 인식, 이상 탐지, 데이터 자동 카테고리 그룹화
- **예시 1 - 클러스터링:** 다양한 유형 네트워크 트래픽 식별해 잠재적 보안 인시던트 예측
- **예시 2 - 이상 탐지:** 센서 수집 데이터 검사, 정상 범위 크게 벗어나면 유정 온도 센서 고장 감지. 일반적으로 이상 탐지에 사용

### (3) 강화 학습 (RL, Reinforcement Learning)

- **정의:** 에이전트 자율적 의사결정에 초점
- **작동:** 에이전트는 특정 목표 달성 위해 환경 내에서 액션 수행. 시행착오 통해 학습, 레이블 입력 불필요. 목표 달성에 가까워지는 액션은 **보상** 받음. 학습 장려 위해 때때로 보상 없는 액션도 취해야 함
- **교육용 서비스:** **AWS DeepRacer** 경주용 자동차 모델
  - 자동차=에이전트, 트랙=환경, 액션=트랙에서 앞으로 나아가는 자동차, 목표=트랙에 머물며 최대한 효율적 완주

```mermaid
flowchart LR
  Agent["🏎️ 에이전트 (DeepRacer 차량)"] -->|행동| Env["🛣️ 환경 (경주 트랙)"]
  Env -->|상태와 보상| Agent

  style Agent fill:#E6F4EA,stroke:#1E8E3E,stroke-width:2px,color:#1E8E3E
  style Env fill:#FEF7E0,stroke:#F9AB00,stroke-width:2px,color:#B06000
```

### 비지도 vs 강화 학습 비교

- **공통점:** 둘 다 레이블 지정 데이터 없이 작동
- **차이점:** 비지도는 훈련 중 지정 출력 없는 입력 받음 / 강화 학습은 **미리 정해진 최종 목표** 있음. 탐색적 접근 필요하지만 지속 검증/개선되어 최종 목표 도달 확률 높아짐

## 3. 시험 체크포인트

- 모델 아티팩트 = 파라미터 + 모델 정의 + 메타데이터, S3 저장, 추론 코드와 패키징
- 실시간 = 영구 엔드포인트/저지연/온라인, 배치 = 대량/오프라인/비용 효율/자원 처리시에만 실행
- 지도 학습 = 레이블 필요, 확률 출력, 과제=레이블링, 해결=Ground Truth + Mechanical Turk
- 비지도 = 레이블 없는 특성, 클러스터링/이상탐지
- RL = 에이전트/환경/액션/보상/목표, DeepRacer

```mermaid
flowchart LR
  subgraph Keyword ["📋 지문 핵심 단서"]
    direction TB
    K1["레이블 지정 필요 + 크라우드소싱 인력 풀"]
    K2["레이블 없음 + 패턴 그룹화 / 이상 탐지"]
    K3["에이전트 + 보상 함수 + 자율 주행 트랙 완주"]
    K4["항상 활성 엔드포인트 + 실시간 응답"]
    K5["대용량 데이터 일괄 처리 + 비용 절감"]
  end
  subgraph Match ["🎯 시험 정답 매핑"]
    direction TB
    M1["➔ Ground Truth + Mechanical Turk"]
    M2["➔ 비지도 학습 (Clustering / Anomaly Detection)"]
    M3["➔ 강화 학습 (AWS DeepRacer)"]
    M4["➔ 실시간 추론 (Real-time Endpoint)"]
    M5["➔ 배치 추론 (Batch Transform)"]
  end
  K1 --> M1
  K2 --> M2
  K3 --> M3
  K4 --> M4
  K5 --> M5

  style Keyword fill:#F8F9FA,stroke:#6C757D
  style Match fill:#E8F0FE,stroke:#1A73E8
```

## 학습 문서 메타데이터

- 도메인: D1 — AI 및 ML의 기초
- 원본 보존 링크: [AIF-C01-Task1-1-Part3.md](../../../docs/Refs/AIF-C01-Task1-1-Part3.md)
- 이 문서는 원본 본문을 보존한 복사본이며, 이 섹션·도식·네비게이션은 학습용으로 추가했습니다.

이 상태 다이어그램은 모델 아티팩트가 훈련 결과에서 추론 배포 상태로 전환되는 과정을 보여 줍니다. Mermaid가 렌더링되지 않아도 상태 이름과 전이 방향으로 실시간·배치 차이를 이해할 수 있습니다.

```mermaid
stateDiagram-v2
  [*] --> Training
  Training --> Artifact
  Artifact --> RealTime
  Artifact --> Batch
  RealTime --> [*]
  Batch --> [*]
```

## 초보자 학습 보조

### 이 문서에서 배울 것

훈련 결과인 모델 아티팩트가 추론에 어떻게 사용되는지와, 지도·비지도·강화 학습을 문제 단서로 구분하는 방법을 배웁니다.

### 선수 지식과 한 줄 요약

- 선수 지식: **훈련**은 데이터로 모델의 패턴을 만드는 단계이고, **추론**은 완성된 모델로 새 입력의 결과를 만드는 단계입니다.
- 한 줄 요약: **정답 레이블이 있으면 지도 학습, 숨은 구조를 찾으면 비지도 학습, 행동의 보상을 통해 개선하면 강화 학습을 먼저 떠올립니다.**

### 자주 하는 오해

- **오해:** 실시간 추론은 항상 배치 추론보다 좋은 선택이다.
- **바로잡기:** 실시간 추론은 즉시 응답이 필요할 때 적합합니다. 많은 데이터를 한꺼번에 처리하고 결과를 기다릴 수 있다면 배치 추론이 더 알맞을 수 있습니다.

### 스스로 답하는 확인 질문

1. 매일 밤 전날 판매 기록 전체를 처리해 재고 예측 보고서를 만드는 경우, 어떤 추론 방식이 더 알맞고 왜 그런가요?
2. 정답 레이블 없이 고객을 비슷한 행동 패턴으로 묶고 싶다면 어떤 학습 유형을 고려하나요?

### 공식 범위와 출처

- **시험 핵심:** AIF-C01 Domain 1 Task 1.1의 추론 유형과 지도·비지도·강화 학습 설명에 연결됩니다.
- **AWS 실무 확장:** 모델 아티팩트와 SageMaker 관련 예시는 개념을 AWS 환경에 연결하기 위한 보조 설명입니다.
- [콘텐츠 도메인 1: AI 및 ML의 기초 — AWS 공식 시험 안내서](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain1.html), 확인일: 2026-09-09

---

[이전](part-2.md) | [인덱스](README.md) | [다음](part-4.md)
