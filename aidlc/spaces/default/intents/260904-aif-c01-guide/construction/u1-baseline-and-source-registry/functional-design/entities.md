# U1 엔터티 모델

<!-- Functional Design summary confirmation: Looks correct -->

## 목적과 범위

이 문서는 `u1-baseline-and-source-registry`가 소유하는 정적 기준선·출처 등록 계약을 정의한다. 이는 실행형 애플리케이션의 데이터베이스 모델이 아니라 `sources/aws-sidebar-index.md`, `sources/source-registry.yaml`, `sources/content-traceability.yaml`에 기록할 논리 구조다.

U1은 `ReferenceCatalog` 컴포넌트에 속한다. `LearningContent`, `AssessmentContent`, `QualityEvidence`는 U1의 안정 ID와 상태를 참조하지만 U1의 콘텐츠를 대신 소유하지 않는다.

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
    description: 공식 AIF-C01 시험 안내서의 도메인·작업·기술 행을 나타내는 영구 기준선 항목
    attributes:
      - name: baseline_id
        logical_type: string
        required: true
        unique: true
        allowed_values: AIF-C01-D<n>-T<n>
        constraints: 공식 안내서의 도메인 번호와 항목 순서를 보존하며 임의 재번호화하지 않는다.
      - name: source_id
        logical_type: reference
        required: true
        unique: false
        references: SourceRecord.source_id
      - name: source_revision
        logical_type: string
        required: true
        unique: false
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
      - name: source_checked
        logical_type: date
        required: true
        unique: false
      - name: checked_date
        logical_type: date
        required: true
        unique: false
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
    entity_constraints:
      - 확인된 기준선은 learning_document_ids와 question_ids를 각각 하나 이상 가져야 한다.
      - blocked 또는 확인 필요 출처에 의존하는 기준선은 verified 파생 자료를 허용하지 않는다.

  - name: SourceRecord
    identifier: source_id
    description: 공식 시험 안내서나 AWS 공식 자료의 URL과 확인 상태를 관리하는 출처 행
    attributes:
      - name: source_id
        logical_type: string
        required: true
        unique: true
        allowed_values: SRC-<slug>
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
        logical_type: date
        required: true
        unique: false
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
      - name: linked_document_ids
        logical_type: list<string>
        required: true
        unique: false
        default: []
      - name: linked_question_ids
        logical_type: list<string>
        required: true
        unique: false
        default: []
      - name: linked_card_ids
        logical_type: list<string>
        required: true
        unique: false
        default: []
      - name: linked_quiz_ids
        logical_type: list<string>
        required: true
        unique: false
        default: []
      - name: linked_anki_ids
        logical_type: list<string>
        required: true
        unique: false
        default: []
      - name: notes
        logical_type: string
        required: true
    entity_constraints:
      - URL은 한 SourceRecord에서만 유일하게 관리한다.
      - blocked 출처는 차단 사유·영향 자료·후속 확인 대상을 notes에 기록한다.

  - name: SidebarLink
    identifier: link_id
    description: AWS 공식 사이드바에서 발견한 링크와 상위 주제를 보존하는 인벤토리 행
    attributes:
      - name: link_id
        logical_type: string
        required: true
        unique: true
        allowed_values: SIDE-<slug>
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
      - name: source_id
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
      - 사이드바 URL은 source-registry.yaml의 SourceRecord.url과 일치하거나 등록 대기 상태를 명시해야 한다.

relationships:
  - from: BaselineItem
    to: SourceRecord
    cardinality: many-to-one
    direction: BaselineItem -> SourceRecord
  - from: SidebarLink
    to: SourceRecord
    cardinality: many-to-one
    direction: SidebarLink -> SourceRecord
  - from: BaselineItem
    to: LearningDocument
    cardinality: many-to-many
    direction: 양방향 baseline_ids와 learning_document_ids
  - from: BaselineItem
    to: QuestionBankItem
    cardinality: many-to-many
    direction: 양방향 baseline_ids와 question_ids
  - from: BaselineItem
    to: Card
    cardinality: many-to-many
    direction: 양방향 baseline_ids와 card_ids
  - from: BaselineItem
    to: TermQuizItem
    cardinality: many-to-many
    direction: 양방향 baseline_ids와 quiz_ids
  - from: BaselineItem
    to: AnkiNote
    cardinality: many-to-many
    direction: 양방향 baseline_ids와 anki_ids
```

## 엔터티 요약

| 엔터티 | 소유 컴포넌트 | 안정 ID | 저장 위치 | 핵심 책임 |
|---|---|---|---|---|
| `BaselineItem` | `ReferenceCatalog` | `AIF-C01-D<n>-T<n>` | `sources/content-traceability.yaml` | 공식 범위 행과 파생 자료 ID의 canonical 연결 |
| `SourceRecord` | `ReferenceCatalog` | `SRC-<slug>` | `sources/source-registry.yaml` | URL, 제목, 출처 유형, 확인일, 접근 상태와 영향 자료 연결 |
| `SidebarLink` | `ReferenceCatalog` | `SIDE-<slug>` | `sources/aws-sidebar-index.md` 및 registry | 사이드바 전체 링크 누락 방지와 상위 주제 보존 |

`LearningDocument`, `QuestionBankItem`, `Card`, `TermQuizItem`, `AnkiNote`의 실제 콘텐츠는 각각 `LearningContent`와 `AssessmentContent`가 소유한다. U1은 그 자료의 내용을 복제하지 않고 기준선·출처 ID와 양방향 배열만 제공한다.

## 설계 결정

- URL만으로 연결하지 않고 stable ID와 양방향 배열을 함께 사용해 URL 변경과 중복을 추적한다.
- `status`와 `access_status`는 문서 상태(`draft|review|verified`)와 별개로 유지한다.
- 실제 공식 URL·revision·작업·기술 행은 조사 단계에서 확인한 뒤 기록한다. 현재 설계 문서에는 확인되지 않은 URL이나 시험 항목을 발명하지 않는다.

## Sources

- `aidlc/spaces/default/intents/260904-aif-c01-guide/inception/domain-design/components.md`
- `aidlc/spaces/default/intents/260904-aif-c01-guide/inception/units-generation/unit-of-work.md`
- `aidlc/spaces/default/intents/260904-aif-c01-guide/inception/requirements-analysis/requirements.md`
