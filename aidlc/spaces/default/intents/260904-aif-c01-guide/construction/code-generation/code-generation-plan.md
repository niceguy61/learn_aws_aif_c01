# Code Generation 계획 — U2 D1 AI 및 ML의 기초

## 대상과 연결

단일 실행 지시가 concrete Unit을 전달하지 않는 환경에서 `u2-d1-ai-ml-foundations`를 수행하기 위한 stage-level 계획이다. 상세 계획은 [U2 Unit 계획](../u2-d1-ai-ml-foundations/code-generation/code-generation-plan.md)에 있으며, 구현 순서와 테스트 계약은 동일하다.

- 구현 대상: 정적 UTF-8 Markdown, TSV/CSV, YAML/JSON 추적 파일과 Bun 문서 품질 검사
- 애플리케이션 코드·API·DB·AWS 계정·유료 실습·학습자 데이터 저장: 해당 없음
- 현재 D1 공식 기준선과 `SRC-aif-c01-domain1`: 공식 revision·기술 행 원문 독립 확인 전까지 `blocked`; 관련 자료는 `draft` 또는 `review`
- 완료 대상: D1 README, 4개 개념 문서, 카드, 용어 퀴즈, Anki TSV, 공유 glossary D1 항목, U2 품질 검사와 추적 증거

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

1. D1 기존 문서의 front matter, stable ID, 기준선·출처 상태, 필수 섹션을 정렬한다.
2. Bun 내장 runner와 `tests/u2-d1-ai-ml-foundations/test-config.ts`를 준비하고 U2-scoped 명령을 먼저 실행한다.
3. 문서를 먼저 작성한 뒤 구조 검사를 작성·실행한다.
4. 추적성·출처·상대 링크 검사를 작성·실행한다.
5. 정적 독자 여정, TSV, 범위 표지, 민감정보 검사를 작성·실행한다.
6. 데이터베이스, repository, business service, API, frontend는 해당 없음으로 기록한다.
7. 품질 증거, source manifest, traceability, code summary를 작성한다.

자세한 단계·AC·파일 매핑은 [U2 상세 계획](../u2-d1-ai-ml-foundations/code-generation/code-generation-plan.md)을 따른다.

## 요구사항·스토리 추적성

- `US1.1`, `US2.1`, `US3.1`, `US4.1`, `US5.1`
- `AC1.1.1`~`AC1.1.4`, `AC2.1.1`~`AC2.1.5`, `AC3.1.1`~`AC3.1.4`, `AC4.1.1`~`AC4.1.4`, `AC5.1.1`~`AC5.1.6`
- `FR1.1`~`FR1.4`, `FR2.1`~`FR2.6`, `FR3.2`~`FR3.4`, `FR5.1`~`FR5.4`, `FR6.1`~`FR6.4`, `NFR1`~`NFR9`
