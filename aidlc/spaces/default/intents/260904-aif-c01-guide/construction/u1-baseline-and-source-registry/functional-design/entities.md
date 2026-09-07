# U1 엔터티 모델

## 목적과 범위

이 문서는 `u1-baseline-and-source-registry`가 소유하는 정적 기준선·출처·사이드바 추적 계약을 정의한다. 실행형 애플리케이션의 데이터베이스 모델이 아니라 다음 정적 파일에 기록할 논리 구조다.

- `sources/aws-sidebar-index.md`
- `sources/source-registry.yaml`
- `sources/content-traceability.yaml`

U1은 `ReferenceCatalog`에 속한다. `LearningContent`, `AssessmentContent`, `QualityEvidence`는 U1의 stable ID와 상태를 참조하지만 U1이 그들의 본문이나 품질 판정을 소유하지 않는다.

## Source of Truth

```yaml
unit: u1-baseline-and-source-registry
kind: spec
source_files:
  - sources/aws-sidebar-index.md
  - sources/source-registry.yaml
  - sources/content-traceability.yaml
entities:
  - name: BaselineItem
    identifier: baseline_id
    description: 공식 AIF-C01 시험 안내서의 도메인·작업·기술 행과 파생 자료 연결을 나타내는 영구 기준선 항목
    attributes:
      - name: baseline_id
        logical_type: string
        required: true
        unique: true
        allowed_values: ["AIF-C01-D<n>-T<n>"]
        constraints: 공식 안내서의 도메인 번호와 확인된 행 순서를 반영하며 기존 ID를 변경하거나 재사용하지 않는다.
      - name: source_id
        logical_type: reference
        required: true
        unique: false
        references: SourceRecord.source_id
      - name: source_revision
        logical_type: string
        required: true
        unique: false
        constraints: 확인된 공식 시험 안내서 revision 식별자. 확인 전에는 추측하지 않고 notes에 확인 필요를 기록한다.
      - name: revision_title
        logical_type: string
        required: true
        unique: false
      - name: domain
        logical_type: enum
        required: true
        unique: false
        allowed_values: [D1, D2, D3, D4, D5]
      - name: task
        logical_type: string
        required: true
        unique: false
      - name: technology
        logical_type: string
        required: true
        unique: false
      - name: official_source_url
        logical_type: url
        required: true
        unique: false
        references: SourceRecord.url
      - name: official_source_title
        logical_type: string
        required: true
        unique: false
        references: SourceRecord.title
      - name: checked_date
        logical_type: string
        required: true
        unique: false
        format: YYYY-MM-DD
        semantic: 요구사항이 요구하는 기준선 행의 공식 출처 확인일
      - name: source_checked
        logical_type: string
        required: true
        unique: false
        format: YYYY-MM-DD
        semantic: Unit 계약이 요구하는 기준선 canonical 확인일. checked_date와 동일한 값이어야 한다.
      - name: status
        logical_type: enum
        required: true
        unique: false
        allowed_values: [discovered, downloaded, summarized, reviewed, verified, blocked]
      - name: learning_document_ids
        logical_type: list<string>
        required: true
        unique: false
        default: []
        references: LearningDocument.document_id
      - name: question_ids
        logical_type: list<string>
        required: true
        unique: false
        default: []
        references: QuestionBankItem.question_id
      - name: card_ids
        logical_type: list<string>
        required: true
        unique: false
        default: []
        references: Card.card_id
      - name: quiz_ids
        logical_type: list<string>
        required: true
        unique: false
        default: []
        references: TermQuizItem.quiz_item_id
      - name: anki_ids
        logical_type: list<string>
        required: true
        unique: false
        default: []
        references: AnkiNote.anki_id
      - name: notes
        logical_type: string
        required: true
        unique: false
        constraints: 확인되지 않은 값은 notes에 정확히 `확인 필요:` 접두어와 사유·후속 대상을 기록한다.
    entity_constraints:
      - baseline_id, source_id, source_revision, revision_title, domain, task, technology, official_source_url, official_source_title, checked_date, source_checked, status, 모든 파생 ID 배열, notes는 필수다.
      - checked_date와 source_checked는 모두 YYYY-MM-DD 형식이며 문자 단위로 같아야 한다.
      - checked_date와 source_checked는 연결된 SourceRecord.checked_date와 문자 단위로 같아야 한다.
      - 확인된 기준선(status: verified)은 learning_document_ids와 question_ids를 각각 하나 이상 가져야 한다.
      - 파생 자료 배열의 ID는 중복될 수 없고, 각 ID는 해당 파생 자료의 baseline_ids와 양방향으로 일치해야 한다.
      - 공식 행의 의미가 revision에서 바뀌면 이전 baseline_id를 변경·재사용하지 않는다. 이전 행은 blocked와 notes의 superseded 설명으로 보류하고, 새 행은 사용하지 않은 ID로 등록한다.

  - name: SourceRecord
    identifier: source_id
    description: 공식 시험 안내서·AWS 공식 자료의 URL, 성격, 확인 상태와 역방향 연결을 관리하는 출처 행
    attributes:
      - name: source_id
        logical_type: string
        required: true
        unique: true
        allowed_values: ["SRC-<slug>"]
      - name: url
        logical_type: url
        required: true
        unique: true
      - name: title
        logical_type: string
        required: true
        unique: false
      - name: source_type
        logical_type: enum
        required: true
        unique: false
        allowed_values: [certification-guide, aws-documentation, aws-official-blog, skill-builder]
      - name: parent_topic
        logical_type: string
        required: true
        unique: false
      - name: domain_mappings
        logical_type: list<enum>
        required: true
        unique: false
        allowed_values: [D1, D2, D3, D4, D5, FOUNDATION, EXAM]
      - name: checked_date
        logical_type: string
        required: true
        unique: false
        format: YYYY-MM-DD
      - name: access_status
        logical_type: enum
        required: true
        unique: false
        allowed_values: [discovered, downloaded, summarized, reviewed, verified, blocked]
      - name: linked_baseline_ids
        logical_type: list<string>
        required: true
        unique: false
        default: []
        references: BaselineItem.baseline_id
      - name: linked_sidebar_ids
        logical_type: list<string>
        required: true
        unique: false
        default: []
        references: SidebarLink.link_id
      - name: linked_document_ids
        logical_type: list<string>
        required: true
        unique: false
        default: []
        references: LearningDocument.document_id
      - name: linked_question_ids
        logical_type: list<string>
        required: true
        unique: false
        default: []
        references: QuestionBankItem.question_id
      - name: linked_card_ids
        logical_type: list<string>
        required: true
        unique: false
        default: []
        references: Card.card_id
      - name: linked_quiz_ids
        logical_type: list<string>
        required: true
        unique: false
        default: []
        references: TermQuizItem.quiz_item_id
      - name: linked_anki_ids
        logical_type: list<string>
        required: true
        unique: false
        default: []
        references: AnkiNote.anki_id
      - name: notes
        logical_type: string
        required: true
        unique: false
    entity_constraints:
      - URL은 SourceRecord 사이에서 유일해야 하며 URL만으로 파생 자료를 연결하지 않는다.
      - linked_baseline_ids는 BaselineItem.source_id가 이 SourceRecord를 가리키는 ID 집합과 정확히 같아야 한다.
      - linked_sidebar_ids는 SidebarLink.linked_source_id가 이 SourceRecord를 가리키는 ID 집합과 정확히 같아야 한다.
      - linked_document_ids, linked_question_ids, linked_card_ids, linked_quiz_ids, linked_anki_ids는 파생 자료가 선언한 source_ids의 역방향 집합과 같아야 한다.
      - blocked 출처는 notes에 차단 사유, 영향받는 자료, 후속 확인 대상을 기록한다.

  - name: SidebarLink
    identifier: link_id
    description: 공식 사이드바에서 발견한 링크와 상위 주제를 보존하는 인벤토리 행
    attributes:
      - name: link_id
        logical_type: string
        required: true
        unique: true
        allowed_values: ["SIDE-<slug>"]
      - name: url
        logical_type: url
        required: true
        unique: true
        references: SourceRecord.url
      - name: title
        logical_type: string
        required: true
        unique: false
      - name: parent_topic
        logical_type: string
        required: true
        unique: false
      - name: related_domain
        logical_type: enum
        required: true
        unique: false
        allowed_values: [D1, D2, D3, D4, D5, FOUNDATION, EXAM]
      - name: linked_source_id
        logical_type: reference
        required: true
        unique: false
        references: SourceRecord.source_id
      - name: access_status
        logical_type: enum
        required: true
        unique: false
        allowed_values: [discovered, downloaded, summarized, reviewed, verified, blocked]
    entity_constraints:
      - linked_source_id는 정확히 하나의 SourceRecord.source_id를 가리켜야 한다.
      - linked_source_id와 URL이 가리키는 SourceRecord는 동일해야 한다.
      - linked_source_id가 가리키는 SourceRecord.linked_sidebar_ids에 link_id가 있어야 한다.
      - SidebarLink의 source_id라는 별도 alias 필드는 허용하지 않는다.

relationships:
  - from: BaselineItem
    to: SourceRecord
    cardinality: many-to-one
    direction: BaselineItem.source_id -> SourceRecord.source_id
  - from: SidebarLink
    to: SourceRecord
    cardinality: many-to-one
    direction: SidebarLink.linked_source_id -> SourceRecord.source_id; reverse SourceRecord.linked_sidebar_ids
  - from: BaselineItem
    to: LearningDocument
    cardinality: many-to-many
    direction: BaselineItem.learning_document_ids <-> LearningDocument.baseline_ids
  - from: BaselineItem
    to: QuestionBankItem
    cardinality: many-to-many
    direction: BaselineItem.question_ids <-> QuestionBankItem.baseline_ids
  - from: BaselineItem
    to: Card
    cardinality: many-to-many
    direction: BaselineItem.card_ids <-> Card.baseline_ids
  - from: BaselineItem
    to: TermQuizItem
    cardinality: many-to-many
    direction: BaselineItem.quiz_ids <-> TermQuizItem.baseline_ids
  - from: BaselineItem
    to: AnkiNote
    cardinality: many-to-many
    direction: BaselineItem.anki_ids <-> AnkiNote.baseline_ids
  - from: SourceRecord
    to: LearningDocument
    cardinality: many-to-many
    direction: SourceRecord.linked_document_ids <-> LearningDocument.source_ids
  - from: SourceRecord
    to: QuestionBankItem
    cardinality: many-to-many
    direction: SourceRecord.linked_question_ids <-> QuestionBankItem.source_ids
  - from: SourceRecord
    to: Card
    cardinality: many-to-many
    direction: SourceRecord.linked_card_ids <-> Card.source_ids
  - from: SourceRecord
    to: TermQuizItem
    cardinality: many-to-many
    direction: SourceRecord.linked_quiz_ids <-> TermQuizItem.source_ids
  - from: SourceRecord
    to: AnkiNote
    cardinality: many-to-many
    direction: SourceRecord.linked_anki_ids <-> AnkiNote.source_ids
```

## 엔터티 요약

| 엔터티 | 소유 컴포넌트 | 안정 ID | 저장 위치 | 핵심 책임 |
|---|---|---|---|---|
| `BaselineItem` | `ReferenceCatalog` | `AIF-C01-D<n>-T<n>` | `sources/content-traceability.yaml` | 공식 범위 행, revision, 상태, 파생 자료의 canonical 연결 |
| `SourceRecord` | `ReferenceCatalog` | `SRC-<slug>` | `sources/source-registry.yaml` | URL·출처 성격·확인일·접근 상태와 기준선·파생 자료 역방향 연결 |
| `SidebarLink` | `ReferenceCatalog` | `SIDE-<slug>` | `sources/aws-sidebar-index.md` 및 registry | 사이드바 링크 전체 인벤토리와 SourceRecord 연결 |

`LearningDocument`, `QuestionBankItem`, `Card`, `TermQuizItem`, `AnkiNote`의 본문은 각각 다른 Unit이 소유한다. U1은 이 자료를 복제하지 않고 stable ID와 상태·출처 연결 계약만 제공한다.

## 설계 결정

1. **Stable ID 우선**: URL은 변경될 수 있으므로 URL을 primary key로 사용하지 않는다. 모든 기준선·사이드바·파생 자료 연결은 stable ID를 사용하고 URL은 보조 검증으로만 사용한다.
2. **두 날짜 필드의 명시적 호환**: 요구사항의 `checked_date`와 Unit 계약의 `source_checked`를 모두 보존하되 같은 날짜를 강제한다. 둘 중 하나만 채우거나 값이 다르면 실패로 판정한다.
3. **기계 상태와 보류 표지 분리**: `status`와 `access_status`의 허용 enum은 요구사항의 상태 집합을 유지한다. 값이 확인되지 않은 경우 enum에 임의 값을 추가하지 않고 `notes`에 `확인 필요:`와 사유·후속 대상을 기록한다.
4. **정적 파일 경계**: U1은 Markdown·YAML·JSON의 구조·링크·추적성만 정의하며 AWS API, DB, UI, 학습자 데이터 저장을 만들지 않는다.

## Sources

- `aidlc/spaces/default/intents/260904-aif-c01-guide/inception/requirements-analysis/requirements.md`
- `aidlc/spaces/default/intents/260904-aif-c01-guide/inception/units-generation/unit-of-work.md`
- `aidlc/spaces/default/intents/260904-aif-c01-guide/inception/units-generation/unit-of-work-story-map.md`
- `aidlc/spaces/default/intents/260904-aif-c01-guide/inception/domain-design/components.md`
