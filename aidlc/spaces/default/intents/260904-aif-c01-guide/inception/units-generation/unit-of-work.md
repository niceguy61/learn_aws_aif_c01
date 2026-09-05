# Unit of Work 목록

> 상태: `draft`  
> 통합 요약 확인: `Looks correct`  
> 설계 목적: 승인된 Domain Design 컴포넌트를 Construction에서 검증 가능한 정적 산출물 작업 단위로 분해한다.

## 분해 원칙

- 이 문서는 Unit의 경계와 토폴로지만 정의한다.
- Unit을 먼저 구현할 순서나 critical path는 정의하지 않는다. 경제적 순서는 `Delivery Planning`에서 결정한다.
- 모든 Unit은 하나의 정적 학습 가이드 패키지에 통합된다. Unit은 독립 실행 서비스나 AWS 배포 환경이 아니다.
- Unit 간 계약은 안정 ID, 기준선·출처 ID, 상대 Markdown 링크, 중앙 JSON/YAML 추적표, 품질 보고서 링크다.
- `U1`은 기준선·출처를 제공하고, `U2`~`U6`은 서로 직접 의존하지 않는 도메인 학습 자료다. `U7`은 모든 학습 자료를 참조하고 `U8`은 모든 Unit의 품질 증거를 점검한다.

## Upstream artifact constraints

Units Generation은 다음 승인된 상위 산출물을 입력 계약으로 소비한다. 경로는 활성 intent record 루트 기준이며, 각 경로 표기는 해당 artifact slug를 기계적으로도 노출한다.

| Upstream artifact | Exact relative path | Constrains | Constraint |
|---|---|---|---|
| Domain Design component catalogue | `inception/domain-design/components.md` | `U1`~`U8` | 승인된 `ReferenceCatalog`, `LearningContent`, `AssessmentContent`, `QualityEvidence` 경계를 유지하고 Unit 소유권을 나눈다. |
| Requirements analysis | `inception/requirements-analysis/requirements.md` | `U1`, `U2`~`U6`, `U7`, `U8` | FR/NFR, 정적 Markdown·CSV 범위, 비수집·초보자·출처·품질 기준을 Unit 계약과 산출물에 반영한다. |
| User Stories | `inception/user-stories/stories.md` | `U1`~`U8` | `US1.1`~`US5.1`과 acceptance criteria의 구현 Unit 매핑 및 coverage를 추적한다. |

`components.md`, `requirements.md`, `stories.md`는 단순 참고 링크가 아니라 이 단계 산출물의 재생성·추적성 검사를 위한 upstream artifact ID/path다. 상위 산출물 변경 시 이 Unit 분해와 `traceability.json`을 다시 검토한다.

## Unit Catalogue

| Unit ID | Directory | Unit | Kind | Description | Deployment model | Complexity |
|---|---|---|---|---|---|---|
| `U1` | `u1-baseline-and-source-registry` | 기준선·출처 등록 | `spec` | 공식 AIF-C01 기준선, 사이드바 링크, source registry, canonical ID를 관리 | shared static package | M |
| `U2` | `u2-d1-ai-ml-foundations` | D1 AI 및 ML의 기초 | `packaging` | D1 README·개념 문서·용어·도메인 링크를 작성 | shared static package | M |
| `U3` | `u3-d2-generative-ai` | D2 GenAI의 기초 | `packaging` | D2 README·개념 문서·용어·도메인 링크를 작성 | shared static package | M |
| `U4` | `u4-d3-foundation-models` | D3 파운데이션 모델의 적용 | `packaging` | D3 README·개념 문서·용어·도메인 링크를 작성 | shared static package | L |
| `U5` | `u5-d4-responsible-ai` | D4 책임 있는 AI에 대한 가이드라인 | `packaging` | D4 README·개념 문서·용어·도메인 링크를 작성 | shared static package | M |
| `U6` | `u6-d5-security-compliance-governance` | D5 보안·규정 준수·거버넌스 | `packaging` | D5 README·개념 문서·용어·도메인 링크를 작성 | shared static package | L |
| `U7` | `u7-assessment-and-review` | 평가·복습 자료 | `packaging` | 문제은행·점수 워크시트·카드·용어 퀴즈·Anki를 작성 | shared static package | L |
| `U8` | `u8-quality-evidence` | 품질 증거 | `spec` | 출처·추적성·초보자·접근성·문항·민감정보 검사 기록을 관리 | shared static package | M |

## Unit별 책임과 산출물

### U1 — 기준선·출처 등록

- **경계**: 공식 시험 안내서의 5개 도메인·비율·작업·기술 행과 공식 사이드바 링크, `source-registry.yaml`을 소유한다.
- **책임**: `AIF-C01-D<n>-T<n>` 안정 ID 부여, revision/title/URL/확인일/접근 상태 기록, `blocked` 후속 조치 기록, 기준선에서 파생 자료로 이어지는 canonical ID 계약 제공.
- **정적 계약 파일**: `sources/content-traceability.yaml`을 U1이 단독 소유한다. 한 `BaselineItem` 행은 다음 필드를 필수로 가진다: `baseline_id`, `source_id`, `source_revision`, `status`, `learning_document_ids`, `question_ids`, `card_ids`, `quiz_ids`, `anki_ids`.
- **연결 규칙**: `baseline_id`는 `AIF-C01-D<n>-T<n>` 형식으로 유일해야 하며, `source_id`는 `sources/source-registry.yaml`의 행을 가리킨다. `source_revision`, `status`, `source_checked`는 같은 기준선 행에 저장하고, 파생 문서·문항·카드·퀴즈·Anki 항목은 자신의 안정 ID와 `baseline_id`를 함께 기록한다. 각 파생 ID는 manifest 배열에 역방향으로도 한 번 이상 나타나야 하며, `blocked`/`확인 필요` 기준선은 파생 자료의 `verified` 연결 대상이 될 수 없다.
- **보류 근거**: 위 필드는 Unit 간 입력 계약이며, 정확한 JSON/YAML 스키마·중복 검사·양방향 orphan 검사는 `Functional Design`에서 상세화한다. 이 보류는 필드명·소유 파일·revision/status 연결 규칙을 생략한다는 뜻이 아니다.
- **산출물**: `sources/aws-sidebar-index.md`, `sources/source-registry.yaml`, `sources/content-traceability.yaml`, 공식 기준선 등록부, 기준선-파생 자료 추적 매니페스트.
- **제약**: 공식 안내서 확인 전 항목은 `확인 필요` 또는 `blocked`로 유지하며 D1 콘텐츠를 `verified`로 승격시키지 않는다.

### U2 — D1 AI 및 ML의 기초

- **경계**: D1의 초보자용 README와 개념 단위 학습 문서, 문서 간 탐색 링크를 소유한다.
- **책임**: 선수 지식, 한 줄 요약, 쉬운 설명, AWS 관점, 비교, 시나리오, 시험 판단 단서, 오해, 확인 질문, 다음 문서 연결을 D1 범위에 맞게 작성한다.
- **산출물**: `docs/01-ai-ml-foundations/README.md`와 D1 개념 Markdown, D1 용어 inventory.
- **제약**: U1의 공식 기준선과 출처 ID를 사용하고, 실무 확장은 관련 기준선 ID와 함께 표시한다.

### U3 — D2 GenAI의 기초

- **경계**: D2의 초보자용 README와 개념 단위 학습 문서, 문서 간 탐색 링크를 소유한다.
- **책임**: D2 개념을 D1 선수 지식과 연결하고, 시험 범위와 실무 확장을 분리해 설명한다.
- **산출물**: `docs/02-generative-ai/README.md`와 D2 개념 Markdown, D2 용어 inventory.
- **제약**: 변동 가능한 모델·서비스 사실은 U1 출처 상태를 확인하고 보류 규칙을 적용한다.

### U4 — D3 파운데이션 모델의 적용

- **경계**: D3의 초보자용 README와 개념 단위 학습 문서, 문서 간 탐색 링크를 소유한다.
- **책임**: 파운데이션 모델 적용 개념과 서비스 선택 단서를 초보자 수준으로 설명하고, 확인되지 않은 세부사항은 확정하지 않는다.
- **산출물**: `docs/03-foundation-models/README.md`와 D3 개념 Markdown, D3 용어 inventory.
- **제약**: 모델명·기능·요금·리전·할당량은 공식 출처와 확인일을 연결한다.

### U5 — D4 책임 있는 AI

- **경계**: D4의 초보자용 README와 개념 단위 학습 문서, 문서 간 탐색 링크를 소유한다.
- **책임**: 책임 있는 AI 원칙·위험·편향·투명성 관련 시험 범위 설명과 학습자용 예시를 구분한다.
- **산출물**: `docs/04-responsible-ai/README.md`와 D4 개념 Markdown, D4 용어 inventory.
- **제약**: 공식 범위 밖의 규정·정책 사례는 `실무 확장`으로 표시한다.

### U6 — D5 보안·규정 준수·거버넌스

- **경계**: D5의 초보자용 README와 개념 단위 학습 문서, 문서 간 탐색 링크를 소유한다.
- **책임**: AI 솔루션의 보안·규정 준수·거버넌스 판단 단서와 AWS 관점의 기본 비교를 설명한다.
- **산출물**: `docs/05-security-compliance/README.md`와 D5 개념 Markdown, D5 용어 inventory.
- **제약**: 전문 법률 자문이나 배포·운영 구축 절차를 제공하지 않고, 불확실한 규정 세부사항은 확인 필요로 남긴다.

### U7 — 평가·복습 자료

- **경계**: 모든 도메인을 가로지르는 정적 평가·복습 자료를 소유한다.
- **책임**: 기준선별 최소 문항, 도메인 가중치 기반 추가 문항, 정답·오답 해설, 난이도·중복 검토 입력, 카드·용어 퀴즈·Anki, 정적 점수 워크시트를 제공한다.
- **산출물**: 문제은행, 정적 점수 워크시트, 카드 요약, 용어 퀴즈, UTF-8 Anki CSV와 가져오기 안내.
- **제약**: U2~U6의 문서·용어를 참조하며 답안·진도·계정 데이터를 수집하거나 저장하지 않는다.

### U8 — 품질 증거

- **경계**: 모든 Unit의 품질 판정과 재검사 증거를 소유하지만 콘텐츠를 대신 수정하지 않는다.
- **책임**: 초보자 관점, 개념 단위, 링크·제목, 출처·기준선 완전성, 범위 표지, 문항 메타데이터, CSV, Mermaid·텍스트 대체, 민감정보 검사를 기록한다.
- **대상 계약**: `QualityCheckRecord`는 `target_type`, `target_id`, `target_path`, `check_id`, `status`, `evidence`, `checked_at`을 가진다. `target_type`은 아래 허용 집합 중 하나이고, `target_path`는 workspace-relative 경로이며, `target_id`는 해당 타입의 안정 ID다.

| target_type | target_id 규칙 | target_path 예시 | 소유 Unit |
|---|---|---|---|
| `DomainReadme` | `D<n>-README` | `docs/01-ai-ml-foundations/README.md` | `U2`~`U6` |
| `LearningDocument` | `LD-<domain>-<slug>` | `docs/0<n>-*/<slug>.md` | `U2`~`U6` |
| `GlossaryTerm` | `TERM-<slug>` | `docs/glossary.md#<slug>` | `U2`~`U6` |
| `QuestionBankItem` | `Q-<n>` | `assessment/question-bank.md#q-<n>` | `U7` |
| `ScoreSheet` | `SCORE-<slug>` | `assessment/score-sheet.md` | `U7` |
| `Card` | `CARD-<slug>` | `assessment/cards.md#<slug>` | `U7` |
| `TermQuizItem` | `TQ-<n>` | `assessment/term-quiz.md#tq-<n>` | `U7` |
| `AnkiNote` | `ANKI-<n>` | `assessment/anki.csv#anki-<n>` | `U7` |
| `SourceRecord` | `SRC-<slug>` | `sources/source-registry.yaml#<slug>` | `U1` |
| `BaselineItem` | `AIF-C01-D<n>-T<n>` | `sources/content-traceability.yaml#<id>` | `U1` |

검사기는 `target_id`로 안정 ID 존재를 확인하고 `target_path`로 workspace-relative 파일·anchor를 확인한다. `QualityCheckRecord` 자체는 `U8`이 소유하며 허용 대상에서 제외하지 않는다. 정확한 직렬화와 ID 중복·고아 검사는 `Functional Design`에서 상세화하되, 이 대상 타입·소유 Unit·경로 해석 규칙은 Construction 입력 계약으로 고정한다.
- **산출물**: 도메인별 품질 보고서, 최종 통합 점검표, 검사 도구·검사일·판정·근거·조치·재검사 기록.
- **제약**: `통과|실패|보류` 판정과 재검사 계획을 남기며, 근거 없는 `verified` 승격을 허용하지 않는다.

## Unit 경계와 구현 산출물의 관계

`spec` Unit은 기준선·추적표·품질 기록처럼 다른 Unit이 참조하는 구조와 판정 계약을 정의한다. `packaging` Unit은 실행형 프로그램이 아니라 정적 Markdown·CSV 묶음을 생산하고 검증한다. 이 분류는 Construction에서 불필요한 서비스·UI·확장성 문서를 만들지 않도록 하기 위한 것이며, 실제 배포 토폴로지를 의미하지 않는다.

## Review

**Verdict:** READY
**Reviewer:** aidlc-architecture-reviewer-agent
**Date:** 2026-09-04T16:42:43Z
**Iteration:** 1
**Request Challenge:** review:e303dbe77ce73c088ba0bc713f07bf84

### Findings

| ID | Severity | Location | Finding | Required action | Status |
|---|---|---|---|---|---|
| R-01 | Major | `aidlc/spaces/default/intents/260904-aif-c01-guide/inception/units-generation/unit-of-work.md` > U1 canonical manifest 계약 | 이전 리뷰에서 지적한 canonical manifest의 소유 파일·필수 파생 ID·revision/status·양방향 연결 규칙이 보완되었다. | `sources/content-traceability.yaml`과 `BaselineItem` 계약을 다음 Functional Design에서 상세 스키마로 구체화한다. | Resolved |
| R-02 | Major | `aidlc/spaces/default/intents/260904-aif-c01-guide/inception/units-generation/unit-of-work-story-map.md` > Machine-readable story-to-unit mappings; `traceability.json` > coverage | 이전 리뷰에서 지적한 7개 User Story의 기계적 Unit 매핑 불일치가 plain-token 표와 동일한 `target`/`directory` 값으로 보완되었다. | 추가 조치 없음; downstream 단계에서 동일 계약을 유지한다. | Resolved |
| R-03 | Major | `aidlc/spaces/default/intents/260904-aif-c01-guide/inception/units-generation/unit-of-work.md` > Upstream artifact constraints | 이전 리뷰에서 지적한 `components.md`·`requirements.md`·`stories.md`의 기계적 upstream 연결이 정확한 상대 경로와 Unit 제약 표로 보완되었다. | 추가 조치 없음; 상위 산출물 변경 시 이 단계 산출물을 재검토한다. | Resolved |
| R-04 | Minor | `aidlc/spaces/default/intents/260904-aif-c01-guide/inception/units-generation/unit-of-work.md` > U8 QualityCheckRecord 대상 계약 | 이전 리뷰에서 지적한 품질 검사 대상 범위·안정 ID·workspace-relative path·소유 Unit 모호성이 10개 허용 `target_type` 표와 해석 규칙으로 보완되었다. | 정확한 직렬화·ID 중복·고아 검사는 다음 Functional Design에서 구현한다. | Resolved |

### Validation Tool Results

| Tool | Result | Interpretation |
|---|---|---|
| `aidlc-sensor-required-sections.ts` — `unit-of-work.md` | PASS (`h2_count: 6`) | Unit 분해, upstream 계약, Unit Catalogue와 단일 Review 섹션이 존재한다. |
| `aidlc-sensor-required-sections.ts` — `unit-of-work-dependency.md` | PASS; `edge_block: ok` | 8개 Unit 선언의 fenced YAML이 파싱되고 자기 의존성·미정 Unit·순환이 없다. |
| `aidlc-sensor-required-sections.ts` — `unit-of-work-story-map.md` | PASS (`h2_count: 6`) | 기계적 매핑 표와 Story map의 구조가 유효하다. |
| `aidlc-sensor-traceability.ts` | PASS; `gaps: []`, `invalid_targets: []`, `missing_from_table: []`, `missing_from_upstream_ids: []` | 7개 User Story가 모두 traceability에 선언되고 Story map의 유효한 Primary Unit으로 연결된다. |
| `aidlc-sensor-upstream-coverage.ts` | PASS; `unreferenced: []` | `components`, `requirements`, `stories` upstream이 `unit-of-work.md`의 명시적 계약으로 모두 소비된다. |
| `aidlc-validate.ts outputs inception` | PASS | Units Generation의 선언 산출물 3개가 모두 존재한다. |

### Summary

U1~U8의 ID·소문자 directory·kind·shared static package deployment model·complexity는 승인된 Domain Design의 네 컴포넌트 경계와 정합적이며, dependency DAG는 유효한 kind와 cycle-free 구조를 갖고 구현 순서·critical path를 결정하지 않는다. 이전 R-01~R-04는 현재 계약과 검증 결과로 해결되었고 신규 Critical/Major/Minor finding이 없으므로, 이 advisory 아키텍처 리뷰는 `READY`다.