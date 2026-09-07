# U1 Unit Test Instructions — 기준선·출처 등록

## 테스트 범위

이 문서는 `u1-baseline-and-source-registry`만 검증한다. U1의 구현 대상은 `ReferenceCatalog` 정적 파일 계약과 `LocalValidationBoundary`의 로컬 검증 경계이며, 실행형 API·DB·AWS 계정·네트워크·학습자 데이터는 테스트 대상이 아니다.

활성 Testing Contract는 `test-after`이고, 프로젝트의 test strategy는 `Comprehensive`다. 따라서 승인 후 구현을 먼저 완료한 뒤 해당 계층의 테스트를 작성·실행한다. 각 논리 컴포넌트마다 10~15개 테스트를 목표로 하며 unit, integration, E2E 범위를 모두 포함한다. 이 scope에는 선택된 전략 외 추가 test floor가 없지만 기존 테스트가 있다면 계속 green이어야 한다.

## 테스트 runner와 정확한 Unit 명령

- runner: Bun built-in test runner (`bun test`)
- 새 package·SDK는 추가하지 않는다.
- runner가 별도 설정을 요구하는 경우에만 `bunfig.toml`을 추가한다. 별도 설정이 필요하지 않으면 설정 파일을 만들지 않는다.
- 첫 테스트 전에 실행할 정확한 Unit 범위 명령은 다음이다.

```text
bun test tests/u1-baseline-and-source-registry
```

모든 실행 명령은 U1 테스트 디렉터리 또는 정확한 U1 테스트 파일을 지정한다. `npm test`, `bun test`처럼 전체 저장소를 암묵적으로 실행하는 명령은 사용하지 않는다.

## 테스트 파일과 실행 순서

### 1. ReferenceCatalog unit 테스트

대상 파일: `tests/u1-baseline-and-source-registry/reference-catalog-validation.test.ts`

실행 명령:

```text
bun test tests/u1-baseline-and-source-registry/reference-catalog-validation.test.ts
```

검증 항목:

- `BaselineItem.baseline_id`가 `AIF-C01-D<n>-T<n>` 형식이고 중복되지 않는다.
- `SourceRecord.source_id`가 `SRC-<slug>` 형식이고 URL이 하나의 record에서만 유일하다.
- `SidebarLink.link_id`가 `SIDE-<slug>` 형식이고 `linked_source_id`가 정확히 하나의 SourceRecord를 가리킨다.
- `domain`과 `domain_mappings`가 허용 도메인 집합을 사용한다.
- `source_revision`, `revision_title`, 공식 URL·제목·상태가 필수다.
- `BaselineItem.source_checked`와 `SourceRecord.checked_date`가 `YYYY-MM-DD`이고 문자 단위로 같다.
- `BaselineItem.checked_date` alias와 임의 fallback 필드를 거부한다.
- `discovered`, `downloaded`, `summarized`, `reviewed`, `blocked`, `확인 필요` 상태가 파생 자료 `verified` 승격을 막는다.
- `verified` 승격에는 provenance·날짜 equality·stable-ID equality·내용 검토 증거가 필요하다.
- 확인된 기준선의 학습 문서·문제 최소 매핑과 카드·퀴즈·Anki 배열의 구조를 검증한다.

### 2. LocalValidationBoundary unit 테스트

대상 파일: `tests/u1-baseline-and-source-registry/local-validation-boundary.test.ts`

실행 명령:

```text
bun test tests/u1-baseline-and-source-registry/local-validation-boundary.test.ts
```

검증 항목:

- 세 canonical 파일을 UTF-8로 읽고 YAML/JSON/Markdown 구조를 파싱한다.
- 필수 키 누락·허용되지 않은 enum·malformed date를 fail-closed로 판정한다.
- 중복 stable ID, orphan ID, 존재하지 않는 `source_id`·`linked_source_id`를 거부한다.
- `SourceRecord.linked_sidebar_ids`와 SidebarLink 정방향 집합의 equality를 검사한다.
- `SourceRecord.linked_baseline_ids`와 BaselineItem 정방향 집합의 equality를 검사한다.
- reverse 배열의 중복·누락·한쪽만 있는 ID를 거부한다.
- URL-only 연결과 `SidebarLink.source_id` alias를 거부한다.
- `blocked`·확인 필요 notes에 사유·영향 자료·후속 확인 대상이 있는지 검사한다.
- 절대 경로·사용자 홈 경로·임시 경로를 거부한다.
- credential·token·API key·password·PII·실제 AWS account identifier 패턴을 거부한다.

### 3. 파일 간 통합 테스트

대상 파일: `tests/u1-baseline-and-source-registry/registry-round-trip.integration.test.ts`

실행 명령:

```text
bun test tests/u1-baseline-and-source-registry/registry-round-trip.integration.test.ts
```

검증 항목:

- `aws-sidebar-index.md`의 각 `SidebarLink`가 registry의 정확히 하나의 `SourceRecord`로 왕복 연결된다.
- registry에만 있는 공식 출처는 허용하고 sidebar orphan만 실패시킨다.
- 동일 URL 중복, stable ID 중복, reverse ID 중복을 각각 구별해 보고한다.
- `BaselineItem.source_id`와 `SourceRecord.linked_baseline_ids`가 SourceRecord별 set-equal이다.
- `source_checked`와 `checked_date` equality를 여러 기준선이 연결된 경우에도 검사한다.
- 모든 SourceRecord에 `linked_sidebar_ids`와 `linked_baseline_ids`가 존재하며 연결이 없으면 빈 배열이다.
- 파싱 가능한 부분 결과를 전체 PASS로 승격하지 않는 fail-closed 결과를 확인한다.
- 결과에 입력 파일·stable ID·규칙·영향을 연결할 수 있는 evidence shape을 확인한다.

### 4. 전체 U1 E2E 테스트

대상 파일: `tests/u1-baseline-and-source-registry/static-package.e2e.test.ts`

실행 명령:

```text
bun test tests/u1-baseline-and-source-registry/static-package.e2e.test.ts
```

검증 항목:

- 실제 저장소의 세 canonical 파일을 읽어 고정 순서로 전체 검사를 실행한다.
- 정상 기준선·출처·사이드바 패키지가 허용된 구조와 추적성 계약을 모두 만족한다.
- malformed YAML/JSON, UTF-8 오류, 중복·orphan, 날짜 mismatch, blocked·확인 필요, 민감정보 후보 입력을 격리 fixture로 검증한다.
- 시험 범위와 `실무 확장`, `해당 없음`, `확인 필요`, `blocked` 표지가 서로 오해되지 않도록 검사한다.
- 원문 통째 복제 대신 URL·제목·확인일·짧은 metadata만 보존하는지 확인한다.
- 각 결과에 `input_files`, `checked_date`, `tool`, `decision`, `findings`, `actions`, `recheck`, `trace_keys`를 남길 수 있는지 확인한다.

전체 U1 테스트 실행:

```text
bun test tests/u1-baseline-and-source-registry
```

## Mocking과 test data

- AWS API, 인터넷, credential provider, DB, remote upload를 mock하거나 호출하지 않는다. U1의 승인된 경계가 이를 사용하지 않기 때문이다.
- 정상 fixture는 실제 공식 값이 확정된 경우에만 저장한다. 확인되지 않은 revision·URL·시험 행은 임의 값으로 채우지 않고 `확인 필요` 또는 `blocked` fixture로 표현한다.
- 실패 fixture는 `tests/u1-baseline-and-source-registry/fixtures/` 아래에 저장할 수 있으며, 저장소 상대 경로와 명백한 placeholder만 사용한다.
- fixture는 테스트마다 독립적으로 읽고 변경하지 않는다. 테스트 간 mutable global state를 공유하지 않는다.
- 민감정보 검사 fixture는 실제 secret·PII가 아니라 탐지용 명백한 placeholder를 사용하고, fixture 자체가 배포 가능한 credential처럼 보이지 않게 한다.
- U8의 통합 품질 보고서 본문은 만들지 않는다. 테스트는 U8이 소비할 stable ID·source ID·link ID·입력 파일 evidence shape만 확인한다.

## 품질 목표와 실패 처리

- Comprehensive 전략: 각 `ReferenceCatalog`, `LocalValidationBoundary` 논리 컴포넌트당 10~15개 테스트 목표; unit·integration·E2E 모두 포함.
- NFR이 요구하는 보안 검사는 민감정보·절대 경로·원격 업로드 경계로 제한하고, 별도 보안 서비스나 계정 검증을 도입하지 않는다.
- test-after 순서를 지키며, 테스트 실패를 숨기기 위해 threshold·검사 범위·fail-closed 규칙을 낮추지 않는다.
- 실패 시 원인, 영향 파일·stable ID, 수정 내용, 같은 U1 명령으로 재실행한 결과를 기록한다.
- 실제 구현이 계획과 달라지면 먼저 계획 승인 경계를 멈추고, 승인된 plan/instructions/fingerprint를 다시 생성해야 한다.

## Sources

- `aidlc/spaces/default/intents/260904-aif-c01-guide/construction/u1-baseline-and-source-registry/code-generation/code-generation-plan.md`
- `aidlc/spaces/default/intents/260904-aif-c01-guide/construction/u1-baseline-and-source-registry/functional-design/functional-spec.md`
- `aidlc/spaces/default/intents/260904-aif-c01-guide/construction/u1-baseline-and-source-registry/functional-design/rules.md`
- `aidlc/spaces/default/intents/260904-aif-c01-guide/construction/u1-baseline-and-source-registry/functional-design/entities.md`
- `aidlc/spaces/default/intents/260904-aif-c01-guide/construction/u1-baseline-and-source-registry/nfr-requirements/security-requirements.md`
- `aidlc/spaces/default/intents/260904-aif-c01-guide/construction/u1-baseline-and-source-registry/nfr-design/logical-components.md`
