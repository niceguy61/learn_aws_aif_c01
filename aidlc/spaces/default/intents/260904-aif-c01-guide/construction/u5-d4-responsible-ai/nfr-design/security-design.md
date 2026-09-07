---
title: "U5 D4 책임 있는 AI 보안 설계"
domain: "D4"
level: "beginner"
status: "review"
source_urls:
  - "https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html"
  - "https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain4.html"
  - "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html"
  - "https://docs.aws.amazon.com/bedrock/latest/userguide/evaluation.html"
source_checked: "2026-09-04"
---

# U5 D4 책임 있는 AI 보안 설계

## 목적과 범위

U5 `u5-d4-responsible-ai`는 D4 책임 있는 AI 학습 자료를 생산하는 `packaging` 정적 Unit이다. 이 설계는 애플리케이션 런타임 보안이 아니라 Markdown·JSON 산출물의 무결성, 출처·범위·상태 분리, 추적성, 접근성, 민감정보 비수집을 다룬다.

U5에는 실제 모델 평가, Amazon Bedrock Guardrails 호출, 사용자 피드백 수집, 정책 집행, API·DB·세션, AWS 계정·credentials, 배포 또는 실행 코드가 없다. 따라서 인증·인가, 네트워크, 암호화 저장소, secret 관리, rate limit, circuit breaker, 고가용성·확장성·운영 모니터링은 이 Unit의 설계 대상이 아니다.

## 설계 결정 요약

| 결정 ID | 결정 | 보안 목적 |
|---|---|---|
| SD5.1 | U5를 정적 Markdown·JSON만 생산하는 no-runtime 경계로 고정한다. | 실행·수집·권한·비용 위험을 제거한다. |
| SD5.2 | 사례는 식별자와 민감 속성이 없는 합성 텍스트만 사용한다. | 실제 개인 또는 집단을 평가·분류하지 않는다. |
| SD5.3 | 공식 범위, 실무 확장, 학습자용 해설을 섹션과 상태로 분리한다. | 시험 범위와 정책·서비스 확장을 혼동하지 않는다. |
| SD5.4 | U1 source crosswalk와 content entity stable ID의 정·역방향 연결을 소비한다. | 출처·기준선·문서·용어의 변경과 고아 연결을 드러낸다. |
| SD5.5 | 파일·JSON은 UTF-8, LF, 고정 key 순서, 정렬된 ID 배열, 상대 링크를 사용한다. | 재현 가능한 검사를 제공하고 이동 가능한 문서 연결을 유지한다. |
| SD5.6 | U1 또는 content entity population이 끝나지 않은 연결은 `Deferred`로 유지한다. | 근거 없는 `verified` 승격을 방지한다. |
| SD5.7 | U5는 D4 terminology inventory와 D5 navigation을 U7에 handoff하고, 중앙 glossary·문항·카드·일정·성과를 소유하지 않는다. | Unit 간 소유권과 데이터 수집 경계를 분리한다. |

## Upstream 적용성

| Upstream | 적용성 | 근거 |
|---|---|---|
| `security-requirements` | 적용 | U5의 NFR1.1~NFR9.1과 비수집·출처·추적성 제약을 이 설계로 구체화한다. |
| `tech-stack-decisions` | 적용 | UTF-8 Markdown·YAML front matter·상대 링크·결정적 JSON·합성 사례·U7 위임 결정을 따른다. |
| `unit-of-work.md` | 적용 | U5가 D4 README·개념 문서·용어 inventory를 소유하는 `packaging` Unit임을 따른다. |
| `functional-spec` | N/A | 실행형 기능·API·사용자 흐름이 없는 정적 packaging Unit이며, 존재하지 않는 파일을 참조하지 않는다. |
| `contract-summary` | N/A | 실행 Unit 간 통합 계약이 없다. U1·U7과의 연결은 정적 파일·stable ID·상대 링크 handoff로 제한한다. |

## 정적 보안 경계

### 포함하는 경계

1. 산출물은 UTF-8 Markdown 또는 JSON으로만 작성한다.
2. 문서의 YAML front matter, `## Sources`, `## Assumptions & Open Questions`, `## Review` 구조를 검사한다.
3. 내부 링크는 workspace-relative 또는 문서 내 anchor를 사용하고, 이동·다음 문서·용어 링크의 대상을 검사한다.
4. JSON은 2-space indent, LF, 고정 key 순서, 배열의 결정적 순서, 중복 ID 금지로 직렬화한다.
5. 시험 범위·실무 확장·학습자용 해설을 별도 표지로 구분한다.
6. 실제 개인·민감정보·credentials·token·secret·계정 식별자는 허용하지 않는다.

### 포함하지 않는 경계

- 모델 입력·출력, 평가 dataset, 사용자 feedback, 답안·진도·성과 저장
- Amazon Bedrock API 또는 Guardrails 호출, IAM·KMS·Secrets Manager 사용
- 인증·인가·API·DB·로그 저장·모니터링·네트워크·WAF·배포
- 규정 준수 인증, 법률 자문, 정책 집행 또는 결과 보증

## 합성 사례와 비보증 표현

사례는 책임 있는 AI 개념을 설명하기 위한 합성 학습 사례다. 사례 안에는 실제 개인, 특정 조직, 실제 계정, 건강·인종·성별과 같은 민감 속성, 식별 가능한 집단 분류를 넣지 않는다. 가상의 입력과 출력은 공정성·편향·투명성·설명 가능성의 판단 연습으로만 제시한다.

공정성·편향·안전성·진실성에 대한 설명은 교육용 판단 기준이며 법률 자문, 인증, 특정 모델의 안전 보증이 아니다. 규정·조직 정책·Amazon Bedrock Guardrails·모델 평가 사용 사례는 `실무 확장`으로 표시한다. 공식 출처에서 확인되지 않은 정책·규정·서비스 기능은 `확인 필요` 상태로 남긴다.

## U1 source crosswalk와 content entity 연결

U1이 소유하는 canonical source registry와 `sources/content-traceability.yaml`을 U5의 기준선 입력으로 사용한다. 문서에 출처를 연결할 때 다음 메타데이터가 함께 있어야 한다.

- `source_id`
- `baseline_id` 형식의 `AIF-C01-D<n>-T<n>`
- `source_revision`과 `revision_title`
- source type, parent topic, domain
- `source_checked`, access status
- linked-document set
- 문서에서 실제 사용한 URL 집합과 registry URL 집합의 deterministic comparison evidence

책임 원칙·위험·출처·학습 문서·용어는 다음 stable ID와 소유 경계를 사용한다.

| Entity | Stable ID | 필수 연결 |
|---|---|---|
| 책임 원칙 | `PR-D4-<slug>` | `target_path`, `forward_refs`, `reverse_refs` |
| 위험 | `RISK-D4-<slug>` | `target_path`, `forward_refs`, `reverse_refs` |
| 출처 | `SRC-<slug>` | registry target, baseline 및 URL evidence |
| D4 학습 문서 | `LD-d4-<slug>` | 소유 Markdown path, baseline·source·term refs |
| D4 용어 | `TERM-d4-<slug>` | glossary handoff path, 관련 문서 refs |

ID 중복, 존재하지 않는 `target_path`, 끊긴 anchor, 정방향만 있고 역방향이 없는 연결, `verified` 문서가 `blocked` 또는 `확인 필요` 출처를 가리키는 경우를 검사 실패로 처리한다. 현재 U1 crosswalk와 content entity population이 완료되지 않은 연결은 구현된 것처럼 채우지 않고 `Deferred`로 기록한다.

## 출처·범위·문서 상태 분리

세 가지 상태를 한 필드로 합치지 않는다.

- **출처 상태**: `downloaded`, `summarized`, `blocked`, `확인 필요` 등 출처 접근·요약 상태
- **범위 표지**: `시험 범위`, `실무 확장`, `학습자용 해설`
- **문서 상태**: `draft`, `review`, `verified`

문서가 `review`라는 사실은 출처가 `verified`라는 뜻이 아니며, 출처가 `downloaded`라는 사실도 문서가 학습 품질 검토를 마쳤다는 뜻이 아니다. U1 기준선 revision이 확정되기 전에는 D4 문서를 `verified`로 승격하지 않는다.

## UTF-8·결정성·상대 링크 검사

| 검사 영역 | 설계 규칙 | 실패 처리 |
|---|---|---|
| Encoding | Markdown·JSON을 strict UTF-8로 읽고 쓴다. | 파일을 통합하지 않고 인코딩을 수정한다. |
| Markdown | front matter, 제목 계층, 필수 H2, 표·링크 구문을 검사한다. | 누락·문법 오류를 수정한 뒤 재검사한다. |
| JSON | JSON parse, fixed key order, LF, 2-space indent, sorted arrays, duplicate ID를 검사한다. | `traceability.json`을 `Deferred` 근거 없이 통과시키지 않는다. |
| Links | 이미 존재하는 U5 내부·출처·계약 문서 링크는 실제 대상과 일치하는지 검사하고, 아직 생성되지 않은 U5/U6 README 링크는 계획된 출력 계약으로 `Deferred` 표시한다. | 기존 대상은 즉시 수정하고, U5·U6 README 생성 후 실제 대상·anchor를 재검사하는 후속 gate를 통과하기 전에는 통합하지 않는다. |
| Accessibility | 색상·이미지에 의미를 단독 의존하지 않고, 도표에는 alt text 또는 텍스트 대체 설명을 둔다. | 텍스트 대체 경로가 없으면 통합하지 않는다. |
| Scope | 시험 범위와 실무 확장을 섹션별로 검사한다. | 출제 범위로 오해할 수 있는 표현을 수정한다. |

## 민감정보 비수집 및 입력 위생

U5에는 사용자 입력 수집 경로가 없으므로 입력 검증·세션·권한 설계는 N/A다. 대신 작성·검토 단계에서 다음 금지 목록을 적용한다.

- 실제 이름·이메일·계정 ID·AWS account ID·credential·token·secret·서명 URL
- 건강·인종·성별 등 실제 민감 속성 또는 이를 이용한 개인·집단 분류
- 실제 사용자 feedback, 답안, 학습 진도, 성과 데이터

합성 placeholder만 사용하고, 사례·문서·검사 결과의 수동 검토와 민감정보 검사를 통과하지 못한 파일은 통합하지 않는다. 이 Unit은 실제 데이터를 마스킹해 저장하는 우회 방식도 사용하지 않는다.

## NFR별 적용성 및 보안 설계

| NFR ID | 적용성 | Security Design 결정 | 검증 증거 |
|---|---|---|---|
| NFR1.1 | OK | 한국어·영어 병기, 초보자 설명, 식별자 없는 합성 사례를 문서 구조에 포함한다. | 초보자 검토와 사례·용어 점검 |
| NFR2.1 | OK | 일반 Markdown·텍스트 설명·상대 링크를 사용하고 색상·이미지 단독 의미를 금지한다. | Markdown·링크·접근성 검사 |
| NFR2.2 | OK | 공정성·위험 도표에는 한국어 alt text 또는 동일 의미의 텍스트 대체 설명을 둔다. | alt text·fallback 점검 |
| NFR3.1 | Deferred | ID 형식과 변경 금지 규칙은 고정했지만 U1 `content-traceability.yaml`의 기준선 population과 중복 검사 결과가 아직 없다. | U1 crosswalk population 및 ID 검사 대기 |
| NFR3.2 | Deferred | content entity schema, `forward_refs`, `reverse_refs` 계약은 정의했지만 실제 entity population과 고아 검사 결과가 아직 없다. | content entity crosswalk population 대기 |
| NFR4.1 | Deferred | 필요한 source metadata와 URL 집합 비교 evidence를 명세했지만 U1 canonical crosswalk가 아직 채워지지 않았다. | U1 crosswalk·URL-set 비교 evidence 대기 |
| NFR4.2 | OK | 미확인 정책·규정·서비스 기능은 `확인 필요`로 두고 `verified` 문서에서 제외한다. | 상태 분리·보류 검사 |
| NFR5.1 | Deferred | SD5.5: 파일명·경로·개념 단위·상대 링크 규칙은 고정한다. 현재 존재하는 대상은 검사했지만, 아직 생성되지 않은 D4/D5 README의 실제 target/anchor 검증은 U5·U6 README 생성 후 후속 gate에서 수행한다. | U5·U6 README 생성 후 내부 링크·anchor 재검사 대기 |
| NFR6.1 | OK | strict UTF-8, LF, 2-space JSON, 고정 key 순서, 정렬 배열과 parse 검사를 적용한다. | UTF-8·JSON parse·결정성 검사 |
| NFR7.1 | OK | 실제 개인·민감 속성·계정·식별자를 사용하지 않고 합성 placeholder만 허용한다. | 민감정보 검사·수동 검토 |
| NFR7.2 | OK | 평가·감사·feedback·정책 집행·답안 저장을 만들지 않는 no-runtime 경계를 적용한다. | 범위·의존성 검사 |
| NFR8.1 | OK | 공식 시험 범위와 규정·조직 정책·서비스 사용 사례인 실무 확장을 섹션별로 표지한다. | 범위 표지 검사 |
| NFR8.2 | OK | AWS 공식 내용을 한국어로 재구성하고 짧은 링크·확인일·상태를 Sources에 남긴다. | 출처·인용 검토 |
| NFR9.1 | OK | U5는 D4 terminology inventory·stable term ID·D5 navigation만 U7에 handoff하고 일정·성과·중앙 glossary는 저장하지 않는다. | Unit 소유권·handoff·링크 검사 |

## 실패 처리

정적 검사 실패는 파일을 `verified`로 승격하거나 통합하지 않는 fail-closed 처리로 다룬다.

- JSON parse·UTF-8·중복 ID 실패: 해당 파일을 수정한 뒤 동일 검사 재실행
- 끊긴 링크·잘못된 anchor 실패: 링크를 고치거나 확인되지 않은 링크로 명시
- 출처 metadata·URL-set evidence 누락: U1 crosswalk population 전까지 해당 연결을 `Deferred`로 유지
- 미확인 정책·규정·서비스 기능: 내용을 확정하지 않고 `확인 필요`로 표시
- 민감정보·credentials 발견: 파일을 통합하지 않고 합성 placeholder로 교체한 뒤 수동 재검토
- 실제 실행 코드·API·DB·AWS credential 의존성 발견: 범위 위반으로 제거; 예외나 우회 실행을 허용하지 않음

## 검증 증거

1. `traceability.json`에 NFR1.1~NFR9.1의 14개 상세 ID가 정확히 한 번씩 선언된다.
2. U1 crosswalk 및 content entity schema가 실제로 채워지기 전의 세 연결은 `Deferred`이며, 각 보류 사유가 기록된다.
3. Markdown 필수 섹션, front matter, `## Sources`, `## Assumptions & Open Questions`, `## Review`를 검사한다.
4. JSON은 strict UTF-8로 parse되고 2-space indent·고정 key 순서·정렬 배열·중복 ID 없음이 확인된다.
5. 모든 상대 링크와 anchor, D4 공식 범위·실무 확장 표지, alt text·텍스트 fallback을 점검한다.
6. 민감정보·secret·credential·실제 계정 식별자·실행 코드가 없는지 수동 검토한다.

## 핵심 정리

U5의 보안 설계는 런타임 보안 기능을 추가하는 것이 아니라, 실행·수집·권한 경계를 만들지 않고 정적 콘텐츠의 무결성·출처·범위·stable ID·정·역방향 연결·민감정보 비수집을 fail-closed로 검사하는 것이다. U1 crosswalk와 content entity population이 채워지기 전에는 관련 coverage를 `Deferred`로 유지하며 근거 없는 `verified` 승격을 하지 않는다.

## Sources

- [AWS Certified AI Practitioner(AIF-C01) 시험 안내서](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html) — 공식 기준, 확인일: 2026-09-04, 상태: `downloaded`
- [콘텐츠 도메인 4: 책임 있는 AI에 대한 가이드라인](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain4.html) — D4 기준, 확인일: 2026-09-04, 상태: `downloaded`
- [Amazon Bedrock Guardrails](https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html) — 실무 확장, 확인일: 2026-09-04, 상태: `summarized`
- [Amazon Bedrock model evaluation](https://docs.aws.amazon.com/bedrock/latest/userguide/evaluation.html) — 실무 확장, 확인일: 2026-09-04, 상태: `summarized`
- [source-registry.yaml](../../../../../../../../sources/source-registry.yaml) — canonical 출처 등록부, 확인일: 2026-09-04

## Assumptions & Open Questions

- U1 canonical source crosswalk의 실제 population과 URL 집합 비교 evidence는 후속 U1 작업에서 채워진다.
- content entity stable ID와 `forward_refs`·`reverse_refs`의 실제 목록은 D4 문서·용어가 생성될 때 채워진다.
- 그때까지 NFR3.1, NFR3.2, NFR4.1의 추적성은 `Deferred`이며, 문서 상태는 `verified`로 승격하지 않는다.
- 규정·조직 정책 사례와 변동 가능한 서비스 세부사항은 공식 확인 전 `확인 필요`로 남긴다.
- U7은 D4 terminology inventory를 소비해 중앙 glossary·문제·카드·퀴즈·Anki를 조립하며, U5는 학습 일정·성과·답안 데이터를 저장하지 않는다.

## Review

**Verdict:** READY
**Reviewer:** aidlc-architecture-reviewer-agent
**Date:** 2026-09-07T02:00:03Z
**Iteration:** 1
**Request Challenge:** review:cb7b9221539feb0523bcfde9ef0def4e

### Findings

| ID | Severity | Location | Finding | Required action | Status |
|---|---|---|---|---|---|
| — | — | 해당 없음 | U5의 no-runtime 보안 경계·합성 사례·후속 Deferred gate가 upstream과 일치하며 finding이 없다. | 추가 조치 없음. | — |

### Validation Tool Results

| Tool | Result | Interpretation |
|---|---|---|
| required-sections·upstream-coverage·traceability | PASS | U5 문서 구조와 14개 NFR 연결이 유지된다. |
| strict UTF-8·JSON·상대 링크·민감정보 점검 | PASS | 정적 산출물의 접근성·비수집·후속 링크 경계가 유지된다. |
| linter/type-check | N/A | 실행 코드가 없는 packaging Unit이다. |

### Summary

U5의 U1 crosswalk·content entity population·D4/D5 README 연결은 기존처럼 Deferred이며, 합성 사례와 U7 handoff 소유권이 보존된다.
