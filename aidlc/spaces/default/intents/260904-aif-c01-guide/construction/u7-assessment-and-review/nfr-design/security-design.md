---
title: "U7 평가·복습 자료 보안 설계"
unit: "u7-assessment-and-review"
kind: "packaging"
status: "draft"
domain: "EXAM"
source_urls:
  - "https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html"
  - "https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain1.html"
  - "https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain2.html"
  - "https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain3.html"
  - "https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain4.html"
  - "https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain5.html"
source_checked: "2026-09-04"
---

# U7 평가·복습 자료 보안 설계

## 1. 설계 목적과 적용 범위

U7 `u7-assessment-and-review`는 문제은행·점수 워크시트·카드·용어 퀴즈·Anki CSV를 하나의 정적 학습 자료 패키지로 연결하는 `packaging` Unit이다. 보안 설계의 중심은 실행형 보안 기능을 추가하는 것이 아니라, 콘텐츠 파일에 실행·수집·민감정보·추적성 손실 경계를 만들지 않는 것이다.

이 설계는 다음 upstream을 소비한다.

| Upstream | 적용성 |
|---|---|
| `construction/u7-assessment-and-review/functional-design/functional-spec.md` | 적용됨. 정적 산출물, stable ID, 상대 링크, no-runtime 경계를 기준으로 삼는다. |
| `construction/u7-assessment-and-review/nfr-requirements/security-requirements.md` | 적용됨. 15개 상세 보안 NFR과 검증 증거를 설계 결정으로 구체화한다. |
| `construction/u7-assessment-and-review/nfr-requirements/tech-stack-decisions.md` | 적용됨. UTF-8 Markdown/CSV, U1 registry 참조, 상대 링크, 기존 검사 재사용을 따른다. |
| `inception/units-generation/unit-of-work.md` | 적용됨. U7은 shared static package이며 U1을 기준선·출처 provider로, U2~U6을 콘텐츠 provider로 참조한다. |
| `construction/u7-assessment-and-review/performance-requirements` | 해당 없음. U7은 실행·서빙·런타임 성능을 갖지 않는 정적 Markdown/CSV packaging Unit이므로 처리량·지연시간·응답시간 목표를 설계하지 않는다. |
| `construction/u7-assessment-and-review/scalability-requirements` | 해당 없음. U7은 API·DB·서비스 인스턴스·동시 사용자 상태를 만들지 않으므로 수평/수직 확장 계약이 적용되지 않는다. |
| `construction/u7-assessment-and-review/reliability-requirements` | 해당 없음. U7은 상태를 가진 실행 경로나 가용성 목표가 없는 파일 패키지이므로 retry·failover·SLO를 설계하지 않는다. 파일 무결성·검증 실패 보류는 SD7.1과 SD7.7에서 다룬다. |
| `construction/u7-assessment-and-review/observability-requirements` | 해당 없음. U7은 telemetry·로그 수집·알림·분산 추적을 실행하지 않으며 정적 검사 결과만 U8 handoff 증거로 전달한다. |
| `inception/contract-design/contract-summary.md` | 해당 없음. 이 범위에서는 contract-design 단계가 실행되지 않았고 U7은 실행형 boundary를 갖지 않는다. |

`functional-spec.md`에 기록된 `N/A`는 기능 누락이 아니라 실행형 기능이 승인된 범위 밖이라는 의미다. 따라서 인증, 인가, encryption service, API gateway, database, network, deployment, learner account, telemetry SDK를 설계하지 않는다.

## 2. 보안 경계 결정

### SD7.1 — 정적 파일만 허용

U7의 허용 산출물은 UTF-8 Markdown과 UTF-8 CSV다. 산출물은 일반 Markdown viewer와 일반 CSV parser로 읽히며, JavaScript·HTML runtime·API 호출·DB 쓰기·AWS 계정 접근·유료 실습·새 dependency를 포함하지 않는다.

검사 실패 시 실행 코드나 우회 runtime을 추가하지 않는다. 실패한 파일을 `review` 또는 `blocked` 상태로 남기고 원인을 U8 handoff에 전달한다.

### SD7.2 — 점수 워크시트의 no-runtime·비수집 경계

`SCORE-<slug>` 워크시트는 다음 산식과 입력 칸을 문서로만 제공한다.

```text
정답률 = 정답 문항 수 / 전체 문항 수 × 100
```

첫 시도와 재시도는 별도 행으로 수기 기록할 수 있지만, 답안·정답 수·점수·진도·계정·개인정보를 업로드하거나 파일에 자동 저장하지 않는다. 브라우저 local storage, cookie, analytics, telemetry, form submission도 사용하지 않는다. `80% 이상`은 합격 보장이 아니라 준비도 참고 지표로만 표현한다.

### SD7.3 — 합성 콘텐츠와 민감정보 금지

정답·오답 해설, 카드 설명, 용어 퀴즈, Anki 뒷면 설명은 합성 학습 예시로 작성한다. 실제 학습자 답안, 이름·이메일·건강·결제 정보, AWS 계정 ID·ARN·access key·secret·token·서명된 URL·실제 로그를 사용하거나 배포하지 않는다.

실제 문항 100개 이상은 이 설계 단계에서 만들지 않는다. downstream content 단계에서 기준선·문서·출처가 확정된 후 생성하며, 각 문항은 U8에서 정답·오답 타당성·난이도·중복을 별도로 검토한다.

### SD7.4 — 안정 ID 및 U1 양방향 handoff

U1이 소유하는 `sources/content-traceability.yaml`의 `BaselineItem` 계약을 정식 기준으로 사용한다.

```yaml
BaselineItem:
  baseline_id: AIF-C01-D<n>-T<n>
  source_id: SRC-<slug>
  source_revision: <revision>
  status: discovered|downloaded|summarized|reviewed|verified|blocked|확인 필요
  learning_document_ids: []
  question_ids: []
  card_ids: []
  quiz_ids: []
  anki_ids: []
```

U7 downstream 항목은 다음 공통 필드를 가져야 한다.

```yaml
AssessmentItem:
  id: Q-<n>|SCORE-<slug>|CARD-<slug>|TQ-<n>|ANKI-<n>
  target_path: <workspace-relative-path>
  baseline_ids: [AIF-C01-D<n>-T<n>]
  source_ids: [SRC-<slug>]
  forward_refs: [baseline_id, source_id, learning_document_id]
  reverse_refs: [manifest-entry-or-owner]
  scope_classification: 시험 범위|실무 확장|학습자용 해설
  status: draft|review|verified|blocked|확인 필요
```

정방향은 U7 항목에서 baseline/source로 이동하는 링크이고, 역방향은 U1 `BaselineItem.question_ids`, `card_ids`, `quiz_ids`, `anki_ids` 및 관련 학습 문서 ID가 U7 항목으로 이동하는 링크다. `SCORE-<slug>`는 특정 기준선이 없는 계산 안내일 수 있으므로 `baseline_ids`가 비어 있는 경우 `정적 학습 보조자료`라는 명시적 사유와 U8 검사 대상을 남긴다.

현재 U1 canonical manifest 파일은 존재하지만 기준선 행과 downstream content가 아직 없어 실제 ID 존재·중복·고아·양방향 매칭은 `Deferred`다. U1 manifest가 기준선 행으로 채워지면 U7은 U1의 ID와 상태를 복제하지 않고 참조하며, `blocked` 또는 `확인 필요` 기준선에 연결된 항목을 `verified`로 만들지 않는다.

### SD7.5 — 시험 범위와 실무 확장 분리

모든 문항·카드·용어 퀴즈·Anki 행은 항목 수준 `scope_classification`을 가진다.

- `시험 범위`: 공식 AIF-C01 기준선 `AIF-C01-D<n>-T<n>`에 직접 연결되는 내용.
- `실무 확장`: 서비스 비교, 추가 시나리오, 운영 예시 등이며 관련 기준선 ID를 먼저 표시하되 공식 출제 범위라고 표현하지 않는 내용.
- `학습자용 해설`: 정답 이유, 오답 교정, 쉬운 예시와 같은 가이드 작성 설명. 공식 문서의 보증·법률 자문·합격 보장으로 표현하지 않는다.

하나의 항목에 여러 분류가 필요한 경우 주된 시험/확장 분류와 해설 필드를 분리해 혼동을 막는다.

### SD7.6 — UTF-8, CSV quoting 및 탐색 접근성

`assessment/anki.csv`는 BOM 없는 strict UTF-8을 기본으로 하고, 최소 `front,back` 헤더와 추적 필드를 사용한다. 쉼표·큰따옴표·줄바꿈이 포함된 필드는 RFC 4180 호환 quoting을 적용하고 일반 CSV parser로 다시 읽어 행·열 수와 필드 값을 비교한다. 실제 추가 열은 downstream 호환성 검토 전에는 확정하지 않는다.

문항·카드·퀴즈·워크시트 안내는 저장소 상대 Markdown 링크와 텍스트 제목을 사용한다. 기본값은 이미지와 Mermaid를 사용하지 않는 것이다. 시각 자료가 불가피할 때만 한국어 alt text, 캡션, 같은 정보를 담은 텍스트 fallback을 함께 제공한다. 색상만으로 정답·상태·중요도를 전달하지 않으며 키보드로 제목·링크·목록을 따라갈 수 있게 한다.

### SD7.7 — 실패 처리와 상태 전이

다음 조건에서는 항목을 `verified`로 승격하지 않는다.

| 실패 조건 | 처리 |
|---|---|
| URL·제목·revision·확인일·접근 상태가 U1 registry와 불일치 | 항목을 `review`로 보류하고 registry 대조를 다시 수행한다. |
| 출처가 `blocked` 또는 `확인 필요` | 항목을 `blocked` 또는 `확인 필요`로 보류하고 대체 공식 출처·후속 조치를 기록한다. |
| stable ID 중복·잘못된 baseline/source ID·고아 역방향 참조 | 해당 항목과 manifest 매핑을 `review`로 보류한다. |
| CSV encoding·header·quoting·줄바꿈 파싱 실패 | 해당 CSV를 배포 대상에서 제외하고 UTF-8/quoting을 수정한다. |
| 민감정보·실행 코드·외부 runtime·새 dependency 발견 | 항목을 차단하고 제거 또는 범위 재검토 전까지 승인하지 않는다. |
| scope classification 누락 또는 공식 사실과 해설 혼합 | 항목을 `review`로 보류하고 범위·출처 메타데이터를 보완한다. |

자동 삭제나 조용한 추정으로 실패를 숨기지 않는다. 실제 보류·수정·재검사는 U8이 `QualityCheckRecord`로 기록한다.

## 3. NFR별 적용성과 검증 증거

| NFR ID | 설계 적용 | 검증 증거 | 현재 상태 |
|---|---|---|---|
| NFR1.1 | 한국어 본문, 최초 등장 시 핵심 영어 용어·AWS 고유명사 원문 병기 규칙을 모든 U7 형식에 적용한다. | 초보자 관점·언어 검사와 샘플 문서 확인 | OK |
| NFR1.2 | 실제 학습자 정보가 없는 합성 문항·해설만 허용한다. | 민감정보 패턴 검사와 예시 데이터 점검 | OK |
| NFR2.1 | Markdown/CSV를 일반 viewer/parser로 열고 이미지·외부 renderer 없이 핵심을 읽도록 한다. | Markdown 구조, CSV parse, 외부 runtime·dependency 검사 | OK |
| NFR2.2 | 상대 링크·텍스트 제목·목록을 사용하고 이미지 사용 시 alt/caption/fallback을 요구한다. | 링크·접근성 검사 | OK |
| NFR3.1 | Q/SCORE/CARD/TQ/ANKI와 AIF-C01 기준선의 안정 ID 규칙을 고정한다. | ID 형식·중복 검사 | OK |
| NFR3.2 | 항목↔U1 manifest의 forward/reverse refs와 orphan 검사를 계약으로 정의한다. 실제 manifest·downstream 항목이 없어 검증은 보류한다. | U1 manifest와 U7 산출물의 양방향 매핑 검사 | Deferred |
| NFR4.1 | 외부 사실은 U1 registry의 URL·제목·revision·확인일·상태를 참조하도록 한다. 실제 항목과 registry가 없어 매칭은 보류한다. | source registry 대조 | Deferred |
| NFR4.2 | 미확인·차단 출처는 review/blocked/확인 필요로 유지하고 verified 승격을 금지한다. | 상태 전이·blocked 보류 검사 | OK |
| NFR5.1 | 문제은행·워크시트·카드·퀴즈·Anki를 개념·파일 단위로 나누고 상대 링크를 유지한다. | target path·heading·상대 링크 검사 | OK |
| NFR6.1 | Anki CSV strict UTF-8, `front,back`, quoting 및 일반 parser round-trip을 요구한다. | encoding·header·CSV parse 검사 | OK |
| NFR7.1 | 답안·진도·계정·PII·결제·건강·자격 증명·token·실제 AWS 식별자를 수집·저장·배포하지 않는다. | secret/PII/account identifier·실행 경계 검사 | OK |
| NFR7.2 | API·DB·AWS 리소스·배포·유료 실습·learner state/data·새 dependency를 금지한다. | 파일·의존성·코드·외부 호출 검사 | OK |
| NFR8.1 | 모든 평가 항목에 시험 범위/기준선 또는 관련 기준선 선행 표기의 실무 확장을 둔다. 실제 항목별 표지는 downstream에서 확인한다. | scope classification·baseline ID 검사 | Deferred |
| NFR8.2 | 공식 사실·가이드 해설을 구분하고 원문 전체 복사·공식 보증·법률 자문 표현을 금지한다. | 출처·표현·복사 범위 검토 | OK |
| NFR9.1 | 4주 상대 일정에 연결 가능한 정적 워크시트를 제공하되 자동 진도·점수 저장은 하지 않는다. | 워크시트 구조·비수집 경계 검사 | OK |

`Deferred`는 설계 누락이 아니라 U1 manifest 및 downstream content outputs가 아직 생성되지 않아 실행할 수 없는 양방향·항목 수준 검증을 뜻한다. U8 handoff에서 이 세 항목을 재검사 대상으로 유지한다.

## 4. U8 handoff 계약

U8은 다음 `QualityCheckRecord` 대상과 검사를 사용한다.

```yaml
QualityCheckRecord:
  target_type: QuestionBankItem|ScoreSheet|Card|TermQuizItem|AnkiNote
  target_id: Q-<n>|SCORE-<slug>|CARD-<slug>|TQ-<n>|ANKI-<n>
  target_path: <workspace-relative-path>
  check_id: source|traceability|scope|utf8-csv|accessibility|sensitive-data|content-quality
  status: 통과|실패|보류
  evidence: <file path, parser result, or review note>
  checked_at: <ISO 8601>
```

U7이 전달할 최소 handoff 증거는 다음과 같다.

- 안정 ID 목록과 중복 검사 결과.
- 각 항목의 baseline/source forward refs와 U1 manifest reverse refs.
- URL·제목·revision·확인일·접근 상태 및 `blocked`/`확인 필요` 보류 상태.
- 시험 범위·실무 확장·학습자용 해설 분류.
- Markdown 상대 링크·텍스트 접근성, Anki UTF-8·header·quoting·parser 결과.
- 민감정보·실행 코드·새 dependency·실제 learner data 부재 검사.
- 문제은행 생성 후 정답·오답 타당성·난이도·중복 검토 결과.

실제 항목과 검증 증거는 downstream content 및 U8 단계에서 작성하며 이 설계 파일에는 실제 학습자 데이터나 100문항을 넣지 않는다.

## 5. 해당 없음인 일반 NFR 패턴

U7에는 원격 호출, 상태 저장, 프로세스 실행, 사용자 계정, 서비스 배포가 없으므로 인증/인가 흐름, encryption at rest/in transit, circuit breaker, retry/backoff, rate limiter, connection pool, cache, horizontal scaling, health check, distributed tracing, alerting, SLO를 설계하지 않는다. 이는 필요한 기능을 빠뜨린 것이 아니라 `packaging` Unit의 명시적 경계와 `functional-spec.md`의 `N/A` 판정에 따른 것이다.

## 핵심 정리

U7의 보안 설계는 정적 파일을 안전한 배포 경계로 유지하는 데 집중한다. 점수와 답안은 수집하지 않고, 콘텐츠는 합성 예시만 사용하며, stable ID·U1 기준선·출처·범위 표지·UTF-8 CSV·상대 링크·텍스트 접근성을 통해 후속 검증이 가능한 자료를 만든다. U1 manifest와 downstream content가 준비되기 전 양방향 매핑·외부 사실 대조·항목 범위 검증은 `Deferred`로 유지한다.

## Sources

- [AWS Certified AI Practitioner(AIF-C01) 시험 안내서](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html) — 공식 시험 범위, 확인일: 2026-09-04, 상태: `downloaded`
- [AIF-C01 도메인 1](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain1.html) — D1 기준, 확인일: 2026-09-04, 상태: `downloaded`
- [AIF-C01 도메인 2](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain2.html) — D2 기준, 확인일: 2026-09-04, 상태: `downloaded`
- [AIF-C01 도메인 3](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain3.html) — D3 기준, 확인일: 2026-09-04, 상태: `downloaded`
- [AIF-C01 도메인 4](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain4.html) — D4 기준, 확인일: 2026-09-04, 상태: `downloaded`
- [AIF-C01 도메인 5](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain5.html) — D5 기준, 확인일: 2026-09-04, 상태: `downloaded`
- [`functional-spec.md`](../functional-design/functional-spec.md) — U7 정적 packaging 기능 계약, 확인일: 2026-09-06
- [`security-requirements.md`](../nfr-requirements/security-requirements.md) — U7 상세 보안 요구사항, 확인일: 2026-09-06
- [`tech-stack-decisions.md`](../nfr-requirements/tech-stack-decisions.md) — U7 정적 파일·ID·출처·검사 결정, 확인일: 2026-09-06
- [`unit-of-work.md`](../../../inception/units-generation/unit-of-work.md) — U1/U7 Unit 계약과 handoff, 확인일: 2026-09-06

## Assumptions & Open Questions

- U1의 `sources/content-traceability.yaml`은 빈 canonical 계약으로 존재하며, U7 downstream content 파일과 기준선 행이 아직 생성되지 않았으므로 NFR3.2, NFR4.1, NFR8.1의 실제 매핑 검사는 `Deferred`다.
- `SCORE-<slug>`는 기준선별 평가 항목이 아니라 정적 계산 안내이므로 baseline 연결 여부와 근거를 U8에서 별도 확인한다.
- 실제 Anki 추가 열은 downstream 호환성 검토 전에는 확정하지 않는다.
- 공식 문서의 URL·제목·revision·확인일·상태가 변하면 U1 registry를 먼저 갱신하고 U7의 verified 승격을 다시 검토한다.
- 이 문서는 인증·인가 설계서, 보안 인증, 법률 자문, 합격 보장 문서가 아니다.

## Review

**Verdict:** READY
**Reviewer:** aidlc-architecture-reviewer-agent
**Date:** 2026-09-07T11:25:35Z
**Iteration:** 1
**Request Challenge:** review:ebc97830b408dcaff39aa7aefc11f524

### Findings

| ID | Severity | Location | Finding | Required action | Status |
|---|---|---|---|---|---|
| 없음 | — | — | 검토 범위에서 Critical, Major, Minor architectural finding을 발견하지 못했다. | 추가 조치 없음 | — |

### Validation Tool Results

| Tool | Result | Interpretation |
|---|---|---|
| `aidlc-sensor-required-sections.ts` | PASS; `security-design.md` has 9 distinct H2 headings | 설계 목적, 보안 경계, NFR 적용성, U8 handoff, 해당 없음, Sources, Assumptions, Review 섹션이 존재한다. |
| `aidlc-sensor-traceability.ts` | PASS; `gaps=[]`, `orphans=[]`, `missing_from_table=[]`, `missing_from_upstream_ids=[]`, `invalid_entries=[]`, `invalid_targets=[]` | 15개 상세 NFR이 모두 선언·매핑되며 12개는 `OK`, `NFR3.2`, `NFR4.1`, `NFR8.1`은 downstream 산출물 전제에 따라 명시적으로 `Deferred`다. |
| `aidlc-sensor-upstream-coverage.ts` | PASS; required consumes의 `unreferenced=[]` | performance/scalability/reliability/observability의 비적용성, security/tech-stack/functional/contract upstream 소비가 설계 본문에 기록되어 있다. |
| Strict UTF-8 and JSON parse check | PASS | 검토 대상 Markdown과 `traceability.json`이 strict UTF-8이며 JSON 파싱에 성공했다. |
| Manifest and relative-link check | PASS | U1 `sources/content-traceability.yaml` 링크가 해석되고, manifest는 U1 소유 `draft` 계약이며 `baseline_items: []`다. 실제 기준선·downstream 항목을 발명하지 않고 세 매핑 검사를 `Deferred`로 유지한다. |
| Sensitive-value pattern check | PASS | 구체적인 access key, ARN, AWS account ID, email, secret/token 할당, signed URL이 발견되지 않았다. |
| Execution-boundary check | PASS | 실행 코드, API/DB 호출, AWS 계정 접근, browser storage/cookie, 외부 runtime, 새 dependency가 없으며 정적 Markdown/CSV 경계를 유지한다. |
| U8 handoff contract review | PASS | `QualityCheckRecord`의 대상 유형·안정 ID·workspace-relative path·검사 종류·상태·증거·확인일과 source/traceability/scope/CSV/accessibility/sensitive-data/content-quality 검사가 정의되어 있다. |
| Static packaging contract review | PASS | U1 양방향 참조, blocked/확인 필요 상태의 verified 승격 금지, scope classification, UTF-8/RFC 4180 CSV, no-runtime/no-sensitive-data 경계가 upstream 계약과 일치한다. |

### Summary

U7은 구현자가 추가적인 아키텍처 추정 없이 따를 수 있는 정적 packaging 설계다. required upstream의 N/A 적용성, U1 빈 canonical manifest에 대한 Deferred 처리, 15개 NFR 추적성, no-runtime/no-sensitive-data 경계, 링크·인코딩·U8 handoff가 일관되며 추가 Critical/Major finding이 없다. 부모 agent는 기존 challenge `review:ebc97830b408dcaff39aa7aefc11f524`를 사용해 `aidlc-log.ts`로 공식 READY review verdict를 기록한 뒤 unit completion을 진행해야 한다.
