# U8 품질 증거 엔터티 모델

## 목적과 범위

이 문서는 `QualityEvidence`가 소유하는 정적 품질 판정 증거의 논리 모델을 정의한다. U8은 학습 문서·출처·기준선·문항·복습 자료의 본문을 소유하거나 수정하지 않는다. U8이 소유하는 것은 각 대상에 대한 검사 결과와 재검사 이력이다.

이 모델은 데이터베이스 스키마가 아니다. 기록은 버전 관리되는 Markdown 보고서와 필요 시 정적 JSON/YAML 검사 결과로 표현되며, 학습자 계정·답안·진도·개인정보를 저장하지 않는다.

## Source of Truth

```yaml
unit: u8-quality-evidence
kind: spec
source_files:
  - quality evidence records owned by U8 under the construction record
  - domain README quality-report links owned by LearningContent
entities:
  - name: QualityCheckRecord
    identifier: check_id
    description: 하나의 안정 ID 대상에 대해 하나의 품질 검사 종류를 수행한 결과와 후속 조치를 나타내는 증거 기록
    attributes:
      - name: check_id
        logical_type: string
        required: true
        unique: true
        allowed_values: QC-<target-type>-<target-id>-<check-type>
        constraints: 영문 소문자·숫자·하이픈과 stable ID를 사용하며 같은 검사 시도에서 중복되지 않는다.
      - name: target_type
        logical_type: enum
        required: true
        unique: false
        allowed_values: [DomainReadme, LearningDocument, GlossaryTerm, QuestionBankItem, ScoreSheet, Card, TermQuizItem, AnkiNote, SourceRecord, BaselineItem]
      - name: target_id
        logical_type: reference
        required: true
        unique: false
        references: target_type별 안정 ID
        constraints: 허용된 target_type의 실제 ID와 일치해야 한다.
      - name: target_path
        logical_type: workspace-relative-path-or-anchor
        required: true
        unique: false
        constraints: workspace root 기준 상대 경로이며 파일 또는 문서 anchor를 가리킨다. 절대 경로와 계정별 로컬 경로를 저장하지 않는다.
      - name: check_type
        logical_type: enum
        required: true
        unique: false
        allowed_values: [source-metadata, baseline-traceability, scope-classification, internal-links, glossary-links, beginner-perspective, concept-unit, markdown-structure, utf8-csv, mermaid-fallback, sensitive-data, question-quality]
      - name: baseline_ids
        logical_type: list<string>
        required: true
        unique: false
        default: []
        references: BaselineItem.baseline_id
        constraints: 대상이 공식 시험 범위 또는 실무 확장 근거와 연결될 때 기준선 ID를 기록한다.
      - name: source_ids
        logical_type: list<string>
        required: true
        unique: false
        default: []
        references: SourceRecord.source_id
      - name: checked_date
        logical_type: date
        required: true
        unique: false
      - name: checker
        logical_type: string
        required: true
        unique: false
        constraints: 검사자 또는 정적 검사 도구의 이름을 기록하며 실제 계정 식별자를 포함하지 않는다.
      - name: result
        logical_type: enum
        required: true
        unique: false
        allowed_values: [통과, 실패, 보류]
      - name: evidence
        logical_type: list<string>
        required: true
        unique: false
        constraints: 검사 명령, 확인한 필드·링크·행·섹션 또는 재현 가능한 관찰을 짧게 기록한다.
      - name: findings
        logical_type: list<string>
        required: true
        unique: false
        default: []
      - name: action
        logical_type: string
        required: true
        unique: false
        constraints: 실패·보류이면 수정, 제거·치환, 출처 재확인 또는 재검사 계획을 기록한다. 통과이면 none을 기록할 수 있다.
      - name: recheck_result
        logical_type: enum-or-null
        required: true
        unique: false
        allowed_values: [통과, 실패, 보류, null]
        default: null
      - name: source_status_at_check
        logical_type: enum-or-null
        required: true
        unique: false
        allowed_values: [discovered, downloaded, summarized, reviewed, verified, blocked, 확인 필요, null]
        default: null
      - name: document_status_at_check
        logical_type: enum-or-null
        required: true
        unique: false
        allowed_values: [draft, review, verified, null]
        default: null
    entity_constraints:
      - 같은 target_id와 check_type에 대해 현재 유효한 판정은 하나만 두고, 재검사는 이전 기록을 덮어쓰지 않고 새 시도 또는 명시적인 recheck_result로 연결한다.
      - `result: 통과`는 evidence가 비어 있지 않아야 한다.
      - `result: 실패` 또는 `result: 보류`는 findings와 action을 각각 기록해야 한다.
      - source_status_at_check와 document_status_at_check는 서로 다른 상태 체계이며 하나를 다른 하나의 대체값으로 사용하지 않는다.
      - target_type과 target_id가 허용 대상 집합 밖이면 기록을 거부한다.
      - `verified` 승격에 영향을 주는 검사에서 원본 출처가 blocked 또는 확인 필요이면 통과만으로 승격을 허용하지 않는다.
      - 실제 비밀·토큰·자격 증명·PII·AWS 계정 식별자는 evidence, findings, 로그와 예시에 기록하지 않는다.

relationships:
  - from: QualityCheckRecord
    to: LearningContent-owned target
    cardinality: many-to-one
    direction: QualityCheckRecord -> DomainReadme|LearningDocument|GlossaryTerm
  - from: QualityCheckRecord
    to: AssessmentContent-owned target
    cardinality: many-to-one
    direction: QualityCheckRecord -> QuestionBankItem|ScoreSheet|Card|TermQuizItem|AnkiNote
  - from: QualityCheckRecord
    to: ReferenceCatalog-owned target
    cardinality: many-to-one
    direction: QualityCheckRecord -> SourceRecord|BaselineItem
  - from: QualityCheckRecord
    to: BaselineItem
    cardinality: many-to-many
    direction: baseline_ids를 통한 양방향 추적
  - from: QualityCheckRecord
    to: SourceRecord
    cardinality: many-to-many
    direction: source_ids를 통한 출처 추적
```

## 엔터티 요약

| 엔터티 | 소유 컴포넌트 | 안정 ID | 저장·표현 경계 | 핵심 책임 |
|---|---|---|---|---|
| `QualityCheckRecord` | `QualityEvidence` | `check_id` | 정적 품질 증거 기록 | 대상·검사 종류·판정·근거·조치·재검사를 추적 |

U8은 `QualityReport`라는 별도 업무 엔터티를 만들지 않는다. 통합 보고서는 여러 `QualityCheckRecord`를 대상으로 한 파생 Markdown 뷰이며, 원본 판정과 재검사 이력의 source of truth가 아니다.

## 허용 품질 검사 대상

| `target_type` | 안정 ID 규칙 | 대표 `target_path` | 원 소유 Unit |
|---|---|---|---|
| `DomainReadme` | `D<n>-README` | `docs/0<n>-*/README.md` | U2~U6 |
| `LearningDocument` | `LD-<domain>-<slug>` | `docs/0<n>-*/<slug>.md` | U2~U6 |
| `GlossaryTerm` | `TERM-<slug>` | `docs/glossary.md#<slug>` | U2~U6 |
| `QuestionBankItem` | `Q-<n>` | `assessment/question-bank.md#q-<n>` | U7 |
| `ScoreSheet` | `SCORE-<slug>` | `assessment/score-sheet.md` | U7 |
| `Card` | `CARD-<slug>` | `assessment/cards.md#<slug>` | U7 |
| `TermQuizItem` | `TQ-<n>` | `assessment/term-quiz.md#tq-<n>` | U7 |
| `AnkiNote` | `ANKI-<n>` | `assessment/anki.csv#anki-<n>` | U7 |
| `SourceRecord` | `SRC-<slug>` | `sources/source-registry.yaml#<slug>` | U1 |
| `BaselineItem` | `AIF-C01-D<n>-T<n>` | `sources/content-traceability.yaml#<id>` | U1 |

`QualityCheckRecord`는 대상 콘텐츠를 소유하지 않는다. 예를 들어 `LearningDocument`의 내용 변경은 U2~U6이 하고, U8은 변경 전후의 검사 증거만 기록한다.

## Sources

- `aidlc/spaces/default/intents/260904-aif-c01-guide/inception/domain-design/components.md`
- `aidlc/spaces/default/intents/260904-aif-c01-guide/inception/units-generation/unit-of-work.md`
- `aidlc/spaces/default/intents/260904-aif-c01-guide/inception/units-generation/unit-of-work-story-map.md`
- `aidlc/spaces/default/intents/260904-aif-c01-guide/inception/requirements-analysis/requirements.md`
