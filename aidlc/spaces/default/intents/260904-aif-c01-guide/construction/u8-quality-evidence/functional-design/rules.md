# U8 품질 증거 업무 규칙

## 규칙의 적용 범위

U8의 규칙은 실행형 품질 플랫폼의 업무 로직이 아니라 버전 관리되는 Markdown·CSV와 U1 기준선·출처 계약을 검사하는 정적 판정 규칙이다. U8은 실패한 콘텐츠를 직접 고치지 않고, 소유 Unit이 수정할 수 있도록 재현 가능한 근거와 조치를 남긴다.

## Source of Truth

```yaml
unit: u8-quality-evidence
kind: spec
rules:
  - id: BR8.1
    statement: 품질 기록은 허용된 대상 유형과 안정 ID에만 연결한다.
    category: validation
    applies_to: QualityCheckRecord
    trigger: 검사 기록을 생성하거나 대상을 해석할 때
    logic: IF target_type과 target_id가 허용 대상 집합과 실제 파일·anchor에 일치하면 THEN 기록을 수락한다.
    violation_behaviour: 대상 경로 또는 stable ID가 없거나 불일치하면 기록을 거부하고 `실패`로 임의 기록하지 않는다.
    source: FR6.1, FR6.2, NFR3
  - id: BR8.2
    statement: 출처 상태와 문서 상태는 독립적인 상태 체계로 기록한다.
    category: constraint
    applies_to: QualityCheckRecord, SourceRecord, LearningDocument
    trigger: 상태와 검사 결과를 기록할 때
    logic: IF 출처 상태를 기록하면 THEN `discovered|downloaded|summarized|reviewed|verified|blocked|확인 필요` 중 하나를 사용하고, 문서 상태는 별도로 `draft|review|verified` 중 하나를 사용한다.
    violation_behaviour: 한 상태 체계의 값을 다른 체계의 값으로 대체한 기록을 무효로 판정한다.
    source: FR5.1, FR5.2, NFR4
  - id: BR8.3
    statement: blocked 또는 확인 필요 출처에 의존하는 자료는 verified로 승격하지 않는다.
    category: policy
    applies_to: SourceRecord, BaselineItem, LearningDocument, QuestionBankItem, Card, TermQuizItem, AnkiNote
    trigger: 문서·문항·복습 자료의 최종 상태를 판정할 때
    logic: IF 연결된 source 또는 baseline의 상태가 blocked 또는 확인 필요이면 THEN 파생 자료는 `draft`, `review` 또는 보류 상태만 허용한다.
    violation_behaviour: 승격을 차단하고 차단 사유, 영향 자료, 후속 확인 대상을 findings와 action에 기록한다.
    source: FR5.2, FR5.3, NFR4, NFR8
  - id: BR8.4
    statement: 공식 기준선과 파생 자료의 추적 연결은 양방향이고 고아가 없어야 한다.
    category: constraint
    applies_to: BaselineItem, LearningDocument, QuestionBankItem, Card, TermQuizItem, AnkiNote, QualityCheckRecord
    trigger: 기준선 완전성 또는 자료 매핑을 검사할 때
    logic: IF 자료가 baseline_ids를 갖거나 기준선이 파생 ID를 갖으면 THEN 양쪽에 같은 stable ID가 존재하고 실제 대상에 도달해야 한다.
    violation_behaviour: 누락·단방향·중복·고아 연결을 `실패` 또는 `보류`로 기록하고 통합을 막는다.
    source: FR1.3, FR6.1, NFR3
  - id: BR8.5
    statement: 공식 URL과 사용 출처의 메타데이터는 U1 등록부와 일치해야 한다.
    category: validation
    applies_to: SourceRecord, BaselineItem, QualityCheckRecord
    trigger: 외부 사실의 출처와 revision을 검사할 때
    logic: IF 자료가 외부 사실을 포함하면 THEN URL, 공식 제목, source_type, parent_topic, domain_mappings, checked_date, access_status, revision_title과 연결 문서를 registry에서 확인한다.
    violation_behaviour: 누락·불일치·중복 URL을 findings에 기록하고 해당 자료의 확정을 보류한다.
    source: FR1.4, FR5.1, FR6.1, NFR4
  - id: BR8.6
    statement: 내부 링크와 용어 연결은 실제 대상과 양방향으로 확인되어야 한다.
    category: validation
    applies_to: DomainReadme, LearningDocument, GlossaryTerm, Card, TermQuizItem, AnkiNote
    trigger: 문서 탐색과 glossary·복습 매핑을 검사할 때
    logic: IF 문서가 이전·다음 문서, glossary, 카드, 퀴즈 또는 Anki를 참조하면 THEN 상대 경로·anchor와 대상 stable ID가 실제로 존재하고 되돌아오는 연결을 제공한다.
    violation_behaviour: 끊긴 링크·없는 anchor·고아 용어를 findings에 기록하고 결과를 `실패` 또는 `보류`로 판정한다.
    source: FR3.2, FR3.3, FR6.2, NFR2, NFR3
  - id: BR8.7
    statement: 초보자 관점과 개념 단위 검사는 요구된 학습 흐름을 모두 확인해야 한다.
    category: validation
    applies_to: DomainReadme, LearningDocument
    trigger: 학습 문서 품질을 판정할 때
    logic: IF 문서를 검사하면 THEN 선수 지식, 목표, 쉬운 설명·예시, AWS 관점, 비교, 시나리오, 시험 판단 단서, 오해, 확인 질문, 다음 문서 연결과 하나의 핵심 개념 범위를 각각 확인한다.
    violation_behaviour: 누락 또는 관련 없는 개념 혼합을 findings에 기록하고 문서 분리·보완 후 재검사를 요구한다.
    source: FR2.2, FR2.3, FR2.4, FR6.4, NFR1, NFR5
  - id: BR8.8
    statement: Markdown·YAML front matter·CSV의 인코딩과 구조를 검사한다.
    category: validation
    applies_to: LearningDocument, DomainReadme, QuestionBankItem, ScoreSheet, Card, TermQuizItem, AnkiNote
    trigger: 정적 파일 형식과 접근성을 검사할 때
    logic: IF 파일을 검사하면 THEN UTF-8, 제목 계층, 내부 링크, 허용 front matter 상태, Anki `front,back` 헤더와 일반 CSV 파서 호환성을 확인한다.
    violation_behaviour: 파싱 실패, 잘못된 인코딩, 누락 헤더 또는 비논리적 제목 계층을 findings에 기록하고 `verified`를 허용하지 않는다.
    source: FR3.4, FR5.1, FR6.2, NFR2, NFR6
  - id: BR8.9
    statement: Mermaid·이미지의 핵심 의미는 텍스트 fallback으로 읽을 수 있어야 한다.
    category: accessibility
    applies_to: LearningDocument, DomainReadme, QualityCheckRecord
    trigger: Mermaid 또는 이미지를 포함한 자료를 검사할 때
    logic: IF 자료에 Mermaid·이미지가 있으면 THEN 구문 또는 접근 가능성을 확인하고 노드·순서·분기·결론을 설명하는 인접 텍스트, 캡션 또는 한국어 alt text가 존재해야 한다.
    violation_behaviour: 외부 렌더러·색상·이미지에만 의존하면 `실패`로 기록하고 텍스트 대체 설명을 추가하도록 action을 남긴다.
    source: AC2.1.5, AC5.1.5, FR6.4, NFR2, NFR8
  - id: BR8.10
    statement: 예시·로그·출처 메타데이터·CSV와 변경 파일에 비밀·PII가 없어야 한다.
    category: security
    applies_to: all quality targets and quality evidence
    trigger: 민감정보 검사를 실행할 때
    logic: IF 토큰, 자격 증명, 실제 계정 식별자, 개인정보 또는 서명된 URL 패턴이 발견되면 THEN 제거·치환·보류 후 재검사한다.
    violation_behaviour: 발견 내용을 그대로 증거에 복사하지 않고 안전한 패턴 설명과 조치만 기록한다.
    source: FR6.4, NFR7
  - id: BR8.11
    statement: 실패·보류 판정은 조치와 재검사 결과 없이는 완료되지 않는다.
    category: constraint
    applies_to: QualityCheckRecord
    trigger: 품질 보고서를 통합하거나 문서를 verified로 승격할 때
    logic: IF result가 `실패` 또는 `보류`이면 THEN findings, action, 후속 검사 시점과 recheck_result를 기록하고, 통과 전에는 완료로 집계하지 않는다.
    violation_behaviour: 근거 없는 통과·verified 승격을 거부하고 미해결 항목으로 유지한다.
    source: FR6.1, FR6.4, NFR4, NFR8
  - id: BR8.12
    statement: U8은 정적 품질 증거만 만들며 학습자 데이터를 수집하지 않는다.
    category: policy
    applies_to: QualityEvidence 전체
    trigger: 검사 흐름이나 출력 계약을 설계할 때
    logic: IF U8 기능을 정의하면 THEN Markdown·CSV·정적 검사 결과·보고서 링크만 사용하고 UI, API, DB, AWS 계정, 답안·진도 저장, 자동 최신성 모니터링을 추가하지 않는다.
    violation_behaviour: 실행형 기능 또는 데이터 수집 요구를 범위 위반으로 거부하고 해당 내용을 별도 구현 대상으로 만들지 않는다.
    source: FR4.5, FR6.3, NFR6, NFR7
```

## 규칙 요약

| ID | 분류 | 핵심 판단 |
|---|---|---|
| `BR8.1` | validation | 허용된 stable ID 대상만 검사한다. |
| `BR8.2` | constraint | 출처 상태와 문서 상태를 분리한다. |
| `BR8.3` | policy | blocked/확인 필요 출처는 `verified` 승격을 막는다. |
| `BR8.4` | constraint | 공식 기준선과 파생 자료의 양방향 추적성을 검사한다. |
| `BR8.5` | validation | URL·제목·revision·상태가 U1 registry와 일치해야 한다. |
| `BR8.6` | validation | 내부 링크·glossary·복습 연결의 실제 도달성을 확인한다. |
| `BR8.7` | validation | 초보자 관점과 개념 단위 문서 구조를 검사한다. |
| `BR8.8` | validation | UTF-8·Markdown·YAML·CSV 구조를 검사한다. |
| `BR8.9` | accessibility | Mermaid·이미지의 텍스트 fallback을 요구한다. |
| `BR8.10` | security | 민감정보를 제거·치환·보류하고 증거에 복사하지 않는다. |
| `BR8.11` | constraint | 실패·보류는 조치와 재검사 전까지 완료되지 않는다. |
| `BR8.12` | policy | U8은 정적 증거와 비수집 경계에 머문다. |

## Sources

- `aidlc/spaces/default/intents/260904-aif-c01-guide/inception/requirements-analysis/requirements.md`
- `aidlc/spaces/default/intents/260904-aif-c01-guide/inception/user-stories/stories.md`
- `aidlc/spaces/default/intents/260904-aif-c01-guide/inception/units-generation/unit-of-work.md`
- `aidlc/spaces/default/intents/260904-aif-c01-guide/inception/domain-design/components.md`
