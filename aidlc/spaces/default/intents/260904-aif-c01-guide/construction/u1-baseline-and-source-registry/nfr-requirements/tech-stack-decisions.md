# U1 기술 결정

## 목적과 경계

U1은 `ReferenceCatalog`가 관리하는 정적 기준선·출처 등록 계약이다. 실행형 애플리케이션, API, 데이터베이스, AWS 계정, 배포 환경, 장기 실행 프로세스는 만들지 않는다. 기술 선택의 목표는 작은 의존성 집합으로 사람이 읽고 도구가 반복 검증할 수 있는 UTF-8 파일을 만드는 것이다.

## 결정 요약

| 결정 ID | 선택 | 적용 대상 | 결정 이유 |
|---|---|---|---|
| TECH1 | UTF-8 Markdown | `sources/aws-sidebar-index.md`와 사람이 읽는 설명 | GitHub-Flavored Markdown과 일반 Markdown 뷰어에서 읽히며 한국어·영어 원문·링크를 함께 보존한다. |
| TECH2 | YAML | `sources/source-registry.yaml`, `sources/content-traceability.yaml` | 메타데이터와 ID 배열을 사람이 검토하기 쉽고, 안정적인 키·enum·중첩 관계를 표현한다. |
| TECH3 | JSON | 단계별 `traceability.json` | 센서와 도구가 결정적으로 파싱하고 upstream·reverse·양방향 연결을 기계적으로 검사할 수 있다. |
| TECH4 | UTF-8 CSV | 후속 U7 Anki 산출물과의 교환 계약 | `front,back` 및 추적 필드를 일반 CSV 파서로 교환할 수 있다. U1은 CSV 본문을 소유하지 않지만 인코딩·추적 규칙을 계약으로 제시한다. |
| TECH5 | 저장소 상대 경로와 버전 관리 | 모든 U1 산출물 | 절대 경로와 사용자별 상태를 제거하고 변경 이력·리뷰·재현성을 확보한다. |
| TECH6 | 기존 Bun 기반 정적 센서와 표준 파서 | Markdown·YAML·JSON·CSV 품질 검사 | 새 런타임 의존성을 추가하지 않고 이미 제공된 `required-sections`, `upstream-coverage`, `traceability`, `linter`, `type-check` 경로를 재사용한다. |
| TECH7 | 로컬 읽기 전용 검사 | 출처·링크·추적성·민감정보 검사 | AWS API, 계정 인증, 외부 업로드 없이 동일 checkout에서 반복 실행할 수 있고 학습자 데이터를 수집하지 않는다. |
| TECH8 | Mermaid 선택적 사용 + 텍스트 fallback | 설명용 다이어그램이 필요한 경우에만 | 외부 렌더러 의존성을 만들지 않으면서 시각 설명을 허용한다. 핵심 의미는 항상 일반 텍스트로 남긴다. |
| TECH9 | 추가 패키지·SDK·서비스 미도입 | U1 전체 | U1은 정적 파일 계약이므로 npm 패키지, AWS SDK, DB 드라이버, 웹 프레임워크, 컨테이너를 추가하는 비용과 공급망 위험이 가치보다 크다. |

## 권장 파일 계약

### Markdown

- UTF-8, 짧은 문단, 논리적 제목 계층을 사용한다.
- 외부 링크는 `[설명](https://...)` 형식으로 기록한다.
- Mermaid를 사용하면 바로 다음에 노드·순서·결론을 설명하는 일반 텍스트를 둔다.
- AWS 공식 이미지를 복제하지 않고 필요한 경우 공식 출처와 한국어 alt text·텍스트 대체 경로를 기록한다.

### YAML

`source-registry.yaml`과 `content-traceability.yaml`은 각각 `SourceRecord`, `SidebarLink`, `BaselineItem`의 소유 파일이다. ID, URL, 제목, 출처 유형, 상위 주제, 도메인, 확인일, 접근 상태, linked ID 배열을 필수 키로 유지한다. YAML 문자열에는 임의의 실행 코드나 secret-like 값을 넣지 않는다.

### JSON

단계별 `traceability.json`은 다음을 포함한다.

- `stage`, `unit`, `upstream_ids`, `coverage`, `reverse`
- `requirements`, `acceptance_criteria`, `stories`, `units`, `components`
- `bidirectional_links`, `source_paths`, `validation_evidence`

상태 값은 `OK`, `GAP`, `ORPHAN`, `Deferred`, `N/A` 중 하나로 제한하고, `OK`·`Deferred`·`N/A`에는 비어 있지 않은 target 또는 justification을 둔다.

### CSV

U1은 CSV 본문을 생성하지 않지만 후속 U7의 UTF-8 교환 계약을 보장한다. 최소 헤더는 `front,back`이며 추가 열은 안정 ID와 `baseline_ids`, source ID, 범위 분류를 추적할 수 있어야 한다. 쉼표·큰따옴표·줄바꿈이 값에 포함될 때 표준 quoting을 사용한다.

## 재현 가능한 로컬 검사

검사는 네트워크나 AWS 자격 증명 없이 저장소 루트에서 실행한다. 실행 시점과 대상 파일은 U8 품질 증거에 기록한다.

1. `required-sections`: 생성된 Markdown의 필수 제목과 비어 있지 않은 섹션을 검사한다.
2. `upstream-coverage`: `functional-spec.md`, `rules.md`, 승인된 `requirements.md`와의 참조를 확인한다.
3. `traceability`: 모든 upstream ID, 상세 NFR ID, AC, reverse 및 양방향 링크의 존재·중복·고아를 검사한다.
4. `linter`: Markdown 안의 코드 블록이 있을 때만 해당 TypeScript/JavaScript 형상을 검사한다. U1 문서에는 실행 코드가 없으므로 비적용 결과를 기록한다.
5. `type-check`: TypeScript/JavaScript 산출물이 없으므로 비적용 결과를 기록한다.
6. 인코딩·구조 검사: Markdown·YAML·JSON·CSV를 UTF-8과 해당 파서로 읽고, 파일명·상대 링크·ID·허용 상태를 검사한다.
7. 민감정보 검사: 토큰·자격 증명·PII·실제 계정 식별자 패턴을 검사하고 발견 시 제거·치환 후 재검사한다.

검사 도구 버전, 실행 날짜, 입력 파일 목록, 결과와 수정 사항을 함께 기록한다. 도구가 네트워크 확인을 요구하더라도 인증·비밀을 전달하지 않으며, 접근 실패는 `blocked` 또는 `확인 필요`로 기록한다.

## 기술 선택의 비선택 항목

| 항목 | 상태 | 결정 근거 |
|---|---|---|
| 웹 프레임워크·UI | 해당 없음 | 정적 Markdown·상대 링크가 사용자 열람 경계다. |
| API·GraphQL·서버 | 해당 없음 | 기준선·출처를 제공하는 HTTP API를 만들지 않는다. |
| 데이터베이스·검색 인덱스 | 해당 없음 | 정적 YAML/JSON 추적표가 canonical 계약이며 학습자 데이터를 저장하지 않는다. |
| AWS SDK·IAM·KMS | 해당 없음 | AWS 계정 호출·비밀·암호화 키가 없다. |
| 컨테이너·호스팅·배포 파이프라인 | 해당 없음 | `shared static package`를 저장소에서 전달할 뿐 staging·production 환경을 운영하지 않는다. |
| 런타임 확장성·고가용성·재해복구 | 해당 없음 | 런타임 요청, 세션, 서비스 가용성 목표가 없다. 파일 무결성·재현성·버전 관리가 대응 품질 속성이다. |
| 자동 최신성 수집 | 해당 없음 | 승인된 범위가 수동 공식 출처 조사이며, 확인일·상태를 갱신하는 절차로 관리한다. |

## 대안과 트레이드오프

### 단일 JSON 또는 데이터베이스

단일 JSON이나 DB는 기계 처리를 단순화할 수 있지만 사람이 검토하기 어렵고 실행 환경·마이그레이션·접근 권한이 필요하다. U1의 정적 계약과 비수집 경계에 맞지 않아 선택하지 않았다.

### Node.js 패키지 생태계 추가

전용 YAML·Markdown·CSV 패키지를 추가하면 일부 파싱 편의가 생기지만 lockfile·공급망·버전 변동을 늘린다. 이미 제공된 Bun 기반 도구와 표준 파서 검사를 우선 사용하고, 실제 결손이 증명될 때만 별도 의존성을 검토한다.

### AWS 서비스에 출처 등록

S3, DynamoDB, OpenSearch 등의 서비스는 검색·협업 기능을 제공할 수 있지만 AWS 계정, 비용, IAM, 배포·운영 경계를 도입한다. 승인된 정적 학습 가이드에는 과도하며 공식 URL과 버전 관리형 파일로 충분하다.

## Sources

- `aidlc/spaces/default/intents/260904-aif-c01-guide/inception/requirements-analysis/requirements.md`
- `aidlc/spaces/default/intents/260904-aif-c01-guide/inception/user-stories/stories.md`
- `aidlc/spaces/default/intents/260904-aif-c01-guide/inception/units-generation/unit-of-work.md`
- `aidlc/spaces/default/intents/260904-aif-c01-guide/inception/units-generation/unit-of-work-story-map.md`
- `aidlc/spaces/default/intents/260904-aif-c01-guide/construction/u1-baseline-and-source-registry/functional-design/entities.md`
- `aidlc/spaces/default/intents/260904-aif-c01-guide/construction/u1-baseline-and-source-registry/functional-design/rules.md`
- `aidlc/spaces/default/intents/260904-aif-c01-guide/construction/u1-baseline-and-source-registry/functional-design/functional-spec.md`

## Assumptions & Open Questions

- `sources/`의 실제 공식 URL·revision·행 값은 별도 출처 조사에서 확정한다.
- 프로젝트의 기존 Bun 도구와 저장소 검사 설정을 재사용할 수 있다고 판단했다. 특정 검사기에서 YAML·CSV 파싱을 지원하지 않으면 새 패키지를 즉시 추가하지 않고 작은 독립 검사 또는 표준 라이브러리 대안을 검토한다.
- 운영 배포가 필요해지는 범위 변경이 승인되면 이 문서의 `해당 없음` 항목을 다시 설계한다.

## Review

### architecture 관점

READY. 정적 파일을 하나의 공유 패키지로 유지하고, `ReferenceCatalog`의 canonical 파일과 다른 Unit의 본문 소유권을 분리했다. 실행 토폴로지나 서비스 분해를 임의로 만들지 않았다.

### security 관점

READY. 새 SDK·패키지·네트워크·자격 증명 경계를 도입하지 않으며, 파일 포맷·상태·ID·상대 경로 검사를 통해 출처 무결성과 공급망 위험을 낮춘다.

### quality 관점

READY. 기존 로컬 센서와 표준 파서 중심의 최소 검사 집합, UTF-8·CSV·Markdown·Mermaid fallback·민감정보 검사를 재현 가능한 증거로 정의했다. linter/type-check는 코드가 있을 때만 적용하고 현재 U1에는 비적용으로 기록한다.

### 미해결 사항

실제 공식 출처 조사에 따른 URL·revision·행 수와 특정 CSV 추가 열은 후속 자료 생성 단계에서 확정한다. 현재 기술 결정은 이 불확실성을 추측하지 않고 상태·추적 필드로 보류할 수 있게 한다.
<!-- 산출물은 Consolidated Summary Confirmation 이후 저장되었다. -->

<!-- Revalidated after the current NFR summary confirmation; substantive content unchanged. -->