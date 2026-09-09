---
title: 'AIF-C01 Task 1.3 Part 3 - 모델 훈련/조정/평가'
domain: 'D1'
level: 'beginner'
status: 'draft'
source_urls:
  - 'https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain1.html'
  - 'docs/Refs/AIF-C01-Task1-3-Part3.md'
source_checked: '2026-09-04'
---

# AIF-C01 Task 1.3 Part 3 - 모델 훈련/조정/평가

> 파이프라인 다음 단계: 훈련, 조정, 평가의 반복 프로세스

## 1. 모델 훈련 원리

- **훈련 중 업데이트 대상:** 파라미터 또는 가중치라는 일련의 숫자
- **목표:** 추론이 예상 출력과 일치하도록 모델 파라미터 업데이트
- **반복 필요 이유:** 알고리즘 아직 학습 안했으므로 한 번 반복으로 불가. 가중치 변경이 출력이 예상 값에 가까워지는 방식에 대한 지식 없음. 따라서 이전 반복에서 가중치/출력 관찰하고 가중치를 생성된 출력 오류 낮추는 방향으로 이동
- **중지 조건:** 정의된 반복 횟수 실행되었거나 오류 변화가 목표 값 미만일 때 중지

## 2. 실험과 하이퍼파라미터

```mermaid
flowchart TD
  subgraph Comparison ["⚙️ 모델 파라미터 vs 하이퍼파라미터 비교"]
    direction LR
    subgraph Params ["🧠 모델 파라미터 (Internal Parameters)"]
      P1["• 모델 <b>내부에서 학습</b>되는 가중치(Weights)<br/>• 예: 뉴런 연결 가중치, 편향(Bias), 절편(b)<br/>• 훈련을 거치며 오차를 줄이는 방향으로 자동 갱신"]
    end
    subgraph HyperParams ["🛠️ 하이퍼파라미터 (External Hyperparameters)"]
      H1["• 데이터 과학자가 <b>훈련 시작 전 외부에서 지정</b><br/>• 예: 학습률(Learning Rate), 에포크, 레이어/노드 수<br/>• 최적값을 찾기 위해 반복적인 실험과 튜닝(AMT) 필요"]
    end
  end
  style Params fill:#E8F0FE,stroke:#1A73E8,color:#1A73E8
  style HyperParams fill:#FEF7E0,stroke:#F9AB00,color:#B06000
```

- **여러 알고리즘 고려 필요:** 모범 사례는 다양한 알고리즘/설정 사용해 많은 훈련 작업 **병렬 실행** = **실행 실험**, 성능 가장 좋은 솔루션 찾기
- **하이퍼파라미터:** 성능에 영향 미치는 외부 파라미터 세트, 데이터 과학자가 모델 훈련 전 설정
  - 예) 딥러닝 모델 신경 계층/노드 수 조정
  - 최적 값은 서로 다른 설정으로 여러 실험 실행해야만 결정 가능

## 3. SageMaker로 모델 훈련

```mermaid
flowchart LR
  S3_In["1️⃣ Amazon S3<br/>(학습 데이터셋)"] --> SM_Train["2️⃣ SageMaker 학습 작업 (Training Job)<br/>• 완전관리형 ML 인스턴스 클러스터 시작<br/>• 훈련 완료 즉시 인스턴스 자동 반환 (비용 절감)"]
  ECR["2️⃣ Amazon ECR<br/>(알고리즘 Docker 이미지)"] --> SM_Train
  Config["2️⃣ 작업 설정<br/>(하이퍼파라미터, 인스턴스 타입)"] --> SM_Train
  SM_Train --> S3_Out["3️⃣ Amazon S3<br/>(결과 아티팩트 `model.tar.gz`)"]

  style S3_In fill:#FF9900,color:#232F3E,stroke:#232F3E
  style ECR fill:#FF9900,color:#232F3E,stroke:#232F3E
  style Config fill:#F0F4F8,stroke:#232F3E
  style SM_Train fill:#E8F0FE,stroke:#1A73E8,stroke-width:2px
  style S3_Out fill:#E6F4EA,stroke:#1E8E3E,stroke-width:2px
```

### 훈련 작업 생성 과정

1. **SageMaker 관리 ML 컴퓨팅 인스턴스 플릿**에서 훈련 코드 실행하는 훈련 작업 생성
2. **입력:** 훈련 데이터 포함된 **S3 버킷 URL** 지정
3. **리소스 지정:** 훈련 사용할 컴퓨팅 리소스 + 모델 아티팩트 출력 버킷 지정
4. **알고리즘 지정:** 훈련 알고리즘 포함된 **Docker 컨테이너 이미지 경로** 제공
   - **Amazon ECR (Elastic Container Registry)** 에서 위치 지정:
     - SageMaker 제공 알고리즘과 딥러닝 컨테이너 위치
     - 또는 사용자 지정 알고리즘 포함 사용자 지정 컨테이너 위치
5. **하이퍼파라미터 설정:** 알고리즘 필요 하이퍼파라미터 설정
6. **실행:** 훈련 작업 생성되면 SageMaker가 ML 컴퓨팅 인스턴스 시작, 훈련 코드/데이터세트 사용해 모델 훈련
7. **저장:** 결과 모델 아티팩트와 기타 출력을 지정 S3 버킷에 저장

### 반복 실험의 규모

- ML은 반복적 프로세스: 데이터/알고리즘/파라미터 여러 조합 실험하며 증분 변경이 모델 정확도 미치는 영향 관찰
- 이 반복 실험에서 **수천 개 모델 훈련 실행 및 모델 버전** 생성될 수 있음

## 4. SageMaker 실험 관리 및 자동 튜닝

### SageMaker Experiments (실험)

- ML 실험 생성/관리/분석/비교 기능
- **실험 = 각각 입력/파라미터/구성 다른 훈련 실행 그룹**
- 시각적 인터페이스 통해 활성/과거 실험 탐색, 주요 성능 지표 실행 비교, 최고 성능 모델 식별 가능

### SageMaker 자동 모델 튜닝 (AMT) = 하이퍼파라미터 튜닝

- **정의:** 데이터세트에서 많은 훈련 작업 실행해 최상 모델 버전 찾기
- **작동:** 사용자가 지정한 알고리즘/하이퍼파라미터 범위 사용, 선택 지표로 측정 시 성능 가장 좋은 모델 생성하는 하이퍼파라미터 값 선택
  - 예) 이진 분류 모델 튜닝 시 **곡선 아래 면적(AUC, Area Under Curve)** 지표 최대화하는 하이퍼파라미터 조합 찾기
- **사용 방법:** 루프 내 여러 훈련 작업 실행하는 **튜닝 작업** 알아내야 함
- **완료 기준 지정:** 더 이상 지표 개선 안하는 작업 수 같은 기준, 완료 기준 충족까지 작업 실행

```mermaid
flowchart TD
  UserRange["사용자 지정: 하이퍼파라미터 탐색 범위 & 목표 최적화 지표 (예: AUC 최대화)"] --> AMT["SageMaker AMT (자동 모델 튜닝)"]
  AMT --> J1["학습 작업 1 (Learning Rate=0.01) ➔ AUC: 0.82"]
  AMT --> J2["학습 작업 2 (Learning Rate=0.05) ➔ AUC: 0.89"]
  AMT --> J3["학습 작업 N (베이지안 최적화 탐색) ➔ ..."]
  J1 & J2 & J3 --> Best["🏆 최적의 하이퍼파라미터 조합 도출 (AUC: 0.95 최고 모델 아티팩트 생성)"]

  style UserRange fill:#232F3E,color:#FFFFFF,stroke:#232F3E
  style AMT fill:#E8F0FE,stroke:#1A73E8,stroke-width:2px
  style Best fill:#E6F4EA,stroke:#1E8E3E,stroke-width:2px
```

## 5. 시험 체크포인트

- 훈련=파라미터/가중치 업데이트, 오류 낮추는 방향으로 이동, 반복 횟수 또는 오류 변화 목표 미만 시 중지
- 모범 사례=다양한 알고리즘/설정 병렬 실행=실행 실험
- 하이퍼파라미터=외부 파라미터, 훈련 전 설정, 예) 신경 계층/노드 수, 여러 실험으로 최적값 결정
- SageMaker 훈련 작업: S3 URL 입력, 컴퓨팅 리소스+출력 버킷 지정, Docker 컨테이너 이미지 경로 (ECR에서 SageMaker 제공 또는 커스텀), 하이퍼파라미터 설정, 인스턴스 시작->훈련->S3에 아티팩트 저장, 수천 개 실행/버전 생성 가능
- Experiments=입력/파라미터/구성 다른 훈련 실행 그룹, 시각적 인터페이스 비교
- AMT=하이퍼파라미터 튜닝, 많은 훈련 작업 실행, 성능 가장 좋은 값 선택, 예) AUC 최대화, 완료 기준 지정 (더 이상 개선 안하는 작업 수)

```mermaid
flowchart LR
  subgraph Clues ["📋 시험 지문 핵심 단서"]
    direction TB
    K1["훈련 전 외부에서 설정하는 학습률, 계층 수 등"]
    K2["SageMaker 훈련 알고리즘이 위치하는 레지스트리"]
    K3["훈련 완료 후 생성된 모델 아티팩트 저장소"]
    K4["목표 지표(AUC 등)를 최대화하는 하이퍼파라미터 자동 탐색"]
    K5["여러 훈련 실행의 파라미터와 결과를 시각적으로 추적·비교"]
  end
  subgraph Answers ["🎯 AWS 정답 서비스 / 개념"]
    direction TB
    A1["➔ 하이퍼파라미터 (Hyperparameters)"]
    A2["➔ Amazon ECR (Docker 이미지)"]
    A3["➔ Amazon S3 버킷"]
    A4["➔ SageMaker AMT (자동 모델 튜닝)"]
    A5["➔ SageMaker Experiments"]
  end
  K1 --> A1
  K2 --> A2
  K3 --> A3
  K4 --> A4
  K5 --> A5

  style Clues fill:#F8F9FA,stroke:#6C757D
  style Answers fill:#E8F0FE,stroke:#1A73E8
```

## 학습 문서 메타데이터

- 도메인: D1 — AI 및 ML의 기초
- 원본 보존 링크: [AIF-C01-Task1-3-Part3.md](../../../docs/Refs/AIF-C01-Task1-3-Part3.md)
- 이 문서는 원본 본문을 보존한 복사본이며, 이 섹션·도식·네비게이션은 학습용으로 추가했습니다.

이 상태 다이어그램은 모델 훈련이 실험·튜닝·평가를 반복하며 승인 가능한 아티팩트로 전환되는 상태를 보여 줍니다. Mermaid가 렌더링되지 않아도 각 상태와 중지 조건을 읽을 수 있습니다.

```mermaid
stateDiagram-v2
  [*] --> Configured
  Configured --> Training
  Training --> Experiment
  Experiment --> Evaluating
  Evaluating --> Training: 개선 필요
  Evaluating --> Approved: 목표 달성
  Approved --> [*]
```

---

[이전](part-2.md) | [인덱스](README.md) | [다음](part-4.md)
