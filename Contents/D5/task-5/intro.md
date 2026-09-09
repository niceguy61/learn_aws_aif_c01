![도메인 D5](https://img.shields.io/badge/%F0%9F%A7%AD%20Domain-D5-B45309?style=flat-square&labelColor=0F172A) ![난이도 입문](https://img.shields.io/badge/%F0%9F%8C%B1%20Level-Beginner-2EA44F?style=flat-square&labelColor=0F172A) ![문서 상태 초안](https://img.shields.io/badge/%F0%9F%8F%97%EF%B8%8F%20Status-Draft-F59E0B?style=flat-square&labelColor=0F172A)

# AIF-C01 Task 5.0 Overview - 영역 5 : AI 솔루션 보안/규정 준수/거버넌스

> 보안/규정 준수/거버넌스, 2개 태스크 목표

## 영역 5 구성

- **Task 5.1:** AI 시스템 보호 방법 설명
- **Task 5.2:** AI 시스템 거버넌스/규정 준수 규제 인식

## Task 5.1 요구 사항 - AI 시스템 보호

- 자격 증명/액세스 관리 AWS 작동 방식 기본 이해
- AI 애플리케이션/데이터 보호 AWS와 고객 간 **공동 책임** 방식 이해
- AI 시스템 공격/도용 취약한 몇 가지 방식 이해 + 취약성 완화 모범 사례 설명 가능

## Task 5.2 요구 사항 - 거버넌스/규정 준수 규제

- AI 시스템 몇 가지 규정 준수 표준 이해 + 이러한 표준 충족 사용 AWS 서비스/전략/프로세스 식별 가능

## 시험 체크포인트

- 영역 5 AI 솔루션 보안 규정 준수 거버넌스 2개 태스크 목표 5.1 AI 시스템 보호 방법 설명 5.2 AI 시스템 거버넌스 규정 준수 규제 인식 5.1 자격 증명 액세스 관리 AWS 작동 방식 기본 AI 애플리케이션 데이터 보호 AWS 고객 공동 책임 AI 시스템 공격 도용 취약 방식 취약성 완화 모범 사례 5.2 AI 시스템 규정 준수 표준 이해 표준 충족 사용 AWS 서비스 전략 프로세스 식별

## 학습 문서 메타데이터

- 도메인: D5 — AI 솔루션의 보안, 규정 준수 및 거버넌스
- 원본 보존 링크: [AIF-C01-Task5-Intro.md](../../../docs/Refs/AIF-C01-Task5-Intro.md)
- 이 문서는 원본 본문을 보존한 복사본이며, 이 섹션·도식·네비게이션은 학습용으로 추가했습니다.

이 상태 다이어그램은 AI 요청이 권한·네트워크·암호화·모델 검증·감사 상태를 순서대로 통과하고 정책 개선으로 되돌아가는 상태 전이를 보여 줍니다. Mermaid가 렌더링되지 않아도 보안 통제의 순서를 읽을 수 있습니다.

```mermaid
stateDiagram-v2
  [*] --> Request
  Request --> Authorization
  Authorization --> NetworkBoundary
  NetworkBoundary --> Encryption
  Encryption --> ModelBoundary
  ModelBoundary --> Validation
  Validation --> Audit
  Audit --> Authorization: 정책 개선
  Audit --> [*]: 통제 통과
```

## 초보자 학습 보조

### 한 줄 요약과 선수 지식

- **한 줄 요약:** D5는 AI의 데이터·모델·애플리케이션을 보호하고, 그 보호 활동을 정책·증적·검토로 관리하는 방법을 다룹니다.
- **선수 지식:** 보안은 무단 접근을 막는 통제이고, 규정 준수는 적용되는 요구 사항을 충족하는지 증명하는 활동이며, 거버넌스는 이를 지속할 책임과 절차입니다.

### 자주 하는 오해

- **오해:** AWS 서비스를 쓰면 고객의 보안과 규정 준수 책임이 사라진다.
  **바로잡기:** AWS와 고객은 공동 책임을 집니다. 고객은 사용 방식, 데이터, 권한, 구성과 운영 통제를 관리합니다.

### 스스로 답하는 확인 질문

1. Task 5.1과 Task 5.2는 각각 어떤 질문에 답하나요?
2. 보안 설정과 규정 준수 증적이 모두 필요한 이유는 무엇인가요?

### 공식 범위와 출처

- **시험 핵심:** 공식 D5 전체(Task 5.1~5.2, 채점 콘텐츠 14%)의 학습 지도를 제공합니다.
- [콘텐츠 도메인 5: AI 솔루션의 보안, 규정 준수 및 거버넌스 — AWS 공식 시험 안내서](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain5.html), 확인일: 2026-09-09

---

없음 | [인덱스](README.md) | [다음](../task-5-1/part-1.md)
