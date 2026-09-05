---
title: "U5 D4 책임 있는 AI 기술 결정"
domain: "D4"
level: "beginner"
status: "review"
source_urls:
  - "https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html"
  - "https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain4.html"
  - "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html"
source_checked: "2026-09-04"
---

# U5 D4 책임 있는 AI 기술 결정

## 목적과 경계

U5는 책임 있는 AI를 설명하는 정적 Markdown·JSON 패키지다. 모델 평가·Guardrails 호출·감사 시스템·사용자 데이터 저장을 만들지 않고, 개념 단위 문서와 추적 가능한 합성 사례를 만든다.

## 단계 upstream 적용성

`requirements`는 승인된 요구사항 파일을 직접 소비한다. `rules`는 정적 문서·출처 추적·초보자 품질 규칙으로 적용한다. `functional-spec`은 실행 기능·API가 없는 U5 packaging Unit의 정적 문서 경계로 `N/A`다. `traceability.json`에는 U1 출처 crosswalk와 U5 content entity contract를 기록한다.

## 결정 요약

| 결정 ID | 선택 | 적용 대상 | 이유 |
|---|---|---|---|
| TECH5.1 | UTF-8 Markdown + YAML front matter | D4 README·개념·NFR | 한국어 설명과 영어 원문·상태를 보존한다. |
| TECH5.2 | 저장소 상대 링크 | D3 선수·D5 다음·glossary | 이동 가능한 정적 패키지 탐색을 유지한다. |
| TECH5.3 | U1 canonical source registry·content-traceability crosswalk 참조 | 시험·Guardrails·evaluation 출처 | 모든 사용 URL을 `source_id`, `baseline_id`, `revision_title`, source type, parent topic, domain, checked date, access status, linked-document set과 deterministic URL-set comparison evidence로 연결한다. |
| TECH5.4 | 결정적 JSON 추적표와 content entity crosswalk | FR/NFR/AC·Unit·component 및 원칙·위험·출처·문서 연결 | `PR-D4-<slug>`, `RISK-D4-<slug>`, `SRC-<slug>`, `LD-d4-<slug>`, `TERM-d4-<slug>`를 소유 파일·`target_path`·`forward_refs`·`reverse_refs`와 함께 기록한다. JSON은 UTF-8, LF, 2-space indent, 고정 key 순서, ID 배열 사전순, 중복 ID 금지로 직렬화하고 traceability sensor와 PowerShell `ConvertFrom-Json`으로 검증한다. |
| TECH5.5 | 합성 사례 중심 | 편향·공정성·설명 가능성 | 실제 개인·민감 데이터의 유입을 막는다. |
| TECH5.6 | 시험 범위·실무 확장 섹션 표지 | 원칙·서비스·정책 사례 | 공식 출제 범위와 해설을 혼동하지 않는다. |
| TECH5.7 | 기존 Bun 검사 도구 최소 의존성 | 구조·upstream·traceability | 새 패키지·런타임을 도입하지 않는다. |
| TECH5.8 | 평가·카드·Anki는 U7 위임 | D4 용어·문서 ID | 횡단 평가 자료의 소유권을 유지한다. |

## 문서 구조 결정

각 문서는 `배울 것 → 선수 지식 → 쉬운 설명 → AWS 관점 → 비교 → 시나리오 → 시험 단서 → 오해 → 정리 → 확인 질문 → 다음 문서 → 출처` 순서를 사용한다. 공정성·투명성·설명 가능성은 관련되지만 독립적인 핵심 목표를 유지한다.

## 탐색·접근성 결정

D4 README는 D3 FM 적용을 선수 지식으로, D5 보안·거버넌스를 다음 도메인으로 연결한다. 도표와 색상 없이도 원칙과 판단 기준을 이해하도록 텍스트 목록·alt text를 사용한다. U5 terminology inventory는 U7/start content의 중앙 glossary 조립 입력이며, U1 source crosswalk와 U5 content entity schema를 함께 소비한다.

## 검사·재현성 결정

| 검사 | U5 대상 | 판정 |
|---|---|---|
| required-sections | 두 Markdown의 front matter·Sources·Review | 구조 누락 시 실패 |
| upstream-coverage | requirements·rules·functional-spec | 세 이름의 적용성 기록 필요 |
| traceability | JSON과 upstream ID | gaps·orphans·invalid target 0건 |
| linter/type-check | 코드 블록 | 코드 없음이면 not applicable |
| UTF-8·사례·링크 | 산출물 | strict UTF-8·합성 사례·상대 링크 |

## 해당 없음 결정

| 항목 | 상태 | 근거 |
|---|---|---|
| Guardrails/evaluation runtime | 해당 없음 | 서비스 호출·모델 평가를 실행하지 않는다. |
| 개인정보·민감정보 저장 | 해당 없음 | 사례는 합성 텍스트만 사용한다. |
| API·DB·IAM·KMS·secret | 해당 없음 | 실행형 시스템이 없다. |
| 규정 인증·법률 자문 | 해당 없음 | 시험 학습 설명이며 보증이 아니다. |
| 배포·호스팅·가용성 | 해당 없음 | shared static package다. |
| 새 의존성 | 해당 없음 | 기존 Bun 도구로 충분하다. |

## 대안과 트레이드오프

### 실제 데이터셋 기반 편향 실습

현실성은 높지만 개인정보·민감 속성·저장·윤리 검토가 필요하다. 초보자용 정적 가이드에서는 합성 사례를 사용한다.

### 정책·규정 전문 과정으로 확장

깊이는 늘지만 AIF-C01 범위와 초보자 목표를 벗어난다. 공식 범위와 실무 확장을 명시적으로 분리한다.

### 실행형 Guardrails 데모

서비스 선택 이해에는 도움이 되나 계정·비용·API 경계를 만든다. 개념·판단 단서만 문서화한다.

## 핵심 정리

U5는 합성 사례, 공식 출처, 섹션별 범위 표지, 결정적 추적 JSON과 기존 센서를 사용하는 정적 학습 콘텐츠다. 실제 데이터·모델 평가·정책 집행·AWS 계정은 없다.

## Sources

- [AWS Certified AI Practitioner(AIF-C01) 시험 안내서](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html) — 공식 기준, 확인일: 2026-09-04, 상태: `downloaded`
- [콘텐츠 도메인 4: 책임 있는 AI에 대한 가이드라인](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain4.html) — D4 기준, 확인일: 2026-09-04, 상태: `downloaded`
- [Amazon Bedrock Guardrails](https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html) — 실무 확장, 확인일: 2026-09-04, 상태: `summarized`
- [U5 Unit 계약](../../../inception/units-generation/unit-of-work.md) — 경계·소유권, 확인일: 2026-09-04, 상태: `reviewed`

## Assumptions & Open Questions

- D4 공식 기준선과 변동 서비스 사실은 U1·source registry 확정 전까지 `review` 상태이며 source crosswalk population은 `Deferred`다.
- 중앙 glossary 조립과 일정은 U7/start content가 소유하고, U5는 D4 terminology inventory·term ID·D5 navigation을 handoff한다.
- 규정·조직 정책 예시는 공식 시험 범위로 표시하지 않는다.
