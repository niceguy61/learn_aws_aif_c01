# U1 기준선·출처 등록 기능 명세

## 목적과 경계

U1은 `ReferenceCatalog`가 공식 AIF-C01 시험 기준선, AWS 공식 출처, 공식 사이드바 링크를 정적 파일로 등록하고 다른 Unit이 재사용할 stable ID·상태·양방향 추적 계약을 제공하는 기능 경계다.

이 문서는 U1의 ordered workflow와 상태 전이의 source of truth다. U1은 학습 문서·문제은행·카드·퀴즈·Anki·품질 보고서의 본문을 작성하지 않으며, 이 자료가 참조해야 하는 ID와 출처 상태만 제공한다. 실제 공식 URL, revision, 시험 작업·기술 행은 공식 자료를 확인한 뒤에만 입력한다.

## 입력과 출력 계약

| 구분 | 경로 또는 계약 | 사용 목적 |
|---|---|---|
| 입력 | `inception/requirements-analysis/requirements.md` | FR1, FR5, FR6와 NFR3/NFR4의 기준 |
| 입력 | `inception/units-generation/unit-of-work.md` | U1의 `spec` 경계와 canonical manifest 필드 |
| 입력 | `inception/units-generation/unit-of-work-story-map.md` | `US1.1`의 주 소유 Unit과 연결 규칙 |
| 입력 | `inception/domain-design/components.md` | `ReferenceCatalog` 엔터티·소유권·의존성 |
| 출력 | `sources/aws-sidebar-index.md` | 조사한 공식 사이드바 링크의 전체 인벤토리 |
| 출력 | `sources/source-registry.yaml` | URL·제목·출처 유형·상위 주제·도메인·확인일·접근 상태·연결 자료 |
| 출력 | `sources/content-traceability.yaml` | `AIF-C01-D<n>-T<n>` 기준선과 파생 자료 stable ID의 양방향 매니페스트 |

정적 파일에는 외부 사실의 URL·제목·확인 날짜를 기록하되, 확인되지 않은 값은 채우지 않는다. 확인 전 항목은 `status: discovered` 또는 `access_status: discovered`와 함께 `notes`의 `확인 필요:` 보류 표기로 남긴다. 접근이 실제로 차단된 경우에만 `blocked`와 차단 사유를 사용한다.

## Workflow 1: 공식 기준선 등록

1. 공식 AIF-C01 시험 안내서의 제목, revision, 도메인, 채점 비율, 작업·기술 행과 확인 날짜를 공식 페이지에서 확인한다. 확인할 수 없는 값은 추측하지 않는다.
2. 확인된 각 행에 공식 도메인 번호와 행 순서를 반영한 `AIF-C01-D<n>-T<n>`를 부여한다. 기존 ID가 다른 의미로 재사용되지 않았는지 확인한다.
3. `BaselineItem`에 `source_id`, `source_revision`, `revision_title`, `domain`, `task`, `technology`, `official_source_url`, `official_source_title`, `checked_date`, `source_checked`, `status`, 모든 파생 ID 배열과 `notes`를 기록한다. `checked_date == source_checked == SourceRecord.checked_date`를 검사한다.
4. 연결된 `SourceRecord.linked_baseline_ids`에 `baseline_id`를 추가한다. BaselineItem의 정방향 집합과 SourceRecord의 reverse 집합을 비교한다.
5. 모든 공식 도메인과 확인된 작업·기술 행이 기준선에 존재하는지 검사한다. 미확인·차단 행은 상태와 사유를 보존하고 `verified` 파생 자료에 사용하지 않는다.

## Workflow 2: 사이드바 및 출처 등록

1. 공식 사이드바에서 확인한 링크의 URL, 표시 제목, 상위 주제, 관련 도메인, 발견 순서를 기록한다.
2. 각 링크에 `SIDE-<slug>` stable ID를 부여하고 `linked_source_id`로 SourceRecord를 정확히 하나 가리킨다. `source_id` alias를 SidebarLink에 만들지 않는다.
3. URL이 이미 `source-registry.yaml`에 있으면 기존 SourceRecord를 재사용한다. 새 URL이면 공식 페이지 확인 결과에 따라 `SRC-<slug>` SourceRecord를 만든다. 확인 전 URL·제목을 발명하지 않는다.
4. SourceRecord의 `linked_sidebar_ids`에 SidebarLink ID를 추가하고, `SidebarLink.linked_source_id == SourceRecord.source_id`와 URL 일치를 검사한다.
5. 사이드바의 정방향 링크 집합과 SourceRecord의 reverse 집합이 SourceRecord별로 정확히 같은지 검사한다. 중복 URL·ID, orphan, 누락, 상태 오류가 있으면 fail-closed로 처리한다.
6. 동적 페이지·접근 차단 등으로 내용 확인이 불가능하면 `blocked` 또는 `notes`의 `확인 필요:`로 사유·영향 자료·후속 확인 대상을 남긴다.

## Workflow 3: 파생 자료 상태 결정

1. BaselineItem과 SourceRecord의 상태, 확인일 equality, stable ID 양방향 연결, 파생 자료의 현재 상태를 읽는다.
2. 기준선 또는 출처가 `discovered`, `downloaded`, `summarized`, `reviewed`, `blocked`이거나 notes에 `확인 필요:`가 있으면, 그 사실에 의존하는 파생 자료는 `draft` 또는 `review`만 허용한다.
3. 기준선·출처가 모두 `verified`이고 파생 자료의 내용·범위 표지·출처·stable ID 링크 검토 증거가 있을 때만 파생 자료의 `verified` 전이를 허용한다.
4. `blocked` 또는 `확인 필요:`를 해소할 때는 새 공식 확인 증거와 확인 날짜를 추가한다. 이전 상태를 자동으로 verified로 복원하지 않고, 실제 확인된 단계부터 순서대로 다시 검토한다.
5. U1은 파생 자료의 내용을 수정하지 않는다. 상태 게이트 결과, 필요한 증거와 영향 범위는 U1 매니페스트 또는 U8 품질 증거가 참조할 수 있도록 기록한다.

## Workflow 4: 양방향 추적성 검사

1. 각 BaselineItem의 `learning_document_ids`, `question_ids`, `card_ids`, `quiz_ids`, `anki_ids`를 읽고 중복·빈 값·존재하지 않는 ID를 검사한다.
2. 각 파생 자료가 `baseline_ids`와 `source_ids`를 선언했는지, 해당 ID가 실제 U1 매니페스트와 source registry에 존재하는지 검사한다.
3. 각 SourceRecord에 대해 다음 집합을 비교한다.
   - 기준선: `{BaselineItem.baseline_id | BaselineItem.source_id == source_id}` == `linked_baseline_ids`
   - 사이드바: `{SidebarLink.link_id | SidebarLink.linked_source_id == source_id}` == `linked_sidebar_ids`
   - 파생 자료: 각 자료의 `source_ids` 집합 == SourceRecord의 해당 `linked_*_ids` 집합
4. `BaselineItem.baseline_id`와 파생 자료의 `baseline_ids`도 자료 유형별로 집합 동등성을 검사한다.
5. 한쪽에만 있는 ID, 존재하지 않는 ID, 중복 stable ID, URL-only 연결, 날짜 불일치, 허용되지 않은 상태를 orphan 또는 검사 실패로 기록한다. 오류가 하나라도 있으면 verified 판정을 내리지 않는다.
6. 검사 결과는 U8의 `QualityCheckRecord`가 `SourceRecord`, `BaselineItem`, 파생 자료를 대상으로 인용할 수 있도록 대상 경로·검사일·판정·근거·조치·재검사 결과를 제공한다.

## Workflow 5: revision 변경과 보류 처리

1. 공식 자료의 revision을 다시 확인할 때 기존 `baseline_id`의 의미가 유지되는지 비교한다.
2. 의미가 유지되면 같은 stable ID를 유지하고 revision·title·확인일·상태를 갱신한다. 의미가 바뀌면 기존 ID를 삭제·재사용하지 않고 blocked와 notes의 `superseded` 근거로 보류한다.
3. 새 의미의 행은 사용하지 않은 stable ID로 등록하고, 이전·새 행의 관계와 영향받는 파생 자료를 notes에 기록한다.
4. 검증되지 않은 revision을 근거로 파생 자료를 verified로 표시하지 않는다.

## 상태 전이

기계 상태는 다음 enum을 사용한다.

```text
discovered -> downloaded -> summarized -> reviewed -> verified
     |             |             |             |          |
     +-------------+-------------+-------------+----------+
                         blocked
```

- 정상 전이는 왼쪽에서 오른쪽으로만 진행한다.
- 어느 확인 단계에서 접근·내용 검증이 차단되면 `blocked`로 전환할 수 있다.
- `blocked`를 해소할 때는 새 공식 확인 증거를 기록하고 실제 확인된 단계로 되돌아가 순서대로 재검증한다.
- `확인 필요`는 machine enum 값이 아니다. 확인 전 행은 현재 enum 상태를 유지하면서 `notes`에 `확인 필요:`와 사유·후속 대상을 표시한다.
- 파생 문서의 `draft|review|verified` 상태는 U1의 source/baseline 상태 게이트를 통과해야 한다. U1 상태와 파생 문서 상태를 같은 enum으로 합치지 않는다.

## ER 관계와 텍스트 대체 설명

```mermaid
erDiagram
    BASELINE_ITEM }o--|| SOURCE_RECORD : source_id
    SIDEBAR_LINK }o--|| SOURCE_RECORD : linked_source_id
    BASELINE_ITEM }o--o LEARNING_DOCUMENT : baseline_ids
    BASELINE_ITEM }o--o QUESTION_BANK_ITEM : baseline_ids
    BASELINE_ITEM }o--o CARD : baseline_ids
    BASELINE_ITEM }o--o TERM_QUIZ_ITEM : baseline_ids
    BASELINE_ITEM }o--o ANKI_NOTE : baseline_ids
    SOURCE_RECORD }o--o LEARNING_DOCUMENT : source_ids
    SOURCE_RECORD }o--o QUESTION_BANK_ITEM : source_ids
    SOURCE_RECORD }o--o CARD : source_ids
    SOURCE_RECORD }o--o TERM_QUIZ_ITEM : source_ids
    SOURCE_RECORD }o--o ANKI_NOTE : source_ids
```

텍스트로 말하면 `BaselineItem`과 `SourceRecord`는 U1이 소유하는 기준선·출처 관계다. `SidebarLink`는 하나의 SourceRecord를 가리키고, `LearningDocument`·`QuestionBankItem`·`Card`·`TermQuizItem`·`AnkiNote`는 다른 Unit이 소유하며 U1의 `baseline_ids`와 `source_ids`를 역추적한다. URL은 보조 식별자이며 stable ID와 양방향 배열이 관계의 기준이다.

## 실패·경계 사례

- 공식 안내서의 revision, URL, 제목, 작업·기술 행 순서를 확인할 수 없으면 해당 값을 만들지 않고 `확인 필요:` 또는 `blocked`로 보류한다.
- 동일 URL이 서로 다른 제목·상위 주제로 발견되면 하나의 SourceRecord를 유지하고 차이를 notes에 기록한 뒤 출처 제목을 확인한다.
- 기준선은 존재하지만 학습 문서·문제가 아직 없으면 배열은 빈 목록으로 저장할 수 있으나 기준선은 verified가 될 수 없다.
- 하나의 파생 자료가 여러 기준선을 설명하면 `baseline_ids`에 모든 기준선 ID를 기록한다.
- source/baseline이 verified여도 파생 자료의 범위 표지·본문 검토·양방향 링크 증거가 없으면 파생 자료를 verified로 올리지 않는다.
- U1은 UI, API, DB, AWS 계정, 네트워크 호출, 학습자 답안·진도 저장을 만들지 않는다.

## Sources

- `aidlc/spaces/default/intents/260904-aif-c01-guide/inception/requirements-analysis/requirements.md`
- `aidlc/spaces/default/intents/260904-aif-c01-guide/inception/units-generation/unit-of-work.md`
- `aidlc/spaces/default/intents/260904-aif-c01-guide/inception/units-generation/unit-of-work-story-map.md`
- `aidlc/spaces/default/intents/260904-aif-c01-guide/inception/domain-design/components.md`

## Review

**Verdict:** NOT-READY
**Reviewer:** aidlc-architecture-reviewer-agent
**Date:** 2026-09-07T17:32:41Z
**Iteration:** 1
**Request Challenge:** review:720ea7a352c8fd3364f141c80c775ea0

### Findings

| ID | Severity | Location | Finding | Required action | Status |
|---|---|---|---|---|---|
| R-01 | Major | `aidlc/spaces/default/intents/260904-aif-c01-guide/construction/u1-baseline-and-source-registry/functional-design/entities.md` > `Source of Truth` > `SourceRecord` 파생 연결 필드; `rules.md` > `BR1.3`; 상위 `inception/domain-design/components.md` > `QuestionBankItem`, `Card`, `TermQuizItem`, `AnkiNote` attributes | U1은 `SourceRecord.linked_*_ids`가 파생 자료의 `source_ids`와 정확히 같아야 하고 Workflow 4도 각 파생 자료의 `source_ids`를 요구한다. 그러나 공용 컴포넌트 계약은 `source_urls`와 일부 `source_document_ids`만 정의하며 `source_ids`의 소유·필드명·자료 유형별 형식을 정의하지 않는다. U2/U7이 어떤 정방향 필드를 구현하고 누가 reverse 배열을 갱신할지 구현자가 추측해야 한다. | 상위 Unit 계약 또는 명시적인 contract-summary에서 모든 파생 자료 유형의 canonical 출처 ID 필드와 소유·갱신 주체를 확정하고, U1의 reverse 집합 규칙과 동일한 필드명으로 정렬한다. 기존 URL/문서 ID는 보조 링크인지 canonical 링크인지도 명시한다. | Unresolved |
| R-02 | Major | `aidlc/spaces/default/intents/260904-aif-c01-guide/construction/u1-baseline-and-source-registry/functional-design/functional-spec.md` > `Workflow 1: 공식 기준선 등록` 1단계; `entities.md` > `BaselineItem` attributes | Workflow는 공식 도메인의 채점 비율을 확인·등록한다고 명시하지만 `BaselineItem`에는 도메인명이나 채점 비율 필드가 없고 별도 canonical 엔터티/파일도 정의되지 않았다. 따라서 FR1.1/FR1.2의 20%·24%·28%·14%·14%를 기준선에서 재구성하거나 합계·누락을 검증할 수 없다. | 채점 비율과 공식 도메인 표시를 `BaselineItem` 또는 별도 명시된 canonical 엔터티/파일에 저장하고, 타입·허용 범위·합계 100% 및 revision별 확인일 규칙을 정의한다. 어느 위치를 선택하든 U1 출력과 검증 절차에 연결한다. | Unresolved |
| R-03 | Major | `aidlc/spaces/default/intents/260904-aif-c01-guide/construction/u1-baseline-and-source-registry/functional-design/rules.md` > `BR1.1`; `functional-spec.md` > `Workflow 5: revision 변경과 보류 처리` 2~3단계; `entities.md` > `BaselineItem.baseline_id` constraints | `BR1.1`은 stable ID가 현재 공식 행 순서를 반영해야 한다고 하고, Workflow 5는 revision에서 행의 의미가 유지되면 기존 ID를 유지하라고 한다. 같은 의미의 행이 revision에서 이동·삽입·삭제되거나 여러 행으로 분리되는 경우 두 규칙의 우선순위와 T 번호 결정 방식이 없어 ID 안정성과 공식 순서 보존을 동시에 구현할 수 없다. | stable ID의 정체성 매칭을 의미 기반으로 할지 순서 기반으로 할지 우선순위를 정하고, 공식 행 순번은 별도 속성으로 보존하는 방식을 포함해 reorder/insert/merge/split/deprecate별 마이그레이션 규칙과 파생 자료 영향 처리를 명시한다. | Unresolved |
| R-04 | Major | `aidlc/spaces/default/intents/260904-aif-c01-guide/construction/u1-baseline-and-source-registry/functional-design/functional-spec.md` > `Workflow 4: 양방향 추적성 검사` 1단계·5단계 및 `실패·경계 사례`; `entities.md` > `BaselineItem` entity constraints | Workflow 4는 각 파생 ID 배열의 “빈 값”을 검사 오류로 기록한다고 읽히지만, 같은 명세의 경계 사례는 학습 문서·문제가 아직 없을 때 빈 배열로 등록할 수 있다고 한다. 등록 초기의 빈 컬렉션과 배열 내부의 빈 문자열을 구분하지 않으면 발견 단계 기준선을 등록할 수 없고, 반대로 빈 배열을 무조건 허용하면 추적성 검사가 약화된다. | `discovered`~`reviewed`에서 허용되는 빈 컬렉션, 항상 거부할 빈 ID 요소, `verified`에서 반드시 요구할 `learning_document_ids`·`question_ids`를 별도로 정의하고 각 상태별 검사 결과와 승격 조건을 연결한다. | Unresolved |
| R-05 | Minor | `aidlc/spaces/default/intents/260904-aif-c01-guide/construction/u1-baseline-and-source-registry/functional-design/traceability.json` > `reverse` | 모든 BR1.1~BR1.8이 `coverage`의 AC target으로 이미 연결되어 있는데도 `reverse`에서 모두 `status: N/A`로 기록되어 있다. Stage 계약상 `reverse`는 AC가 없는 규칙을 설명하는 선택 영역이므로, 현재 표기는 자동 센서 통과와 별개로 “모든 규칙이 AC 없음”이라는 잘못된 역추적 의미를 만든다. | AC로 커버된 BR은 `reverse`에서 제거하고, 실제 AC가 없는 규칙만 `N/A`와 정당화로 남긴다. 또는 역방향 표의 의미를 AC 커버 규칙까지 포함하도록 stage 계약과 상태 의미를 명시적으로 변경한다. | Unresolved |
| R-06 | Minor | `aidlc/spaces/default/intents/260904-aif-c01-guide/construction/u1-baseline-and-source-registry/functional-design/entities.md` > `BaselineItem` attributes/entity constraints; `rules.md` > `BR1.2`; `functional-spec.md` > `Workflow 1` 3~4단계 | `BaselineItem`은 `source_id`와 별도로 `official_source_url`·`official_source_title`을 저장하지만, `source_id`가 가리키는 `SourceRecord`의 URL·제목과 두 필드가 같은지 검사하는 명시적 제약이 없다. URL은 보조 검사라고만 되어 있어 서로 다른 출처를 가리키는 혼합 행이 상태·날짜 검사를 통과할 수 있다. | `source_id`를 canonical 출처로 지정하고 BaselineItem의 URL·제목(필요 시 revision·checked_date) equality를 명시하거나 중복 필드를 제거한다. 불일치 시 등록·verified 승격·파생 자료 연결을 모두 fail-closed로 정의한다. | Unresolved |

### Validation Tool Results

| Tool | Result | Interpretation |
|---|---|---|
| `aidlc-sensor-required-sections.ts` — U1 `entities.md`, `rules.md`, `functional-spec.md`, `traceability.json` | PASS (`h2_count`: 5, 4, 12, 0) | 네 산출물의 필수 기본 구조가 확인되었다. `traceability.json`은 이 센서에서 Markdown heading을 요구하지 않는다. |
| `aidlc-sensor-traceability.ts` — `traceability.json` | PASS (`gaps: []`, `orphans: []`, `missing_from_table: []`, `missing_from_upstream_ids: []`, `invalid_entries: []`, `invalid_targets: []`) | AC1.1.1~AC1.1.4의 BR target 형식과 존재 여부는 기계적으로 유효하다. R-05의 역방향 의미 문제는 이 센서가 탐지하지 않는다. |
| `aidlc-sensor-upstream-coverage.ts` — U1 Functional Design 산출물 | PASS (`consumes`: `unit-of-work`, `unit-of-work-story-map`, `requirements`, `components`; `unreferenced`: `[]`) | 세 산출물의 합집합이 전달된 네 upstream slug를 모두 언급한다. |
| `aidlc-sensor-linter.ts` — `functional-spec.md` | NOT RUN (`no-eslint-config`) | Markdown 대상에 적용할 ESLint 설정이 없어 실행되지 않았다. |
| `aidlc-sensor-type-check.ts` — `functional-spec.md` | NOT RUN (`no-tsconfig-found`) | Markdown 대상에 적용할 TypeScript 설정이 없어 실행되지 않았다. |
| 외부 AWS URL live check | NOT RUN | 이번 review는 지정된 설계 산출물과 전달된 상위 계약만 검토했으며 외부 출처 페이지는 확인하지 않았다. 따라서 실제 URL의 최신성이나 접근 가능성은 판단하지 않았다. |

### Summary

U1의 정적 파일 경계와 BR ID 형식은 센서상 유효하지만, canonical 출처 ID 계약·도메인 채점 비율 저장·revision 재배치 규칙·초기 빈 매핑 정책이 아직 구현 가능한 수준으로 닫히지 않았다. 네 개의 Major finding이 미해결이므로 advisory 판정은 `NOT-READY`이며, 사람 승인 게이트에서 위 사실을 반영해 판단해야 한다.
