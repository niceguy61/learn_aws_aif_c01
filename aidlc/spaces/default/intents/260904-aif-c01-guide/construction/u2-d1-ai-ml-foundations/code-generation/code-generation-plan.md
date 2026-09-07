# U2 D1 AI 및 ML의 기초 Code Generation 계획

## 계획 범위와 승인 전 경계

- **Unit**: `u2-d1-ai-ml-foundations`
- **Unit 종류**: `packaging`
- **주요 컴포넌트**: `LearningContent`
- **대상**: AIF-C01 D1을 처음 배우는 학습자를 위한 한국어 정적 학습 자료
- **계획 단계에서 생성할 것**: 이 계획, `unit-test-instructions.md`, `code-generation-questions.md`만 생성한다.
- **승인 후 생성할 것**: U2가 소유한 D1 `README.md`, 개념 단위 Markdown, D1 용어 inventory, U2 전용 검사 설정·unit/integration/E2E 테스트, 품질 증거와 후속 Code Generation 산출물.
- **생성하지 않는 것**: 승인 전 실제 `docs/`, `tests/`, `sources/` 콘텐츠, 애플리케이션 코드, API, DB, 인프라, `source-manifest.json`, `code-summary.md`, Code Generation `traceability.json`.
- **소유 경계**: U1의 `sources/aws-sidebar-index.md`, `sources/source-registry.yaml`, `sources/content-traceability.yaml`과 U7의 카드·문제은행·Anki/CSV 계약은 읽기 전용 입력이다. U2는 기준선 ID나 출처 행을 재번호화·재정의하지 않는다.
- **현재 상태 경계**: U1의 공식 revision·세부 기준선 행이 확정되지 않았거나 출처가 `blocked`/`확인 필요`이면 U2 파생 문서는 `verified`로 표시하지 않고 `draft` 또는 `review`로 유지한다.

## 입력 산출물 요약

| 입력 | 계획에 미치는 영향 |
|---|---|
| `inception/requirements-analysis/requirements.md` | 공식 범위 추적, D1→D5 작성 순서, 개념 단위 문서, 초보자 설명, AWS 판단 단서, 범위 표지, 정적 품질·민감정보 요구를 정의한다. |
| `inception/units-generation/unit-of-work.md` | U2가 D1 README·개념 문서·문서 탐색 링크·D1 용어 inventory를 소유하고 U1 안정 ID를 참조하도록 고정한다. |
| `construction/u2-d1-ai-ml-foundations/nfr-requirements/security-requirements.md` | UTF-8, 상태 분리, 안정 ID, 양방향 링크, blocked 출처 승격 금지, 비수집 경계를 상세화한다. |
| `construction/u2-d1-ai-ml-foundations/nfr-requirements/tech-stack-decisions.md` | 새 런타임·dependency 없이 기존 Bun 검사와 결정적 정적 파일을 사용하도록 고정한다. |
| `construction/u2-d1-ai-ml-foundations/nfr-design/security-design.md` | 정적 파일 무결성, 로컬 결정적 검사, 민감정보 비수집과 API·DB·런타임의 N/A 근거를 제공한다. |
| `construction/u2-d1-ai-ml-foundations/nfr-requirements/traceability.json` | U2가 수행할 FR/NFR/AC와 `Deferred`·`N/A` 경계를 제공한다. |
| `construction/u2-d1-ai-ml-foundations/nfr-design/traceability.json` | 상세 NFR을 SD-01~SD-05 및 검사 계층에 연결한다. |
| U8 `functional-design/rules.md` | `BR8.1`~`BR8.12`를 정적 품질 검사 증거의 판정 규칙으로 참조한다. 이 규칙들은 U8 소유이며 U2에 업무 서비스를 추가하지 않는다. |

## 적용되지 않는 실행 계층

U2는 버전 관리형 정적 Markdown과 안정 ID·출처·링크를 가진 문서 패키지다. 따라서 다음 계층은 실행 구현 대상이 아니며, 계획에 N/A 검증 항목으로 남긴다.

| 활성 Contract 계층 | U2 적용 판정 | 계획상의 처리 |
|---|---|---|
| Data model / database behavior | N/A | DB schema, migration, ORM, 검색 인덱스, 학습자 답안·진도 저장을 만들지 않는다. 정적 JSON/Markdown 구조 검증으로 대체한다. `NFR7.2`, `AC1.2.3`, `BR8.12`를 근거로 기록한다. |
| Repository / data access | N/A | Repository/DAO, AWS SDK, 네트워크 호출, 원격 source fetch를 만들지 않는다. 로컬 파일 fixture와 U1 등록부 읽기만 사용한다. `NFR7.2`, `AC1.2.4`, `BR8.12`를 근거로 기록한다. |
| Business logic | N/A | 실행형 업무 서비스는 없다. 문서 품질 규칙은 결정적 검사 함수와 테스트 assertion으로만 표현한다. 검사 실패는 테스트 실패로 표면화한다. `FR6.1`, `FR6.4`, `BR8.1`~`BR8.11`을 근거로 기록한다. |
| API / endpoint | N/A | HTTP API, 세션, 인증·인가, CLI 학습자 입력, 자동 저장을 만들지 않는다. 외부 URL은 문서 메타데이터·Markdown 링크로만 취급한다. `NFR7.2`, `AC1.2.3`, `BR8.12`를 근거로 기록한다. |
| Frontend behavior | N/A with static-reader substitute | 웹 UI·interactive element는 없다. 브라우저 E2E 대신 일반 Markdown 뷰어에서 가능한 README→개념 문서→다음 문서 독자 여정과 링크·텍스트 fallback을 파일 시스템으로 검증한다. `NFR2`, `AC2.1.5`, `BR8.6`, `BR8.9`를 근거로 기록한다. |

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

## 순차 실행 계획

모든 단계는 계획의 순서대로 수행한다. `[N/A]` 단계도 U2의 실행 계층 제외와 검증 근거를 기록하는 계획 작업으로 수행한다. 각 단계는 `test-after`를 따르며, 문서·설정 구현 후 해당 검사를 작성·실행하고 실패를 수정한 뒤 결과를 기록한다.

| 단계 | 작업과 산출물 | 테스트·검증 | 추적성: US / FR / NFR / AC / BR |
|---:|---|---|---|
| 1 | U2 변경 표면과 기존 D1 문서 구조를 확인하고, U2 소유 파일·U1 읽기 전용 파일·U7 위임 파일을 확정한다. 문서 상태·출처 상태·`Deferred`/`N/A` 경계를 계획에 반영한다. | 기존 파일의 stable ID·링크·출처 상태를 기준선으로 기록한다. 실행 코드·API·DB·AWS 계정이 없는지 확인한다. | `US1.1, US2.1, US5.1` / `FR1.1, FR1.3, FR1.4, FR2.1, FR6.3` / `NFR3, NFR4, NFR5, NFR7` / `AC1.1.1, AC1.1.3, AC2.1.3, AC5.1.1` / `BR8.1, BR8.2, BR8.3, BR8.4, BR8.5, BR8.12` |
| 2 | U2 테스트 runner/configuration을 준비한다. 새 dependency를 추가하지 않고 Bun built-in test runner와 `tests/u2-d1-ai-ml-foundations/test-config.ts`를 사용한다. 설정에는 U2 대상 경로, 허용 상태, 필수 H2, stable ID, 범위 표지, 링크·민감정보·UTF-8 검사 규칙을 선언한다. | 첫 테스트 전에 다음 Unit-scoped readiness 명령이 실행 가능해야 한다: `bun test tests/u2-d1-ai-ml-foundations/document-structure.test.ts`. 실행 가능한 test file은 승인 후 생성한다. | `US5.1` / `FR6.1, FR6.3, FR6.4` / `NFR2, NFR3, NFR5, NFR6, NFR7` / `AC5.1.4, AC5.1.5, AC5.1.6` / `BR8.1, BR8.8, BR8.10, BR8.12` |
| 3 | U2 정적 산출물의 production structure skeleton을 확정한다. 대상은 `docs/01-ai-ml-foundations/README.md`, D1 개념 단위 Markdown, D1 terminology inventory 및 U2가 소유하는 정적 표 형식이 있을 경우 그 파일이다. `docs/glossary.md`가 U2 소유가 아니거나 아직 없으면 이를 임의로 생성하지 않고 연결 상태를 `Deferred`로 보존한다. | 아직 실제 문서 테스트를 만들지 않는다. 다만 구현 대상과 변경 범위를 test-config의 명시적 목록과 일치시킨다. | `US1.1, US2.1, US4.1` / `FR2.1, FR2.2, FR3.2, FR3.3, FR6.3` / `NFR3, NFR5, NFR9` / `AC1.1.2, AC2.1.2, AC2.1.3, AC4.1.1` / `BR8.1, BR8.4, BR8.6, BR8.12` |
| 4 | D1 README를 구현한다. 공식 도메인명·가중치, 확인된 U1 baseline/source ID 참조, 학습 목표, 선수 지식, 읽기 순서, 시험 범위와 실무 확장 표지, D1 용어·다음 D2 연결을 포함한다. 미확정 기준선은 발명하지 않고 `확인 필요`로 둔다. | README 작성 후 `document-structure.test.ts`에 README 구조·front matter·상태·범위 표지·링크 happy path와 누락/잘못된 상태 edge cases를 추가하고 실행한다. 실패를 수정한 후 같은 명령으로 재실행한다. | `US1.1, US2.1, US5.1` / `FR1.2, FR1.3, FR2.1, FR2.3, FR2.6, FR5.1, FR5.2, FR6.2` / `NFR1, NFR2, NFR3, NFR4, NFR5, NFR8` / `AC1.1.1, AC1.1.2, AC1.1.3, AC1.1.4, AC2.1.3, AC2.1.5, AC5.1.1, AC5.1.3` / `BR8.2, BR8.3, BR8.5, BR8.6, BR8.7, BR8.8, BR8.9` |
| 5 | D1 개념 문서를 개념 단위로 작성·수정한다. 각 문서에 선수 지식, 쉬운 한국어 설명과 최초 영어 용어, AWS 관점, 비교, 시나리오, 시험 판단 단서, 오해, 확인 질문, 다음 문서와 Sources를 둔다. 외부 사실은 공식 출처 상태에 따라 표시하고 원문 전체를 복사하지 않는다. | 개념 문서 작성 후 `document-structure.test.ts`에서 필수 H2 순서, front matter, 문서 상태, 문서 ID, 시험 범위/실무 확장 표지, 텍스트 fallback, 다음 문서 링크와 개념 단위 누락을 10~15개 이상 검증한다. | `US2.1, US3.1, US5.1` / `FR2.2, FR2.3, FR2.4, FR2.5, FR2.6, FR5.1, FR5.2, FR5.4, FR6.4` / `NFR1, NFR2, NFR4, NFR5, NFR8` / `AC2.1.1, AC2.1.2, AC2.1.4, AC2.1.5, AC3.1.1, AC3.1.3, AC5.1.2, AC5.1.5` / `BR8.2, BR8.3, BR8.7, BR8.8, BR8.9, BR8.10` |
| 6 | D1 terminology inventory와 문서의 term ID 연결을 구현한다. U2가 소유하는 용어 자료만 수정하고, U7의 카드·문제은행·Anki/CSV는 생성·수정하지 않는다. 중앙 glossary가 없으면 임시 연결과 `Deferred` 상태를 명시한다. | 용어 inventory 작성 후 `traceability.integration.test.ts`에서 term ID 중복·고아·문서 역방향 연결·상태/출처 연결을 검사한다. 정적 CSV/TSV 파일이 U2 범위에 실제로 포함될 때만 헤더·UTF-8·필드 수를 같은 검사 계층에서 검증하며, U7 소유 파일은 검사 대상에서 제외한다. | `US4.1, US5.1` / `FR3.2, FR3.3, FR5.1, FR6.2, FR6.4` / `NFR2, NFR3, NFR4, NFR6, NFR7, NFR8` / `AC4.1.1, AC4.1.3, AC5.1.1, AC5.1.4, AC5.1.6` / `BR8.1, BR8.2, BR8.4, BR8.5, BR8.6, BR8.8, BR8.10` |
| 7 | Data model/database behavior를 N/A로 확정한다. DB schema·migration·ORM·검색 인덱스·학습자 데이터 저장을 만들지 않고, 정적 JSON/Markdown 구조를 데이터 모델의 대체 검증 대상으로 정의한다. | 별도 DB 테스트 파일은 만들지 않는다. `document-structure.test.ts`와 `traceability.integration.test.ts`가 JSON parse·stable ID·결정적 배열·문서 메타데이터만 검사한다. N/A 사유는 후속 `code-summary.md`와 traceability에 기록한다. | `US5.1` / `FR4.5, FR6.1, FR6.3` / `NFR3, NFR6, NFR7` / `AC1.2.3, AC1.2.4, AC5.1.4, AC5.1.6` / `BR8.1, BR8.4, BR8.8, BR8.12` |
| 8 | Repository/data access를 N/A로 확정한다. 로컬 파일 읽기 fixture 외 repository·DAO·AWS SDK·네트워크 호출을 만들지 않는다. U1 source registry는 읽기 전용 계약으로 참조한다. | 별도 repository 테스트 파일은 만들지 않는다. integration test에서 네트워크 호출이 없고 source registry와 문서 메타데이터가 일치하는지 검사한다. | `US5.1` / `FR1.4, FR5.1, FR5.3, FR6.1` / `NFR4, NFR7` / `AC1.1.3, AC3.1.3, AC5.1.1, AC5.1.3` / `BR8.2, BR8.3, BR8.5, BR8.10, BR8.12` |
| 9 | Business logic을 N/A로 확정한다. 실행형 서비스 로직은 만들지 않고, 문서 품질 규칙을 순수한 검사 함수와 assertion으로 구현한다. | 별도 business-service 테스트 파일은 만들지 않는다. 검사 실패가 assertion failure로 표면화되고 빈 assertion이나 항상 통과하는 테스트가 없음을 test review에서 확인한다. | `US5.1` / `FR6.1, FR6.4` / `NFR3, NFR4, NFR7` / `AC5.1.3, AC5.1.4, AC5.1.6` / `BR8.1, BR8.2, BR8.3, BR8.4, BR8.5, BR8.10, BR8.11, BR8.12` |
| 10 | API/endpoint를 N/A로 확정한다. HTTP API, 세션, 인증·인가, CLI 입력, 자동 저장, 업로드와 AWS 계정 호출을 만들지 않는다. | 별도 API 테스트 파일은 만들지 않는다. 정적 검사 테스트가 외부 URL을 호출하지 않고 문서 문자열·메타데이터만 검사하는지 확인한다. | `US5.1` / `FR3.1, FR4.5, FR6.3` / `NFR7` / `AC1.2.3, AC1.2.4, AC5.1.6` / `BR8.10, BR8.12` |
| 11 | Frontend behavior를 N/A로 확정하고 정적 독자 여정 대체를 구현한다. 웹 UI·interactive element·`data-testid`는 만들지 않는다. | 독자 여정 테스트 작성 후 `reader-journey.e2e.test.ts`에서 README→개념 문서→용어 자료→D2 연결, 링크 대상·anchor, 텍스트 fallback, 한국어 설명·영어 용어, 범위 표지를 파일 시스템으로 10~15개 이상 검증한다. exact command: `bun test tests/u2-d1-ai-ml-foundations/reader-journey.e2e.test.ts` | `US1.1, US2.1, US4.1, US5.1` / `FR2.2, FR2.3, FR3.2, FR6.2, FR6.4` / `NFR1, NFR2, NFR5, NFR8` / `AC2.1.2, AC2.1.5, AC4.1.1, AC4.1.4, AC5.1.5` / `BR8.6, BR8.7, BR8.8, BR8.9, BR8.10, BR8.12` |
| 12 | 문서 구조·형식 검사 파일을 작성·실행한다. `document-structure.test.ts`는 U2 컴포넌트에 대해 comprehensive 기준 10~15개 이상의 독립 사례를 제공한다. | 구현 후 exact command: `bun test tests/u2-d1-ai-ml-foundations/document-structure.test.ts`. happy path와 front matter 누락, 잘못된 status, 필수 섹션 누락, blocked source의 verified 승격, UTF-8·파일명·범위 표지 edge cases를 포함한다. | `US1.1, US2.1, US5.1` / `FR2.1, FR2.3, FR2.6, FR5.1, FR5.2, FR6.2, FR6.4` / `NFR1, NFR2, NFR4, NFR5, NFR6, NFR8` / `AC1.1.2, AC1.1.4, AC2.1.3, AC2.1.5, AC3.1.3, AC5.1.1, AC5.1.3, AC5.1.5` / `BR8.2, BR8.3, BR8.7, BR8.8, BR8.9, BR8.10, BR8.11` |
| 13 | 추적성 integration 검사 파일을 작성·실행한다. `traceability.integration.test.ts`는 U1 baseline/source registry, 문서 ID, term ID, 상대 링크의 정방향·역방향을 검사한다. | 구현 후 exact command: `bun test tests/u2-d1-ai-ml-foundations/traceability.integration.test.ts`. comprehensive 기준 10~15개 이상의 사례로 source URL·제목·확인일·status 대조, blocked source 승격 차단, orphan/duplicate ID, 절대 로컬 경로, 링크 역방향을 검증한다. | `US1.1, US2.1, US4.1, US5.1` / `FR1.1, FR1.3, FR1.4, FR3.2, FR3.3, FR5.1, FR5.2, FR5.3, FR6.1, FR6.2` / `NFR3, NFR4, NFR6, NFR7, NFR8` / `AC1.1.3, AC3.1.3, AC4.1.1, AC4.1.3, AC5.1.1, AC5.1.3, AC5.1.4, AC5.1.6` / `BR8.1, BR8.2, BR8.3, BR8.4, BR8.5, BR8.6, BR8.10, BR8.11` |
| 14 | 정적 독자 여정 E2E 검사 파일을 작성·실행한다. 브라우저나 네트워크 없이 파일 그래프를 따라가며 독자 경험과 접근성 fallback을 검증한다. | 구현 후 exact command: `bun test tests/u2-d1-ai-ml-foundations/reader-journey.e2e.test.ts`. 10~15개 이상의 사례로 문서 순서, 다음 링크, D2 연결, 용어 연결, text fallback, 외부 렌더러 비의존성, 민감정보 부재를 검사한다. | `US1.1, US2.1, US4.1, US5.1` / `FR2.2, FR2.3, FR3.2, FR3.3, FR6.2, FR6.4` / `NFR1, NFR2, NFR5, NFR7, NFR8` / `AC2.1.2, AC2.1.5, AC4.1.1, AC4.1.3, AC5.1.5, AC5.1.6` / `BR8.6, BR8.7, BR8.8, BR8.9, BR8.10, BR8.11, BR8.12` |
| 15 | 환경·build 설정을 정리한다. 기존 Bun 실행 환경과 저장소 검사 도구를 사용하고 새 package/dependency를 추가하지 않는다. Markdown/TSV/CSV/JSON이 포함되는 경우 형식 검사를 명시한다. | 모든 실행 명령은 U2 파일만 지정해야 한다. 단위별 exact 명령은 `unit-test-instructions.md`에 동일하게 기록한다. 애플리케이션 line coverage는 N/A지만 comprehensive의 테스트 수·계층 의무는 낮추지 않는다. NFR이 요구하지 않는 runtime performance/security 테스트는 N/A로 기록하고, 정적 민감정보 검사는 integration/E2E에 포함한다. | `US5.1` / `FR6.1, FR6.3, FR6.4` / `NFR2, NFR6, NFR7` / `AC5.1.4, AC5.1.5, AC5.1.6` / `BR8.8, BR8.10, BR8.12` |
| 16 | 문서화·추적성·품질 증거를 정리한다. 이후 Code Generation 완료 시 `code-summary.md`, `source-manifest.json`, `traceability.json`을 생성하고 U8 품질 증거가 참조할 대상·검사일·판정·근거·조치·재검사를 기록한다. | 계획 승인 전에는 이 후속 산출물을 생성하지 않는다. 승인 후 모든 `OK` target은 실제 workspace-relative 파일이어야 하며, `Deferred`/`N/A`에는 이유를 둔다. 실패·보류는 수정 후 재검사 연결 없이는 완료로 집계하지 않는다. | `US1.1, US2.1, US4.1, US5.1` / `FR1.1, FR1.3, FR1.4, FR2.1~FR2.6, FR3.2~FR3.4, FR5.1~FR5.4, FR6.1~FR6.4` / `NFR1~NFR9` / `AC1.1.1~AC1.1.4, AC2.1.1~AC2.1.5, AC3.1.1~AC3.1.4, AC4.1.1~AC4.1.4, AC5.1.1~AC5.1.6` / `BR8.1~BR8.12` |

## Test volume and exact commands

`comprehensive` 의무에 따라 U2의 `LearningContent` 컴포넌트는 각 applicable test layer에 10~15개 이상의 의미 있는 사례를 갖는다.

- **Unit**: 문서 구조·front matter·범위 표지·UTF-8을 검증하는 `document-structure.test.ts`.
- **Integration**: U1 source/baseline·stable ID·상대 링크·상태 분리·민감정보 경계를 검증하는 `traceability.integration.test.ts`.
- **E2E 성격**: 브라우저가 아닌 정적 파일 독자 여정을 검증하는 `reader-journey.e2e.test.ts`.
- **Security**: 별도 runtime security test는 N/A지만 `BR8.10`, `NFR7`의 민감정보·secret·실제 AWS 계정 식별자 검사는 integration/E2E에 포함한다.
- **Performance**: 실행 서비스가 없으므로 runtime performance test는 N/A다. 문서 구조·링크 검사의 합리적인 실행 시간을 기록하되 NFR 요구가 없는 성능 목표를 임의로 만들지 않는다.
- **Exact Unit-scoped commands**:

```text
bun test tests/u2-d1-ai-ml-foundations/document-structure.test.ts
bun test tests/u2-d1-ai-ml-foundations/traceability.integration.test.ts
bun test tests/u2-d1-ai-ml-foundations/reader-journey.e2e.test.ts
```

통합 명령이 필요하면 세 파일을 명시적으로 지정한다. 범위 없는 `bun test`, `npm test`, 또는 프로젝트 전체 경로 명령은 사용하지 않는다.

```text
bun test tests/u2-d1-ai-ml-foundations/document-structure.test.ts tests/u2-d1-ai-ml-foundations/traceability.integration.test.ts tests/u2-d1-ai-ml-foundations/reader-journey.e2e.test.ts
```

## Definition of Done for the approved plan

- [ ] 이 계획의 Testing Contract JSON이 `render` stdout의 전체 블록과 변경 없이 일치한다.
- [ ] 모든 순차 단계에 `US`/`FR`/`NFR`/`AC`/`BR` 추적 연결이 있다.
- [ ] `test-after` ordering과 `comprehensive`의 unit/integration/E2E·10~15개 의무가 유지된다.
- [ ] runner readiness가 첫 테스트 전에 배치되고 U2 exact command가 기록된다.
- [ ] 실행 코드·API·DB·frontend runtime을 만들지 않는 이유와 정적 독자 여정 대체가 기록된다.
- [ ] U1/U7 소유 경계와 `Deferred`/`N/A` 판정이 명시된다.
- [ ] 승인 fingerprint를 기록할 Plan Approval 질문 파일이 준비된다.

## 다음 단계

Plan Approval에서 `Approve Plan`을 선택한 뒤에만 실제 U2 문서·검사 설정·테스트 파일 생성으로 진행한다.
