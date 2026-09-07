# U1 Code Generation 구현 요약

## 구현 범위

`u1-baseline-and-source-registry`만 수정했다. 실행형 애플리케이션은 추가하지 않고 `ReferenceCatalog`와 `LocalValidationBoundary`를 UTF-8 정적 파일과 Bun built-in test runner로 구성했다. 이번 보정에서도 다른 Unit, `docs/`, 학습 문서 본문, 문제은행, 학습자 데이터는 건드리지 않았다.

## 생성·수정한 U1 application/test 경로

| 경로 | 역할 |
|---|---|
| `sources/aws-sidebar-index.md` | 공식 사이드바 링크의 `SIDE-<slug>` ID, URL, 상위 주제, 도메인, `linked_source_id`, 접근 상태 |
| `sources/source-registry.yaml` | `SRC-<slug>` ID, URL, 제목, 출처 유형, 도메인, 확인일, 상태와 모든 reverse 배열 |
| `sources/content-traceability.yaml` | 5개 도메인의 14개 기준선 행과 파생 자료 연결 계약 |
| `tests/u1-baseline-and-source-registry/reference-catalog-validation.test.ts` | ReferenceCatalog unit 검사 13개 |
| `tests/u1-baseline-and-source-registry/local-validation-boundary.test.ts` | LocalValidationBoundary unit 검사 17개; 상태 enum, verified 전이, PII·결제·건강정보 경계 포함 |
| `tests/u1-baseline-and-source-registry/registry-round-trip.integration.test.ts` | 파일 간 round-trip 통합 검사 14개; canonical metadata 왕복 포함 |
| `tests/u1-baseline-and-source-registry/static-package.e2e.test.ts` | 정적 패키지 E2E 검사 12개 |

정확한 U1 source claim은 같은 디렉터리의 `source-manifest.json`에 엔진 schema로 기록했다. manifest의 top-level은 `stage`, `unit`, `version`, `writes`뿐이며 `writes`에는 위 7개 workspace-relative 경로를 기록했다.

## 핵심 보정 결과

- `source-manifest.json`을 Code Generation engine schema로 정규화하고 임의 top-level 메타데이터를 제거했다.
- `traceability.json`의 upstream 범위에 상세 NFR `NFR2.1`, `NFR3.1`~`NFR3.3`, `NFR4.1`~`NFR4.3`, `NFR6.1`, `NFR7.1`~`NFR7.2`, `NFR8.1`~`NFR8.2`와 `BR1.1`~`BR1.8`을 포함하고, 각 `OK` target을 실제 workspace-relative 파일 경로로 변경했다.
- `LocalValidationBoundary`가 source `access_status`와 baseline `status`의 허용 enum을 실제로 검사한다. `verified`는 source status, provenance/date equality, non-placeholder provenance, 학습 문서 ID와 문제 ID가 모두 있어야 통과한다.
- `SidebarLink`의 `title`, `parent_topic`, `related_domain`, `access_status`를 파싱해 SourceRecord와 왕복 검사한다. 실제 schema의 허용된 상태 차이는 링크 수집 상태 `downloaded`와 revision 검토 상태 `blocked`의 조합으로 테스트 주석에 명시했다.
- `email=placeholder@example.invalid`, `credit_card=PLACEHOLDER`, `health_record=PLACEHOLDER` 탐지 fixture를 추가했다. 실제 패키지에는 해당 값이 없어 false-positive 없이 통과한다.
- 공식 revision 식별자·기술 행 원문은 독립 확인하지 않았고 `blocked`/`확인 필요` 상태를 유지한다. downstream 파생 ID는 U2-U7 산출물 이후 소유 Unit이 매핑해야 하므로 `Deferred`로 유지한다.

## 검증 결과

| 명령 | 결과 |
|---|---|
| `bun test tests/u1-baseline-and-source-registry/reference-catalog-validation.test.ts` | 통과: 13/13 |
| `bun test tests/u1-baseline-and-source-registry/local-validation-boundary.test.ts` | 통과: 17/17 |
| `bun test tests/u1-baseline-and-source-registry/registry-round-trip.integration.test.ts` | 통과: 14/14 |
| `bun test tests/u1-baseline-and-source-registry/static-package.e2e.test.ts` | 통과: 12/12 |
| `bun test tests/u1-baseline-and-source-registry` | 통과: 56/56, 실패 0 |
| `bun -e readUnitSourceManifest(...)` | 통과: engine source-manifest schema, 7 writes |
| `bun -e JSON/YAML parse` | 통과: traceability JSON 및 두 canonical YAML |
| `bun .kiro/tools/aidlc-sensor-traceability.ts --stage code-generation --output-path aidlc/spaces/default/intents/260904-aif-c01-guide/construction/u1-baseline-and-source-registry/code-generation/traceability.json` | 통과: `pass: true`, findings 0 |

총 56개 테스트가 통과했다. unit 30개, integration 14개, E2E 12개이며 Comprehensive 계약의 계층과 컴포넌트별 테스트 목표를 유지했다.

## 현재 blocked/deferred

1. 공식 AIF-C01 시험 안내서의 실제 revision 식별자와 기술 행 원문은 이번 보정에서도 독립 확인하지 않았다. 관련 SourceRecord와 BaselineItem은 `blocked`/`확인 필요` 상태로 유지했다.
2. 확인된 기준선별 학습 문서 ID·문제 ID·카드·퀴즈·Anki ID는 downstream Unit이 생성한 뒤 채워야 한다. 현재 빈 배열과 `Deferred` traceability 상태는 의도된 보류다.
3. `OQ1`, `OQ2`는 `sources/content-traceability.yaml`의 후속 확인 항목으로 유지했다.

## 범위 근거

수정 파일은 U1 canonical source 3개, U1 테스트 4개, U1 Code Generation record의 `source-manifest.json`, `traceability.json`, `code-summary.md`, `code-generation-plan.md`로 제한했다. 다른 Unit과 문서 본문은 변경하지 않았다.
