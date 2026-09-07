# U1 기준선·출처 업무 규칙

## 규칙의 적용 범위

U1의 규칙은 실행형 서비스의 업무 로직이 아니라 `sources/` 정적 파일을 등록·갱신·검사할 때 적용하는 결정 규칙이다. U1은 공식 기준선·출처·사이드바와 이를 참조하는 파생 자료의 stable ID 계약을 제공한다. 파생 자료의 본문과 품질 판정은 각 소유 Unit이 책임진다.

## Source of Truth

```yaml
unit: u1-baseline-and-source-registry
kind: spec
rules:
  - id: BR1.1
    statement: 공식 기준선 행은 AIF-C01-D<n>-T<n> stable ID로 등록하고 ID를 변경하거나 재사용하지 않는다.
    category: constraint
    applies_to: BaselineItem
    trigger: 공식 시험 안내서의 revision 또는 작업·기술 행을 등록하거나 갱신할 때
    logic: IF 공식 행의 도메인 번호와 행 순서가 확인되면 THEN 그 값을 반영한 stable ID를 부여한다. IF 기존 행의 의미가 revision에서 바뀌면 THEN 이전 ID를 보존하고 새로 사용하지 않은 ID를 발급한다.
    violation_behaviour: ID가 없거나 중복·재사용이면 등록을 거부하고 해당 행을 verified로 승격하지 않는다.
    source: FR1.1, NFR3
  - id: BR1.2
    statement: 기준선 행은 공식 출처·revision·확인일의 필수 메타데이터를 모두 가져야 한다.
    category: validation
    applies_to: BaselineItem, SourceRecord
    trigger: 기준선 행을 저장하거나 파생 자료에 연결할 때
    logic: IF baseline_id, source_id, source_revision, revision_title, domain, task, technology, official_source_url, official_source_title, checked_date, source_checked, status 중 하나라도 없거나 날짜 형식이 YYYY-MM-DD가 아니거나 checked_date != source_checked 또는 SourceRecord.checked_date와 다르면 THEN 행을 불완전으로 판정한다.
    violation_behaviour: 해당 행과 영향을 받는 파생 자료를 verified 대상으로 승격하지 않고 형식·누락·불일치를 fail-closed로 기록한다. BaselineItem.checked_date와 BaselineItem.source_checked는 alias가 아니라 동일성을 검증하는 두 필수 표현이다.
    source: FR1.1, FR1.4, FR5.1, NFR4
  - id: BR1.3
    statement: 기준선·사이드바·출처·파생 자료의 연결은 stable ID를 정방향·역방향으로 기록하고 양쪽 집합을 같게 유지한다.
    category: constraint
    applies_to: BaselineItem, SidebarLink, SourceRecord, 파생 자료 manifest
    trigger: 연결 배열 또는 파생 자료의 baseline_ids/source_ids를 갱신할 때
    logic: IF 한 자료가 다른 자료를 참조하면 THEN 양쪽 stable ID 배열에 같은 연결을 기록하고, URL은 보조 일치 검사로만 사용한다.
    violation_behaviour: 존재하지 않는 ID, 중복 ID, 한쪽에만 있는 ID, URL-only 연결, `source_id` alias 사용은 모두 검사 실패이며 통합을 보류한다.
    source: FR1.3, FR1.4, NFR3
  - id: BR1.4
    statement: 확인된 기준선 행은 최소 하나의 학습 문서와 하나의 문제에 연결되어야 한다.
    category: policy
    applies_to: BaselineItem
    trigger: 기준선 완전성 또는 최종 verified 승격을 검사할 때
    logic: IF BaselineItem.status == verified THEN learning_document_ids와 question_ids가 각각 하나 이상이고 각 파생 자료의 baseline_ids/source_ids가 역방향으로 존재해야 한다.
    violation_behaviour: 누락을 GAP으로 기록하고 해당 기준선의 verified 승격을 허용하지 않는다.
    source: FR1.1, FR1.3, FR4.2
  - id: BR1.5
    statement: 출처·기준선의 미검증 상태는 파생 자료의 verified 승격을 차단한다.
    category: policy
    applies_to: SourceRecord, BaselineItem, 파생 자료
    trigger: 파생 자료를 draft·review·verified 중 다음 상태로 전이할 때
    logic: IF source 또는 baseline이 discovered, downloaded, summarized, reviewed, blocked 상태이거나 notes에 `확인 필요:` 보류가 있으면 THEN 파생 자료의 verified 전이를 거부한다. IF source와 baseline이 verified이고 내용·범위·양방향 링크 검사 증거가 있으면 THEN에만 verified 전이를 허용한다.
    violation_behaviour: 상태 전이를 거부하고 현재 상태, 필요한 증거, 차단 사유·영향 자료·후속 확인 대상을 기록한다.
    source: FR5.2, FR5.3, NFR4
  - id: BR1.6
    statement: 조사한 공식 사이드바 링크는 누락 없이 SourceRecord와 canonical reverse ID로 등록한다.
    category: validation
    applies_to: SidebarLink, SourceRecord
    trigger: 공식 사이드바 조사 결과를 `aws-sidebar-index.md`와 `source-registry.yaml`에 반영할 때
    logic: IF SidebarLink가 발견되면 THEN link_id, URL, title, parent_topic, related_domain, linked_source_id, access_status를 기록하고 해당 SourceRecord.linked_sidebar_ids에 link_id를 넣는다.
    violation_behaviour: 링크 누락, orphan, 중복, URL 불일치, reverse 목록 불일치, 필수 메타데이터 누락은 완전성 검사 실패로 기록한다.
    source: FR1.4, US1.1, NFR3
  - id: BR1.7
    statement: URL은 stable ID를 대체하지 않는다.
    category: constraint
    applies_to: 모든 U1 연결과 파생 자료
    trigger: URL을 기준으로 기준선·출처·문서·문항·카드·퀴즈·Anki를 연결할 때
    logic: IF 파생 자료가 U1 자료를 참조하면 THEN baseline_ids 또는 source_ids를 기록하고 URL은 등록된 SourceRecord.url과 일치하는지 보조 확인한다.
    violation_behaviour: URL만 존재하는 연결을 추적성 통과로 인정하지 않는다.
    source: FR1.3, NFR3, NFR8
  - id: BR1.8
    statement: U1의 등록·상태 결정·추적성 검사는 정적 파일 경계에서 수행한다.
    category: policy
    applies_to: U1 전체 흐름
    trigger: U1 산출물을 생성·갱신·검사할 때
    logic: IF U1 작업을 수행하면 THEN Markdown·YAML·JSON과 정적 링크·스키마·집합 검사를 사용하고 AWS API 호출, DB 저장, UI, 학습자 데이터 저장은 추가하지 않는다.
    violation_behaviour: 실행형 기능이나 U1 외 콘텐츠 소유가 추가되면 범위 위반으로 기록하고 설계를 승인하지 않는다.
    source: FR1.1, FR6.3, NFR5, NFR7
```

## 규칙 요약

| ID | 분류 | 핵심 판단 |
|---|---|---|
| `BR1.1` | constraint | 공식 순서를 반영한 stable ID를 발급하고 변경·재사용하지 않는다. |
| `BR1.2` | validation | revision·출처·두 확인일 표현·상태 필수값과 날짜 equality를 fail-closed로 검사한다. |
| `BR1.3` | constraint | 기준선·사이드바·출처·파생 자료의 stable ID 정방향·역방향 집합을 같게 유지한다. |
| `BR1.4` | policy | verified 기준선은 학습 문서와 문제를 최소 하나씩 가져야 한다. |
| `BR1.5` | policy | 미검증·차단·`확인 필요:` 출처는 파생 자료의 verified 승격을 막는다. |
| `BR1.6` | validation | 사이드바 전체 링크와 source registry의 reverse 연결을 검사한다. |
| `BR1.7` | constraint | URL-only 연결을 추적성 연결로 인정하지 않는다. |
| `BR1.8` | policy | U1은 정적 파일·검사 계약에 머물고 실행형 시스템을 만들지 않는다. |

## Sources

- `aidlc/spaces/default/intents/260904-aif-c01-guide/inception/requirements-analysis/requirements.md`
- `aidlc/spaces/default/intents/260904-aif-c01-guide/inception/units-generation/unit-of-work.md`
- `aidlc/spaces/default/intents/260904-aif-c01-guide/inception/units-generation/unit-of-work-story-map.md`
- `aidlc/spaces/default/intents/260904-aif-c01-guide/inception/domain-design/components.md`
