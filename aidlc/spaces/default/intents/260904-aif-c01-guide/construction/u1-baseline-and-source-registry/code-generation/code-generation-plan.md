# U1 Code Generation Plan — 기준선·출처 등록

## 계획 상태와 범위

- **Unit**: `u1-baseline-and-source-registry`
- **Unit kind**: `spec`
- **Story 주 소유**: `US1.1`
- **Supporting story**: `US5.1`이 U1의 출처·기준선 계약을 소비한다.
- **프로젝트 유형**: Greenfield
- **Depth**: Comprehensive
- **Test Strategy**: Comprehensive
- **Testing Methodology**: `test-after`
- **현재 상태**: Code Generation Plan Approval 후 U1 구현·테스트·review finding 보정을 완료했다. 이 문서의 Step 1~9 체크박스는 실제 수행 결과이며, Testing Contract JSON은 승인 당시 내용 그대로 유지한다.

U1은 실행형 애플리케이션이 아니라 `ReferenceCatalog`와 `LocalValidationBoundary`를 정적 파일과 로컬 검증 계약으로 구현하는 Unit이다. 승인 후 생성 대상은 저장소 상대 경로의 UTF-8 Markdown·YAML·JSON 파일과 이를 읽는 Unit 범위 검증 테스트이며, AWS API·DB·API·UI·배포 자원·학습자 데이터 저장은 만들지 않는다.

## 설계 입력과 구현 대상

### 현재 Unit에서 소비한 승인 산출물

| 입력 | 계획에 반영한 사실 |
|---|---|
| `construction/u1-baseline-and-source-registry/functional-design/functional-spec.md` | 기준선 등록, 사이드바/source registry 등록, 파생 자료 상태 결정, 양방향 추적성의 ordered workflow |
| `construction/u1-baseline-and-source-registry/functional-design/rules.md` | `BR1.1`~`BR1.8`의 stable ID, provenance, fail-closed 상태, URL-only 연결 금지, 정적 범위 |
| `construction/u1-baseline-and-source-registry/functional-design/entities.md` | `BaselineItem`, `SourceRecord`, `SidebarLink`의 필드·소유권·cardinality·canonical 필드 |
| `construction/u1-baseline-and-source-registry/nfr-requirements/security-requirements.md` | `NFR3.1`~`NFR8.2`, 민감정보 최소화, UTF-8·상대 경로·검사 증거 계약 |
| `construction/u1-baseline-and-source-registry/nfr-requirements/tech-stack-decisions.md` | UTF-8 Markdown/YAML/JSON/CSV, 기존 Bun 기반 로컬 검사, 추가 package·SDK·서비스 미도입 |
| `construction/u1-baseline-and-source-registry/nfr-design/logical-components.md` | `ReferenceCatalog`와 `LocalValidationBoundary`의 static-only 경계 및 U8 소유권 분리 |
| `construction/u1-baseline-and-source-registry/nfr-design/performance-design.md` | 결정적 검사 순서, 전체 입력 목록 기록, 런타임 성능 요구사항 해당 없음 |
| `construction/u1-baseline-and-source-registry/nfr-design/reliability-design.md` | 파싱·ID·링크·상태·provenance 실패 시 fail-closed, blocked 내용 추측 금지 |
| `construction/u1-baseline-and-source-registry/nfr-design/scalability-design.md` | 정적 항목 증가 시 stable ID·명시적 입력·결정적 정렬 유지, API/DB 확장 금지 |
| `construction/u1-baseline-and-source-registry/nfr-design/observability-design.md` | 입력·검사일·도구·판정·finding·조치·재검사 evidence 필드 |
| `inception/requirements-analysis/requirements.md` | `FR1`, `FR5`, `FR6`, `NFR1`~`NFR9`와 시험 범위/실무 확장 구분 |
| `inception/units-generation/unit-of-work.md` | U1이 세 canonical 정적 파일과 기준선-파생 자료 계약을 단독 소유 |
| `inception/units-generation/unit-of-work-story-map.md` | `US1.1 → U1`, `US5.1`의 U1 supporting 관계 |

### 승인 후 변경 파일 후보

| 구분 | workspace-relative 후보 | 소유·변경 목적 |
|---|---|---|
| canonical source | `sources/aws-sidebar-index.md` | 조사한 공식 사이드바 링크를 발견 순서·상위 주제·`linked_source_id`와 함께 기록 |
| canonical source | `sources/source-registry.yaml` | `SourceRecord`의 URL·제목·유형·도메인·확인일·상태·reverse ID 배열 기록 |
| canonical source | `sources/content-traceability.yaml` | `BaselineItem`의 공식 행·revision·canonical 날짜·파생 자료 ID 및 양방향 연결 기록 |
| 계획된 테스트 | `tests/u1-baseline-and-source-registry/reference-catalog-validation.test.ts` | ReferenceCatalog 필드·ID·날짜·상태·범위 규칙의 unit 테스트 |
| 계획된 테스트 | `tests/u1-baseline-and-source-registry/local-validation-boundary.test.ts` | 파싱·UTF-8·orphan·duplicate·양방향 집합·민감정보·상대 경로 검사의 unit 테스트 |
| 계획된 테스트 | `tests/u1-baseline-and-source-registry/registry-round-trip.integration.test.ts` | 세 canonical 파일 간 SourceRecord/SidebarLink/BaselineItem round-trip 및 reverse equality 통합 테스트 |
| 계획된 테스트 | `tests/u1-baseline-and-source-registry/static-package.e2e.test.ts` | 실제 저장소 파일을 처음부터 읽어 전체 U1 검증 순서를 실행하는 E2E 테스트 |
| 테스트 구성 후보 | `bunfig.toml` 또는 기존 저장소의 동등한 Bun test 설정 | Bun built-in test runner가 별도 설정을 요구할 때만 추가한다. 불필요한 설정 파일은 만들지 않는다. |

`source-manifest.json`은 승인 후 실제 생성·수정된 application-source 경로를 확인한 뒤 Step 5에서 생성한다. 이번 계획 단계에서는 만들지 않는다. `code-summary.md`와 Code Generation 단계의 `traceability.json`도 실제 생성 후에만 작성한다.

## 구현 순서와 추적성

각 단계의 체크박스는 승인 후 실행 순서다. 정적 파일을 먼저 만들고, 그 다음 해당 범위의 검증을 작성하는 `test-after` 계약을 따른다.

### Step 1. 정적 파일·검증 경계 준비

- [x] 기존 workspace 구조와 `sources/`의 현재 파일 상태를 다시 확인한다.
- [x] 변경 대상은 U1의 세 canonical 파일과 U1 테스트 디렉터리로 제한한다.
- [x] 실제 공식 시험 revision·URL·작업·기술 행이 확인되지 않은 경우 값을 발명하지 않고 해당 행을 `확인 필요` 또는 `blocked`와 후속 조치로 유지한다. **[blocked: 공식 revision 독립 확인은 수행하지 않았고, 현재 `sources/content-traceability.yaml`의 blocked/open_items 상태를 유지함]**
- [x] 다른 Unit의 문서 본문·문제·카드·퀴즈·Anki 내용을 생성하거나 수정하지 않는다.
- **추적성**: `US1.1`, `AC1.1.1`, `AC1.1.2`, `BR1.8`, `NFR7.2`.

### Step 2. `aws-sidebar-index.md` 구현

- [x] `sources/aws-sidebar-index.md`에 조사된 각 공식 링크를 `SIDE-<slug>` stable ID로 기록한다.
- [x] 각 행에 URL, 제목, parent topic, 관련 도메인, `linked_source_id`, 접근 상태를 기록한다.
- [x] `SidebarLink.source_id` alias를 사용하지 않고 `linked_source_id`만 canonical 정방향 필드로 사용한다.
- [x] URL만으로 연결을 대신하지 않으며, 차단·동적 내용은 상태와 notes/후속 대상을 통해 보류한다.
- **추적성**: `US1.1`, `AC1.1.3`, `FR1.4`, `BR1.3`, `BR1.6`, `BR1.7`, `NFR3.2`, `NFR4.3`.

### Step 3. `source-registry.yaml` 구현

- [x] 동일 URL은 하나의 `SourceRecord`와 `SRC-<slug>` stable ID로 관리한다.
- [x] 각 `SourceRecord`에 URL, 제목, `source_type`, `parent_topic`, `domain_mappings`, `checked_date`, `access_status`, `linked_baseline_ids`, `linked_sidebar_ids`, 파생 ID 배열과 notes를 기록한다.
- [x] 모든 SourceRecord에 reverse 배열을 명시하고, 연결이 없으면 빈 배열을 기록한다.
- [x] `blocked` 또는 확인 필요인 출처는 차단 사유·영향 자료·후속 확인 대상을 notes에 남긴다.
- **추적성**: `US1.1`, `AC1.1.3`, `AC1.1.4`, `FR1.4`, `FR5.2`, `FR5.3`, `BR1.2`, `BR1.3`, `BR1.5`, `BR1.6`, `NFR4.1`, `NFR4.2`, `NFR4.3`, `NFR7.1`.

### Step 4. `content-traceability.yaml`의 기준선 구현

- [x] 공식 안내서의 확인된 revision·제목·도메인·task·technology 행에 `AIF-C01-D<n>-T<n>` stable ID를 부여하되 공식 순서를 보존한다.
- [x] 각 `BaselineItem`에 `source_id`, `source_revision`, `revision_title`, 공식 URL·제목, `source_checked`, 상태와 모든 파생 ID 배열을 기록한다.
- [x] `BaselineItem.source_checked`만 기준선 canonical 날짜로 사용하고 `checked_date` alias를 추가하지 않는다.
- [x] 연결된 `SourceRecord.checked_date`와 `source_checked`를 문자 단위로 동일하게 유지한다.
- [x] 확인된 기준선은 최소 하나의 학습 문서 ID와 하나의 문제 ID를 가져야 한다. 아직 다른 Unit 산출물이 없어 매핑할 수 없는 행은 확인 상태와 보류 사유를 명시한다. **[deferred: downstream 문서·문제·카드·퀴즈·Anki ID 매핑은 U2-U7 산출물 생성 후 해당 소유 Unit이 수행함]**
- **추적성**: `US1.1`, `AC1.1.1`, `AC1.1.3`, `AC1.1.4`, `FR1.1`, `FR1.2`, `FR1.3`, `FR5.1`, `BR1.1`, `BR1.2`, `BR1.3`, `BR1.4`, `BR1.5`, `BR1.7`, `NFR3.1`, `NFR3.2`, `NFR4.1`, `NFR4.2`, `NFR8.1`, `NFR8.2`.

### Step 5. ReferenceCatalog 정적 규칙 테스트 작성·실행

- [x] `reference-catalog-validation.test.ts`에 `BaselineItem`, `SourceRecord`, `SidebarLink`의 필수 키·허용 enum·stable ID 형식·고유성·canonical 날짜·도메인 완전성을 검증하는 unit 테스트를 작성한다.
- [x] `local-validation-boundary.test.ts`에 YAML/JSON 파싱, UTF-8, 상대 경로, `source_id` alias 거부, orphan·duplicate·URL-only 연결 거부, 상태 전이와 fail-closed 규칙을 검증하는 unit 테스트를 작성한다.
- [x] `test-after` 순서에 따라 정적 파일 구현 후 각 테스트 계층을 작성하고 Unit 범위 명령으로 실행한다.
- [x] Comprehensive 전략의 컴포넌트별 10~15 테스트 목표를 충족하도록 `ReferenceCatalog`와 `LocalValidationBoundary` 각각의 테스트 케이스를 구성한다.
- **추적성**: `AC1.1.1`~`AC1.1.4`, `BR1.1`~`BR1.8`, `NFR2.1`, `NFR3.1`~`NFR3.3`, `NFR4.1`~`NFR4.3`, `NFR6.1`, `NFR7.1`, `NFR7.2`, `NFR8.1`, `NFR8.2`.

### Step 6. 파일 간 round-trip 통합 테스트 작성·실행

- [x] `registry-round-trip.integration.test.ts`에서 세 canonical 파일을 실제로 읽고 `SidebarLink.linked_source_id`와 `SourceRecord.linked_sidebar_ids`의 집합 동등성을 검사한다.
- [x] `BaselineItem.source_id` 정방향 집합과 `SourceRecord.linked_baseline_ids` reverse 집합의 equality를 검사한다.
- [x] URL은 보조 검증으로만 사용하고 stable ID가 없는 URL-only·존재하지 않는 ID·한쪽에만 있는 ID를 실패시킨다.
- [x] `SourceRecord`별 sidebar/기준선이 없는 경우에도 빈 reverse 목록이 명시되는지 검사한다.
- [x] `ReferenceCatalog`와 downstream U8 evidence의 소유권을 혼동하지 않고, 검사 결과에 필요한 trace key만 확인한다.
- **추적성**: `US5.1`, `AC1.1.3`, `FR1.3`, `FR1.4`, `FR6.2`, `BR1.3`, `BR1.6`, `NFR3.2`, `NFR3.3`, `NFR4.3`.

### Step 7. 전체 정적 패키지 E2E 테스트 작성·실행

- [x] `static-package.e2e.test.ts`에서 UTF-8 읽기 → YAML/JSON 파싱 → ID·필수 필드 → provenance/date equality → 양방향 링크 → 상태 승격 → 민감정보·상대 경로 → 범위 표지 순서로 실제 U1 패키지를 검사한다.
- [x] Comprehensive 전략의 E2E 범위를 충족하도록 정상 패키지와 파싱 오류·blocked·확인 필요·중복·orphan·날짜 불일치·민감정보 후보 입력을 포함한 시나리오를 구성한다.
- [x] E2E 실행은 U1 테스트 디렉터리만 대상으로 하고 다른 Unit의 문서나 답안 데이터를 읽거나 저장하지 않는다.
- **추적성**: `US1.1`, `US5.1`, `AC1.1.1`~`AC1.1.4`, `FR1.1`, `FR1.3`, `FR1.4`, `FR5.2`, `FR5.3`, `FR6.4`, `NFR3.3`, `NFR4.2`, `NFR7.1`, `NFR8.1`.

### Step 8. 테스트 runner/configuration과 정적 검사 연결

- [x] Bun built-in test runner를 우선 사용하고 새 package·SDK를 추가하지 않는다.
- [x] 테스트 runner가 별도 설정을 필요로 할 때만 `bunfig.toml`을 추가하고, 불필요하면 설정 파일을 만들지 않았다는 근거를 기록한다.
- [x] U1에 실행 코드가 없으므로 linter/type-check는 생성 코드가 없을 때 `N/A`로 기록하고, Markdown/YAML/JSON/CSV 파서·인코딩·링크·민감정보 검사는 적용한다.
- [x] 모든 실행 결과에 입력 파일, 검사일, 도구/명령, 판정, finding, 조치, 재검사 결과를 기록할 수 있도록 U8이 소비할 evidence 필드를 확인한다.
- **추적성**: `FR6.3`, `FR6.4`, `NFR3.3`, `NFR6.1`, `NFR7.1`, `NFR7.2`, `BR1.8`.

### Step 9. 문서·추적성·계획 후속 산출물

- [x] U1 canonical 파일의 내부 링크, 제목 계층, 시험 범위/실무 확장 표지, 원문 비복제와 공식 URL 메타데이터를 점검한다.
- [x] 실제 생성·수정된 application-source 경로를 확인한 뒤에만 `source-manifest.json`을 작성한다.
- [x] 실제 구현과 테스트가 완료된 후에만 `code-summary.md`와 Code Generation `traceability.json`을 작성한다.
- [x] 승인 후 생성 범위가 U1에 한정되었는지, 다른 Unit 파일·품질 본문·학습자 데이터가 변경되지 않았는지 확인한다.
- **추적성**: `US1.1`, `US5.1`, `FR1.1`~`FR1.4`, `FR5.1`~`FR5.4`, `FR6.2`~`FR6.4`, `NFR1`~`NFR8`, `BR1.1`~`BR1.8`.

## 테스트 계약

아래 JSON block은 `bun .kiro/tools/aidlc-testing-posture.ts render`의 결과를 변경 없이 삽입한 것이다.

## Testing Contract
```json
{
  "version": 1,
  "methodology": "test-after",
  "source": "team",
  "ordering": "문서를 작성한 다음 해당 문서와 변경 범위에 맞는 문서 품질 검증을 실행하고, 실패 항목을 수정한 뒤 결과를 기록한다.",
  "scope": "aif-c01-korean-guide-comprehensive",
  "test_strategy": "comprehensive",
  "project_type": "greenfield",
  "applicable_notes": [
    {
      "layer": "org",
      "text": "We treat tests as a first-class deliverable in every Bolt. The specific\nmethodology (TDD, BDD, ATDD, or classic test-after) is affirmed at\npractices-discovery and recorded in `team.md` under this heading with explicit\n`Methodology` and `Ordering` fields; Code Generation resolves those fields\nindependently from coverage, tooling, and scope notes.\n\nWhen no posture has been affirmed, our default per scope is:\n- **Methodology**: test-after\n- **Ordering**: implement each applicable testable layer, then write and run\n  that layer's tests.\n- `mvp`, `enterprise`, `feature`, `infra`, `classic` add an 80% line-coverage\n  floor and CI execution before merge.\n- `bugfix`, `security-patch` add a targeted regression for the specific\n  bug/vulnerability and require the existing suite to remain green.\n- `express` uses the Minimal strategy: requirement-driven unit tests (one per\n  requirement, with a happy-path floor per component); existing tests remain\n  green.\n- `poc`, `refactor`, `workshop` add no extra new-test floor and require the\n  existing suite to remain green.\n\nThe active `Test Strategy` still applies in every scope and determines test\nvolume/types. Scope floors are additive; they never reduce or replace the\nselected strategy.\n\nBuild and Test verifies defined coverage floors and affirmed quality targets;\nthey may not be weakened to make a step pass.\n\nAffirm a stricter posture in `team.md` if the team commits to one."
    },
    {
      "layer": "team",
      "text": "- **Methodology**: test-after\n- **Ordering**: 문서를 작성한 다음 해당 문서와 변경 범위에 맞는 문서 품질 검증을 실행하고, 실패 항목을 수정한 뒤 결과를 기록한다.\n- 문서 품질 게이트는 특정 도구에 종속되지 않으며 다음 검사를 포함한다.\n  - Markdown 문법, 제목 계층, 필수 섹션, YAML front matter 필수 필드와 허용 상태값을 검사한다.\n  - 내부 링크, 다음 문서 연결, 용어 사전 연결이 실제 대상과 일치하는지 검사한다.\n  - `sources/`의 출처 레지스트리와 문서의 URL·제목·확인 날짜·접근 상태·연결 문서가 일치하는지 검사한다.\n  - AIF-C01 공식 시험 안내서의 D1~D5 모든 작업·기술 항목이 문서 또는 명시적인 `해당 없음`·`확장` 기록으로 양방향 추적되는지 검사한다.\n  - 공식 범위와 실무 확장을 문서 안에서 구분하고, 공식 사실과 학습자용 해설·예시를 대조한다.\n  - 선수 지식, 쉬운 예시, AWS 서비스 선택 단서, 비교, 시나리오, 오해 교정, 확인 질문을 초보자 관점에서 검토한다.\n  - UTF-8 인코딩, 파일명·디렉터리명 규칙, CSV 형식과 구조를 검사한다.\n  - 예시·로그·검사 결과에 비밀, 자격 증명, 토큰, 실제 개인정보(PII), 실제 계정 식별자를 포함하지 않는지 검사한다.\n  - 출처가 차단되거나 동적 내용·인증·네트워크 문제로 확인되지 않으면 `blocked` 또는 확인 필요 상태와 사유를 기록하며, 확인하지 못한 내용을 추측하지 않는다.\n  - Mermaid 다이어그램은 학습 내용을 실질적으로 개선할 때 허용하며, 모든 Mermaid 다이어그램 가까이에 일반 텍스트 또는 Markdown 설명을 둔다. 핵심 의미가 외부 렌더러에 의존해서는 안 된다.\n  - 문서를 `verified`로 표시하기 전에 Mermaid 구문을 검증하고, 다이어그램은 단순하고 모바일에서 읽기 쉽게 유지한다.\n  - 원격 이미지의 접근 가능 여부를 확인하고, URL이 차단되거나 변경되어도 읽을 수 있도록 이미지가 아닌 텍스트 대체 설명을 보존한다.\n  - 출처 검증과 초보자 검토의 결과는 문서 또는 관련 추적 기록에 남긴다. 검증되지 않은 문서는 `verified`로 승격하지 않는다.\n  - 이미지의 한국어 대체 텍스트는 의미를 설명해야 하며, 캡션 또는 주변 설명과 텍스트 대체 경로를 함께 제공한다. 이미지와 색상만으로 주장을 전달하지 않는다.\n  - AWS 호스팅 공식 이미지는 출처 페이지, 직접 이미지·원본 URL, 제목, 접근일, 저작자 표시와 재사용·사용 조건을 `sources/`에 기록할 수 있을 때만 사용한다. 권리 또는 조건이 불명확하면 다운로드하거나 재배포하지 않는다.\n  - AWS 공식 이미지와 가이드 자체 설명용 다이어그램을 분리하고, AWS가 이 가이드를 보증하는 것처럼 표현하지 않는다."
    }
  ],
  "obligations": {
    "strategy": "comprehensive",
    "strategy_volume": [
      "Ten to fifteen tests per component.",
      "Unit, integration, and E2E tests.",
      "Add performance and security tests when NFRs demand them."
    ],
    "scope_floor": [
      "Keep the existing test suite green.",
      "This scope adds no extra new-test floor beyond the selected test strategy."
    ],
    "combination_rule": "Apply every selected-strategy obligation and every scope-floor obligation; neither replaces the other, and a targeted scope regression may add the narrowest necessary test type beyond the strategy default."
  },
  "plan_profile": {
    "methodology": "test-after",
    "runner_step": "Bootstrap the minimal test runner/configuration and record the exact unit-scoped command.",
    "runner_ready_before_first_test": true,
    "testable_layers": [
      "Data model / database behavior",
      "Repository / data access",
      "Business logic",
      "API / endpoint",
      "Frontend behavior"
    ],
    "steps": [
      "Project structure and production configuration skeleton.",
      "Bootstrap the minimal test runner/configuration and record the exact unit-scoped command.",
      "Data model / database behavior - implement.",
      "Data model / database behavior - write and run its tests after implementation.",
      "Repository / data access - implement.",
      "Repository / data access - write and run its tests after implementation.",
      "Business logic - implement.",
      "Business logic - write and run its tests after implementation.",
      "API / endpoint - implement.",
      "API / endpoint - write and run its tests after implementation.",
      "Frontend behavior - implement.",
      "Frontend behavior - write and run its tests after implementation.",
      "Environment/build configuration.",
      "Documentation and traceability."
    ]
  },
  "input_sha256": "sha256:1970f57f3d902211d2d7986d3ad18828644dfd0ffed0f74fb812418451834c97",
  "contract_sha256": "sha256:05b39bf6156f1d28abf600d1d5c3cc500a7a0b5fe7ae109278ff01f2f8bbe4e1"
}
```

## Plan Approval 전후 경계

### 승인 전 — 이번 호출에서 수행한 범위

- 이 문서, `unit-test-instructions.md`, `code-generation-questions.md`만 작성한다.
- 승인 전에는 workspace root의 application code, 테스트 구현, 설정 변경, U1 canonical source 파일 변경을 수행하지 않는다.
- `source-manifest.json`, `code-summary.md`, Code Generation `traceability.json`을 작성하지 않는다.
- reviewer dispatch나 실제 code generation을 시작하지 않는다.

### 승인 후 — 사용자의 `Approve Plan` 이후에만 수행할 범위

- 위 순서대로 U1의 세 canonical source 파일과 계획된 U1 테스트 파일만 생성·수정한다.
- 승인된 Testing Contract의 `test-after` 순서와 Comprehensive 의무를 그대로 사용한다.
- 실제 변경 경로를 확인한 후 `source-manifest.json`을 작성하고, 구현·검증 후 `code-summary.md`와 Code Generation `traceability.json`을 작성한다.
- 공식 출처를 확인할 수 없는 내용은 추측하지 않고 `blocked` 또는 `확인 필요`로 유지한다.
- 구현 중 계획·Testing Contract·scope·target이 바뀌면 generation을 중단하고 Plan Approval을 다시 받는다.

## 검증 명령 계획

승인 후 각 명령은 U1 범위로 제한한다. 현재 호출에서는 계획과 fingerprint만 검사하며, 아래 명령은 구현 단계의 실행 계획이다.

| 목적 | Unit 범위 명령 |
|---|---|
| runner 준비 확인 | `bun test tests/u1-baseline-and-source-registry` |
| ReferenceCatalog unit 테스트 | `bun test tests/u1-baseline-and-source-registry/reference-catalog-validation.test.ts` |
| LocalValidationBoundary unit 테스트 | `bun test tests/u1-baseline-and-source-registry/local-validation-boundary.test.ts` |
| 파일 간 통합 테스트 | `bun test tests/u1-baseline-and-source-registry/registry-round-trip.integration.test.ts` |
| 전체 U1 E2E 테스트 | `bun test tests/u1-baseline-and-source-registry/static-package.e2e.test.ts` |
| 전체 U1 범위 반복 실행 | `bun test tests/u1-baseline-and-source-registry` |
| 문서·구조·추적성·민감정보 검사 | U1 파일만 명시한 기존 Bun 센서/표준 파서 명령을 사용하고 결과를 U8 evidence 계약에 기록한다. 정확한 센서 인자는 승인 후 workspace의 현재 도구 사용법을 확인해 확정한다. |

## Sources

- `aidlc/spaces/default/intents/260904-aif-c01-guide/inception/requirements-analysis/requirements.md`
- `aidlc/spaces/default/intents/260904-aif-c01-guide/inception/units-generation/unit-of-work.md`
- `aidlc/spaces/default/intents/260904-aif-c01-guide/inception/units-generation/unit-of-work-story-map.md`
- `aidlc/spaces/default/intents/260904-aif-c01-guide/construction/u1-baseline-and-source-registry/functional-design/functional-spec.md`
- `aidlc/spaces/default/intents/260904-aif-c01-guide/construction/u1-baseline-and-source-registry/functional-design/rules.md`
- `aidlc/spaces/default/intents/260904-aif-c01-guide/construction/u1-baseline-and-source-registry/functional-design/entities.md`
- `aidlc/spaces/default/intents/260904-aif-c01-guide/construction/u1-baseline-and-source-registry/nfr-requirements/security-requirements.md`
- `aidlc/spaces/default/intents/260904-aif-c01-guide/construction/u1-baseline-and-source-registry/nfr-requirements/tech-stack-decisions.md`
- `aidlc/spaces/default/intents/260904-aif-c01-guide/construction/u1-baseline-and-source-registry/nfr-design/logical-components.md`
- `aidlc/spaces/default/intents/260904-aif-c01-guide/construction/u1-baseline-and-source-registry/nfr-design/performance-design.md`
- `aidlc/spaces/default/intents/260904-aif-c01-guide/construction/u1-baseline-and-source-registry/nfr-design/reliability-design.md`
- `aidlc/spaces/default/intents/260904-aif-c01-guide/construction/u1-baseline-and-source-registry/nfr-design/scalability-design.md`
- `aidlc/spaces/default/intents/260904-aif-c01-guide/construction/u1-baseline-and-source-registry/nfr-design/observability-design.md`


## Review

**Verdict:** READY
**Reviewer:** aidlc-architecture-reviewer-agent
**Date:** 2026-09-07T16:05:32Z
**Iteration:** 1
**Request Challenge:** review:7c2e166131f5bc8d1245e7f0aed611b9

### Findings

| ID | Severity | Location | Finding | Required action | Status |
|---|---|---|---|---|---|
| — | — | — | 현재 요청 이후 fresh evidence에서 Critical/Major 아키텍처 finding이 확인되지 않았다. U1의 static-only ReferenceCatalog 경계, stable-ID 양방향 연결, Sidebar metadata round-trip, status/`verified` fail-closed, 민감정보·경로 방어가 승인된 범위와 일치한다. | 추가 조치 없음. 아래 blocked/deferred 항목은 후속 공식 출처 재검증과 downstream Unit 산출물 생성 시 갱신한다. | N/A |

### Validation Commands and Results

| 검증 명령 | 결과 | 해석 |
|---|---|---|
| `bun test tests/u1-baseline-and-source-registry` | PASS — 56/56, 0 failures; unit 30, integration 14, E2E 12 | 전체 U1 검증 계층이 통과했다. status enum, `verified` 승격 조건, PII·결제·건강정보 placeholder negative tests, 절대 경로, orphan·duplicate·양방향 집합, Sidebar metadata round-trip을 검증한다. |
| `bun .kiro/tools/aidlc-sensor-traceability.ts --stage code-generation --output-path aidlc/spaces/default/intents/260904-aif-c01-guide/construction/u1-baseline-and-source-registry/code-generation/traceability.json` | PASS — `gaps: 0`, `orphans: 0`, `missing_from_table: 0`, `missing_from_upstream_ids: 0`, `invalid_entries: 0`, `invalid_targets: 0`, `findings_count: 0` | upstream과 coverage/reverse 계약이 충족된다. `OK` target은 실제 U1 workspace-relative 파일이고, downstream 항목은 명시적으로 Deferred다. |
| `source-manifest.json` schema/target check | PASS — `stage`, `unit`, `version`, `writes`만 사용; `version: 1`; 7개 write path가 고유하고 모두 실제 존재 | 기록된 application source 3개와 U1 테스트 4개가 모두 U1 범위이며, 절대 경로·중복·누락 target이 없다. |
| U1 status/verified 및 fail-closed 검사 | PASS — 위 56개 테스트 중 `blocked`·`확인 필요` 허용, provenance 없는 `verified` 거부, malformed/duplicate/orphan/date mismatch 거부 | 공식 revision·기술 행을 확인하지 못한 상태에서 기준선과 파생 자료가 잘못 `verified`로 승격되지 않는다. |
| Sidebar metadata round-trip 검사 | PASS — round-trip integration 테스트 14개 중 관련 검사가 통과 | `linked_source_id`, title, parent topic, related domain, access status 및 reverse ID 집합이 SourceRecord와 일치한다. URL-only 연결이나 `source_id` alias로 대체되지 않는다. |
| 민감정보 negative tests | PASS — PII·결제·건강정보 placeholder fixture와 credential/token/account identifier fixture가 실패로 탐지됨; 실제 패키지는 false-positive 없이 통과 | 테스트용 placeholder만 실패 fixture에 있고 canonical 산출물에는 민감정보가 없다. |
| U1-only scope check | PASS — manifest의 7개 경로가 `sources/`의 U1 canonical 파일 3개와 `tests/u1-baseline-and-source-registry/`의 U1 테스트 4개로 제한 | 이번 Code Generation 구현 범위에 다른 Unit의 문서·문제·카드·퀴즈·Anki 산출물이 포함되지 않는다. |
| `date -u +"%Y-%m-%dT%H:%M:%SZ"` | `2026-09-07T16:05:32Z` | 리뷰 시각을 UTC로 기록했다. |

### Blocked / Deferred

| 항목 | 현재 상태 | 근거와 후속 조치 |
|---|---|---|
| 공식 AIF-C01 revision 식별자 | `blocked` / `확인 필요` | `SRC-aif-c01-main`, D1~D5 SourceRecord와 14개 BaselineItem에 revision 독립 확인 보류 사유가 기록되어 있다. 공식 시험 안내서 재확인 후에만 승격한다. |
| 공식 기술 행 원문 | `blocked` / `확인 필요` | 각 BaselineItem의 `technology`가 `확인 필요`로 남아 있으며 추측으로 채우지 않았다. 공식 원문 확인 후 갱신한다. |
| downstream 학습 문서·문제·카드·퀴즈·Anki ID | `Deferred` | 현재 파생 ID 배열은 비어 있고 `OQ2` 및 traceability 항목이 U2~U7 산출물 이후 매핑하도록 명시한다. 매핑을 채우기 전 기준선·파생 자료를 `verified`로 승격하지 않는다. |

### Summary

U1은 현재 보정된 static-only 구현과 검증 계약을 충족하며 READY다. source-manifest, traceability sensor, 56개 테스트, fail-closed 상태·provenance, Sidebar metadata round-trip, 민감정보 방어, U1-only scope가 모두 fresh evidence로 확인되었고, 확인되지 않은 revision·기술 행·downstream ID는 계속 blocked/deferred로 보존된다.
