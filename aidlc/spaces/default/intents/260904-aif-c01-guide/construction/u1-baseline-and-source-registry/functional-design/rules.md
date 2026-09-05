# U1 기준선·출처 업무 규칙

<!-- Functional Design summary confirmation: Looks correct -->

## 규칙의 적용 범위

U1의 규칙은 실행형 서비스의 업무 로직이 아니라 `sources/` 정적 파일을 작성·검사할 때 적용하는 결정 규칙이다. 규칙은 공식 시험 범위와 승인된 U1 경계를 벗어나지 않는다.

## Source of Truth

```yaml
unit: u1-baseline-and-source-registry
kind: spec
rules:
  - id: BR1.1
    statement: 공식 기준선 행은 AIF-C01-D<n>-T<n> stable ID로 등록한다.
    category: constraint
    applies_to: BaselineItem
    trigger: 새 공식 revision 또는 작업·기술 행을 등록할 때
    logic: IF 공식 행이 확인되면 THEN 공식 도메인 번호와 행 순서를 보존한 stable ID를 부여한다.
    violation_behaviour: ID가 없거나 중복이면 등록을 거부하고 확인 필요 상태로 남긴다.
    source: FR1.1, NFR3
  - id: BR1.2
    statement: BaselineItem은 공식 출처와 revision 메타데이터를 모두 가져야 한다.
    category: validation
    applies_to: BaselineItem
    trigger: 기준선 행을 검토하거나 파생 자료에 연결할 때
    logic: IF baseline_id, source_id, source_revision, revision_title, official_source_url, official_source_title, checked_date, status 중 하나라도 없으면 THEN 기준선 행을 미완성으로 판정한다.
    violation_behaviour: 해당 행과 이를 참조하는 자료를 verified 대상으로 승격하지 않는다.
    source: FR1.1, FR1.4, FR5.1
  - id: BR1.3
    statement: 확인된 기준선은 문서·문항과 양방향 stable ID로 연결한다.
    category: constraint
    applies_to: BaselineItem와 파생 자료 매니페스트
    trigger: 기준선 또는 파생 자료의 연결 목록을 갱신할 때
    logic: IF BaselineItem의 파생 ID가 존재하면 THEN 파생 자료의 baseline_ids에도 같은 stable ID가 존재해야 한다.
    violation_behaviour: 고아 연결 또는 단방향 연결을 검사 실패로 기록하고 통합을 보류한다.
    source: FR1.3, NFR3
  - id: BR1.4
    statement: 확인된 기준선 행은 최소 하나의 학습 문서와 하나의 문제를 가져야 한다.
    category: policy
    applies_to: BaselineItem
    trigger: 기준선 완전성 검사를 실행할 때
    logic: IF status가 verified이면 THEN learning_document_ids와 question_ids가 각각 하나 이상이어야 한다.
    violation_behaviour: 누락을 GAP으로 기록하고 verified 상태를 허용하지 않는다.
    source: FR1.1, FR1.3, FR4.2
  - id: BR1.5
    statement: blocked 또는 확인 필요 출처는 verified 파생 자료의 근거로 사용할 수 없다.
    category: policy
    applies_to: SourceRecord, BaselineItem, 파생 자료
    trigger: 파생 자료의 문서 상태 또는 출처 상태를 승격할 때
    logic: IF source access_status 또는 baseline status가 blocked/확인 필요이면 THEN 해당 자료는 초안·review 또는 보류 상태만 허용한다.
    violation_behaviour: 승격을 거부하고 차단 사유·영향 자료·후속 확인 대상을 notes에 남긴다.
    source: FR5.2, FR5.3, NFR4
  - id: BR1.6
    statement: 조사한 공식 사이드바 링크는 누락 없이 인벤토리에 등록한다.
    category: validation
    applies_to: SidebarLink, SourceRecord
    trigger: 공식 사이드바 조사 결과를 저장할 때
    logic: IF 사이드바 링크가 조사 결과에 존재하면 THEN aws-sidebar-index.md에 기록하고 source-registry.yaml의 URL·제목·상태와 연결한다.
    violation_behaviour: 링크 누락 또는 registry 불일치를 완전성 검사 실패로 기록한다.
    source: FR1.4, US1.1
  - id: BR1.7
    statement: URL은 stable ID를 대체하지 않는다.
    category: constraint
    applies_to: 모든 U1 연결
    trigger: URL을 기준으로 자료 연결을 만들 때
    logic: IF 문서·문항·카드·퀴즈·Anki가 U1 자료를 참조하면 THEN URL과 함께 source_id 또는 baseline_id를 기록한다.
    violation_behaviour: URL만 있는 연결을 추적성 통과로 인정하지 않는다.
    source: FR1.3, NFR3
  - id: BR1.8
    statement: 기준선 등록·상태 결정·추적성 검사는 정적 파일 검증으로 수행한다.
    category: policy
    applies_to: U1 전체 흐름
    trigger: U1 산출물을 생성하거나 검사할 때
    logic: IF U1 작업을 수행하면 THEN Markdown·YAML·JSON 파일과 정적 검사만 사용하고 AWS API 호출, DB 저장, 웹 UI를 추가하지 않는다.
    violation_behaviour: 실행형 기능이나 U1 외 콘텐츠가 추가되면 범위 위반으로 분류한다.
    source: FR1.1, FR6.3, NFR5
```

## 규칙 요약

| ID | 분류 | 핵심 판단 |
|---|---|---|
| `BR1.1` | constraint | stable ID 형식과 공식 순서를 보존한다. |
| `BR1.2` | validation | 기준선 필수 메타데이터가 모두 있어야 한다. |
| `BR1.3` | constraint | 기준선과 파생 자료는 양방향으로 연결한다. |
| `BR1.4` | policy | 확인된 행은 문서와 문제를 최소 하나씩 가져야 한다. |
| `BR1.5` | policy | 차단·미확인 출처는 verified 자료를 막는다. |
| `BR1.6` | validation | 조사한 사이드바 링크를 registry와 함께 등록한다. |
| `BR1.7` | constraint | URL 연결만으로 stable ID 연결을 대신하지 않는다. |
| `BR1.8` | policy | U1은 정적 파일과 검사 범위에 머문다. |

## Sources

- `aidlc/spaces/default/intents/260904-aif-c01-guide/inception/requirements-analysis/requirements.md`
- `aidlc/spaces/default/intents/260904-aif-c01-guide/inception/user-stories/stories.md`
- `aidlc/spaces/default/intents/260904-aif-c01-guide/inception/units-generation/unit-of-work.md`
- `aidlc/spaces/default/intents/260904-aif-c01-guide/inception/domain-design/components.md`
