# U1 기준선·출처 등록 기능 명세

<!-- Functional Design summary confirmation: Looks correct -->

## 목적과 경계

U1은 `ReferenceCatalog`가 공식 AIF-C01 기준선과 출처 메타데이터를 정적 파일로 제공하는 기능 경계다. 이 문서는 ordered workflow와 상태 전이를 정의하는 source of truth다. U1은 다른 Unit이 참조할 ID·상태·연결 계약을 만들지만 도메인 학습 문서, 문제은행, 품질 보고서의 본문을 소유하지 않는다.

## 입력과 출력

| 구분 | 경로 또는 계약 | 설명 |
|---|---|---|
| 입력 | `inception/requirements-analysis/requirements.md` | FR1, FR5, FR6와 NFR3/NFR4의 기준 |
| 입력 | `inception/user-stories/stories.md` | `US1.1`, `US5.1`과 acceptance criteria |
| 입력 | `inception/units-generation/unit-of-work.md` | U1의 `spec` 경계와 canonical manifest 계약 |
| 입력 | `inception/units-generation/unit-of-work-story-map.md` | `US1.1`의 주 소유 Unit 매핑 |
| 입력 | `inception/domain-design/components.md` | `ReferenceCatalog` 엔터티·소유권·의존성 |
| 출력 | `sources/aws-sidebar-index.md` | 조사한 공식 사이드바 링크의 전체 인벤토리 |
| 출력 | `sources/source-registry.yaml` | URL·제목·출처 유형·확인일·접근 상태 등록부 |
| 출력 | `sources/content-traceability.yaml` | 기준선과 파생 자료의 양방향 canonical 추적표 |

실제 AWS URL, 시험 revision, 작업·기술 행은 공식 페이지를 조사해 확인한 값만 입력한다. 확인되지 않은 값은 발명하지 않고 `확인 필요` 또는 `blocked`와 후속 조치로 남긴다.

## Workflow 1: 공식 기준선 등록

1. 공식 AIF-C01 시험 안내서의 revision, 제목, 확인일, 5개 도메인과 채점 비율을 확인한다.
2. 각 공식 작업·기술 행을 안내서에 나타난 순서대로 읽고 `AIF-C01-D<n>-T<n>` stable ID를 부여한다.
3. `BaselineItem`에 `source_id`, `source_revision`, `revision_title`, 도메인, task, technology, 공식 URL·제목, 확인일, 상태를 채운다.
4. 기준선 행을 `sources/content-traceability.yaml`에 저장하고 필수 필드·중복 ID·도메인 완전성을 검사한다.
5. 확인된 행이 아직 학습 문서나 문제와 연결되지 않았다면 빈 배열을 허용하되 `verified` 파생 자료 승격은 보류한다. 이후 FR1.1의 완료 검사에서 문서·문제 매핑을 확인한다.

## Workflow 2: 사이드바 및 출처 등록

1. 공식 사이드바에서 링크를 발견한 순서와 상위 주제를 기록한다.
2. 각 링크에 `SidebarLink.link_id`, URL, 제목, parent topic, 관련 도메인, `source_id`, 접근 상태를 부여한다.
3. 동일 URL이 이미 `source-registry.yaml`에 있으면 기존 `SourceRecord`를 재사용하고, 없으면 새 `SRC-<slug>`를 만든다.
4. `source-registry.yaml`에서 URL 중복, 필수 메타데이터 누락, 상태 값 오류를 검사한다.
5. 접근이 차단되거나 동적 내용 때문에 확인되지 않으면 `blocked` 또는 `확인 필요`를 기록하고 영향 자료와 후속 확인 대상을 `notes`에 남긴다.

## Workflow 3: 파생 자료 상태 결정

1. `BaselineItem` 또는 `SourceRecord`의 상태와 파생 자료의 현재 상태를 읽는다.
2. source 또는 baseline이 `blocked`/`확인 필요`이면 해당 사실에 의존하는 파생 자료의 `verified` 승격을 거부한다.
3. source와 baseline이 확인되어도 파생 자료의 내용·출처·링크 검사는 해당 Unit 또는 U8이 수행한다.
4. 상태 결정 결과를 파일에 기록하고, U1은 콘텐츠 본문을 수정하지 않는다.

## Workflow 4: 양방향 추적성 검사

1. `BaselineItem`의 `learning_document_ids`, `question_ids`, `card_ids`, `quiz_ids`, `anki_ids`를 각각 읽는다.
2. 각 파생 자료의 `baseline_ids`와 stable ID가 실제 자료 또는 후속 Unit 계약에 존재하는지 확인한다.
3. 어느 한쪽에만 나타나는 ID, 중복 stable ID, 존재하지 않는 `source_id`, URL만으로 된 연결을 orphan 또는 검사 실패로 기록한다.
4. `source-registry.yaml`의 linked ID 배열과 파생 자료의 source/baseline 연결을 대조한다.
5. 검사 결과는 정적 검사 출력과 U8의 품질 증거가 참조할 수 있는 형태로 남긴다.

## 상태 전이

### 기준선·출처 상태

`discovered → downloaded → summarized → reviewed → verified`는 확인 수준이 높아지는 흐름이다. 내용 확인이 막히면 어느 단계에서든 `blocked`로 전환할 수 있다. `blocked`에서 복구할 때는 차단 사유가 해소된 새로운 확인 증거를 남긴 뒤 `downloaded` 또는 해당 확인 단계로 되돌린다. 이는 문서 상태 `draft|review|verified`와 별도다.

### 파생 자료 허용 상태

| 기준선·출처 상태 | 파생 자료에서 허용되는 결과 |
|---|---|
| `verified` | 내용 검토를 통과한 경우 `review` 또는 `verified` |
| `discovered`, `downloaded`, `summarized`, `reviewed` | `draft` 또는 `review`; 사실 확인 전 `verified` 금지 |
| `blocked` 또는 `확인 필요` | 차단·보류 상태; `verified` 금지 |

## ER 관계와 도출 규칙

```mermaid
erDiagram
    BASELINE_ITEM }o--|| SOURCE_RECORD : "source_id"
    SIDEBAR_LINK }o--|| SOURCE_RECORD : "source_id"
    BASELINE_ITEM }o--o LEARNING_DOCUMENT : "baseline_ids / learning_document_ids"
    BASELINE_ITEM }o--o QUESTION_BANK_ITEM : "baseline_ids / question_ids"
    BASELINE_ITEM }o--o CARD : "baseline_ids / card_ids"
    BASELINE_ITEM }o--o TERM_QUIZ_ITEM : "baseline_ids / quiz_ids"
    BASELINE_ITEM }o--o ANKI_NOTE : "baseline_ids / anki_ids"
```

텍스트로 말하면 `BaselineItem`과 `SourceRecord`는 U1이 소유하는 기준선·출처 관계이고, `LearningDocument`, `QuestionBankItem`, `Card`, `TermQuizItem`, `AnkiNote`는 다른 Unit이 소유하는 파생 자료다. 양방향 ID 배열은 같은 연결을 두 방향에서 확인하게 하며, URL은 보조 메타데이터일 뿐 관계의 영구 키가 아니다.

## 규칙 도출 요약

이 명세의 판단은 `rules.md`의 `BR1.1`~`BR1.8`에서 도출된다. 특히 stable ID와 필수 메타데이터는 `BR1.1`·`BR1.2`, 양방향 연결과 최소 문서·문항 매핑은 `BR1.3`·`BR1.4`, 차단 상태와 사이드바 검사는 `BR1.5`·`BR1.6`, URL 대체 금지와 정적 경계는 `BR1.7`·`BR1.8`이 담당한다.

## 실패·경계 사례

- 공식 문서의 행 순서나 표현을 확인할 수 없으면 임의 ID를 만들지 않고 `확인 필요`로 보류한다.
- 동일 URL이 서로 다른 제목으로 발견되면 하나의 `SourceRecord`를 유지하고 차이를 `notes`에 기록한다.
- 기준선은 존재하지만 파생 문서·문항이 아직 작성되지 않았으면 빈 배열을 허용하되 완료 검사와 `verified` 승격을 보류한다.
- 하나의 파생 자료가 여러 공식 기준선을 설명하면 `baseline_ids`에 모두 기록한다.
- U1은 UI, API, DB, AWS 계정 또는 학습자 데이터 저장을 만들지 않는다. 정적 파일 열람·상대 링크·검사만 범위에 포함한다.

## Sources

- `aidlc/spaces/default/intents/260904-aif-c01-guide/inception/requirements-analysis/requirements.md`
- `aidlc/spaces/default/intents/260904-aif-c01-guide/inception/user-stories/stories.md`
- `aidlc/spaces/default/intents/260904-aif-c01-guide/inception/units-generation/unit-of-work.md`
- `aidlc/spaces/default/intents/260904-aif-c01-guide/inception/units-generation/unit-of-work-story-map.md`
- `aidlc/spaces/default/intents/260904-aif-c01-guide/inception/domain-design/components.md`

## Review

**Verdict:** READY
**Reviewer:** aidlc-architecture-reviewer-agent
**Iteration:** 1
**Request Challenge:** review:45f3f2ee4b5ef94eef3fdfc896245b7f

### Findings

없음. U1의 `BaselineItem`, `SourceRecord`, `SidebarLink` 소유권과 `sources/content-traceability.yaml`의 양방향 stable ID 계약이 승인된 `ReferenceCatalog` 경계와 일치한다. 네 개의 ordered workflow가 기준선 등록, 사이드바·출처 등록, 파생 자료 상태 결정, 양방향 추적성 검사를 모두 다루며 UI/API/DB를 추가하지 않는다. `frontend-components.md`는 spec Unit의 UI 해당 없음만 기록한다.

### Adversarial checks

- 기준선 ID·필수 revision/출처 메타데이터·상태 흐름: 통과
- 기준선↔파생 자료 stable ID 양방향 연결과 URL-only 연결 거부: 통과
- blocked/확인 필요 출처의 `verified` 승격 차단: 통과
- 공식 사이드바와 source registry 완전성 계약: 통과
- U1의 정적 Markdown·YAML·JSON 경계와 UI/API/DB 비포함: 통과

### Validation

- required-sections: `entities.md`, `rules.md`, `functional-spec.md` 통과
- upstream-coverage: 선언된 U1 upstream 계약 참조 통과
- traceability: `traceability.json`의 AC·BR 연결과 reverse 항목 통과
- linter/type-check: TypeScript/JavaScript 코드가 없어 비적용
- UI 산출물: spec Unit으로 실제 UI 설계 없음
