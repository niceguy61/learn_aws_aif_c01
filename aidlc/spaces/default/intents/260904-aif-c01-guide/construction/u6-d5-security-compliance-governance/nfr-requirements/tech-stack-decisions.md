---
title: "U6 D5 보안·규정 준수·거버넌스 기술 결정"
domain: "D5"
level: "beginner"
status: "review"
source_urls:
  - "https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html"
  - "https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain5.html"
  - "https://aws.amazon.com/compliance/shared-responsibility-model/"
  - "https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html"
source_checked: "2026-09-04"
---

# U6 D5 보안·규정 준수·거버넌스 기술 결정

## 목적과 경계

U6는 AI 보안·규정 준수·거버넌스의 선택 기준을 정적 Markdown·JSON으로 제공한다. IAM·KMS·Macie·PrivateLink를 실제 구성하지 않고, AWS 서비스와 공동 책임 모델을 초보자에게 설명하는 문서 규칙만 결정한다.

## 단계 upstream 적용성

`requirements`는 승인된 요구사항 파일을 직접 소비한다. `rules`는 정적 문서·출처 추적·초보자 품질 규칙으로 적용한다. `functional-spec`은 실행 서비스·API가 없는 packaging Unit에서 `N/A`다. 동일한 판정을 `traceability.json`의 `upstream_contract`에 기록한다.

## 결정 요약

| 결정 ID | 선택 | 적용 대상 | 이유 |
|---|---|---|---|
| TECH6.1 | UTF-8 Markdown + YAML front matter | D5 README·개념·NFR | 한국어 해설·영어 서비스명·상태를 보존한다. |
| TECH6.2 | 저장소 상대 링크 | D4 선수·U7 평가·glossary | 배포 환경과 무관한 탐색을 유지한다. |
| TECH6.3 | U1 canonical source registry 참조 | 시험·IAM·공동 책임·규정 출처 | URL·제목·확인일·상태의 단일 기준을 유지한다. |
| TECH6.4 | 결정적 JSON 추적표 | FR/NFR/AC·Unit·component | 자동 센서가 보안·출처·범위 연결을 반복 검사한다. |
| TECH6.5 | 합성 보안 시나리오 | IAM·암호화·거버넌스 설명 | 실제 계정·자격 증명·PII 유입을 차단한다. |
| TECH6.6 | 시험 범위·실무 확장 표지 | 서비스·법률·운영 설명 | 시험 출제 범위와 전문 실무 내용을 혼동하지 않는다. |
| TECH6.7 | 기존 Bun 센서 최소 의존성 | 구조·upstream·traceability | 새 런타임·패키지·공급망을 도입하지 않는다. |
| TECH6.8 | 법률 비보증 표현 | 규정 준수 설명 | 지역·산업별 법률 판단을 학습 가이드가 대신하지 않게 한다. |
| TECH6.9 | 평가·카드·Anki는 U7 위임 | D5 용어·문서 ID | 횡단 평가 자료의 소유권과 추적성을 유지한다. |

## 문서 구조 결정

각 문서는 `배울 것 → 선수 지식 → 쉬운 설명 → AWS 관점 → 비교 → 시나리오 → 시험 단서 → 오해 → 정리 → 확인 질문 → 다음 문서 → 출처` 순서를 사용한다. IAM 개념, 데이터 보호, 공동 책임, 거버넌스와 규정 준수는 개념 단위로 나누며 하나의 종합 문서에 과도하게 섞지 않는다.

## 탐색·접근성 결정

D5 README는 D4 책임 있는 AI를 선수 지식으로, U7 평가·복습 자료를 다음 활동으로 연결한다. 공동 책임 모델과 데이터 흐름은 텍스트 fallback을 제공하고, 넓은 표보다 짧은 비교 목록을 우선한다. 중앙 glossary가 없으면 D5 inventory를 임시 연결 대상으로 표시한다.

## 검사·재현성 결정

| 검사 | U6 대상 | 판정 |
|---|---|---|
| required-sections | 두 Markdown의 front matter·Sources·Review | 구조 누락 시 실패 |
| upstream-coverage | requirements·rules·functional-spec | 세 upstream 적용성 기록 필요 |
| traceability | JSON과 요구사항 ID | gaps·orphans·invalid target 0건 |
| linter/type-check | 코드 블록 | 코드 없음이면 not applicable |
| UTF-8·민감정보·링크 | 산출물 | strict UTF-8·합성 예시·상대 링크 |

## 해당 없음 결정

| 항목 | 상태 | 근거 |
|---|---|---|
| IAM/KMS/Macie/PrivateLink 실행 | 해당 없음 | 서비스는 선택 판단 설명 대상이며 실제 호출이 없다. |
| API·DB·로그·모니터링 | 해당 없음 | 실행형 시스템과 학습자 데이터가 없다. |
| AWS 계정·자격 증명·secret | 해당 없음 | 계정·키·token·secret을 사용하지 않는다. |
| 법률 준수 인증·감사 | 해당 없음 | 법률 자문·인증·감사를 수행하지 않는다. |
| 배포·호스팅·SLO·DR | 해당 없음 | shared static package다. |
| 새 의존성 | 해당 없음 | 기존 Bun 센서와 표준 파서를 재사용한다. |

## 대안과 트레이드오프

### 실제 AWS 보안 구성 실습

실무 이해에는 유익하지만 계정·비용·권한·비밀·오구성 위험을 만든다. 승인된 정적 학습 가이드에서는 선택하지 않았다.

### 규정별 전문 법률 과정

상세함은 높아지지만 AIF-C01 범위를 벗어나며 관할별 법률 판단을 요구한다. 관련 개념은 실무 확장으로만 표시한다.

### 보안 정책 자동화 도구 도입

검사 자동화는 가능하지만 실행 환경·의존성·배포 경계가 생긴다. 현재는 기존 Bun 센서와 품질 기록을 사용한다.

## 핵심 정리

U6는 보안 서비스를 구성하는 코드가 아니라 공식 범위, AWS 관점, 법률 비보증, 합성 예시, 상태·출처·추적성 규칙을 담는 정적 패키지다.

## Sources

- [AWS Certified AI Practitioner(AIF-C01) 시험 안내서](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html) — 공식 기준, 확인일: 2026-09-04, 상태: `downloaded`
- [콘텐츠 도메인 5: AI 솔루션의 보안·규정 준수 및 거버넌스](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain5.html) — D5 기준, 확인일: 2026-09-04, 상태: `downloaded`
- [AWS 공동 책임 모델](https://aws.amazon.com/compliance/shared-responsibility-model/) — 실무 확장, 확인일: 2026-09-04, 상태: `summarized`
- [IAM 소개](https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html) — 실무 확장, 확인일: 2026-09-04, 상태: `summarized`
- [U6 Unit 계약](../../../inception/units-generation/unit-of-work.md) — 경계·소유권, 확인일: 2026-09-04, 상태: `reviewed`

## Assumptions & Open Questions

- D5 기준선 revision과 규정·서비스 최신 사실은 U1 확인 전까지 `review` 상태다.
- 중앙 glossary와 평가 자료는 후속 Unit에서 연결한다.
- 이 문서는 법률 자문·규정 인증·보안 구성 절차가 아니다.
